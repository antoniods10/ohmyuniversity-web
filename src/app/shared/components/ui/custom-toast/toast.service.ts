/**
 * @file toast.service.ts
 * @description
 * Centralized service responsible for managing application toast notifications.
 *
 * This service provides a reactive toast system based on Angular signals,
 * supporting creation, grouping, lifecycle management, and dismissal of toast
 * messages across the application.
 *
 * It handles:
 * - Creation of toast notifications with different variants and configurations
 * - Automatic grouping by screen position
 * - Enforcing maximum toast count per position
 * - Auto-dismiss scheduling
 * - Pause/resume lifecycle control (e.g., hover interactions)
 * - Global and targeted dismissal operations
 *
 * The service is designed to be UI-framework agnostic and acts as the single
 * source of truth for toast state management.
 */

import { Injectable, signal, computed } from '@angular/core';

/**
 * Defines the visual and semantic variants available for toast notifications.
 * Each variant represents a different level of feedback or system state,
 * such as success confirmations, error alerts, warnings, informational messages,
 * or neutral notifications without strong semantic meaning.
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

/**
 * Defines the possible screen positions where toast notifications can be rendered.
 * Each position determines both the alignment and stacking direction of toasts
 * within the viewport.
 */
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

/**
 * Represents an optional user-interactable action attached to a toast.
 * Actions are rendered as a button and executed when the user clicks it,
 * allowing toast notifications to trigger contextual behavior.
 */
export interface ToastAction {
  label: string;
  onClick: () => void;
}

/**
 * Represents the full internal state of a toast notification.
 *
 * This model includes both user-defined properties (such as message, variant,
 * and optional action) and runtime metadata used by the system to manage
 * lifecycle behavior, including timing, pause state, and rendering logic.
 */
export interface Toast {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  duration: number;
  position: ToastPosition;
  dismissible: boolean;
  action?: ToastAction;
  createdAt: number;
  paused: boolean;
}

/**
 * Configuration object used when creating a toast notification.
 *
 * This interface defines optional overrides that control presentation and
 * behavior, while preserving sensible defaults defined by the service.
 */
export interface ToastOptions {
  title?: string;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  action?: ToastAction;
}

/**
 * Provides a centralized reactive store for toast notifications and exposes
 * derived views of the toast state for rendering purposes.
 *
 * This service maintains the full list of active toasts using Angular signals
 * and derives grouped projections of that state to support UI containers that
 * render notifications by screen position.
 *
 * It also enforces internal constraints such as maximum toast density per
 * position to ensure visual clarity and prevent UI overflow.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly MAX_PER_POSITION = 5;

  /** Reactive list of all active toast notifications. */
  readonly toasts = signal<Toast[]>([]);

  /**
   * Derived view of active toasts grouped by screen position.
   *
   * This computed signal is intended for presentation layers, allowing toast
   * containers to render notifications without performing grouping logic
   * themselves.
   */
  readonly toastsByPosition = computed(() => {
    const groups: Partial<Record<ToastPosition, Toast[]>> = {};
    for (const toast of this.toasts()) {
      if (!groups[toast.position]) groups[toast.position] = [];
      groups[toast.position]!.push(toast);
    }
    return groups;
  });

  /**
   * Creates and displays a new toast notification.
   *
   * This method builds a toast instance from the provided message, variant, and
   * optional configuration, then registers it in the reactive store so it becomes
   * visible in the UI.
   *
   * It also enforces internal constraints such as the maximum number of toasts
   * allowed per screen position. When the limit is reached, the oldest toast in
   * that position is automatically removed before adding the new one.
   *
   * If a duration greater than zero is specified, the toast is automatically
   * scheduled for dismissal after the given amount of time.
   *
   * @param message The message content displayed inside the toast.
   * @param variant Visual and semantic type of the toast.
   * @param options Optional configuration overriding default toast behavior.
   * @returns The unique identifier of the created toast, useful for manual control.
   */
  show(message: string, variant: ToastVariant = 'neutral', options: ToastOptions = {}): string {
    const id = this.generateId();
    const toast: Toast = {
      id,
      variant,
      message,
      title: options.title,
      duration: options.duration ?? 4000,
      position: options.position ?? 'top-right',
      dismissible: options.dismissible ?? true,
      action: options.action,
      createdAt: Date.now(),
      paused: false,
    };

    this.toasts.update(current => {
      const forPosition = current.filter(t => t.position === toast.position);
      if (forPosition.length >= this.MAX_PER_POSITION) {
        const oldest = forPosition[0];
        current = current.filter(t => t.id !== oldest.id);
      }
      return [...current, toast];
    });

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }

  /**
   * Displays a success toast notification.
   *
   * @param message Toast message content.
   * @param options Optional toast configuration.
   * @returns The created toast id.
   */
  success(message: string, options: ToastOptions = {}): string {
    return this.show(message, 'success', options);
  }

  /**
   * Displays an error toast notification with extended default duration.
   *
   * @param message Toast message content.
   * @param options Optional toast configuration.
   * @returns The created toast id.
   */
  error(message: string, options: ToastOptions = {}): string {
    return this.show(message, 'error', { duration: 6000, ...options });
  }

  /**
   * Displays a warning toast notification.
   *
   * @param message Toast message content.
   * @param options Optional toast configuration.
   * @returns The created toast id.
   */
  warning(message: string, options: ToastOptions = {}): string {
    return this.show(message, 'warning', options);
  }

  /**
   * Displays an informational toast notification.
   *
   * @param message Toast message content.
   * @param options Optional toast configuration.
   * @returns The created toast id.
   */
  info(message: string, options: ToastOptions = {}): string {
    return this.show(message, 'info', options);
  }

  /**
   * Displays a neutral toast notification.
   *
   * @param message Toast message content.
   * @param options Optional toast configuration.
   * @returns The created toast id.
   */
  neutral(message: string, options: ToastOptions = {}): string {
    return this.show(message, 'neutral', options);
  }

  /**
   * Removes a toast notification by id.
   *
   * @param id Toast identifier.
   * @returns void
   */
  dismiss(id: string): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  /**
   * Removes all active toast notifications.
   *
   * @returns void
   */
  dismissAll(): void {
    this.toasts.set([]);
  }

  /**
   * Removes all toasts for a specific screen position.
   *
   * @param position Target toast position.
   * @returns void
   */
  dismissPosition(position: ToastPosition): void {
    this.toasts.update(current => current.filter(t => t.position !== position));
  }

  /**
   * Pauses the auto-dismiss timer of a toast.
   *
   * @param id Toast identifier.
   * @returns void
   */
  pause(id: string): void {
    this.toasts.update(current => current.map(t => (t.id === id ? { ...t, paused: true } : t)));
  }

  /**
   * Resumes the auto-dismiss timer of a toast.
   *
   * @param id Toast identifier.
   * @returns void
   */
  resume(id: string): void {
    this.toasts.update(current =>
      current.map(t => (t.id === id ? { ...t, paused: false, createdAt: Date.now() } : t)),
    );
  }

  /**
   * Generates a unique toast identifier.
   *
   * @returns Generated toast id.
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }
}

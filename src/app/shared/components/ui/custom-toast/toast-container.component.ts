/**
 * @file toast-container.component.ts
 * @description
 * Root container component responsible for rendering all toast notifications
 * in the application.
 *
 * It acts as a layout orchestrator that subscribes to the ToastService state
 * and distributes toast items into screen positions (top-left, top-right,
 * bottom-center, etc.), delegating actual rendering to ToastItemComponent.
 *
 * This component is intended to be instantiated once at application level.
 */

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastPosition } from './toast.service';
import { ToastItemComponent } from './toast-item.component';

/**
 * Root container component responsible for rendering and positioning all toast
 * notifications in the application.
 *
 * It provides the structural layer that organizes toast items by screen position
 * and delegates rendering to ToastItemComponent instances.
 *
 * Change detection is set to OnPush to optimize rendering performance.
 */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastItemComponent],
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  /**
   * Supported toast positions rendered by the container.
   * Each position corresponds to a separate stack in the UI.
   */
  readonly positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ];

  /**
   * Returns all toasts for a specific screen position.
   *
   * @param position Target toast screen position.
   * @returns Array of toast notifications for the given position.
   */
  toastsFor(position: ToastPosition) {
    return this.toastService.toastsByPosition()[position] ?? [];
  }

  /**
   * TrackBy function used to optimize rendering of toast items.
   *
   * @param _ Index of the item in the list (unused).
   * @param toast Toast instance.
   * @returns Unique toast identifier.
   */
  trackById(_: number, toast: { id: string }) {
    return toast.id;
  }
}

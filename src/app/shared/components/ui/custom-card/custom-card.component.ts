/**
 * @file custom-card.component.ts
 * @description Standalone configurable card component supporting multiple visual variants,
 * layout options, and interaction modes including clickable actions and internal/external navigation.
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** Card color variants affecting background, border, and accent bar */
export type CardVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

/** Internal padding sizes for the card */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/** Shadow intensity for elevation and depth */
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';

/** Operational mode: static, internal link, or external link */
export type CardMode = 'default' | 'link-internal' | 'link-external';

/** Card corner radius sizes */
export type CardRadius = 'sm' | 'md' | 'lg';

/**
 * Standalone Angular component rendering a flexible, stylable card
 * with variants, padding, shadow, radius, accent bar, dark mode, and interactive modes
 * (clickable, internal link, external link).
 */
@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCardComponent {
  /**
   * Card color variant, affects background and accent bar.
   * 'default' renders a neutral white background.
   */
  @Input() variant: CardVariant = 'default';

  /** Internal padding of the card. */
  @Input() padding: CardPadding = 'md';

  /** Shadow intensity applied to the card. */
  @Input() shadow: CardShadow = 'md';

  /** Border radius of the card. */
  @Input() radius: CardRadius = 'md';

  /** If true, the card stretches to fill its container height. */
  @Input() stretchHeight: boolean = false;

  /** If true, a thin border is displayed. Default is true. */
  @Input() bordered: boolean = true;

  /** If true, displays a colored accent bar on the left side, based on variant. */
  @Input() accentBar: boolean = false;

  /** Applies a dark theme to the card. */
  @Input() darkTheme: boolean = false;

  /**
   * Defines the interaction behavior of the card, including whether it behaves as a static container,
   * an internal navigation element using Angular routing, or an external link using a standard URL.
   */
  @Input() mode: CardMode = 'default';

  /**
   * Enables interactive behavior on the card, including pointer cursor, hover feedback, and click emission
   * when the card is in default mode.
   */
  @Input() clickable: boolean = false;

  /**
   * If true, applies hover lift effect even if clickable=false.
   * Useful for visually interactive cards that aren't clickable.
   */
  @Input() hoverable: boolean = false;

  /** URL for 'link-internal' (Angular path) or 'link-external' (full URL). */
  @Input() href: string = '';

  /** Target for external links. Adds rel="noopener noreferrer" if '_blank'. */
  @Input() target: '_self' | '_blank' = '_self';

  /** ARIA label, recommended when clickable=true and visible text is not descriptive. */
  @Input() ariaLabel: string = '';

  /**
   * Emitted on click when mode='default' and clickable=true.
   * Use for function calls, opening modals, or other actions.
   */
  @Output() cardClick = new EventEmitter<MouseEvent>();

  /**
   * Determines if the card should behave as interactive based on its mode or the clickable input.
   *
   * @return {boolean} True if the card responds to user interaction either by being clickable or not in default mode.
   */
  get isInteractive(): boolean {
    return this.clickable || this.mode !== 'default';
  }

  /**
   * Computes the appropriate `rel` attribute for external links to ensure safe behavior when opening in a new tab.
   *
   * @return {string} "noopener noreferrer" if the card opens an external link in a new tab, otherwise an empty string.
   */
  get externalRel(): string {
    return this.target === '_blank' ? 'noopener noreferrer' : '';
  }

  /**
   * Generates a dictionary of CSS class flags based on the card's configuration, including
   * variant, padding, shadow, radius, borders, accent bars, hover/click behavior, stretch, and dark theme.
   *
   * @return {Record<string, boolean>} An object where keys are CSS class names and values indicate whether they should be applied.
   */
  get cardClasses(): Record<string, boolean> {
    return {
      card: true,
      [`card--${this.variant}`]: true,
      [`card--pad-${this.padding}`]: true,
      [`card--shadow-${this.shadow}`]: true,
      [`card--radius-${this.radius}`]: true,
      'card--bordered': this.bordered,
      'card--accent-bar': this.accentBar,
      'card--clickable': this.isInteractive,
      'card--hoverable': this.hoverable || this.isInteractive,
      'card--stretch': this.stretchHeight,
      'card--dark': this.darkTheme,
    };
  }

  /**
   * Handles user interaction with the card. Emits the `cardClick` event only if the card
   * is configured as clickable. Supports both mouse clicks and keyboard activation (Enter key).
   *
   * @param {Event} event The originating DOM event, either a MouseEvent or KeyboardEvent.
   * @return {void}
   */
  onClick(event: Event): void {
    if (!this.clickable) return;
    if (event instanceof KeyboardEvent) {
      this.cardClick.emit(new MouseEvent('click'));
    } else {
      this.cardClick.emit(event as MouseEvent);
    }
  }
}

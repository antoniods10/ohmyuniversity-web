/**
 * @file custom-text.component.ts
 * @description Flexible typography component that standardizes text rendering
 * across the application.
 * Supports multiple semantic HTML elements, design-system typography variants,
 * color tokens,
 * and layout modifiers such as alignment, truncation, wrapping, and
 * line clamping.
 */

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Defines the available typography variants mapped to design system styles.
 */
export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label'
  | 'overline'
  | 'code';

/**
 * Defines the semantic color palette tokens available for text styling.
 */
export type TextColor =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'white'
  | 'inherit';

/**
 * Defines font weight options aligned with the design system typography scale.
 */
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

/**
 * Defines text alignment options.
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

@Component({
  selector:
    'h1[appText], h2[appText], h3[appText], h4[appText], ' +
    'h5[appText], h6[appText], p[appText], span[appText], ' +
    'small[appText], label[appText], strong[appText], ' +
    'em[appText], blockquote[appText], div[appText], ' +
    'app-custom-text',
  standalone: true,
  template: '<ng-content />',
  styleUrls: ['./custom-text.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTextComponent {
  /** Visual typography variant (maps to design system scale) */
  @Input() variant: TextVariant = 'body';

  /** Semantic or brand color token */
  @Input() color: TextColor = 'default';

  /** Optional font weight override */
  @Input() weight: TextWeight | '' = '';

  /** Optional text alignment override */
  @Input() align: TextAlign | '' = '';

  /** Applies italic styling */
  @Input() italic: boolean = false;

  /** Applies underline decoration */
  @Input() underline: boolean = false;

  /** Enables text truncation (ellipsis) */
  @Input() truncate: boolean = false;

  /** Prevents line wrapping */
  @Input() noWrap: boolean = false;

  /** Applies gradient text styling (if supported by theme) */
  @Input() gradient: boolean = false;

  /** Forces dark theme styling variant */
  @Input() darkTheme: boolean = false;

  /** Limits number of visible lines using CSS line-clamp */
  @Input() lineClamp: number = 0;

  /**
   * Allows injecting additional custom CSS classes.
   * Use sparingly to avoid breaking design system consistency.
   */
  @Input() extraClass: string = '';

  /**
   * Computes host CSS classes based on component inputs.
   * This is the core mechanism that maps API → design system styles.
   */
  @HostBinding('class')
  get hostClasses(): string {
    const c: string[] = [
      'custom-text',
      `custom-text--${this.variant}`,
      `custom-text--color-${this.color}`,
    ];
    if (this.weight) c.push(`custom-text--weight-${this.weight}`);
    if (this.align) c.push(`custom-text--align-${this.align}`);
    if (this.italic) c.push('custom-text--italic');
    if (this.underline) c.push('custom-text--underline');
    if (this.truncate) c.push('custom-text--truncate');
    if (this.noWrap) c.push('custom-text--nowrap');
    if (this.gradient) c.push('custom-text--gradient');
    if (this.darkTheme) c.push('custom-text--dark');
    if (this.lineClamp > 0) c.push(`custom-text--clamp-${this.lineClamp}`);
    if (this.extraClass) c.push(this.extraClass);
    return c.join(' ');
  }
}

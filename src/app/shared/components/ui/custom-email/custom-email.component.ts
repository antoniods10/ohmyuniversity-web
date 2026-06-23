/**
 * @file custom-email.component.ts
 * @description Reusable mailto link component with optional leading icon,
 * consistent OMU styling, and automatic accessibility attributes.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideMail } from '@lucide/angular';

/**
 * Available visual variants for the email link.
 */
export type EmailVariant = 'primary' | 'secondary' | 'neutral' | 'ghost';

/**
 * Available sizes for the email link text and icon.
 */
export type EmailSize = 'sm' | 'md' | 'lg';

/**
 * Mailto link component used to render an email address consistently
 * across the application, with optional icon, subject/body prefill,
 * and accessible labeling.
 */
@Component({
  selector: 'app-custom-email',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  templateUrl: './custom-email.component.html',
  styleUrls: ['./custom-email.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomEmailComponent {
  readonly mailIcon = LucideMail;

  /**
   * Email address used to build the mailto link and as displayed text
   * when no custom label is provided.
   */
  @Input({ required: true }) email: string = '';

  /**
   * Optional custom label displayed instead of the raw email address.
   */
  @Input() label: string = '';

  /**
   * Optional subject prefilled in the mailto link.
   */
  @Input() subject: string = '';

  /**
   * Optional body prefilled in the mailto link.
   */
  @Input() body: string = '';

  /**
   * Visual variant applied to the link text and icon color.
   */
  @Input() variant: EmailVariant = 'primary';

  /**
   * Size applied to text and icon.
   */
  @Input() size: EmailSize = 'md';

  /**
   * Shows the leading mail icon.
   */
  @Input() showIcon: boolean = true;

  /**
   * Applies an underline on hover instead of always-on underline.
   */
  @Input() underline: boolean = true;

  /**
   * Returns the icon size in pixels according to the configured size.
   */
  get iconSize(): number {
    const map: Record<EmailSize, number> = { sm: 12, md: 14, lg: 16 };
    return map[this.size];
  }

  /**
   * Returns the text displayed inside the link.
   */
  get displayLabel(): string {
    return this.label || this.email;
  }

  /**
   * Builds the mailto href, including optional subject and body query params.
   */
  get mailtoHref(): string {
    const params = new URLSearchParams();
    if (this.subject) params.set('subject', this.subject);
    if (this.body) params.set('body', this.body);
    const query = params.toString();
    return `mailto:${this.email}${query ? '?' + query : ''}`;
  }

  /**
   * Builds the CSS class map applied to the link element.
   */
  get emailClasses(): Record<string, boolean> {
    return {
      'email-link': true,
      [`email-link--${this.variant}`]: true,
      [`email-link--${this.size}`]: true,
      'email-link--underline': this.underline,
    };
  }
}

/**
 * @file custom-link.component.ts
 * @description Reusable inline link component for standalone or in-text
 * references, supporting internal routing, external navigation, and an
 * optional trailing external-link icon.
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideDynamicIcon, LucideLink } from '@lucide/angular';

/**
 * Operating mode of the link.
 */
export type LinkMode = 'internal' | 'external';

/**
 * Available visual variants for the link text color.
 */
export type LinkVariant = 'primary' | 'secondary' | 'neutral' | 'ghost';

/**
 * Available sizes for the link text and icon.
 */
export type LinkSize = 'sm' | 'md' | 'lg';

/**
 * Inline link component used for standalone references or links embedded
 * within body text, such as "visit our GitHub" or "read the FAQ".
 */
@Component({
  selector: 'app-custom-link',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideDynamicIcon],
  templateUrl: './custom-link.component.html',
  styleUrls: ['./custom-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLinkComponent {
  readonly externalIcon = LucideLink;

  /**
   * Destination of the link. Used as routerLink when mode is 'internal',
   * or as href when mode is 'external'.
   */
  @Input({ required: true }) href: string = '';

  /**
   * Text displayed inside the link.
   */
  @Input() label: string = '';

  /**
   * Operating mode of the link.
   */
  @Input() mode: LinkMode = 'internal';

  /**
   * Navigation target used for external links.
   */
  @Input() target: '_self' | '_blank' = '_blank';

  /**
   * Visual variant applied to the link text color.
   */
  @Input() variant: LinkVariant = 'primary';

  /**
   * Size applied to text and icon.
   */
  @Input() size: LinkSize = 'md';

  /**
   * Shows the trailing external-link icon. Defaults to true for external
   * links and is ignored for internal links.
   */
  @Input() showExternalIcon: boolean = true;

  /**
   * Returns the icon size in pixels according to the configured size.
   */
  get iconSize(): number {
    const map: Record<LinkSize, number> = { sm: 11, md: 13, lg: 15 };
    return map[this.size];
  }

  /**
   * Indicates whether the trailing external icon should be rendered.
   */
  get displayExternalIcon(): boolean {
    return this.mode === 'external' && this.showExternalIcon;
  }

  /**
   * Returns the appropriate rel attribute for external links opened in a
   * new tab, preventing reverse tabnabbing.
   */
  get externalRel(): string {
    return this.target === '_blank' ? 'noopener noreferrer' : '';
  }

  /**
   * Builds the CSS class map applied to the link element.
   */
  get linkClasses(): Record<string, boolean> {
    return {
      'inline-link': true,
      [`inline-link--${this.variant}`]: true,
      [`inline-link--${this.size}`]: true,
    };
  }
}

/**
 * @file card-components.ts
 * @description
 * This file contains a collection of reusable Angular standalone UI card components built on top of
 * CustomCardComponent. The components provide multiple presentation patterns for displaying content
 * such as simple cards, minimal layouts, statistics, status indicators, reviews, team members, and
 * navigation entries.
 *
 * Each component is designed with a consistent design system, supporting variants, padding, shadows,
 * dark mode, and interaction modes (clickable, hoverable, and link-based navigation).
 *
 * Components included:
 * - CardSimpleComponent: lightweight card with icon, title, and body text
 * - CardMinimalComponent: compact horizontal card for dense layouts
 * - CardStatComponent: statistic-focused card with optional trend indicator
 * - CardStatusComponent: status/feedback card for system states (success, warning, error, info)
 * - CardReviewComponent: testimonial/review card with rating and reviewer details
 * - CardTeamComponent: team member card with avatar, role, and description
 * - CardNavComponent: navigation card with icon, title, subtitle, and arrow indicator
 *
 * These components rely on shared UI primitives such as CustomCardComponent, CustomAvatarComponent,
 * CustomBadgeComponent, and Lucide icons, ensuring design consistency across the application.
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon, LucideArrowRight } from '@lucide/angular';
import {
  CustomCardComponent,
  CardVariant,
  CardPadding,
  CardShadow,
  CardMode,
} from './custom-card.component';
import { CustomAvatarComponent } from '../custom-avatar/custom-avatar.component';
import { CustomBadgeComponent } from '../custom-badge/custom-badge.component';

/**
 * Represents the possible status variants for a card.
 */
export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

/**
 * Represents a reviewer associated with a card, including name, university, and optional avatar.
 */
export interface CardReviewer {
  name: string;
  university: string;
  avatarSrc?: string;
}

/**
 * Represents a team member associated with a card, including name, role, and optional avatar.
 */
export interface CardTeamMember {
  name: string;
  role: string;
  avatarSrc?: string;
}

/**
 * Represents a trend for a statistic, including direction and displayed value.
 */
export interface StatTrend {
  direction: 'up' | 'down' | 'neutral';
  value: string;
}

/**
 * @brief Card Simple Component
 * @description Lightweight presentation card component built on top of CustomCardComponent,
 * providing a simplified API for displaying icon, title, body content, and projected content.
 */
@Component({
  selector: 'app-card-simple',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card
      [variant]="variant"
      [padding]="padding"
      [shadow]="shadow"
      [bordered]="bordered"
      [hoverable]="hoverable"
      [clickable]="clickable"
      [mode]="mode"
      [href]="href"
      [stretchHeight]="stretchHeight"
      [darkTheme]="darkTheme"
      [accentBar]="accentBar"
      (cardClick)="cardClick.emit($event)">
      <div class="card-simple">
        @if (icon) {
          <div class="card-simple__icon-wrap" [class]="'card-simple__icon-wrap--' + variant">
            <svg [lucideIcon]="icon" [size]="iconSize" aria-hidden="true"></svg>
          </div>
        }
        @if (title) {
          <h3 class="card-simple__title" [class]="darkTheme ? 'card-simple__title--dark' : ''">
            {{ title }}
          </h3>
        }
        @if (body) {
          <p class="card-simple__body" [class]="darkTheme ? 'card-simple__body--dark' : ''">
            {{ body }}
          </p>
        }
        <ng-content />
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .card-simple {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        height: 100%;
      }
      .card-simple__icon-wrap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-dark));
        color: var(--color-primary-text);
      }
      .card-simple__icon-wrap--secondary {
        background: linear-gradient(
          135deg,
          var(--color-secondary-light),
          var(--color-secondary-dark)
        );
        color: var(--color-secondary-text);
      }
      .card-simple__icon-wrap--tertiary {
        background: linear-gradient(
          135deg,
          var(--color-tertiary-light),
          var(--color-tertiary-dark)
        );
        color: var(--color-tertiary-text);
      }
      .card-simple__icon-wrap--success {
        background: linear-gradient(135deg, var(--color-success-light), var(--color-success-dark));
        color: var(--color-success-text);
      }
      .card-simple__icon-wrap--warning {
        background: linear-gradient(135deg, var(--color-warning-light), var(--color-warning-dark));
        color: var(--color-warning-text);
      }
      .card-simple__icon-wrap--error {
        background: linear-gradient(135deg, var(--color-error-light), var(--color-error-dark));
        color: var(--color-error-text);
      }
      .card-simple__icon-wrap--info {
        background: linear-gradient(135deg, var(--color-info-light), var(--color-info-dark));
        color: var(--color-info-text);
      }
      .card-simple__icon-wrap--neutral {
        background: var(--color-neutral-200);
        color: var(--color-neutral-500);
      }
      .card-simple__title {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-neutral-900);
        line-height: 1.3;
      }
      .card-simple__title--dark {
        color: var(--color-neutral-100);
      }
      .card-simple__body {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-neutral-500);
        line-height: 1.6;
      }
      .card-simple__body--dark {
        color: var(--color-neutral-400);
      }
    `,
  ],
})
export class CardSimpleComponent {
  /** Icon displayed in the card header (usually Lucide or SVG definition). */
  @Input() icon?: any;

  /** Size of the icon in pixels. */
  @Input() iconSize: number = 22;

  /** Main title text displayed in the card. */
  @Input() title: string = '';

  /** Secondary descriptive text displayed below the title. */
  @Input() body: string = '';

  /** Visual style variant applied to the card. */
  @Input() variant: CardVariant = 'default';

  /** Internal padding of the card content. */
  @Input() padding: CardPadding = 'md';

  /** Shadow intensity applied to the card. */
  @Input() shadow: CardShadow = 'md';

  /** Whether a border is rendered around the card. */
  @Input() bordered: boolean = true;

  /** Enables hover interaction styling. */
  @Input() hoverable: boolean = false;

  /** Enables click interaction behavior. */
  @Input() clickable: boolean = false;

  /** Displays a colored accent bar on the card. */
  @Input() accentBar: boolean = false;

  /** Defines navigation or interaction mode of the card. */
  @Input() mode: CardMode = 'default';

  /** URL used when the card acts as a link. */
  @Input() href: string = '';

  /** Forces the card to stretch to fill its container height. */
  @Input() stretchHeight: boolean = false;

  /** Applies dark theme styling to the card. */
  @Input() darkTheme: boolean = false;

  /** Event emitted when the card is clicked in interactive mode. */
  @Output() cardClick = new EventEmitter<MouseEvent>();
}

/**
 * @brief Card Minimal Component
 * @description Compact card component built on top of CustomCardComponent,
 * optimized for dense layouts with optional icon, title, subtitle, and projected content.
 */
@Component({
  selector: 'app-card-minimal',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card
      [variant]="variant"
      [padding]="padding"
      [shadow]="shadow"
      [bordered]="bordered"
      [hoverable]="hoverable"
      [clickable]="clickable"
      [mode]="mode"
      [href]="href"
      [stretchHeight]="stretchHeight"
      [darkTheme]="darkTheme"
      (cardClick)="cardClick.emit($event)">
      <div class="card-minimal" [class.card-minimal--with-icon]="!!icon">
        @if (icon) {
          <div class="card-minimal__icon" [class]="'card-minimal__icon--' + variant">
            <svg [lucideIcon]="icon" [size]="iconSize" aria-hidden="true"></svg>
          </div>
        }
        <div class="card-minimal__text">
          @if (title) {
            <span class="card-minimal__title" [class.card-minimal__title--dark]="darkTheme">
              {{ title }}
            </span>
          }
          @if (subtitle) {
            <span class="card-minimal__subtitle" [class.card-minimal__subtitle--dark]="darkTheme">
              {{ subtitle }}
            </span>
          }
          <ng-content />
        </div>
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .card-minimal {
        display: flex;
        align-items: center;
        gap: 0;
      }
      .card-minimal--with-icon {
        gap: 1rem;
      }
      .card-minimal__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 10px;
        flex-shrink: 0;
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-dark));
        color: var(--color-primary-text);
      }
      .card-minimal__icon--secondary {
        background: linear-gradient(
          135deg,
          var(--color-secondary-light),
          var(--color-secondary-dark)
        );
        color: var(--color-secondary-text);
      }
      .card-minimal__icon--success {
        background: linear-gradient(135deg, var(--color-success-light), var(--color-success-dark));
        color: var(--color-success-text);
      }
      .card-minimal__icon--warning {
        background: linear-gradient(135deg, var(--color-warning-light), var(--color-warning-dark));
        color: var(--color-warning-text);
      }
      .card-minimal__icon--error {
        background: linear-gradient(135deg, var(--color-error-light), var(--color-error-dark));
        color: var(--color-error-text);
      }
      .card-minimal__icon--info {
        background: linear-gradient(135deg, var(--color-info-light), var(--color-info-dark));
        color: var(--color-info-text);
      }
      .card-minimal__icon--neutral {
        background: var(--color-neutral-200);
        color: var(--color-neutral-500);
      }
      .card-minimal__text {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        min-width: 0;
      }
      .card-minimal__title {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--color-neutral-900);
        line-height: 1.3;
      }
      .card-minimal__subtitle {
        font-size: 0.82rem;
        color: var(--color-neutral-500);
        line-height: 1.4;
      }
      .card-minimal__title--dark {
        color: var(--color-neutral-100);
      }
      .card-minimal__subtitle--dark {
        color: var(--color-neutral-400);
      }
    `,
  ],
})
export class CardMinimalComponent {
  /** Icon displayed in the card, typically a Lucide or SVG icon definition. */
  @Input() icon?: any;

  /** Size of the icon in pixels. */
  @Input() iconSize: number = 20;

  /** Main title text displayed in the card. */
  @Input() title: string = '';

  /** Secondary subtitle text displayed below the title. */
  @Input() subtitle: string = '';

  /** Visual variant that defines the card’s color scheme. */
  @Input() variant: CardVariant = 'default';

  /** Internal padding applied to the card content. */
  @Input() padding: CardPadding = 'md';

  /** Shadow level defining card elevation. */
  @Input() shadow: CardShadow = 'md';

  /** Enables or disables the card border. */
  @Input() bordered: boolean = true;

  /** Enables hover interaction styling. */
  @Input() hoverable: boolean = false;

  /** Enables click interaction behavior. */
  @Input() clickable: boolean = false;

  /** Defines the navigation or interaction mode of the card. */
  @Input() mode: CardMode = 'default';

  /** URL used when the card behaves as a link. */
  @Input() href: string = '';

  /** Forces the card to stretch to fill its container height. */
  @Input() stretchHeight: boolean = false;

  /** Applies dark theme styling to the card. */
  @Input() darkTheme: boolean = false;

  /** Event emitted when the card is clicked in interactive mode. */
  @Output() cardClick = new EventEmitter<MouseEvent>();
}

/**
 * @brief CardStatComponent
 * @description A specialized card for displaying a single statistic with optional icon, prefix/suffix,
 * label, and trend indicator. Supports variant colors, padding, shadows, accent bars,
 * and dark theme styling.
 */
@Component({
  selector: 'app-card-stat',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card
      [variant]="variant"
      [padding]="padding"
      [shadow]="shadow"
      [bordered]="bordered"
      [stretchHeight]="stretchHeight"
      [darkTheme]="darkTheme"
      [accentBar]="accentBar">
      <div class="card-stat">
        @if (icon) {
          <div class="card-stat__icon" [class]="'card-stat__icon--' + variant">
            <svg [lucideIcon]="icon" [size]="20" aria-hidden="true"></svg>
          </div>
        }
        <div class="card-stat__value-row">
          @if (prefix) {
            <span class="card-stat__prefix" [class.card-stat__prefix--dark]="darkTheme">{{
              prefix
            }}</span>
          }
          <span class="card-stat__value" [class.card-stat__value--dark]="darkTheme">{{
            value
          }}</span>
          @if (suffix) {
            <span class="card-stat__suffix" [class.card-stat__suffix--dark]="darkTheme">{{
              suffix
            }}</span>
          }
        </div>
        <span class="card-stat__label" [class.card-stat__label--dark]="darkTheme">{{ label }}</span>
        @if (trend) {
          <span class="card-stat__trend" [class]="'card-stat__trend--' + trend.direction">
            {{ trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→' }}
            {{ trend.value }}
          </span>
        }
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .card-stat {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .card-stat__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-bottom: 0.25rem;
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-dark));
        color: var(--color-primary-text);
      }
      .card-stat__icon--secondary {
        background: linear-gradient(
          135deg,
          var(--color-secondary-light),
          var(--color-secondary-dark)
        );
        color: var(--color-secondary-text);
      }
      .card-stat__icon--success {
        background: linear-gradient(135deg, var(--color-success-light), var(--color-success-dark));
        color: var(--color-success-text);
      }
      .card-stat__icon--info {
        background: linear-gradient(135deg, var(--color-info-light), var(--color-info-dark));
        color: var(--color-info-text);
      }
      .card-stat__icon--neutral {
        background: var(--color-neutral-200);
        color: var(--color-neutral-500);
      }
      .card-stat__value-row {
        display: flex;
        align-items: baseline;
        gap: 0.2rem;
      }
      .card-stat__value {
        font-size: 2.2rem;
        font-weight: 800;
        color: var(--color-neutral-900);
        line-height: 1;
      }
      .card-stat__value--dark {
        color: var(--color-neutral-100);
      }
      .card-stat__prefix,
      .card-stat__suffix {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--color-neutral-500);
      }
      .card-stat__prefix--dark,
      .card-stat__suffix--dark {
        color: var(--color-neutral-400);
      }
      .card-stat__label {
        font-size: 0.82rem;
        font-weight: 500;
        color: var(--color-neutral-500);
      }
      .card-stat__label--dark {
        color: var(--color-neutral-400);
      }
      .card-stat__trend {
        font-size: 0.78rem;
        font-weight: 700;
      }
      .card-stat__trend--up {
        color: var(--color-success-dark);
      }
      .card-stat__trend--down {
        color: var(--color-error-dark);
      }
      .card-stat__trend--neutral {
        color: var(--color-neutral-400);
      }
    `,
  ],
})
export class CardStatComponent {
  /** The main numeric or textual value to display in the card. Defaults to '0'. */
  @Input() value: string = '0';

  /** Descriptive label explaining the statistic (e.g., "Revenue", "Users"). */
  @Input() label: string = '';

  /** Optional text displayed before the main value, such as a currency symbol or unit. */
  @Input() prefix: string = '';

  /** Optional text displayed after the main value, such as a percentage sign or unit. */
  @Input() suffix: string = '';

  /** Optional icon to visually represent the statistic, displayed above the value. */
  @Input() icon?: any;

  /** Optional trend information indicating whether the value is increasing, decreasing, or stable. */
  @Input() trend?: StatTrend;

  /** Visual style variant of the card, affecting colors. Defaults to 'default'. */
  @Input() variant: CardVariant = 'default';

  /** Internal padding of the card content. Defaults to 'md'. */
  @Input() padding: CardPadding = 'md';

  /** Shadow intensity of the card. Defaults to 'md'. */
  @Input() shadow: CardShadow = 'md';

  /** If true, the card displays a border. Defaults to true. */
  @Input() bordered: boolean = true;

  /** If true, displays a colored accent bar along the left side. Defaults to false. */
  @Input() accentBar: boolean = false;

  /** If true, the card stretches to fill the height of its container. Defaults to false. */
  @Input() stretchHeight: boolean = false;

  /** Enables dark theme styling for text and elements. Defaults to false. */
  @Input() darkTheme: boolean = false;
}

/**
 * @brief Card Status Component
 * @description Visual component that displays a status-oriented card with an icon, title and optional description.
 * It is built on top of CustomCardComponent and mainly used to represent system states or outcomes
 * such as success, warning, error or informational messages in a compact layout.
 */
@Component({
  selector: 'app-card-status',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card
      [variant]="statusVariant"
      [padding]="padding"
      [shadow]="shadow"
      [bordered]="bordered"
      [stretchHeight]="stretchHeight"
      [darkTheme]="darkTheme"
      [accentBar]="true"
      [hoverable]="hoverable"
      [clickable]="clickable"
      (cardClick)="cardClick.emit($event)">
      <div class="card-status">
        <div class="card-status__icon-col">
          <div class="card-status__icon" [class]="'card-status__icon--' + statusVariant">
            @if (icon) {
              <svg [lucideIcon]="icon" [size]="18" aria-hidden="true"></svg>
            }
          </div>
        </div>
        <div class="card-status__content">
          @if (title) {
            <span class="card-status__title" [class.card-status__title--dark]="darkTheme">{{
              title
            }}</span>
          }
          @if (description) {
            <span class="card-status__desc" [class.card-status__desc--dark]="darkTheme">{{
              description
            }}</span>
          }
          <ng-content />
        </div>
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .card-status {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
      }
      .card-status__icon-col {
        flex-shrink: 0;
        padding-top: 0.1rem;
      }
      .card-status__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--color-success-light), var(--color-success-dark));
        color: var(--color-success-text);
      }
      .card-status__icon--warning {
        background: linear-gradient(135deg, var(--color-warning-light), var(--color-warning-dark));
        color: var(--color-warning-text);
      }
      .card-status__icon--error {
        background: linear-gradient(135deg, var(--color-error-light), var(--color-error-dark));
        color: var(--color-error-text);
      }
      .card-status__icon--info {
        background: linear-gradient(135deg, var(--color-info-light), var(--color-info-dark));
        color: var(--color-info-text);
      }
      .card-status__icon--neutral {
        background: var(--color-neutral-200);
        color: var(--color-neutral-500);
      }
      .card-status__content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
        min-width: 0;
      }
      .card-status__title {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--color-neutral-900);
        line-height: 1.3;
      }
      .card-status__title--dark {
        color: var(--color-neutral-100);
      }
      .card-status__desc {
        font-size: 0.82rem;
        color: var(--color-neutral-500);
        line-height: 1.5;
      }
      .card-status__desc--dark {
        color: var(--color-neutral-400);
      }
    `,
  ],
})
export class CardStatusComponent {
  /** Defines the color/status variant of the card (success, warning, error, info, neutral). */
  @Input() statusVariant: StatusVariant = 'success';

  /** Optional icon displayed in the status card. Accepts a Lucide icon. */
  @Input() icon?: any;

  /** Main title of the card, typically a short text representing the status. */
  @Input() title: string = '';

  /** Optional description providing additional context for the status. */
  @Input() description: string = '';

  /** Padding size inside the card. */
  @Input() padding: CardPadding = 'md';

  /** Shadow intensity of the card. */
  @Input() shadow: CardShadow = 'md';

  /** If true, displays a border around the card. */
  @Input() bordered: boolean = true;

  /** If true, card will show a subtle hover effect even if not clickable. */
  @Input() hoverable: boolean = false;

  /** If true, card becomes clickable and emits (cardClick) events. */
  @Input() clickable: boolean = false;

  /** If true, card stretches to fill the height of its container. */
  @Input() stretchHeight: boolean = false;

  /** Enables dark theme styling when set to true. */
  @Input() darkTheme: boolean = false;

  /** Emits a MouseEvent when the card is clicked and clickable=true. */
  @Output() cardClick = new EventEmitter<MouseEvent>();
}

/**
 * @brief Card Review Component
 * @description Review card component used to display user feedback with rating, text content,
 * and reviewer information such as name, university, and optional avatar.
 * It is designed for testimonial or social proof sections with a compact layout
 * and optional visual enhancements like star rating and verified badge.
 */
@Component({
  selector: 'app-card-review',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, CustomAvatarComponent, LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card
      [padding]="padding"
      [shadow]="shadow"
      [bordered]="bordered"
      [stretchHeight]="stretchHeight"
      [darkTheme]="darkTheme"
      [hoverable]="hoverable">
      <div class="card-review">
        <!-- Star rating -->
        <div class="card-review__stars" [attr.aria-label]="rating + ' stelle su 5'">
          @for (s of starsArray; track $index) {
            <span
              class="card-review__star"
              [class.card-review__star--full]="s === 'full'"
              [class.card-review__star--half]="s === 'half'"
              >★</span
            >
          }
          @if (showRatingNumber) {
            <span
              class="card-review__rating-num"
              [class.card-review__rating-num--dark]="darkTheme"
              >{{ rating }}</span
            >
          }
        </div>
        <!-- Testo recensione -->
        <p class="card-review__body" [class.card-review__body--dark]="darkTheme">"{{ body }}"</p>
        <!-- Reviewer -->
        <div class="card-review__reviewer">
          <app-custom-avatar
            [name]="reviewer.name"
            [src]="reviewer.avatarSrc ?? ''"
            variant="primary"
            size="sm"
            shape="circle" />
          <div class="card-review__reviewer-info">
            <span
              class="card-review__reviewer-name"
              [class.card-review__reviewer-name--dark]="darkTheme">
              {{ reviewer.name }}
              @if (verified) {
                <span class="card-review__verified">✓</span>
              }
            </span>
            <span
              class="card-review__reviewer-uni"
              [class.card-review__reviewer-uni--dark]="darkTheme">
              {{ reviewer.university }}
            </span>
          </div>
        </div>
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .card-review {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        height: 100%;
      }
      .card-review__stars {
        display: flex;
        align-items: center;
        gap: 0.15rem;
      }
      .card-review__star {
        font-size: 1.1rem;
        color: var(--color-neutral-300);
      }
      .card-review__star--full {
        color: var(--color-warning-dark);
      }
      .card-review__star--half {
        color: var(--color-warning-dark);
        opacity: 0.5;
      }
      .card-review__rating-num {
        margin-left: 0.35rem;
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--color-neutral-500);
      }
      .card-review__rating-num--dark {
        color: var(--color-neutral-400);
      }
      .card-review__body {
        margin: 0;
        flex: 1;
        font-size: 0.88rem;
        color: var(--color-neutral-600);
        line-height: 1.6;
        font-style: italic;
      }
      .card-review__body--dark {
        color: var(--color-neutral-300);
      }
      .card-review__reviewer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: auto;
      }
      .card-review__reviewer-info {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        min-width: 0;
      }
      .card-review__reviewer-name {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--color-neutral-800);
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }
      .card-review__reviewer-name--dark {
        color: var(--color-neutral-200);
      }
      .card-review__reviewer-uni {
        font-size: 0.75rem;
        color: var(--color-neutral-500);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .card-review__reviewer-uni--dark {
        color: var(--color-neutral-400);
      }
      .card-review__verified {
        color: var(--color-success-dark);
        font-size: 0.75rem;
      }
    `,
  ],
})
export class CardReviewComponent {
  /** Rating value from 0 to 5 used to render the star rating. */
  @Input() rating: number = 5;

  /** Main review text content displayed inside the card. */
  @Input() body: string = '';

  /** Reviewer information including name, university and optional avatar. */
  @Input() reviewer!: CardReviewer;

  /** Indicates whether the reviewer is verified (shows a checkmark badge). */
  @Input() verified: boolean = false;

  /** If true, displays the numeric rating next to the star visualization. */
  @Input() showRatingNumber: boolean = true;

  /** Internal padding of the card content. */
  @Input() padding: CardPadding = 'md';

  /** Shadow intensity applied to the card container. */
  @Input() shadow: CardShadow = 'md';

  /** If true, renders a border around the card. */
  @Input() bordered: boolean = true;

  /** Enables hover visual effect for the card. */
  @Input() hoverable: boolean = false;

  /** If true, the card expands to fill the height of its container. */
  @Input() stretchHeight: boolean = false;

  /** Enables dark theme styling for the card. */
  @Input() darkTheme: boolean = false;

  /**
   * Generates a fixed 5-element array representing the star rating.
   *
   * @returns An array of 5 star states based on the current rating value.
   */
  get starsArray(): ('full' | 'half' | 'empty')[] {
    return Array.from({ length: 5 }, (_, i) => {
      if (i + 1 <= Math.floor(this.rating)) return 'full';
      if (i < this.rating) return 'half';
      return 'empty';
    });
  }
}

/**
 * @brief Card Team Component
 * @description Card component that displays a team member with avatar, name, role and optional description.
 * Uses CustomCardComponent as base wrapper and supports projected content.
 */
@Component({
  selector: 'app-card-team',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, CustomAvatarComponent, CustomBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card
      [padding]="padding"
      [shadow]="shadow"
      [bordered]="bordered"
      [stretchHeight]="stretchHeight"
      [darkTheme]="darkTheme"
      [hoverable]="hoverable">
      <div class="card-team">
        <div class="card-team__header">
          <app-custom-avatar
            [name]="member.name"
            [src]="member.avatarSrc ?? ''"
            variant="primary"
            size="md"
            shape="circle" />
          <div class="card-team__header-info">
            <span class="card-team__name" [class.card-team__name--dark]="darkTheme">{{
              member.name
            }}</span>
            <span class="card-team__role" [class.card-team__role--dark]="darkTheme">{{
              member.role
            }}</span>
          </div>
        </div>
        @if (description) {
          <p class="card-team__desc" [class.card-team__desc--dark]="darkTheme">{{ description }}</p>
        }
        <ng-content />
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .card-team {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
      }
      .card-team__header {
        display: flex;
        align-items: center;
        gap: 0.85rem;
      }
      .card-team__header-info {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        min-width: 0;
      }
      .card-team__name {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--color-neutral-900);
      }
      .card-team__name--dark {
        color: var(--color-neutral-100);
      }
      .card-team__role {
        font-size: 0.78rem;
        color: var(--color-neutral-500);
      }
      .card-team__role--dark {
        color: var(--color-neutral-400);
      }
      .card-team__desc {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-neutral-500);
        line-height: 1.6;
        flex: 1;
      }
      .card-team__desc--dark {
        color: var(--color-neutral-400);
      }
    `,
  ],
})
export class CardTeamComponent {
  /** The team member to display, including name, role, and optional avatar */
  @Input() member!: CardTeamMember;

  /** Optional description text shown below the member header */
  @Input() description: string = '';

  /** Card padding size */
  @Input() padding: CardPadding = 'md';

  /** Card shadow intensity */
  @Input() shadow: CardShadow = 'md';

  /** Whether the card has a border */
  @Input() bordered: boolean = true;

  /** Enables hover visual effect */
  @Input() hoverable: boolean = false;

  /** Makes the card stretch to fill its container height */
  @Input() stretchHeight: boolean = false;

  /** Enables dark theme styling for the card */
  @Input() darkTheme: boolean = false;
}

/**
 * @brief Card Navigation Component
 * @description Navigation card with icon, title and optional subtitle.
 * Supports clickable behavior and link navigation (internal/external).
 */
@Component({
  selector: 'app-card-nav',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-custom-card
      [variant]="variant"
      [padding]="padding"
      [shadow]="shadow"
      [bordered]="bordered"
      [hoverable]="true"
      [clickable]="mode === 'default'"
      [mode]="mode"
      [href]="href"
      [target]="target"
      [stretchHeight]="stretchHeight"
      [darkTheme]="darkTheme"
      (cardClick)="cardClick.emit($event)">
      <div class="card-nav">
        <div class="card-nav__left">
          @if (icon) {
            <div class="card-nav__icon" [class]="'card-nav__icon--' + variant">
              <svg [lucideIcon]="icon" [size]="20" aria-hidden="true"></svg>
            </div>
          }
          <div class="card-nav__text">
            <span class="card-nav__title" [class.card-nav__title--dark]="darkTheme">{{
              title
            }}</span>
            @if (subtitle) {
              <span class="card-nav__subtitle" [class.card-nav__subtitle--dark]="darkTheme">{{
                subtitle
              }}</span>
            }
          </div>
        </div>
        <div class="card-nav__arrow" [class.card-nav__arrow--dark]="darkTheme">
          <svg [lucideIcon]="iconArrow" [size]="20" aria-hidden="true"></svg>
        </div>
      </div>
    </app-custom-card>
  `,
  styles: [
    `
      .card-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .card-nav__left {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        flex: 1;
        min-width: 0;
      }
      .card-nav__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 10px;
        flex-shrink: 0;
        background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-dark));
        color: var(--color-primary-text);
      }
      .card-nav__icon--secondary {
        background: linear-gradient(
          135deg,
          var(--color-secondary-light),
          var(--color-secondary-dark)
        );
        color: var(--color-secondary-text);
      }
      .card-nav__icon--success {
        background: linear-gradient(135deg, var(--color-success-light), var(--color-success-dark));
        color: var(--color-success-text);
      }
      .card-nav__icon--info {
        background: linear-gradient(135deg, var(--color-info-light), var(--color-info-dark));
        color: var(--color-info-text);
      }
      .card-nav__icon--neutral {
        background: var(--color-neutral-200);
        color: var(--color-neutral-500);
      }
      .card-nav__text {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        min-width: 0;
      }
      .card-nav__title {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--color-neutral-900);
      }
      .card-nav__title--dark {
        color: var(--color-neutral-100);
      }
      .card-nav__subtitle {
        font-size: 0.8rem;
        color: var(--color-neutral-500);
      }
      .card-nav__subtitle--dark {
        color: var(--color-neutral-400);
      }
      .card-nav__arrow {
        color: var(--color-neutral-400);
        flex-shrink: 0;
        transition:
          transform var(--transition-base, 200ms cubic-bezier(0.4, 0, 0.2, 1)),
          color var(--transition-base, 200ms cubic-bezier(0.4, 0, 0.2, 1));
      }
      .card-nav__arrow--dark {
        color: var(--color-neutral-500);
      }
      :host:hover .card-nav__arrow {
        transform: translateX(6px);
        color: var(--color-primary-dark);
      }
    `,
  ],
})
export class CardNavComponent {
  /** Icon used for the right arrow indicator */
  readonly iconArrow = LucideArrowRight;

  /** Main title displayed in the card */
  @Input() title: string = '';

  /** Optional subtitle displayed below the title */
  @Input() subtitle: string = '';

  /** Leading icon displayed on the left side of the card */
  @Input() icon?: any;

  /** Visual variant that controls color styling */
  @Input() variant: CardVariant = 'default';

  /** Padding size of the card */
  @Input() padding: CardPadding = 'md';

  /** Shadow intensity of the card */
  @Input() shadow: CardShadow = 'md';

  /** Whether the card has a border */
  @Input() bordered: boolean = true;

  /** Navigation mode (default click, internal or external link) */
  @Input() mode: CardMode = 'default';

  /** Navigation URL used for links */
  @Input() href: string = '';

  /** Target behavior for external links */
  @Input() target: '_self' | '_blank' = '_self';

  /** If true, the card fills the height of its container */
  @Input() stretchHeight: boolean = false;

  /** Enables dark theme styling */
  @Input() darkTheme: boolean = false;

  /** Emits when the card is clicked in default mode */
  @Output() cardClick = new EventEmitter<MouseEvent>();
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { WidgetSize } from '@shared/types';

export type WidgetBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'app-dashboard-widget-card',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, LucideDynamicIcon],
  templateUrl: './dashboard-widget-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetCardComponent {
  @Input() size: WidgetSize = 'medium';
  @Input() sectionIcon: any = null;
  @Input() sectionLabel: string = '';
  @Input() widgetLabel: string = '';
  @Input() badgeLabel: string = '';
  @Input() badgeVariant: WidgetBadgeVariant = 'primary';
  @Input() hideBadge: boolean = false;
  @Input() color: string = '';

  get iconSize(): number {
    return this.size === 'small' ? 12 : 14;
  }

  get cardStyle(): string {
    if (!this.color)
      return 'border: 2px solid #e2e5ea; background: white; height: 100%; box-shadow: 0 4px 16px 0 rgba(0,0,0,0.07); border-radius: 1rem;';
    return `
    border: 2px solid var(--color-${this.color}-dark);
    background: linear-gradient(to top left, white 0%, var(--color-${this.color}-bg) 100%);
    box-shadow: 0 8px 32px 0 var(--color-${this.color}-shadow, rgba(0,0,0,0.15));
    height: 100%;
    border-radius: 1rem;
  `;
  }

  get headerIconStyle(): string {
    if (!this.color) return 'color: var(--color-primary-dark)';
    return `color: var(--color-${this.color}-dark)`;
  }

  get sectionLabelStyle(): string {
    if (!this.color) return 'color: var(--color-primary-dark)';
    return `color: var(--color-${this.color}-dark)`;
  }
}

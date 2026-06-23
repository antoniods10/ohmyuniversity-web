import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideCalendarDays } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_TODAY_EVENTS, EVENT_TYPE_COLOR } from '@shared/data/mock/dashboard-agenda.mock';

@Component({
  selector: 'app-agenda-today-widget',
  standalone: true,
  imports: [CustomTextComponent, CustomLinkComponent, DashboardWidgetCardComponent],
  templateUrl: './agenda-today.widget.html',
})
export class AgendaTodayWidgetComponent {
  @Input() size: WidgetSize = 'medium';

  readonly lucideCalendar = LucideCalendarDays;
  readonly todayEvents = MOCK_TODAY_EVENTS;
  readonly eventTypeColor = EVENT_TYPE_COLOR;

  readonly today = new Date();
  readonly todayDay = this.today.getDate();
  readonly todayLabel = this.today.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  getEventColor(type: string): string {
    return (
      this.eventTypeColor[type as keyof typeof this.eventTypeColor] ?? 'var(--color-neutral-400)'
    );
  }
}

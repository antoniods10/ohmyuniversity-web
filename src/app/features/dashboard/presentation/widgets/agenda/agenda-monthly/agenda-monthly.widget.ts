import { Component, Input, computed } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucideCalendarDays } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_MONTHLY_EVENTS } from '@shared/data/mock/dashboard-agenda.mock';

@Component({
  selector: 'app-agenda-monthly-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './agenda-monthly.widget.html',
})
export class AgendaMonthlyWidgetComponent {
  @Input() size: WidgetSize = 'large';

  readonly lucideCalendar = LucideCalendarDays;
  readonly monthlyEvents = MOCK_MONTHLY_EVENTS;

  readonly today = new Date();
  readonly todayDay = this.today.getDate();
  readonly currentMonth = this.today.toLocaleDateString('it-IT', {
    month: 'long',
    year: 'numeric',
  });

  readonly calendarData = computed(() => {
    const year = this.today.getFullYear();
    const month = this.today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const offset = (firstDay + 6) % 7;
    return { offset, totalDays };
  });

  hasEvent(day: number): boolean {
    return !!this.monthlyEvents[day];
  }

  isToday(day: number): boolean {
    return day === this.todayDay;
  }
}

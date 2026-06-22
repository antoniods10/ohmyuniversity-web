import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import type { CalendarEvent } from '@shared/types/dashboard/calendar.types';
import {
  calendarEventTypeVariant,
  calendarIsSameDay,
  calendarMonthGridDays,
  calendarMonthLabel,
  type CalendarEventVariant,
  type CalendarMonthGridDay,
} from '@shared/utils/calendar.utils';

interface CalendarYearGridDay extends CalendarMonthGridDay {
  isToday: boolean;
  isWeekend: boolean;
  dotVariant: CalendarEventVariant | null;
}

interface CalendarYearMonth {
  date: Date;
  label: string;
  days: CalendarYearGridDay[];
}

@Component({
  selector: 'app-calendar-year-view',
  standalone: true,
  imports: [CustomTextComponent],
  templateUrl: './calendar-year-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarYearViewComponent {
  readonly focusedDate = input.required<Date>();
  readonly events = input.required<CalendarEvent[]>();

  readonly monthSelected = output<Date>();

  readonly months = computed<CalendarYearMonth[]>(() => {
    const year = this.focusedDate().getFullYear();
    const today = new Date();
    const allEvents = this.events();

    return Array.from({ length: 12 }, (_, monthIndex) => {
      const monthDate = new Date(year, monthIndex, 1);
      const days = calendarMonthGridDays(monthDate).map(gridDay => {
        const dayEvents = gridDay.isInMonth
          ? allEvents
              .filter(event => calendarIsSameDay(event.startDate, gridDay.date))
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
          : [];

        return {
          ...gridDay,
          isToday: calendarIsSameDay(gridDay.date, today),
          isWeekend: gridDay.date.getDay() === 0 || gridDay.date.getDay() === 6,
          dotVariant: dayEvents.length > 0 ? calendarEventTypeVariant(dayEvents[0].type) : null,
        };
      });

      return { date: monthDate, label: calendarMonthLabel(monthDate), days };
    });
  });

  onMonthClick(date: Date): void {
    this.monthSelected.emit(date);
  }
}

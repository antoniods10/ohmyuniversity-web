import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomTextComponent, type TextColor } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
import type { CalendarEvent } from '@shared/types/dashboard/dashboard-agenda.types';
import {
  calendarEventTypeVariant,
  calendarIsSameDay,
  calendarWeekDays,
  calendarWeekdayLabel,
  type CalendarEventVariant,
} from '@shared/utils/calendar.utils';

interface DayStripDay {
  date: Date;
  weekdayLabel: string;
  isSelected: boolean;
  isToday: boolean;
  weekdayColor: TextColor;
  dayNumberColor: TextColor;
  dotVariant: CalendarEventVariant | null;
}

@Component({
  selector: 'app-calendar-day-strip',
  standalone: true,
  imports: [CustomCardComponent, CustomTextComponent, CustomButtonComponent],
  templateUrl: './calendar-day-strip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayStripComponent {
  readonly selectedDate = input.required<Date>();
  readonly events = input<CalendarEvent[]>([]);

  readonly dateSelected = output<Date>();
  readonly weekChanged = output<Date>();

  readonly iconPrevious = LucideChevronLeft;
  readonly iconNext = LucideChevronRight;

  readonly days = computed<DayStripDay[]>(() => {
    const selected = this.selectedDate();
    const today = new Date();
    const allEvents = this.events();

    return calendarWeekDays(selected).map(date => {
      const isSelected = calendarIsSameDay(date, selected);
      const isSunday = date.getDay() === 0;
      let weekdayColor: TextColor = 'subtle';

      if (isSelected) {
        weekdayColor = 'primary';
      } else if (isSunday) {
        weekdayColor = 'error';
      }

      const dayEvents = allEvents
        .filter(event => calendarIsSameDay(event.startDate, date))
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

      return {
        date,
        weekdayLabel: calendarWeekdayLabel(date),
        isSelected,
        isToday: calendarIsSameDay(date, today),
        weekdayColor,
        dayNumberColor: isSelected ? 'primary' : 'default',
        dotVariant: dayEvents.length > 0 ? calendarEventTypeVariant(dayEvents[0].type) : null,
      };
    });
  });

  onSelect(date: Date): void {
    this.dateSelected.emit(date);
  }

  goToPreviousWeek(): void {
    this.shiftWeek(-7);
  }

  goToNextWeek(): void {
    this.shiftWeek(7);
  }

  private shiftWeek(deltaDays: number): void {
    const current = this.selectedDate();
    const shifted = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + deltaDays,
    );
    this.weekChanged.emit(shifted);
  }
}

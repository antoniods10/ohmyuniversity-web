import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { calendarIsSameDay, calendarWeekDays, calendarWeekdayLabel } from '@shared/utils/calendar.utils';

interface DayStripDay {
  date: Date;
  weekdayLabel: string;
  isSelected: boolean;
  isSunday: boolean;
}

@Component({
  selector: 'app-calendar-day-strip',
  standalone: true,
  imports: [],
  templateUrl: './calendar-day-strip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayStripComponent {
  readonly selectedDate = input.required<Date>();

  readonly dateSelected = output<Date>();

  readonly days = computed<DayStripDay[]>(() =>
    calendarWeekDays(this.selectedDate()).map(date => ({
      date,
      weekdayLabel: calendarWeekdayLabel(date),
      isSelected: calendarIsSameDay(date, this.selectedDate()),
      isSunday: date.getDay() === 0,
    })),
  );

  onSelect(date: Date): void {
    this.dateSelected.emit(date);
  }
}

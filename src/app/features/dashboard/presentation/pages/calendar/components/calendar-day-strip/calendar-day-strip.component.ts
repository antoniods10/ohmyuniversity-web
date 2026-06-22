import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomTextComponent, type TextColor } from '@ui/custom-text/custom-text.component';
import {
  calendarIsSameDay,
  calendarWeekDays,
  calendarWeekdayLabel,
} from '@shared/utils/calendar.utils';

interface DayStripDay {
  date: Date;
  weekdayLabel: string;
  isSelected: boolean;
  weekdayColor: TextColor;
  dayNumberColor: TextColor;
}

@Component({
  selector: 'app-calendar-day-strip',
  standalone: true,
  imports: [CustomCardComponent, CustomTextComponent],
  templateUrl: './calendar-day-strip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayStripComponent {
  readonly selectedDate = input.required<Date>();

  readonly dateSelected = output<Date>();

  readonly days = computed<DayStripDay[]>(() => {
    const selected = this.selectedDate();
    return calendarWeekDays(selected).map(date => {
      const isSelected = calendarIsSameDay(date, selected);
      const isSunday = date.getDay() === 0;
      const getWeekdayColor = (): TextColor => {
        if (isSelected) return 'primary';
        if (isSunday) return 'error';
        return 'subtle';
      };
      const weekdayColor = getWeekdayColor();
      return {
        date,
        weekdayLabel: calendarWeekdayLabel(date),
        isSelected,
        weekdayColor,
        dayNumberColor: isSelected ? 'primary' : 'default',
      };
    });
  });

  onSelect(date: Date): void {
    this.dateSelected.emit(date);
  }
}

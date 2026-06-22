import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomTextComponent, type TextColor } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';
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
  imports: [CustomCardComponent, CustomTextComponent, CustomButtonComponent],
  templateUrl: './calendar-day-strip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayStripComponent {
  readonly selectedDate = input.required<Date>();

  readonly dateSelected = output<Date>();
  readonly weekChanged = output<Date>();

  readonly iconPrevious = LucideChevronLeft;
  readonly iconNext = LucideChevronRight;

  readonly days = computed<DayStripDay[]>(() => {
    const selected = this.selectedDate();
    return calendarWeekDays(selected).map(date => {
      const isSelected = calendarIsSameDay(date, selected);
      const isSunday = date.getDay() === 0;
      let weekdayColor: TextColor;
      if (isSelected) {
        weekdayColor = 'primary';
      } else if (isSunday) {
        weekdayColor = 'error';
      } else {
        weekdayColor = 'subtle';
      }
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

import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import {
  LucideBookmark,
  LucideChevronLeft,
  LucideChevronRight,
  LucideDynamicIcon,
} from '@lucide/angular';
import type { CalendarEvent } from '@shared/types/dashboard/calendar.types';
import {
  calendarEventTypeVariant,
  calendarIsSameDay,
  calendarMonthGridDays,
  calendarMonthLabel,
  WEEKDAY_LABELS,
  type CalendarMonthGridDay,
} from '@shared/utils/calendar.utils';

const MAX_VISIBLE_EVENTS_PER_CELL = 2;

/** Max badge label length per breakpoint — narrower screens get a shorter truncation */
const LABEL_LENGTH_MOBILE = 6;
const LABEL_LENGTH_TABLET = 10;
const LABEL_LENGTH_DESKTOP = 14;

interface CalendarMonthCellEvent {
  event: CalendarEvent;
  labelMobile: string;
  labelTablet: string;
  labelDesktop: string;
}

interface CalendarMonthCell extends CalendarMonthGridDay {
  isToday: boolean;
  visibleEvents: CalendarMonthCellEvent[];
  overflowCount: number;
}

function truncateLabel(label: string, maxLength: number): string {
  if (label.length <= maxLength) return label;
  return `${label.slice(0, maxLength - 1)}…`;
}

@Component({
  selector: 'app-calendar-month-view',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomBadgeComponent,
    CustomTextComponent,
    CustomButtonComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './calendar-month-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthViewComponent {
  readonly focusedDate = input.required<Date>();
  readonly events = input.required<CalendarEvent[]>();

  readonly daySelected = output<Date>();
  readonly monthChanged = output<Date>();

  readonly weekdayLabels = WEEKDAY_LABELS;
  readonly iconPrevious = LucideChevronLeft;
  readonly iconNext = LucideChevronRight;
  readonly iconToday = LucideBookmark;

  readonly calendarEventTypeVariant = calendarEventTypeVariant;

  readonly monthLabel = computed(() => calendarMonthLabel(this.focusedDate()));

  readonly cells = computed<CalendarMonthCell[]>(() => {
    const today = new Date();
    const allEvents = this.events();

    return calendarMonthGridDays(this.focusedDate()).map(gridDay => {
      const dayEvents = allEvents
        .filter(event => calendarIsSameDay(event.startDate, gridDay.date))
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

      return {
        ...gridDay,
        isToday: calendarIsSameDay(gridDay.date, today),
        visibleEvents: dayEvents.slice(0, MAX_VISIBLE_EVENTS_PER_CELL).map(event => ({
          event,
          labelMobile: truncateLabel(event.title, LABEL_LENGTH_MOBILE),
          labelTablet: truncateLabel(event.title, LABEL_LENGTH_TABLET),
          labelDesktop: truncateLabel(event.title, LABEL_LENGTH_DESKTOP),
        })),
        overflowCount: Math.max(0, dayEvents.length - MAX_VISIBLE_EVENTS_PER_CELL),
      };
    });
  });

  onDayClick(date: Date): void {
    this.daySelected.emit(date);
  }

  goToPreviousMonth(): void {
    this.shiftMonth(-1);
  }

  goToNextMonth(): void {
    this.shiftMonth(1);
  }

  private shiftMonth(deltaMonths: number): void {
    const current = this.focusedDate();
    const shifted = new Date(current.getFullYear(), current.getMonth() + deltaMonths, 1);
    this.monthChanged.emit(shifted);
  }
}

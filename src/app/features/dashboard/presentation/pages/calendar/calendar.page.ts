import { Component, computed, signal } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  CalendarViewHeaderComponent,
  type CalendarViewMode,
} from './components/calendar-view-header/calendar-view-header.component';
import { CalendarDayStripComponent } from './components/calendar-day-strip/calendar-day-strip.component';
import { CalendarTimelineComponent } from './components/calendar-timeline/calendar-timeline.component';
import { CalendarMonthViewComponent } from './components/calendar-month-view/calendar-month-view.component';
import { CalendarYearViewComponent } from './components/calendar-year-view/calendar-year-view.component';
import { MOCK_CALENDAR_EVENTS } from '@shared/data/mock/calendar.mock';
import type { CalendarEvent, CalendarEventLayout } from '@shared/types/dashboard/calendar.types';
import { calculateEventLayouts, calendarIsSameDay } from '@shared/utils/calendar.utils';

@Component({
  selector: 'app-dashboard-calendar-page',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomTextComponent,
    CalendarViewHeaderComponent,
    CalendarDayStripComponent,
    CalendarTimelineComponent,
    CalendarMonthViewComponent,
    CalendarYearViewComponent,
  ],
  templateUrl: './calendar.page.html',
})
export class CalendarPage {
  readonly events = signal<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);

  /** The date currently "in focus" - the selected day, or the month/year being browsed */
  readonly focusedDate = signal<Date>(new Date());

  /** Which of the 3 nested views (year / month / day) is currently shown */
  readonly currentView = signal<CalendarViewMode>('day');

  readonly eventsForFocusedDay = computed<CalendarEvent[]>(() => {
    const day = this.focusedDate();
    return this.events()
      .filter(event => calendarIsSameDay(event.startDate, day))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  });

  readonly eventLayouts = computed<CalendarEventLayout[]>(() =>
    calculateEventLayouts(this.eventsForFocusedDay()),
  );

  selectDate(date: Date): void {
    this.focusedDate.set(date);
  }

  /** Drills down into a more specific view (e.g. clicking a month in year view) */
  goToView(view: CalendarViewMode, date: Date): void {
    this.focusedDate.set(date);
    this.currentView.set(view);
  }

  onMonthDaySelected(date: Date): void {
    this.goToView('day', date);
  }

  onYearMonthSelected(date: Date): void {
    this.goToView('month', date);
  }

  /** Goes up one level: day -> month -> year. No-op at the year view (the root). */
  goBack(): void {
    if (this.currentView() === 'day') {
      this.currentView.set('month');
    } else if (this.currentView() === 'month') {
      this.currentView.set('year');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- event param kept for the future detail sheet handler
  onEventSelected(event: CalendarEvent): void {
    // TODO: open the detail bottom sheet once it exists
  }

  async createEvent(
    data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CalendarEvent> {
    const now = new Date();
    const created: CalendarEvent = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    this.events.update(events => [...events, created]);
    return created;
  }

  async updateEvent(id: string, partial: Partial<CalendarEvent>): Promise<CalendarEvent | null> {
    let updated: CalendarEvent | null = null;
    this.events.update(events =>
      events.map(event => {
        if (event.id !== id) return event;
        updated = { ...event, ...partial, id: event.id, updatedAt: new Date() };
        return updated;
      }),
    );
    return updated;
  }

  async deleteEvent(id: string): Promise<void> {
    this.events.update(events => events.filter(event => event.id !== id));
  }
}

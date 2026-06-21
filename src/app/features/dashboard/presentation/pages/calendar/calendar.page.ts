import { Component, computed, signal } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CalendarDayStripComponent } from './components/calendar-day-strip/calendar-day-strip.component';
import { CalendarTimelineComponent } from './components/calendar-timeline/calendar-timeline.component';
import { MOCK_CALENDAR_EVENTS } from '@shared/data/mock/calendar.mock';
import type { CalendarEvent, CalendarEventLayout } from '@shared/types/dashboard/calendar.types';
import { calculateEventLayouts, calendarIsSameDay } from '@shared/utils/calendar.utils';

@Component({
  selector: 'app-dashboard-calendar-page',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CalendarDayStripComponent,
    CalendarTimelineComponent,
  ],
  templateUrl: './calendar.page.html',
})
export class CalendarPage {
  readonly events = signal<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);
  readonly selectedDate = signal<Date>(new Date());

  readonly eventsForSelectedDate = computed<CalendarEvent[]>(() => {
    const day = this.selectedDate();
    return this.events()
      .filter(event => calendarIsSameDay(event.startDate, day))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  });

  readonly eventLayouts = computed<CalendarEventLayout[]>(() =>
    calculateEventLayouts(this.eventsForSelectedDate()),
  );

  selectDate(date: Date): void {
    this.selectedDate.set(date);
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

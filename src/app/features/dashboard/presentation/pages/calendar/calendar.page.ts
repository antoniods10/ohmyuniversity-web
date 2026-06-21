import { Component, computed, signal } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { MOCK_CALENDAR_EVENTS } from '@shared/data/mock/calendar.mock';
import type { CalendarEvent, CalendarEventLayout } from '@shared/types/dashboard/calendar.types';
import { calculateEventLayouts } from '@shared/utils/calendar.utils';

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

@Component({
  selector: 'app-dashboard-calendar-page',
  standalone: true,
  imports: [DashboardContainerComponent, DashboardHeaderComponent],
  templateUrl: './calendar.page.html',
})
export class CalendarPage {
  readonly events = signal<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);
  readonly selectedDate = signal<Date>(new Date());

  readonly eventsForSelectedDate = computed<CalendarEvent[]>(() => {
    const day = this.selectedDate();
    return this.events()
      .filter(event => isSameDay(event.startDate, day))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  });

  readonly eventLayouts = computed<CalendarEventLayout[]>(() =>
    calculateEventLayouts(this.eventsForSelectedDate()),
  );

  selectDate(date: Date): void {
    this.selectedDate.set(date);
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

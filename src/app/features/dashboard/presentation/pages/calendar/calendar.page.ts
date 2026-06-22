import { Component, computed, signal } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucidePlus } from '@lucide/angular';
import {
  CalendarViewHeaderComponent,
  type CalendarViewMode,
} from './components/calendar-view-header/calendar-view-header.component';
import { CalendarDayStripComponent } from './components/calendar-day-strip/calendar-day-strip.component';
import { CalendarTimelineComponent } from './components/calendar-timeline/calendar-timeline.component';
import { CalendarMonthViewComponent } from './components/calendar-month-view/calendar-month-view.component';
import { CalendarYearViewComponent } from './components/calendar-year-view/calendar-year-view.component';
import { CalendarEventFormComponent } from './components/calendar-event-form/calendar-event-form.component';
import { CalendarEventDetailComponent } from './components/calendar-event-detail/calendar-event-detail.component';
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
    CustomButtonComponent,
    CalendarViewHeaderComponent,
    CalendarDayStripComponent,
    CalendarTimelineComponent,
    CalendarMonthViewComponent,
    CalendarYearViewComponent,
    CalendarEventFormComponent,
    CalendarEventDetailComponent,
  ],
  templateUrl: './calendar.page.html',
})
export class CalendarPage {
  readonly events = signal<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);

  /** The date currently "in focus" — the selected day, or the month/year being browsed */
  readonly focusedDate = signal<Date>(new Date());

  /** Which of the 3 nested views (year / month / day) is currently shown */
  readonly currentView = signal<CalendarViewMode>('day');

  /** Whether the create/edit event form is open */
  readonly isFormOpen = signal(false);

  /** The event currently being edited, or null when creating a new one */
  readonly eventBeingEdited = signal<CalendarEvent | null>(null);

  /** Whether the read-only event detail sheet is open */
  readonly isDetailOpen = signal(false);

  /** The event currently shown in the detail sheet */
  readonly eventBeingViewed = signal<CalendarEvent | null>(null);

  readonly iconAdd = LucidePlus;

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

  onEventSelected(event: CalendarEvent): void {
    this.openDetail(event);
  }

  openDetail(event: CalendarEvent): void {
    this.eventBeingViewed.set(event);
    this.isDetailOpen.set(true);
  }

  closeDetail(): void {
    this.isDetailOpen.set(false);
    this.eventBeingViewed.set(null);
  }

  /** Closes the detail sheet and opens the edit form for the same event */
  onDetailEditRequested(event: CalendarEvent): void {
    this.closeDetail();
    this.openEditForm(event);
  }

  async onDetailDeleteConfirmed(id: string): Promise<void> {
    await this.deleteEvent(id);
    this.closeDetail();
  }

  openCreateForm(): void {
    this.eventBeingEdited.set(null);
    this.isFormOpen.set(true);
  }

  openEditForm(event: CalendarEvent): void {
    this.eventBeingEdited.set(event);
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.eventBeingEdited.set(null);
  }

  async onEventCreated(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await this.createEvent(data);
    this.closeForm();
  }

  async onEventUpdated(payload: { id: string; partial: Partial<CalendarEvent> }): Promise<void> {
    await this.updateEvent(payload.id, payload.partial);
    this.closeForm();
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

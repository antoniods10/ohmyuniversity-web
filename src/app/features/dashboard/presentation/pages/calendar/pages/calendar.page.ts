import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucidePlus } from '@lucide/angular';
import {
  CalendarViewHeaderComponent,
  type CalendarViewMode,
} from '../components/calendar-view-header/calendar-view-header.component';
import { CalendarDayStripComponent } from '../components/calendar-day-strip/calendar-day-strip.component';
import { CalendarTimelineComponent } from '../components/calendar-timeline/calendar-timeline.component';
import { CalendarMonthViewComponent } from '../components/calendar-month-view/calendar-month-view.component';
import { CalendarYearViewComponent } from '../components/calendar-year-view/calendar-year-view.component';
import { CalendarEventFormComponent } from '../components/calendar-event-form/calendar-event-form.component';
import { CalendarEventDetailComponent } from '../components/calendar-event-detail/calendar-event-detail.component';
import type {
  CalendarEvent,
  CalendarEventLayout,
} from '@shared/types/dashboard/dashboard-agenda.types';
import { calculateEventLayouts, calendarIsSameDay } from '@shared/utils/calendar.utils';
import { CalendarFacade } from 'src/app/core/application/facades/calendar.facade';

@Component({
  selector: 'app-dashboard-calendar-page',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
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
export class CalendarPage implements OnInit {
  private readonly calendar = inject(CalendarFacade);

  readonly events = signal<CalendarEvent[]>([]);
  readonly focusedDate = signal<Date>(new Date());
  readonly currentView = signal<CalendarViewMode>('day');
  readonly isFormOpen = signal(false);
  readonly eventBeingEdited = signal<CalendarEvent | null>(null);
  readonly isDetailOpen = signal(false);
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

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.calendar.getEvents().subscribe({
      next: events => this.events.set(events),
      error: () => {},
    });
  }

  selectDate(date: Date): void {
    this.focusedDate.set(date);
  }

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

  onDetailEditRequested(event: CalendarEvent): void {
    this.closeDetail();
    this.openEditForm(event);
  }

  onDetailDeleteConfirmed(id: string): void {
    this.calendar.deleteEvent(id).subscribe({
      next: () => {
        this.events.update(events => events.filter(e => e.id !== id));
        this.closeDetail();
      },
      error: () => {},
    });
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

  onEventCreated(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): void {
    this.calendar.createEvent(data).subscribe({
      next: created => {
        this.events.update(events => [...events, created]);
        this.closeForm();
      },
      error: () => {},
    });
  }

  onEventUpdated(payload: { id: string; partial: Partial<CalendarEvent> }): void {
    this.calendar.updateEvent(payload.id, payload.partial).subscribe({
      next: updated => {
        this.events.update(events => events.map(e => (e.id === payload.id ? updated : e)));
        this.closeForm();
      },
      error: () => {},
    });
  }
}

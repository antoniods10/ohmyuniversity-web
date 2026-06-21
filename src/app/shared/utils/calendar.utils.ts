import { LucideBell, LucideCalendarDays, LucideGraduationCap } from '@lucide/angular';
import type {
  CalendarEvent,
  CalendarEventLayout,
  CalendarEventType,
} from '@shared/types/dashboard/calendar.types';

/** Italian display label for the event's type, as shown on the form tabs */
export function calendarEventTypeLabel(type: CalendarEventType): string {
  switch (type) {
    case 'EXAM':
      return 'Esame';
    case 'REMINDER':
      return 'Promemoria';
    default:
      return 'Evento';
  }
}

/** Lucide icon associated with the event's type, mirrors calendar_event_type_ui.dart */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches icon: any used by custom-card/custom-badge inputs
export function calendarEventTypeIcon(type: CalendarEventType): any {
  switch (type) {
    case 'EXAM':
      return LucideGraduationCap;
    case 'REMINDER':
      return LucideBell;
    default:
      return LucideCalendarDays;
  }
}

/**
 * The 3 variant values actually used to color an event by type — a subset shared by both
 * custom-card's CardVariant and custom-badge's BadgeVariant, so it's safely assignable to
 * either [variant] input without a type mismatch (BadgeVariant has members like 'ghost'
 * that don't exist on CardVariant, so the full BadgeVariant type isn't assignable to it).
 */
export type CalendarEventVariant = 'error' | 'secondary' | 'warning';

/**
 * app-custom-card / app-custom-badge variant for the event's type.
 * Mirrors the Flutter mapping: EXAM=error, REMINDER=secondary, everything else=warning.
 */
export function calendarEventTypeVariant(type: CalendarEventType): CalendarEventVariant {
  switch (type) {
    case 'EXAM':
      return 'error';
    case 'REMINDER':
      return 'secondary';
    default:
      return 'warning';
  }
}

/** Hour-of-day label in AM/PM form (e.g. "9 AM", "12 PM"), used by the timeline's hour gutter */
export function calendarHourLabel(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

/** Precise 24h time (e.g. "09:30"), used on individual event cards */
export function calendarPreciseTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

/** Time range label for an event (e.g. "09:30-11:00"), falls back to a single time if no endDate */
export function calendarEventTimeRange(event: CalendarEvent): string {
  if (!event.endDate) return calendarPreciseTime(event.startDate);
  return `${calendarPreciseTime(event.startDate)}-${calendarPreciseTime(event.endDate)}`;
}

/** Duration label for an event (e.g. "1h 30m", "45m"), empty string if no endDate */
export function calendarEventDurationLabel(event: CalendarEvent): string {
  if (!event.endDate) return '';
  const minutes = Math.round((event.endDate.getTime() - event.startDate.getTime()) / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0 && remainingMinutes > 0) return `${hours}h ${remainingMinutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${remainingMinutes}m`;
}

const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

/** Italian 3-letter weekday label for a date (e.g. "Lun"), used by the day strip */
export function calendarWeekdayLabel(date: Date): string {
  return WEEKDAY_LABELS[(date.getDay() + 6) % 7];
}

/** Whether two dates fall on the same calendar day (ignores time of day) */
export function calendarIsSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Returns the 7 dates (Monday to Sunday) of the week containing the given date.
 * Mirrors _weekDaysFor in calendar_day_strip.dart.
 */
export function calendarWeekDays(date: Date): Date[] {
  const isoWeekday = (date.getDay() + 6) % 7; // 0 = Monday, ..., 6 = Sunday
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - isoWeekday);
  return Array.from(
    { length: 7 },
    (_, i) => new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i),
  );
}

interface ActiveLane {
  index: number;
  lane: number;
}

/**
 * Computes lane assignments for a list of events so overlapping events can be displayed
 * side by side on a timeline, like Google Calendar.
 *
 * Events must be sorted by startDate ascending before calling this function. Each event gets
 * a 0-based lane index; `laneCount` is the max number of simultaneous lanes seen across the
 * whole overlap group the event belongs to, not just at the moment it starts — an event
 * that begins alone but is later joined by two others must still report the resulting lane
 * count of 3, so all three render at one-third width.
 *
 * Events are tracked by their position in `sortedEvents`, not by object identity or `id`
 * (which can be `null` for an unsaved event) — safe even if the caller clones events between
 * calls, as long as the array order matches the events passed in.
 */
export function calculateEventLayouts(sortedEvents: CalendarEvent[]): CalendarEventLayout[] {
  const active: ActiveLane[] = [];
  const layoutByIndex = new Map<number, { lane: number; laneCount: number }>();

  sortedEvents.forEach((event, index) => {
    removeEndedEvents(active, sortedEvents, event.startDate);

    const lane = nextFreeLane(active);
    active.push({ index, lane });

    const laneCount = active.length;
    for (const activeLane of active) {
      const existing = layoutByIndex.get(activeLane.index);
      const nextLaneCount = existing ? Math.max(existing.laneCount, laneCount) : laneCount;
      layoutByIndex.set(activeLane.index, { lane: activeLane.lane, laneCount: nextLaneCount });
    }
  });

  return sortedEvents.map((event, index) => {
    const layout = layoutByIndex.get(index);
    return { event, lane: layout?.lane ?? 0, laneCount: layout?.laneCount ?? 1 };
  });
}

function removeEndedEvents(
  active: ActiveLane[],
  sortedEvents: CalendarEvent[],
  newEventStart: Date,
): void {
  for (let i = active.length - 1; i >= 0; i--) {
    const activeEvent = sortedEvents[active[i].index];
    const end = activeEvent.endDate ?? activeEvent.startDate;
    if (end.getTime() <= newEventStart.getTime()) {
      active.splice(i, 1);
    }
  }
}

function nextFreeLane(active: ActiveLane[]): number {
  let lane = 0;
  while (active.some(a => a.lane === lane)) {
    lane++;
  }
  return lane;
}

/** Timeline layout constants, mirrors calendar_timeline.dart's startHour/endHour/hourHeight */
export const CALENDAR_TIMELINE = {
  startHour: 8,
  endHour: 20,
  hourHeight: 104,
  leftGutter: 70,
} as const;

/** Clamps an hour to the visible timeline range [startHour, endHour] */
function visibleHour(hour: number): number {
  if (hour < CALENDAR_TIMELINE.startHour) return CALENDAR_TIMELINE.startHour;
  if (hour > CALENDAR_TIMELINE.endHour) return CALENDAR_TIMELINE.endHour;
  return hour;
}

/** Top offset in px of a given hour's row within the timeline */
export function calendarHourTop(hour: number): number {
  return (hour - CALENDAR_TIMELINE.startHour) * CALENDAR_TIMELINE.hourHeight;
}

/** Top offset in px of a specific date/time within the timeline, clamped to the visible range */
export function calendarTimeTop(date: Date): number {
  const hour = visibleHour(date.getHours());
  const minutes = hour === date.getHours() ? date.getMinutes() : 0;
  return calendarHourTop(hour) + (minutes / 60) * CALENDAR_TIMELINE.hourHeight;
}

/** Top offset in px of an event's card, exactly on the hour gridline */
export function calendarEventTop(event: CalendarEvent): number {
  return calendarTimeTop(event.startDate);
}

/** Height in px of an event's card, proportional to its duration, with a 62px minimum */
export function calendarEventHeight(event: CalendarEvent): number {
  if (!event.endDate) return 62;
  const durationMinutes = (event.endDate.getTime() - event.startDate.getTime()) / 60000;
  const proportionalHeight = (durationMinutes / 60) * CALENDAR_TIMELINE.hourHeight;
  return Math.max(62, proportionalHeight);
}

/** Total height in px of the timeline, spanning startHour to endHour inclusive */
export function calendarTimelineTotalHeight(): number {
  const totalHours = CALENDAR_TIMELINE.endHour - CALENDAR_TIMELINE.startHour + 1;
  return totalHours * CALENDAR_TIMELINE.hourHeight;
}

/** List of whole hours shown in the timeline's left gutter, from startHour to endHour */
export function calendarTimelineHours(): number[] {
  const hours: number[] = [];
  for (let hour = CALENDAR_TIMELINE.startHour; hour <= CALENDAR_TIMELINE.endHour; hour++) {
    hours.push(hour);
  }
  return hours;
}

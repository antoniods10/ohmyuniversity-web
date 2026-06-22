/** Classification of a calendar event, mirrors the backend CalendarEventType enum */
export type CalendarEventType = 'PERSONAL' | 'EXAM' | 'DEADLINE' | 'REMINDER' | 'UNIVERSITY';

/** A personal calendar event, used throughout the Agenda feature UI */
export interface CalendarEvent {
  id: string | null;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  allDay: boolean;
  type: CalendarEventType;
  color: string | null;
  url: string | null;
  notes: string | null;
  /** UI-only for now, not part of the backend DTO yet — TODO: confirm with backend before wiring real API */
  location: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/** Payload for creating or updating a personal calendar event (POST/PUT /api/v1/calendar/events) */
export interface CalendarEventRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  allDay?: boolean;
  type?: CalendarEventType;
  color?: string;
  url?: string;
  notes?: string;
}

/** Response shape returned by the personal calendar event endpoints */
export interface CalendarEventResponse {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  allDay: boolean;
  type: CalendarEventType;
  color: string | null;
  url: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/** An event published by a university, optionally importable into the personal calendar */
export interface UniversityEvent {
  id: string;
  universityId: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  allDay: boolean;
  url: string | null;
  imported: boolean;
}

/** The 3 event categories selectable from the "new element" form tabs */
export type CalendarFormEventType = 'ESAME' | 'PROMEMORIA' | 'EVENTO';

/** Lane assignment for one event within an overlapping group, used by the timeline view */
export interface CalendarEventLayout {
  event: CalendarEvent;
  /** 0-based column index among overlapping events */
  lane: number;
  /** Max number of simultaneous lanes within this event's overlap group */
  laneCount: number;
}

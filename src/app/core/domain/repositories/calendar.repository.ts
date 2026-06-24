import { Observable } from 'rxjs';
import {
  CalendarEventResponse,
  CalendarEventCreateRequest,
  UniversityEventResponse,
} from '../models/agenda/calendar.model';

export abstract class CalendarRepository {
  abstract getEvents(from?: string, to?: string): Observable<CalendarEventResponse[]>;
  abstract createEvent(request: CalendarEventCreateRequest): Observable<CalendarEventResponse>;
  abstract updateEvent(
    id: string,
    request: CalendarEventCreateRequest,
  ): Observable<CalendarEventResponse>;
  abstract deleteEvent(id: string): Observable<void>;
  abstract getUniversityEvents(): Observable<UniversityEventResponse[]>;
  abstract importUniversityEvent(id: string): Observable<void>;
}

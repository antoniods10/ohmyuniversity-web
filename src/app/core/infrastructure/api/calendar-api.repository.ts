import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarRepository } from '../../domain/repositories/calendar.repository';
import {
  CalendarEventCreateRequest,
  CalendarEventResponse,
  UniversityEventResponse,
} from '../../domain/models/agenda/calendar.model';
import { API } from 'src/app/core/infrastructure/api/api-endpoints';

@Injectable()
export class CalendarApiRepository extends CalendarRepository {
  private readonly http = inject(HttpClient);

  getEvents(from?: string, to?: string): Observable<CalendarEventResponse[]> {
    let params = new HttpParams();
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<CalendarEventResponse[]>(API.calendar.events, { params });
  }

  createEvent(request: CalendarEventCreateRequest): Observable<CalendarEventResponse> {
    return this.http.post<CalendarEventResponse>(API.calendar.events, request);
  }

  updateEvent(id: string, request: CalendarEventCreateRequest): Observable<CalendarEventResponse> {
    return this.http.put<CalendarEventResponse>(API.calendar.event(id), request);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(API.calendar.event(id));
  }

  getUniversityEvents(): Observable<UniversityEventResponse[]> {
    return this.http.get<UniversityEventResponse[]>(API.calendar.universityEvents);
  }

  importUniversityEvent(id: string): Observable<void> {
    return this.http.post<void>(API.calendar.importEvent(id), null);
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimetableRepository } from '../../domain/repositories/timetable.repository';
import { TimetableResponse } from '../../domain/models/timetable.model';
import { API } from '@shared/constants/shared/api.constants';

@Injectable()
export class TimetableApiRepository extends TimetableRepository {
  private readonly http = inject(HttpClient);

  getTimetables(
    universityId: string,
    departmentId?: string,
    degreeType?: string,
  ): Observable<TimetableResponse[]> {
    let params = new HttpParams().set('universityId', universityId);
    if (departmentId) params = params.set('departmentId', departmentId);
    if (degreeType) params = params.set('degreeType', degreeType);
    return this.http.get<TimetableResponse[]>(API.fetcher.timetables, { params });
  }
}

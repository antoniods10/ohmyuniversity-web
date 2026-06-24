import { Observable } from 'rxjs';
import { TimetableResponse } from '../models/timetable/timetable.model';

export abstract class TimetableRepository {
  abstract getTimetables(
    universityId: string,
    departmentId?: string,
    degreeType?: string,
  ): Observable<TimetableResponse[]>;
}

import { Observable } from 'rxjs';
import { TimetableResponse } from '../../../features/dashboard/domain/models/timetable.model';

export abstract class TimetableRepository {
  abstract getTimetables(
    universityId: string,
    departmentId?: string,
    degreeType?: string,
  ): Observable<TimetableResponse[]>;
}

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimetableResponse } from 'src/app/core/domain/models/timetable/timetable.model';
import { TimetableRepository } from '../../domain/repositories/timetable.repository';

@Injectable()
export class TimetableFacade {
  private readonly repo = inject(TimetableRepository);

  getTimetables(
    universityId: string,
    departmentId?: string,
    degreeType?: string,
  ): Observable<TimetableResponse[]> {
    return this.repo.getTimetables(universityId, departmentId, degreeType);
  }
}

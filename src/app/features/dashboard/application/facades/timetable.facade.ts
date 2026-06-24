import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimetableRepository } from '../../../../core/domain/repositories/timetable.repository';
import { TimetableResponse } from '../../domain/models/timetable.model';

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

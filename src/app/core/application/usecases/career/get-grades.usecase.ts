import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CareerRepository } from '../../../domain/repositories/career.repository';
import { GradesResponse } from '../../../domain/models/career/grades.model';

@Injectable()
export class GetGradesUseCase {
  private readonly repo = inject(CareerRepository);
  execute(): Observable<GradesResponse> {
    return this.repo.getGrades();
  }
}

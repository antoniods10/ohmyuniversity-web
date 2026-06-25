import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CareerRepository } from '../../../domain/repositories/career.repository';
import { StudyPlanResponse } from '../../../domain/models/career/study-plan.model';

@Injectable()
export class GetStudyPlanUseCase {
  private readonly repo = inject(CareerRepository);
  execute(): Observable<StudyPlanResponse> {
    return this.repo.getStudyPlan();
  }
}

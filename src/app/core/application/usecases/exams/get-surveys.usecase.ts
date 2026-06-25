import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { SurveysResponse } from '../../../domain/models/career/surveys.model';

@Injectable()
export class GetSurveysUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(): Observable<SurveysResponse> {
    return this.repo.getSurveys();
  }
}

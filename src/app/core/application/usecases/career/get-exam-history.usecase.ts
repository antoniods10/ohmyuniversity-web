import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CareerRepository } from '../../../domain/repositories/career.repository';
import { ExamHistoryResponse } from '../../../domain/models/career/exam-history.model';

@Injectable()
export class GetExamHistoryUseCase {
  private readonly repo = inject(CareerRepository);
  execute(): Observable<ExamHistoryResponse> {
    return this.repo.getExamHistory();
  }
}

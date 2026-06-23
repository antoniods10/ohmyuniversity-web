import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { QuestionariResponse } from '../../domain/models/questionari.model';

@Injectable()
export class GetQuestionariUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<QuestionariResponse> {
    return this.repo.getQuestionari();
  }
}

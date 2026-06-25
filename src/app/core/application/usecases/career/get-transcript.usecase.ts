import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { CareerRepository } from '../../../domain/repositories/career.repository';
import { Exam } from '@shared/types/dashboard/dashboard-career.types';
import { mergeToExams } from 'src/app/core/application/mappers/carriera.mapper';

@Injectable()
export class GetTranscriptUseCase {
  private readonly repo = inject(CareerRepository);

  execute(): Observable<Exam[]> {
    return forkJoin({
      piano: this.repo.getStudyPlan(),
      libretto: this.repo.getTranscript(),
    }).pipe(map(({ piano, libretto }) => mergeToExams(piano.righe ?? [], libretto.righe ?? [])));
  }
}

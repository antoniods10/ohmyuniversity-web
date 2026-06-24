import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';
import { Exam } from '@shared/types/dashboard/career.types';
import { mergeToExams } from '../mappers/carriera.mapper';

@Injectable()
export class GetLibrettoUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<Exam[]> {
    return forkJoin({
      piano: this.repo.getPiano(),
      libretto: this.repo.getLibretto(),
    }).pipe(map(({ piano, libretto }) => mergeToExams(piano.righe ?? [], libretto.righe ?? [])));
  }
}

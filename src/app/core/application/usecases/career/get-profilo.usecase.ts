import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';
import { ProfiloResponse } from '../../../../core/domain/models/career/profilo.model';

@Injectable()
export class GetProfiloUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<ProfiloResponse> {
    return this.repo.getProfilo();
  }
}

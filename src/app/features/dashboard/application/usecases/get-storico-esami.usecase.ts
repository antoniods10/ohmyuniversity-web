import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { StoricoEsamiResponse } from '../../domain/models/storico-esami.model';

@Injectable()
export class GetStoricoEsamiUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<StoricoEsamiResponse> {
    return this.repo.getStoricoEsami();
  }
}

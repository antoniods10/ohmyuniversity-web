import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';
import {
  PrenotazioneRequest,
  PrenotazioneResponse,
} from '../../../../core/domain/models/career/prenotazioni.model';

@Injectable()
export class GetPrenotazioniUseCase {
  private readonly repo = inject(CarrieraRepository);
  execute(request: PrenotazioneRequest): Observable<PrenotazioneResponse> {
    return this.repo.getPrenotazioni(request);
  }
}

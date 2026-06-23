import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { PrenotazioniLibrettoResponse } from '../../domain/models/appelli.model';

@Injectable()
export class GetPrenotazioniLibrettoUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<PrenotazioniLibrettoResponse> {
    return this.repo.getPrenotazioniLibretto();
  }
}

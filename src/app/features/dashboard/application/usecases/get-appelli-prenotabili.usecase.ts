import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { AppelliLibrettoResponse } from '../../domain/models/appelli.model';

@Injectable()
export class GetAppelliPrenotabiliUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<AppelliLibrettoResponse> {
    return this.repo.getAppelliPrenotabili();
  }
}

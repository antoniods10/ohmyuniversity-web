import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TasseResponse } from '../../domain/models/tasse.model';
import { GetTasseUseCase } from '../usecases/get-tasse.usecase';

@Injectable()
export class CarrieraFacade {
  private readonly getTasseUseCase = inject(GetTasseUseCase);

  getTasse(): Observable<TasseResponse> {
    return this.getTasseUseCase.execute();
  }
}

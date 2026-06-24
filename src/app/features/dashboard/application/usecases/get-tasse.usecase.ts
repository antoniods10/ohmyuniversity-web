import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';
import { TasseResponse } from '../../domain/models/tasse.model';

@Injectable()
export class GetTasseUseCase {
  private readonly carrieraRepository = inject(CarrieraRepository);

  execute(): Observable<TasseResponse> {
    return this.carrieraRepository.getTasse();
  }
}

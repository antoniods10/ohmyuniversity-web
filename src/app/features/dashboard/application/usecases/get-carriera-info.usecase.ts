import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { CarrieraInfoResponse } from '../../domain/models/carriera-info.model';

@Injectable()
export class GetCarrieraInfoUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<CarrieraInfoResponse> {
    return this.repo.getCarrieraInfo();
  }
}

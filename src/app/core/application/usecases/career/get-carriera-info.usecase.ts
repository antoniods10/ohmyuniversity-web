import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';
import { CarrieraInfoResponse } from '../../../../core/domain/models/career/carriera-info.model';

@Injectable()
export class GetCarrieraInfoUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<CarrieraInfoResponse> {
    return this.repo.getCarrieraInfo();
  }
}

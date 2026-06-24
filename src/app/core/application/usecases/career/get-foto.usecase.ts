import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';

@Injectable()
export class GetFotoUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<Blob> {
    return this.repo.getFoto();
  }
}

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { ProfiloResponse } from '../../domain/models/profilo.model';

@Injectable()
export class GetProfiloUseCase {
  private readonly repo = inject(CarrieraRepository);

  execute(): Observable<ProfiloResponse> {
    return this.repo.getProfilo();
  }
}

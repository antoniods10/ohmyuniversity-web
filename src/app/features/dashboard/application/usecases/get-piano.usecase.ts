import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { PianoStudioResponse } from '../../domain/models/piano.model';

@Injectable()
export class GetPianoUseCase {
  private readonly repo = inject(CarrieraRepository);
  execute(): Observable<PianoStudioResponse> {
    return this.repo.getPiano();
  }
}

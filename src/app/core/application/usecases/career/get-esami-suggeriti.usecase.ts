import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';
import { SuggerimentiResponse } from '../../../../core/domain/models/career/suggerimenti.model';

@Injectable()
export class GetEsamiSuggeриtiUseCase {
  private readonly repo = inject(CarrieraRepository);
  execute(): Observable<SuggerimentiResponse> {
    return this.repo.getEsamiSuggeriti();
  }
}

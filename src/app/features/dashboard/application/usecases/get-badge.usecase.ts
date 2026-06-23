import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../domain/repositories/carriera.repository';
import { BadgeResponse } from '../../domain/models/badge.model';

@Injectable()
export class GetBadgeUseCase {
  private readonly repo = inject(CarrieraRepository);
  execute(): Observable<BadgeResponse> {
    return this.repo.getBadge();
  }
}

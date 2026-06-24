import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrieraRepository } from '../../../../core/domain/repositories/carriera.repository';
import { BadgeResponse } from '../../../../core/domain/models/career/badge.model';

@Injectable()
export class GetBadgeUseCase {
  private readonly repo = inject(CarrieraRepository);
  execute(): Observable<BadgeResponse> {
    return this.repo.getBadge();
  }
}

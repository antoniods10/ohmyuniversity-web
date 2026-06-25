import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileRepository } from '../../../domain/repositories/profile.repository';
import { BadgeResponse } from '../../../domain/models/career/badge.model';

@Injectable()
export class GetBadgeUseCase {
  private readonly repo = inject(ProfileRepository);
  execute(): Observable<BadgeResponse> {
    return this.repo.getBadge();
  }
}

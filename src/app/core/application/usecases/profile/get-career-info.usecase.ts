import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileRepository } from '../../../domain/repositories/profile.repository';
import { CareerInfoResponse } from '../../../domain/models/career/career-info.model';

@Injectable()
export class GetCareerInfoUseCase {
  private readonly repo = inject(ProfileRepository);
  execute(): Observable<CareerInfoResponse> {
    return this.repo.getInfo();
  }
}

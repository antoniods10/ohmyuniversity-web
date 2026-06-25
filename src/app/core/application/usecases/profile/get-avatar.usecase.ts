import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileRepository } from '../../../domain/repositories/profile.repository';

@Injectable()
export class GetAvatarUseCase {
  private readonly repo = inject(ProfileRepository);
  execute(): Observable<Blob> {
    return this.repo.getAvatar();
  }
}

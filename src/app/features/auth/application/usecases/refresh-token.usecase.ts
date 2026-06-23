import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './login.usecase';

@Injectable()
export class RefreshTokenUseCase {
  private readonly authRepository = inject(AuthRepository);

  execute(universityId: string): Observable<string> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
    return this.authRepository.refresh(refreshToken, universityId).pipe(
      tap(newAccessToken => {
        localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
      }),
    );
  }
}

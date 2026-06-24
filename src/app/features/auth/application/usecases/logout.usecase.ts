import { inject, Injectable } from '@angular/core';
import { Observable, tap, catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRepository } from '../../../../core/domain/repositories/auth.repository';
import {
  ACCESS_TOKEN_KEY,
  HAS_CARRIERA_KEY,
  PROFILI_KEY,
  REFRESH_TOKEN_KEY,
  UNIVERSITY_ID_KEY,
  USER_COGNOME_KEY,
  USER_NOME_KEY,
} from './login.usecase';

@Injectable()
export class LogoutUseCase {
  private readonly authRepository = inject(AuthRepository);
  private readonly router = inject(Router);

  execute(): Observable<void> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
    const universityId = localStorage.getItem(UNIVERSITY_ID_KEY) ?? '';

    return this.authRepository.logout(refreshToken, universityId).pipe(
      tap(() => this.clearAndRedirect()),
      catchError(() => {
        this.clearAndRedirect();
        return EMPTY;
      }),
    );
  }

  private clearAndRedirect(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(UNIVERSITY_ID_KEY);
    localStorage.removeItem(USER_NOME_KEY);
    localStorage.removeItem(USER_COGNOME_KEY);
    localStorage.removeItem(PROFILI_KEY);
    localStorage.removeItem(HAS_CARRIERA_KEY);
    window.location.href = '/login';
  }
}

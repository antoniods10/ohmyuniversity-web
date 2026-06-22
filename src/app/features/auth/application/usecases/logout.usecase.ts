import { inject, Injectable } from '@angular/core';
import { Observable, tap, catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, UNIVERSITY_ID_KEY } from './login.usecase';

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
    this.router.navigate(['/login']);
  }
}

import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthTokens } from '../../domain/models/auth-tokens.model';
import { LoginRequest } from '../../domain/models/login-request.model';

const ACCESS_TOKEN_KEY = 'omu_access_token';
const REFRESH_TOKEN_KEY = 'omu_refresh_token';

export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY };
export const UNIVERSITY_ID_KEY = 'omu_university_id';

@Injectable()
export class LoginUseCase {
  private readonly authRepository = inject(AuthRepository);
  private readonly router = inject(Router);

  execute(request: LoginRequest): Observable<AuthTokens> {
    return this.authRepository.login(request).pipe(
      tap(tokens => {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
        localStorage.setItem(UNIVERSITY_ID_KEY, request.universityId);
        this.router.navigate(['/dashboard']);
      }),
    );
  }
}

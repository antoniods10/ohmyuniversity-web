import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokens } from '../../domain/models/auth-tokens.model';
import { LoginRequest } from '../../domain/models/login-request.model';
import {
  LoginUseCase,
  ACCESS_TOKEN_KEY,
  USER_COGNOME_KEY,
  USER_NOME_KEY,
} from '../usecases/login.usecase';
import { LogoutUseCase } from '../usecases/logout.usecase';
import { RefreshTokenUseCase } from '../usecases/refresh-token.usecase';

@Injectable()
export class AuthFacade {
  private readonly loginUseCase = inject(LoginUseCase);
  private readonly logoutUseCase = inject(LogoutUseCase);
  private readonly refreshTokenUseCase = inject(RefreshTokenUseCase);

  login(request: LoginRequest): Observable<AuthTokens> {
    return this.loginUseCase.execute(request);
  }

  logout(): Observable<void> {
    return this.logoutUseCase.execute();
  }

  refresh(universityId: string): Observable<string> {
    return this.refreshTokenUseCase.execute(universityId);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getUserName(): string {
    const nome = localStorage.getItem(USER_NOME_KEY) ?? '';
    const cognome = localStorage.getItem(USER_COGNOME_KEY) ?? '';
    return `${nome} ${cognome}`.trim();
  }

  getNome(): string {
    const nome = localStorage.getItem(USER_NOME_KEY) ?? '';
    return nome
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokens, ProfiloCarriera } from '../../domain/models/auth-tokens.model';
import { LoginRequest } from '../../domain/models/login-request.model';
import {
  LoginUseCase,
  ACCESS_TOKEN_KEY,
  UNIVERSITY_ID_KEY,
  USER_COGNOME_KEY,
  USER_NOME_KEY,
  PROFILI_KEY,
  HAS_CARRIERA_KEY,
} from '../usecases/login.usecase';
import { LogoutUseCase } from '../usecases/logout.usecase';
import { RefreshTokenUseCase } from '../usecases/refresh-token.usecase';
import { SwitchCarrieraUseCase } from 'src/app/features/dashboard/application/usecases/switch-carriera.usecase';

@Injectable()
export class AuthFacade {
  private readonly loginUseCase = inject(LoginUseCase);
  private readonly logoutUseCase = inject(LogoutUseCase);
  private readonly refreshTokenUseCase = inject(RefreshTokenUseCase);
  private readonly switchCarrieraUseCase = inject(SwitchCarrieraUseCase);

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

  getUniversityId(): string | null {
    return localStorage.getItem(UNIVERSITY_ID_KEY);
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

  getNomeCompleto(): string {
    const nome = localStorage.getItem(USER_NOME_KEY) ?? '';
    const cognome = localStorage.getItem(USER_COGNOME_KEY) ?? '';
    return [nome, cognome]
      .map(s =>
        s
          .toLowerCase()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
      )
      .join(' ')
      .trim();
  }

  getProfili(): ProfiloCarriera[] {
    const raw = localStorage.getItem(PROFILI_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as ProfiloCarriera[];
    } catch {
      return [];
    }
  }

  hasCarriera(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.hasCarriera === true;
    } catch {
      return false;
    }
  }

  switchCarriera(profilo: ProfiloCarriera): Observable<{ accessToken: string }> {
    return this.switchCarrieraUseCase.execute(profilo);
  }
}

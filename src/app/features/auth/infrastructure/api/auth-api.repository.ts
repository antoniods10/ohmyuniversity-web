import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthTokens } from '../../domain/models/auth-tokens.model';
import { LoginRequest } from '../../domain/models/login-request.model';
import { environment } from '@environments/environment';

@Injectable()
export class AuthApiRepository extends AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/v1/auth`;

  login(request: LoginRequest): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.base}/login`, request);
  }

  refresh(refreshToken: string, universityId: string): Observable<string> {
    return this.http.post(`${this.base}/refresh`, null, {
      params: { refreshToken, universityId },
      responseType: 'text',
    });
  }

  logout(refreshToken: string, universityId: string): Observable<void> {
    return this.http.post<void>(`${this.base}/logout`, null, {
      params: { refreshToken, universityId },
    });
  }
}

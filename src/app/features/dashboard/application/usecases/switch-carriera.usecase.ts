import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API } from '@shared/constants/shared/api.constants';
import { ACCESS_TOKEN_KEY } from 'src/app/features/auth/application/usecases/login.usecase';
import { ProfiloCarriera } from 'src/app/features/auth/domain/models/auth-tokens.model';

@Injectable()
export class SwitchCarrieraUseCase {
  private readonly http = inject(HttpClient);

  execute(profilo: ProfiloCarriera): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(API.auth.switchCarriera, null, {
        params: {
          stuId: profilo.stuId.toString(),
          matId: profilo.matId.toString(),
          matricola: profilo.matricola,
        },
      })
      .pipe(
        tap(response => {
          localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
        }),
      );
  }
}

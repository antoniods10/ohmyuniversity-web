import { HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ACCESS_TOKEN_KEY } from 'src/app/features/auth/application/usecases/login.usecase';
import { AuthFacade } from 'src/app/features/auth/application/facades/auth.facade';

const addBearer = (req: HttpRequest<unknown>, token: string) =>
  req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthFacade);

  if (req.url.includes('/v1/auth/')) return next(req);

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const outReq = token ? addBearer(req, token) : req;

  return next(outReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) return throwError(() => error);

      const universityId = localStorage.getItem('omu_university_id') ?? '';

      return auth.refresh(universityId).pipe(
        switchMap(newToken => next(addBearer(req, newToken))),
        catchError(refreshError => {
          auth.logout().subscribe();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../application/facades/auth.facade';

export const carrieraGuard: CanActivateFn = () => {
  const auth = inject(AuthFacade);
  const router = inject(Router);
  if (auth.hasCarriera()) return true;
  return router.createUrlTree(['/dashboard']);
};

import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { authGuard } from './auth.guard';
import { AuthFacade } from '../application/facades/auth.facade';

const authFacadeMock = {
  isLoggedIn: vi.fn(),
};

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const runGuard = () =>
  TestBed.runInInjectionContext(() =>
    authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
  );

describe('authGuard', () => {
  beforeEach(() => {
    authFacadeMock.isLoggedIn.mockReset();

    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacadeMock }],
    });
  });

  it('should return true when user is logged in', () => {
    authFacadeMock.isLoggedIn.mockReturnValue(true);
    expect(runGuard()).toBe(true);
  });

  it('should return a UrlTree when user is not logged in', () => {
    authFacadeMock.isLoggedIn.mockReturnValue(false);
    expect(runGuard()).toBeInstanceOf(UrlTree);
  });

  it('should redirect to /login when user is not logged in', () => {
    authFacadeMock.isLoggedIn.mockReturnValue(false);
    const result = runGuard() as UrlTree;
    const router = TestBed.inject(Router);
    expect(result.toString()).toBe(router.createUrlTree(['/login']).toString());
  });

  it('should call auth.isLoggedIn', () => {
    authFacadeMock.isLoggedIn.mockReturnValue(true);
    runGuard();
    expect(authFacadeMock.isLoggedIn).toHaveBeenCalled();
  });

  it('should not redirect when user is logged in', () => {
    authFacadeMock.isLoggedIn.mockReturnValue(true);
    expect(runGuard()).not.toBeInstanceOf(UrlTree);
  });
});

import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { carrieraGuard } from './carriera.guard';
import { AuthFacade } from '../application/facades/auth.facade';

const authFacadeMock = {
  hasCarriera: vi.fn(),
};

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const runGuard = () =>
  TestBed.runInInjectionContext(() =>
    carrieraGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
  );

describe('carrieraGuard', () => {
  beforeEach(() => {
    authFacadeMock.hasCarriera.mockReset();

    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacadeMock }],
    });
  });

  it('should return true when user has a carriera', () => {
    authFacadeMock.hasCarriera.mockReturnValue(true);
    expect(runGuard()).toBe(true);
  });

  it('should return a UrlTree when user has no carriera', () => {
    authFacadeMock.hasCarriera.mockReturnValue(false);
    expect(runGuard()).toBeInstanceOf(UrlTree);
  });

  it('should redirect to /dashboard when user has no carriera', () => {
    authFacadeMock.hasCarriera.mockReturnValue(false);
    const result = runGuard() as UrlTree;
    const router = TestBed.inject(Router);
    expect(result.toString()).toBe(router.createUrlTree(['/dashboard']).toString());
  });

  it('should call auth.hasCarriera', () => {
    authFacadeMock.hasCarriera.mockReturnValue(true);
    runGuard();
    expect(authFacadeMock.hasCarriera).toHaveBeenCalled();
  });

  it('should not redirect when user has a carriera', () => {
    authFacadeMock.hasCarriera.mockReturnValue(true);
    expect(runGuard()).not.toBeInstanceOf(UrlTree);
  });
});

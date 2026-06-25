import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { authInterceptor } from './auth.interceptor';
import { AuthFacade } from '../application/facades/auth.facade';
import { ACCESS_TOKEN_KEY } from '../application/usecases/auth/login.usecase';

const TEST_URL = '/api/v1/protected';

const authFacadeMock = {
  refresh: vi.fn(),
  logout: vi.fn(),
};

describe('authInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    authFacadeMock.refresh.mockReset();
    authFacadeMock.logout.mockReset();
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthFacade, useValue: authFacadeMock },
      ],
    });

    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
    localStorage.clear();
  });

  // ── Public routes (bypass) ────────────────────────────────────────────────

  it('should NOT add Authorization header to /v1/auth/login', () => {
    http.post('/v1/auth/login', {}).subscribe();
    const req = controller.expectOne('/v1/auth/login');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should NOT add Authorization header to /v1/auth/refresh', () => {
    http.post('/v1/auth/refresh', {}).subscribe();
    const req = controller.expectOne('/v1/auth/refresh');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should NOT add Authorization header to /v1/auth/logout', () => {
    http.post('/v1/auth/logout', {}).subscribe();
    const req = controller.expectOne('/v1/auth/logout');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  // ── Token attachment ──────────────────────────────────────────────────────

  it('should NOT add Authorization header when no token in localStorage', () => {
    http.get(TEST_URL).subscribe();
    const req = controller.expectOne(TEST_URL);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should add Bearer token when token exists in localStorage', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'my-token');
    http.get(TEST_URL).subscribe();
    const req = controller.expectOne(TEST_URL);
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-token');
    req.flush({});
  });

  it('should preserve the original request URL after cloning', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'my-token');
    http.get(TEST_URL).subscribe();
    const req = controller.expectOne(TEST_URL);
    expect(req.request.url).toBe(TEST_URL);
    req.flush({});
  });

  // ── Non-401 errors ────────────────────────────────────────────────────────

  it('should propagate non-401 errors without attempting refresh', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'my-token');
    let caughtError: unknown;

    http.get(TEST_URL).subscribe({ error: err => (caughtError = err) });
    controller
      .expectOne(TEST_URL)
      .flush('Server Error', { status: 500, statusText: 'Server Error' });

    expect(authFacadeMock.refresh).not.toHaveBeenCalled();
    expect((caughtError as { status: number }).status).toBe(500);
  });

  it('should propagate 403 errors without attempting refresh', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'my-token');
    let caughtError: unknown;

    http.get(TEST_URL).subscribe({ error: err => (caughtError = err) });
    controller.expectOne(TEST_URL).flush('Forbidden', { status: 403, statusText: 'Forbidden' });

    expect(authFacadeMock.refresh).not.toHaveBeenCalled();
    expect((caughtError as { status: number }).status).toBe(403);
  });

  // ── 401 → refresh success ─────────────────────────────────────────────────

  it('should call auth.refresh with the stored universityId on 401', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'old-token');
    localStorage.setItem('omu_university_id', 'UNIVE');
    authFacadeMock.refresh.mockReturnValue(of('new-token'));

    http.get(TEST_URL).subscribe();

    // First request → 401
    controller
      .expectOne(TEST_URL)
      .flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    // Retry request
    controller.expectOne(TEST_URL).flush({ ok: true });

    expect(authFacadeMock.refresh).toHaveBeenCalledWith('UNIVE');
  });

  it('should retry the original request with the new token after refresh', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'old-token');
    authFacadeMock.refresh.mockReturnValue(of('new-token'));

    let result: unknown;
    http.get(TEST_URL).subscribe(r => (result = r));

    controller
      .expectOne(TEST_URL)
      .flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    const retryReq = controller.expectOne(TEST_URL);

    expect(retryReq.request.headers.get('Authorization')).toBe('Bearer new-token');
    retryReq.flush({ data: 'ok' });
    expect(result).toEqual({ data: 'ok' });
  });

  it('should use empty string as universityId when none is stored', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'old-token');
    authFacadeMock.refresh.mockReturnValue(of('new-token'));

    http.get(TEST_URL).subscribe();

    controller
      .expectOne(TEST_URL)
      .flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    controller.expectOne(TEST_URL).flush({});

    expect(authFacadeMock.refresh).toHaveBeenCalledWith('');
  });

  // ── 401 → refresh failure ─────────────────────────────────────────────────

  it('should call auth.logout when refresh fails', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'old-token');
    authFacadeMock.refresh.mockReturnValue(throwError(() => new Error('refresh failed')));
    authFacadeMock.logout.mockReturnValue(of(void 0));

    http.get(TEST_URL).subscribe({ error: () => {} });

    controller
      .expectOne(TEST_URL)
      .flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(authFacadeMock.logout).toHaveBeenCalled();
  });

  it('should propagate the refresh error when refresh fails', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'old-token');
    const refreshError = new Error('refresh failed');
    authFacadeMock.refresh.mockReturnValue(throwError(() => refreshError));
    authFacadeMock.logout.mockReturnValue(of(void 0));

    let caughtError: unknown;
    http.get(TEST_URL).subscribe({ error: err => (caughtError = err) });

    controller
      .expectOne(TEST_URL)
      .flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(caughtError).toBe(refreshError);
  });
});

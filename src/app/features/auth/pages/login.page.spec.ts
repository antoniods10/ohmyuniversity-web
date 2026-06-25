import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { provideRouter } from '@angular/router';
import { APP, ORGANIZATION } from '@constants';
import { LoginMode } from '@types';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { of } from 'rxjs';
import { vi } from 'vitest';

const authFacadeMock = {
  login: vi.fn(() => of({ accessToken: 'fake-token' })),
};

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    authFacadeMock.login.mockReturnValue(of({ accessToken: 'fake-token' }));

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacadeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Creation
  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  // Initial state
  it('should initialize mode as "university"', () => {
    expect(component.mode()).toBe('university');
  });

  it('should expose APP.name constant', () => {
    expect(component.APP.name).toBe(APP.name);
  });

  it('should expose ORGANIZATION.name constant', () => {
    expect(component.ORGANIZATION.name).toBe(ORGANIZATION.name);
  });

  it('should define two modeTabs: university and partner', () => {
    expect(component.modeTabs).toHaveLength(2);
    expect(component.modeTabs[0].id).toBe('university');
    expect(component.modeTabs[1].id).toBe('partner');
  });

  // setMode
  it('should update mode to "partner" when setMode is called', () => {
    component.setMode('partner');
    expect(component.mode()).toBe('partner');
  });

  it('should update mode back to "university" when setMode is called again', () => {
    component.setMode('partner');
    component.setMode('university');
    expect(component.mode()).toBe('university');
  });

  it('should cast the argument to LoginMode', () => {
    component.setMode('partner');
    const mode: LoginMode = component.mode();
    expect(mode).toBe('partner');
  });

  // Header rendering
  it('should render the app name', () => {
    expect(fixture.nativeElement.textContent).toContain(APP.name);
  });

  it('should render the organization name subtitle', () => {
    expect(fixture.nativeElement.textContent).toContain(`by ${ORGANIZATION.name}`);
  });

  it('should render the app logo with correct alt text', () => {
    const imgs = Array.from(fixture.nativeElement.querySelectorAll('img')) as HTMLImageElement[];
    const logo = imgs.find(img => img.alt === APP.name);
    expect(logo).not.toBeUndefined();
  });

  // Tab component
  it('should render the custom-tabs component', () => {
    expect(fixture.nativeElement.querySelector('app-custom-tabs')).not.toBeNull();
  });

  // Mode switching
  it('should render the university login form by default', () => {
    expect(fixture.nativeElement.querySelector('app-university-login-form')).not.toBeNull();
  });

  it('should not render the partner login form by default', () => {
    expect(fixture.nativeElement.querySelector('app-partner-login-form')).toBeNull();
  });

  it('should render the partner login form after switching to partner mode', () => {
    component.setMode('partner');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-partner-login-form')).not.toBeNull();
  });

  it('should hide the university login form after switching to partner mode', () => {
    component.setMode('partner');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-university-login-form')).toBeNull();
  });

  // Marquee
  it('should render the marquee component', () => {
    expect(fixture.nativeElement.querySelector('app-login-marquee')).not.toBeNull();
  });

  // Footer
  it('should render the "Termini & Condizioni" link', () => {
    expect(fixture.nativeElement.textContent).toContain('Termini & Condizioni');
  });

  it('should render the "Privacy Policy" link', () => {
    expect(fixture.nativeElement.textContent).toContain('Privacy Policy');
  });
});

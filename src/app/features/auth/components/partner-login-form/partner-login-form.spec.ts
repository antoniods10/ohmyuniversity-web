import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerLoginFormComponent } from './partner-login-form.component';
import { provideRouter } from '@angular/router';
import { ToastService } from '@ui/custom-toast/toast.service';
import { vi } from 'vitest';

describe('PartnerLoginFormComponent', () => {
  let component: PartnerLoginFormComponent;
  let fixture: ComponentFixture<PartnerLoginFormComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerLoginFormComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerLoginFormComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  // Creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Initial state
  it('should initialize email as empty string', () => {
    expect(component.email).toBe('');
  });

  it('should initialize password as empty string', () => {
    expect(component.password).toBe('');
  });

  // canSubmit
  it('should return false for canSubmit when both fields are empty', () => {
    expect(component.canSubmit).toBe(false);
  });

  it('should return false for canSubmit when email is empty', () => {
    component.password = 'secret';
    expect(component.canSubmit).toBe(false);
  });

  it('should return false for canSubmit when password is empty', () => {
    component.email = 'info@azienda.it';
    expect(component.canSubmit).toBe(false);
  });

  it('should return false for canSubmit when fields contain only whitespace', () => {
    component.email = '   ';
    component.password = '   ';
    expect(component.canSubmit).toBe(false);
  });

  it('should return true for canSubmit when both fields are filled', () => {
    component.email = 'info@azienda.it';
    component.password = 'secret';
    expect(component.canSubmit).toBe(true);
  });

  // submit
  it('should not call toast when submit is called and canSubmit is false', () => {
    const spy = vi.spyOn(toastService, 'show');
    component.submit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call toast.show with warning variant when submit is called and canSubmit is true', () => {
    const spy = vi.spyOn(toastService, 'show');
    component.email = 'info@azienda.it';
    component.password = 'secret';
    component.submit();
    expect(spy).toHaveBeenCalledWith(expect.any(String), 'warning');
  });

  // notifyPasswordRecoveryUnavailable
  it('should call toast.show with warning variant when notifyPasswordRecoveryUnavailable is called', () => {
    const spy = vi.spyOn(toastService, 'show');
    component.notifyPasswordRecoveryUnavailable();
    expect(spy).toHaveBeenCalledWith(expect.any(String), 'warning');
  });

  // Template
  it('should render the email input', () => {
    const inputs = fixture.nativeElement.querySelectorAll('app-custom-input');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });

  it('should render the password input', () => {
    const inputs = fixture.nativeElement.querySelectorAll('app-custom-input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('should render the submit button', () => {
    expect(fixture.nativeElement.querySelector('app-custom-button')).not.toBeNull();
  });

  it('should render the "Password dimenticata?" button', () => {
    expect(fixture.nativeElement.textContent).toContain('Password dimenticata?');
  });

  it('should render the registration link', () => {
    expect(fixture.nativeElement.textContent).toContain("Richiedi l'accesso");
  });
});

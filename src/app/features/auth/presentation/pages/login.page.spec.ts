import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { provideRouter, Router } from '@angular/router';
import { USER_TYPE_OPTIONS, UNIVERSITIES } from '@constants';
import { vi } from 'vitest';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize on step 1', () => {
    expect(component.step()).toBe(1);
  });

  it('should initialize selectedType as null', () => {
    expect(component.selectedType()).toBeNull();
  });

  it('should initialize universitySearch as empty string', () => {
    expect(component.universitySearch()).toBe('');
  });

  it('should initialize selectedUniversity as null', () => {
    expect(component.selectedUniversity()).toBeNull();
  });

  it('should load userTypeOptions from USER_TYPE_OPTIONS constant', () => {
    expect(component.userTypeOptions).toEqual(USER_TYPE_OPTIONS);
  });

  it('should load universities from UNIVERSITIES constant', () => {
    expect(component.universities).toEqual(UNIVERSITIES);
  });

  it('should render the "by OhMyOpenSource!" subtitle', () => {
    expect(fixture.nativeElement.textContent).toContain('by OhMyOpenSource!');
  });

  it('should render the step 1 welcome heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Benvenuto');
  });

  it('should render one button per userTypeOption', () => {
    const optionButtons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    expect(optionButtons.length).toBeGreaterThanOrEqual(USER_TYPE_OPTIONS.length);
  });

  it('should render the "Continua" button on step 1', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const continua = Array.from(buttons).find((b: any) => b.textContent.includes('Continua'));
    expect(continua).not.toBeUndefined();
  });

  it('should render the "Continua" button as disabled when no type is selected', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const continua: any = Array.from(buttons).find((b: any) => b.textContent.includes('Continua'));
    expect(continua.disabled).toBe(true);
  });

  it('should render the footer "Termini & Condizioni" link', () => {
    expect(fixture.nativeElement.textContent).toContain('Termini & Condizioni');
  });

  it('should render the footer "Privacy Policy" link', () => {
    expect(fixture.nativeElement.textContent).toContain('Privacy Policy');
  });

  it('should NOT render step 2 content on step 1', () => {
    const backBtn = Array.from(fixture.nativeElement.querySelectorAll('button')).find((b: any) =>
      b.textContent.includes('Torna indietro'),
    );
    expect(backBtn).toBeUndefined();
  });

  it('should set selectedType when selectType is called', () => {
    component.selectType('academic');
    expect(component.selectedType()).toBe('academic');
  });

  it('should update selectedType when called with different type', () => {
    component.selectType('academic');
    component.selectType('organization');
    expect(component.selectedType()).toBe('organization');
  });

  it('should enable Continua button after selecting a type', () => {
    component.selectType('academic');
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const continua: any = Array.from(buttons).find((b: any) => b.textContent.includes('Continua'));
    expect(continua.disabled).toBe(false);
  });

  it('should highlight selected type button with border-blue-500', () => {
    component.selectType(USER_TYPE_OPTIONS[0].id);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button.rounded-xl');
    expect(buttons[0].classList).toContain('border-blue-500');
  });

  it('should NOT advance to step 2 if no type is selected', () => {
    component.goToStep2();
    expect(component.step()).toBe(1);
  });

  it('should advance to step 2 when type is selected and goToStep2 is called', () => {
    component.selectType('academic');
    component.goToStep2();
    expect(component.step()).toBe(2);
  });

  it('should advance to step 2 when Continua button is clicked with type selected', () => {
    component.selectType('academic');
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const continua: any = Array.from(buttons).find((b: any) => b.textContent.includes('Continua'));
    continua.click();
    fixture.detectChanges();
    expect(component.step()).toBe(2);
  });

  it('should return true for isAcademicFlow when type is "academic"', () => {
    component.selectType('academic');
    expect(component.isAcademicFlow()).toBe(true);
  });

  it('should return true for isAcademicFlow when type is "staff"', () => {
    component.selectType('staff');
    expect(component.isAcademicFlow()).toBe(true);
  });

  it('should return false for isAcademicFlow when type is "organization"', () => {
    component.selectType('organization');
    expect(component.isAcademicFlow()).toBe(false);
  });

  it('should render step 2A SSO heading after selecting academic type', () => {
    component.selectType('academic');
    component.goToStep2();
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Accedi con il tuo ateneo');
  });

  it('should render the university search input on step 2A', () => {
    component.selectType('academic');
    component.goToStep2();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="text"]');
    expect(input).not.toBeNull();
  });

  it('should render the SSO security info box on step 2A', () => {
    component.selectType('academic');
    component.goToStep2();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('non memorizza le tue credenziali');
  });

  it('should render the SSO CTA button disabled when no university is selected', () => {
    component.selectType('academic');
    component.goToStep2();
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const ssoCta: any = Array.from(buttons).find((b: any) =>
      b.textContent.includes('Seleziona un ateneo'),
    );
    expect(ssoCta).not.toBeUndefined();
    expect(ssoCta.disabled).toBe(true);
  });

  it('should render all universities initially on step 2A', () => {
    component.selectType('academic');
    component.goToStep2();
    fixture.detectChanges();
    expect(component.filteredUniversities().length).toBe(UNIVERSITIES.length);
  });

  it('should render step 2B org heading after selecting organization type', () => {
    component.selectType('organization');
    component.goToStep2();
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Accedi alla tua organizzazione');
  });

  it('should render the org email input on step 2B', () => {
    component.selectType('organization');
    component.goToStep2();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#org-email');
    expect(input).not.toBeNull();
  });

  it('should render the org password input on step 2B', () => {
    component.selectType('organization');
    component.goToStep2();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#org-password');
    expect(input).not.toBeNull();
  });

  it('should render the subscription required badge on step 2B', () => {
    component.selectType('organization');
    component.goToStep2();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('piano attivo');
  });

  it('should render the "Password dimenticata?" link on step 2B', () => {
    component.selectType('organization');
    component.goToStep2();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Password dimenticata?');
  });

  it('should go back to step 1 when goBack is called', () => {
    component.selectType('academic');
    component.goToStep2();
    component.goBack();
    expect(component.step()).toBe(1);
  });

  it('should reset selectedUniversity when goBack is called', () => {
    component.selectType('academic');
    component.goToStep2();
    component.selectUniversity(UNIVERSITIES[0]);
    component.goBack();
    expect(component.selectedUniversity()).toBeNull();
  });

  it('should reset universitySearch when goBack is called', () => {
    component.selectType('academic');
    component.goToStep2();
    component.onSearchInput('test');
    component.goBack();
    expect(component.universitySearch()).toBe('');
  });

  it('should go back to step 1 when "Torna indietro" button is clicked', () => {
    component.selectType('academic');
    component.goToStep2();
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const backBtn: any = Array.from(buttons).find((b: any) =>
      b.textContent.includes('Torna indietro'),
    );
    backBtn.click();
    fixture.detectChanges();
    expect(component.step()).toBe(1);
  });

  it('should return all universities when search is empty', () => {
    expect(component.filteredUniversities().length).toBe(UNIVERSITIES.length);
  });

  it('should filter universities by name', () => {
    const firstUni = UNIVERSITIES[0];
    component.onSearchInput(firstUni.name.slice(0, 4).toLowerCase());
    const results = component.filteredUniversities();
    expect(results.some(u => u.id === firstUni.id)).toBe(true);
  });

  it('should filter universities by shortName', () => {
    const firstUni = UNIVERSITIES[0];
    component.onSearchInput(firstUni.shortName.slice(0, 3).toLowerCase());
    const results = component.filteredUniversities();
    expect(results.some(u => u.id === firstUni.id)).toBe(true);
  });

  it('should return empty array when no university matches search', () => {
    component.onSearchInput('xyznonexistentuniversity999');
    expect(component.filteredUniversities().length).toBe(0);
  });

  it('should show "Nessun ateneo trovato" message when filteredUniversities is empty', () => {
    component.selectType('academic');
    component.goToStep2();
    component.onSearchInput('xyznonexistentuniversity999');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nessun ateneo trovato');
  });

  it('should set selectedUniversity when selectUniversity is called', () => {
    const uni = UNIVERSITIES[0];
    component.selectUniversity(uni);
    expect(component.selectedUniversity()).toEqual(uni);
  });

  it('should replace selectedUniversity when called with different university', () => {
    component.selectUniversity(UNIVERSITIES[0]);
    component.selectUniversity(UNIVERSITIES[1]);
    expect(component.selectedUniversity()).toEqual(UNIVERSITIES[1]);
  });

  it('should update universitySearch when onSearchInput is called', () => {
    component.onSearchInput('Bologna');
    expect(component.universitySearch()).toBe('Bologna');
  });

  it('should reset selectedUniversity when onSearchInput is called', () => {
    component.selectUniversity(UNIVERSITIES[0]);
    component.onSearchInput('altro');
    expect(component.selectedUniversity()).toBeNull();
  });

  it('should NOT navigate if no university is selected', () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate');
    component.proceedWithSSO();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should navigate to /dashboard when proceedWithSSO is called with a selected university', async () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate');
    component.selectUniversity(UNIVERSITIES[0]);
    component.proceedWithSSO();
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
  });
});

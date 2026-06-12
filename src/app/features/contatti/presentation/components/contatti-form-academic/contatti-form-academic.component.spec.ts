import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContattiFormAcademic } from './contatti-form-academic.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { By } from '@angular/platform-browser';
import { ACADEMIC_ROLES, ACADEMIC_SUBJECTS } from '@constants';

describe('ContattiFormAcademic', () => {
  let component: ContattiFormAcademic;
  let fixture: ComponentFixture<ContattiFormAcademic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContattiFormAcademic],
    }).compileComponents();

    fixture = TestBed.createComponent(ContattiFormAcademic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the outer container div', () => {
    const div = fixture.nativeElement.querySelector('.rounded-2xl');
    expect(div).not.toBeNull();
  });

  it('should render the h2 heading', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent).toContain('Scrivi al team OhMyUniversity');
  });

  it('should render the subtitle paragraph', () => {
    const p = fixture.nativeElement.querySelector('p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('Sei studente, docente o staff');
  });

  it('should render the form element', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).not.toBeNull();
  });

  // --- Campi input ---

  it('should render the name input field', () => {
    const input = fixture.nativeElement.querySelector('#ac-name');
    expect(input).not.toBeNull();
  });

  it('should render the email input field', () => {
    const input = fixture.nativeElement.querySelector('#ac-email');
    expect(input).not.toBeNull();
  });

  it('should render the email input with type="email"', () => {
    const input = fixture.nativeElement.querySelector('#ac-email');
    expect(input.type).toBe('email');
  });

  it('should render the role select field', () => {
    const select = fixture.nativeElement.querySelector('#ac-role');
    expect(select).not.toBeNull();
  });

  it('should render the ateneo input field', () => {
    const input = fixture.nativeElement.querySelector('#ac-ateneo');
    expect(input).not.toBeNull();
  });

  it('should render the subject select field', () => {
    const select = fixture.nativeElement.querySelector('#ac-subject');
    expect(select).not.toBeNull();
  });

  it('should render the message textarea', () => {
    const textarea = fixture.nativeElement.querySelector('#ac-message');
    expect(textarea).not.toBeNull();
  });

  it('should render the message textarea with rows="5"', () => {
    const textarea = fixture.nativeElement.querySelector('#ac-message');
    expect(textarea.rows).toBe(5);
  });

  // --- Label dei campi ---

  it('should render label for name field', () => {
    const label = fixture.nativeElement.querySelector('label[for="ac-name"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Nome e cognome');
  });

  it('should render label for email field', () => {
    const label = fixture.nativeElement.querySelector('label[for="ac-email"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Email istituzionale');
  });

  it('should render label for role field', () => {
    const label = fixture.nativeElement.querySelector('label[for="ac-role"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Il tuo ruolo');
  });

  it('should render label for ateneo field', () => {
    const label = fixture.nativeElement.querySelector('label[for="ac-ateneo"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Ateneo di appartenenza');
  });

  it('should render label for subject field', () => {
    const label = fixture.nativeElement.querySelector('label[for="ac-subject"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Oggetto');
  });

  it('should render label for message field', () => {
    const label = fixture.nativeElement.querySelector('label[for="ac-message"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Messaggio');
  });

  // --- Select options da costanti ---

  it('should populate the role select with options from ACADEMIC_ROLES', () => {
    const select = fixture.nativeElement.querySelector('#ac-role');
    const options = Array.from(select.querySelectorAll('option[value]:not([value=""])'));
    expect(options.length).toBe(ACADEMIC_ROLES.length);
  });

  it('should populate the subject select with options from ACADEMIC_SUBJECTS', () => {
    const select = fixture.nativeElement.querySelector('#ac-subject');
    const options = Array.from(select.querySelectorAll('option[value]:not([value=""])'));
    expect(options.length).toBe(ACADEMIC_SUBJECTS.length);
  });

  it('should render the role select with a disabled default option', () => {
    const defaultOption = fixture.nativeElement.querySelector('#ac-role option[disabled]');
    expect(defaultOption).not.toBeNull();
    expect(defaultOption.textContent.trim()).toBe('Seleziona');
  });

  it('should render the subject select with a disabled default option', () => {
    const defaultOption = fixture.nativeElement.querySelector('#ac-subject option[disabled]');
    expect(defaultOption).not.toBeNull();
  });

  // --- Stato iniziale ---

  it('should initialize the form with empty values', () => {
    expect(component.academicForm.name).toBe('');
    expect(component.academicForm.email).toBe('');
    expect(component.academicForm.ateneo).toBe('');
    expect(component.academicForm.role).toBe('');
    expect(component.academicForm.subject).toBe('');
    expect(component.academicForm.message).toBe('');
  });

  it('should initialize isLoading as false', () => {
    expect(component.isLoading).toBe(false);
  });

  it('should initialize succeeded as false', () => {
    expect(component.succeeded).toBe(false);
  });

  // --- Submit button ---

  it('should render the app-custom-button submit component', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button).not.toBeNull();
  });

  it('should render the submit button with label "Invia messaggio"', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.label).toBe('Invia messaggio');
  });

  it('should render the submit button with primary variant', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.variant).toBe('primary');
  });

  it('should render the submit button with type="submit"', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.type).toBe('submit');
  });

  it('should render the submit button with fullWidth=true', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.fullWidth).toBe(true);
  });

  it('should pass isLoading to the button loading input', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.loading).toBe(false);
  });

  it('should pass succeeded to the button succeeded input', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.succeeded).toBe(false);
  });

  it('should render the submit button with succeededLabel="Messaggio inviato!"', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.succeededLabel).toBe('Messaggio inviato!');
  });

  // --- Logica submit ---

  it('should set isLoading to true immediately when submitAcademic is called', () => {
    component.submitAcademic();
    expect(component.isLoading).toBe(true);
  });

  it('should reflect isLoading=true on the button after submit starts', () => {
    component.submitAcademic();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.loading).toBe(true);
  });

  it('should update academicForm.name when name input changes', () => {
    const input = fixture.nativeElement.querySelector('#ac-name');
    input.value = 'Mario Rossi';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.academicForm.name).toBe('Mario Rossi');
  });

  it('should update academicForm.email when email input changes', () => {
    const input = fixture.nativeElement.querySelector('#ac-email');
    input.value = 'mario@studenti.unimol.it';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.academicForm.email).toBe('mario@studenti.unimol.it');
  });

  it('should update academicForm.message when textarea changes', () => {
    const textarea = fixture.nativeElement.querySelector('#ac-message');
    textarea.value = 'Il mio messaggio';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.academicForm.message).toBe('Il mio messaggio');
  });

  // --- Footer ---

  it('should render the footer with direct email link', () => {
    const link = fixture.nativeElement.querySelector('a[href="mailto:hello@ohmyuniversity.it"]');
    expect(link).not.toBeNull();
  });

  it('should render the footer email link with correct address', () => {
    const link = fixture.nativeElement.querySelector('a[href="mailto:hello@ohmyuniversity.it"]');
    expect(link.textContent.trim()).toBe('hello@ohmyuniversity.it');
  });

  it('should render the "Preferisci l\'email diretta?" footer text', () => {
    expect(fixture.nativeElement.textContent).toContain("Preferisci l'email diretta?");
  });
});

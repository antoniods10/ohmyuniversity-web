import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContattiFormOrganization } from './contatti-form-organization.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { By } from '@angular/platform-browser';
import { ORG_TYPES } from '@constants';

describe('ContattiFormOrganization', () => {
  let component: ContattiFormOrganization;
  let fixture: ComponentFixture<ContattiFormOrganization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContattiFormOrganization],
    }).compileComponents();

    fixture = TestBed.createComponent(ContattiFormOrganization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- Creazione e struttura ---

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
    expect(h2.textContent).toContain('Entra in contatto con il team commerciale');
  });

  it('should render the subtitle paragraph', () => {
    const paragraphs = fixture.nativeElement.querySelectorAll('p');
    const texts = Array.from(paragraphs).map((p: any) => p.textContent);
    expect(texts.some((t: string) => t.includes("Sei un'azienda"))).toBe(true);
  });

  it('should render the promo banner', () => {
    const banner = fixture.nativeElement.querySelector('.bg-amber-50');
    expect(banner).not.toBeNull();
  });

  it('should render the promo banner with free trial text', () => {
    const banner = fixture.nativeElement.querySelector('.bg-amber-50');
    expect(banner.textContent).toContain('14 giorni di prova gratuita');
  });

  it('should render the form element', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).not.toBeNull();
  });

  // --- Campi input ---

  it('should render the org name input field', () => {
    const input = fixture.nativeElement.querySelector('#org-name');
    expect(input).not.toBeNull();
  });

  it('should render the org type select field', () => {
    const select = fixture.nativeElement.querySelector('#org-type');
    expect(select).not.toBeNull();
  });

  it('should render the contact name input field', () => {
    const input = fixture.nativeElement.querySelector('#org-contact');
    expect(input).not.toBeNull();
  });

  it('should render the email input field with type="email"', () => {
    const input = fixture.nativeElement.querySelector('#org-email');
    expect(input).not.toBeNull();
    expect(input.type).toBe('email');
  });

  it('should render the phone input field with type="tel"', () => {
    const input = fixture.nativeElement.querySelector('#org-phone');
    expect(input).not.toBeNull();
    expect(input.type).toBe('tel');
  });

  it('should render the message textarea', () => {
    const textarea = fixture.nativeElement.querySelector('#org-message');
    expect(textarea).not.toBeNull();
  });

  it('should render the message textarea with rows="5"', () => {
    const textarea = fixture.nativeElement.querySelector('#org-message');
    expect(textarea.rows).toBe(5);
  });

  // --- Label dei campi ---

  it('should render label for org name field', () => {
    const label = fixture.nativeElement.querySelector('label[for="org-name"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Nome organizzazione');
  });

  it('should render label for org type field', () => {
    const label = fixture.nativeElement.querySelector('label[for="org-type"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Tipo di organizzazione');
  });

  it('should render label for contact name field', () => {
    const label = fixture.nativeElement.querySelector('label[for="org-contact"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Nome del referente');
  });

  it('should render label for email field', () => {
    const label = fixture.nativeElement.querySelector('label[for="org-email"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Email aziendale');
  });

  it('should render label for phone field with "(opzionale)" hint', () => {
    const label = fixture.nativeElement.querySelector('label[for="org-phone"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Telefono');
    expect(label.textContent).toContain('opzionale');
  });

  it('should render label for message textarea', () => {
    const label = fixture.nativeElement.querySelector('label[for="org-message"]');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Raccontaci brevemente');
  });

  // --- Select options da costanti ---

  it('should populate the org type select with options from ORG_TYPES', () => {
    const select = fixture.nativeElement.querySelector('#org-type');
    const options = Array.from(select.querySelectorAll('option[value]:not([value=""])'));
    expect(options.length).toBe(ORG_TYPES.length);
  });

  it('should render the org type select with a disabled default option', () => {
    const defaultOption = fixture.nativeElement.querySelector('#org-type option[disabled]');
    expect(defaultOption).not.toBeNull();
    expect(defaultOption.textContent.trim()).toBe('Seleziona');
  });

  // --- Stato iniziale ---

  it('should initialize the form with empty values', () => {
    expect(component.orgForm.orgName).toBe('');
    expect(component.orgForm.orgType).toBe('');
    expect(component.orgForm.contactName).toBe('');
    expect(component.orgForm.email).toBe('');
    expect(component.orgForm.phone).toBe('');
    expect(component.orgForm.message).toBe('');
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

  it('should render the submit button with correct label', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.label).toBe('Invia richiesta - ti richiamiamo noi');
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

  it('should render the submit button with succeededLabel="Richiesta inviata!"', () => {
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.succeededLabel).toBe('Richiesta inviata!');
  });

  it('should set isLoading to true immediately when submitOrg is called', () => {
    component.submitOrg();
    expect(component.isLoading).toBe(true);
  });

  it('should reflect isLoading=true on the button after submit starts', () => {
    component.submitOrg();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.directive(CustomButtonComponent));
    expect(button.componentInstance.loading).toBe(true);
  });

  it('should update orgForm.orgName when org name input changes', () => {
    const input = fixture.nativeElement.querySelector('#org-name');
    input.value = 'Acme S.r.l.';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.orgForm.orgName).toBe('Acme S.r.l.');
  });

  it('should update orgForm.contactName when contact name input changes', () => {
    const input = fixture.nativeElement.querySelector('#org-contact');
    input.value = 'Giulia Bianchi';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.orgForm.contactName).toBe('Giulia Bianchi');
  });

  it('should update orgForm.email when email input changes', () => {
    const input = fixture.nativeElement.querySelector('#org-email');
    input.value = 'info@acme.it';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.orgForm.email).toBe('info@acme.it');
  });

  it('should update orgForm.phone when phone input changes', () => {
    const input = fixture.nativeElement.querySelector('#org-phone');
    input.value = '+39 02 1234567';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.orgForm.phone).toBe('+39 02 1234567');
  });

  it('should update orgForm.message when textarea changes', () => {
    const textarea = fixture.nativeElement.querySelector('#org-message');
    textarea.value = 'Siamo una startup fintech';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.orgForm.message).toBe('Siamo una startup fintech');
  });

  // --- Footer ---

  it('should render the footer with direct email link', () => {
    const link = fixture.nativeElement.querySelector('a[href="mailto:business@ohmyuniversity.it"]');
    expect(link).not.toBeNull();
  });

  it('should render the footer email link with correct address', () => {
    const link = fixture.nativeElement.querySelector('a[href="mailto:business@ohmyuniversity.it"]');
    expect(link.textContent.trim()).toBe('business@ohmyuniversity.it');
  });

  it('should render the "Preferisci l\'email diretta?" footer text', () => {
    expect(fixture.nativeElement.textContent).toContain("Preferisci l'email diretta?");
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsPage } from './terms-conditions.page';
import { provideRouter } from '@angular/router';
import { LEGAL_CONTACT_EMAIL, LEGAL_UPDATE } from '@constants';

describe('TermsPage', () => {
  let component: TermsPage;
  let fixture: ComponentFixture<TermsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should expose lastUpdated from LEGAL_UPDATE constant', () => {
    expect(component.lastUpdated).toBe(LEGAL_UPDATE.termsConditions);
  });

  it('should expose contactEmail from LEGAL_CONTACT_EMAIL constant', () => {
    expect(component.contactEmail).toBe(LEGAL_CONTACT_EMAIL);
  });

  it('should render the h1 heading with "Termini & Condizioni"', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('Termini & Condizioni');
  });

  it('should render the "Documento legale" label', () => {
    expect(fixture.nativeElement.textContent).toContain('Documento legale');
  });

  it('should render the lastUpdated value in the DOM', () => {
    expect(fixture.nativeElement.textContent).toContain(LEGAL_UPDATE.termsConditions);
  });

  it('should render the warning banner about acceptance of terms', () => {
    const banner = fixture.nativeElement.querySelector('.bg-amber-50');
    expect(banner).not.toBeNull();
    expect(banner.textContent).toContain('accettazione integrale');
  });

  it('should render all 11 section headings', () => {
    const headings = fixture.nativeElement.querySelectorAll('h2');
    expect(headings.length).toBe(11);
  });

  it('should render section 1 about "Definizioni"', () => {
    expect(fixture.nativeElement.textContent).toContain('Definizioni');
  });

  it('should render section 2 about "Descrizione del servizio"', () => {
    expect(fixture.nativeElement.textContent).toContain('Descrizione del servizio');
  });

  it('should render section 3 about "Accesso alla piattaforma"', () => {
    expect(fixture.nativeElement.textContent).toContain('Accesso alla piattaforma');
  });

  it('should render section 4 about user obligations', () => {
    expect(fixture.nativeElement.textContent).toContain('Obblighi e responsabilità');
  });

  it('should render section 10 about applicable law', () => {
    expect(fixture.nativeElement.textContent).toContain('Legge applicabile');
  });

  it('should render section 11 about contacts', () => {
    expect(fixture.nativeElement.textContent).toContain('Contatti');
  });

  it('should render the "natura del servizio" info box', () => {
    expect(fixture.nativeElement.textContent).toContain('Natura del servizio');
  });

  it('should render the amber disclaimer banner in section 5', () => {
    const banners = fixture.nativeElement.querySelectorAll('.bg-amber-50');
    expect(banners.length).toBeGreaterThanOrEqual(1);
  });

  it('should render the contact email as a mailto link', () => {
    const links = fixture.nativeElement.querySelectorAll(`a[href="mailto:${LEGAL_CONTACT_EMAIL}"]`);
    expect(links.length).toBeGreaterThan(0);
  });

  it('should render the contact email text in the mailto link', () => {
    const link = fixture.nativeElement.querySelector(`a[href="mailto:${LEGAL_CONTACT_EMAIL}"]`);
    expect(link.textContent.trim()).toBe(LEGAL_CONTACT_EMAIL);
  });

  it('should render the Privacy Policy routerLink in related documents', () => {
    expect(fixture.nativeElement.textContent).toContain('Privacy Policy');
  });

  it('should render the Cookie Policy routerLink in related documents', () => {
    expect(fixture.nativeElement.textContent).toContain('Cookie Policy');
  });

  it('should render the related documents section', () => {
    const relatedSection = fixture.nativeElement.querySelector('.bg-gray-50');
    expect(relatedSection).not.toBeNull();
  });
});

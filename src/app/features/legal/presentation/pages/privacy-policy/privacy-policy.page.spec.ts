import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrivacyPolicyPage } from './privacy-policy.page';
import { provideRouter } from '@angular/router';
import { LEGAL_CONTACT_EMAIL, LEGAL_UPDATE } from '@constants';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';

describe('PrivacyPolicyPage', () => {
  let component: PrivacyPolicyPage;
  let fixture: ComponentFixture<PrivacyPolicyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should expose lastUpdated from LEGAL_UPDATE constant', () => {
    expect(component.lastUpdated).toBe(LEGAL_UPDATE.privacyPolicy);
  });

  it('should expose contactEmail from LEGAL_CONTACT_EMAIL constant', () => {
    expect(component.contactEmail).toBe(LEGAL_CONTACT_EMAIL);
  });

  it('should render the h1 heading with "Privacy Policy"', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('Privacy Policy');
  });

  it('should render the "Documento legale" label', () => {
    expect(fixture.nativeElement.textContent).toContain('Documento legale');
  });

  it('should render the lastUpdated value in the DOM', () => {
    expect(fixture.nativeElement.textContent).toContain(LEGAL_UPDATE.privacyPolicy);
  });

  it('should render the GDPR information banner', () => {
    const statusCards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(statusCards.length).toBe(1);

    const banner = statusCards[0].componentInstance as CardStatusComponent;
    expect(banner.statusVariant).toBe('info');
    expect(banner.description).toBe(component.intro.legalBasis);
    expect(component.intro.legalBasis).toContain('GDPR');
  });

  it('should render all 7 section headings', () => {
    const headings = fixture.nativeElement.querySelectorAll('h2');
    expect(headings.length).toBe(7);
  });

  it('should render section 1 about "Titolare del trattamento"', () => {
    expect(fixture.nativeElement.textContent).toContain('Titolare del trattamento');
  });

  it('should render section 2 about "Tipologie di dati trattati"', () => {
    expect(fixture.nativeElement.textContent).toContain('Tipologie di dati trattati');
  });

  it('should render section 3 about "Finalità e base giuridica"', () => {
    expect(fixture.nativeElement.textContent).toContain('Finalità e base giuridica');
  });

  it('should render section 5 about user rights (GDPR artt. 15–22)', () => {
    expect(fixture.nativeElement.textContent).toContain("Diritti dell'interessato");
  });

  it('should render the GDPR legal basis table', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).not.toBeNull();
  });

  it('should render the contact email as a mailto link', () => {
    const links = fixture.nativeElement.querySelectorAll(`a[href="mailto:${LEGAL_CONTACT_EMAIL}"]`);
    expect(links.length).toBeGreaterThan(0);
  });

  it('should render the contact email text in the mailto link', () => {
    const link = fixture.nativeElement.querySelector(`a[href="mailto:${LEGAL_CONTACT_EMAIL}"]`);
    expect(link.textContent.trim()).toBe(LEGAL_CONTACT_EMAIL);
  });

  it('should render the Cookie Policy routerLink in related documents', () => {
    expect(fixture.nativeElement.textContent).toContain('Cookie Policy');
  });

  it('should render the Termini & Condizioni routerLink in related documents', () => {
    expect(fixture.nativeElement.textContent).toContain('Termini & Condizioni');
  });

  it('should render the related documents section as an app-custom-card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
    const relatedDocsCard = cards.find(de =>
      (de.nativeElement as HTMLElement).textContent?.includes('Documenti correlati'),
    );

    expect(relatedDocsCard).not.toBeUndefined();
  });
});

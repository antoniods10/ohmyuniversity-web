import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BusinessOffertaPage } from './business-offerta.page';
import { BUSINESS_OFFERS, BUSINESS_DIFFERENTIATORS } from '@constants';

describe('BusinessOffertaPage', () => {
  let component: BusinessOffertaPage;
  let fixture: ComponentFixture<BusinessOffertaPage>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessOffertaPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessOffertaPage);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose offers from BUSINESS_OFFERS constant', () => {
    expect(component.offers).toBe(BUSINESS_OFFERS);
  });

  it('should expose differentiators from BUSINESS_DIFFERENTIATORS constant', () => {
    expect(component.differentiators).toBe(BUSINESS_DIFFERENTIATORS);
  });

  it('should have at least one offer', () => {
    expect(component.offers.length).toBeGreaterThan(0);
  });

  it('should have at least one differentiator', () => {
    expect(component.differentiators.length).toBeGreaterThan(0);
  });

  it('should render app-business-hero', () => {
    expect(nativeEl.querySelector('app-business-hero')).not.toBeNull();
  });

  it('should pass correct title to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('title')).toBe('Cosa offriamo alle aziende');
  });

  it('should pass correct subtitle to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('subtitle')).toContain('connessioni reali');
  });

  it('should render app-business-cta', () => {
    expect(nativeEl.querySelector('app-business-cta')).not.toBeNull();
  });

  it('should pass correct title to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('title')).toContain('azienda su OhMyUniversity');
  });

  it('should pass correct subtitle to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('subtitle')).toContain('14 giorni di prova gratuita');
  });

  it('should pass correct primaryLabel to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('primaryLabel')).toBe('Inizia la prova gratuita');
  });

  it('should pass correct primaryLink to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('primaryLink')).toBe('/business/registrazione');
  });

  it('should pass correct secondaryLabel to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('secondaryLabel')).toBe('Vedi i piani');
  });

  it('should pass correct secondaryLink to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('secondaryLink')).toBe('/business/prezzi');
  });

  it('should render one card per offer', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-xl.border.border-gray-100');
    expect(cards.length).toBe(BUSINESS_OFFERS.length);
  });

  it('should render each offer emoji', () => {
    const emojis = Array.from(nativeEl.querySelectorAll('span.text-3xl'));
    const rendered = emojis.map(e => e.textContent?.trim());
    BUSINESS_OFFERS.forEach(o => expect(rendered).toContain(o.emoji));
  });

  it('should render each offer title in an h3', () => {
    const h3s = Array.from(nativeEl.querySelectorAll('h3'));
    const titles = h3s.map(h => h.textContent?.trim());
    BUSINESS_OFFERS.forEach(o => expect(titles).toContain(o.title));
  });

  it('should render each offer description', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_OFFERS.forEach(o => expect(allText).toContain(o.description.substring(0, 30)));
  });

  it('should render exactly as many h3 elements as offers', () => {
    expect(nativeEl.querySelectorAll('h3').length).toBe(BUSINESS_OFFERS.length);
  });

  it('should render offer cards with shadow-sm', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-xl.shadow-sm');
    expect(cards.length).toBeGreaterThanOrEqual(BUSINESS_OFFERS.length);
  });

  it('should render the "Perché OhMyUniversity è diverso" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('diverso dagli altri'))).toBe(true);
  });

  it('should render the differentiators subtitle', () => {
    expect(nativeEl.textContent).toContain('portali per il recruiting');
  });

  it('should render one card per differentiator', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-xl.border.border-gray-200');
    expect(cards.length).toBe(BUSINESS_DIFFERENTIATORS.length);
  });

  it('should render each differentiator title', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_DIFFERENTIATORS.forEach(d => expect(allText).toContain(d.title));
  });

  it('should render each differentiator description', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_DIFFERENTIATORS.forEach(d =>
      expect(allText).toContain(d.description.substring(0, 30)),
    );
  });

  it('should render a checkmark badge for each differentiator', () => {
    const badges = nativeEl.querySelectorAll(
      'div.rounded-xl.border.border-gray-200 div.bg-blue-600',
    );
    expect(badges.length).toBe(BUSINESS_DIFFERENTIATORS.length);
  });

  it('should render "✓" inside each differentiator badge', () => {
    const badges = Array.from(
      nativeEl.querySelectorAll('div.rounded-xl.border.border-gray-200 div.bg-blue-600'),
    );
    badges.forEach(badge => expect(badge.textContent?.trim()).toBe('✓'));
  });

  it('should render the "La nostra audience in numeri" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('audience in numeri'))).toBe(true);
  });

  it('should render 4 stat blocks', () => {
    const stats = nativeEl.querySelectorAll('p.text-4xl');
    expect(stats.length).toBe(4);
  });

  it('should render the "120k+" stat value', () => {
    const stats = Array.from(nativeEl.querySelectorAll('p.text-4xl'));
    expect(stats.some(s => s.textContent?.trim() === '120k+')).toBe(true);
  });

  it('should render the "50+" stat value', () => {
    const stats = Array.from(nativeEl.querySelectorAll('p.text-4xl'));
    expect(stats.some(s => s.textContent?.trim() === '50+')).toBe(true);
  });

  it('should render the "4.8★" stat value', () => {
    const stats = Array.from(nativeEl.querySelectorAll('p.text-4xl'));
    expect(stats.some(s => s.textContent?.trim() === '4.8★')).toBe(true);
  });

  it('should render the "78%" stat value', () => {
    const stats = Array.from(nativeEl.querySelectorAll('p.text-4xl'));
    expect(stats.some(s => s.textContent?.trim() === '78%')).toBe(true);
  });

  it('should render "Studenti attivi" stat label', () => {
    expect(nativeEl.textContent).toContain('Studenti attivi');
  });

  it('should render "Atenei italiani" stat label', () => {
    expect(nativeEl.textContent).toContain('Atenei italiani');
  });

  it('should render "Rating medio app" stat label', () => {
    expect(nativeEl.textContent).toContain('Rating medio app');
  });

  it('should render "Utenti attivi settimanali" stat label', () => {
    expect(nativeEl.textContent).toContain('Utenti attivi settimanali');
  });

  it('should apply text-blue-600 to all stat values', () => {
    const stats = nativeEl.querySelectorAll('p.text-4xl.text-blue-600');
    expect(stats.length).toBe(4);
  });

  it('should render 5 sections', () => {
    expect(nativeEl.querySelectorAll('section').length).toBe(5);
  });

  it('should render the offers section with bg-white', () => {
    const sections = Array.from(nativeEl.querySelectorAll('section.bg-white'));
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should render the differentiators section with bg-gray-50', () => {
    expect(nativeEl.querySelector('section.bg-gray-50')).not.toBeNull();
  });

  it('should render the stats section with bg-white', () => {
    const sections = Array.from(nativeEl.querySelectorAll('section.bg-white'));
    expect(sections.length).toBe(3);
  });
});

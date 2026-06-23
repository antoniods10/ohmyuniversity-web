import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BusinessOffertaPage } from './business-offerta.page';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import {
  CardSimpleComponent,
  CardStatusComponent,
  CardStatComponent,
} from '@ui/custom-card/card-variants.component';
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
    const hero = fixture.debugElement.query(By.directive(BusinessHeroComponent));
    expect((hero.componentInstance as BusinessHeroComponent).subtitle()).toContain(
      'connessioni reali',
    );
  });

  it('should render app-business-cta', () => {
    expect(nativeEl.querySelector('app-business-cta')).not.toBeNull();
  });

  it('should pass correct title to app-business-cta', () => {
    const cta = fixture.debugElement.query(By.directive(BusinessCtaComponent));
    expect((cta.componentInstance as BusinessCtaComponent).title()).toContain(
      'azienda su OhMyUniversity',
    );
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

  it('should render one app-card-simple per offer', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    expect(cards.length).toBe(BUSINESS_OFFERS.length);
  });

  it('should pass the correct title and body to each offer card', () => {
    const cards = fixture.debugElement
      .queryAll(By.directive(CardSimpleComponent))
      .map(de => de.componentInstance as CardSimpleComponent);

    BUSINESS_OFFERS.forEach((offer, i) => {
      expect(cards[i].title).toBe(offer.title);
      expect(cards[i].body).toBe(offer.description);
    });
  });

  it('should render each offer title in an h3', () => {
    const h3s = Array.from(nativeEl.querySelectorAll('h3.card-simple__title'));
    const titles = h3s.map(h => h.textContent?.trim());
    BUSINESS_OFFERS.forEach(o => expect(titles).toContain(o.title));
  });

  it('should render exactly as many h3 elements as offers', () => {
    expect(nativeEl.querySelectorAll('h3.card-simple__title').length).toBe(BUSINESS_OFFERS.length);
  });

  it('should pass shadow="sm" to every offer card', () => {
    const cards = fixture.debugElement
      .queryAll(By.directive(CardSimpleComponent))
      .map(de => de.componentInstance as CardSimpleComponent);

    cards.forEach(c => expect(c.shadow).toBe('sm'));
  });

  it('should render the "Perché OhMyUniversity è diverso" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('diverso dagli altri'))).toBe(true);
  });

  it('should render the differentiators subtitle', () => {
    expect(nativeEl.textContent).toContain('portali per il recruiting');
  });

  it('should render one app-card-status per differentiator', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    expect(cards.length).toBe(BUSINESS_DIFFERENTIATORS.length);
  });

  it('should pass the correct title and description to each differentiator card', () => {
    const cards = fixture.debugElement
      .queryAll(By.directive(CardStatusComponent))
      .map(de => de.componentInstance as CardStatusComponent);

    BUSINESS_DIFFERENTIATORS.forEach((d, i) => {
      expect(cards[i].title).toBe(d.title);
      expect(cards[i].description).toBe(d.description);
    });
  });

  it('should pass statusVariant="info" to every differentiator card', () => {
    const cards = fixture.debugElement
      .queryAll(By.directive(CardStatusComponent))
      .map(de => de.componentInstance as CardStatusComponent);

    cards.forEach(c => expect(c.statusVariant).toBe('info'));
  });

  it('should render the "La nostra audience in numeri" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('audience in numeri'))).toBe(true);
  });

  it('should render 4 app-card-stat blocks', () => {
    const stats = fixture.debugElement.queryAll(By.directive(CardStatComponent));
    expect(stats.length).toBe(4);
  });

  it('should render the "120k+" stat (value="120k+")', () => {
    const stats = fixture.debugElement
      .queryAll(By.directive(CardStatComponent))
      .map(de => de.componentInstance as CardStatComponent);
    expect(stats.some(s => s.value === '120k+')).toBe(true);
  });

  it('should render the "50+" stat (value="50+")', () => {
    const stats = fixture.debugElement
      .queryAll(By.directive(CardStatComponent))
      .map(de => de.componentInstance as CardStatComponent);
    expect(stats.some(s => s.value === '50+')).toBe(true);
  });

  it('should render the "4.8★" stat (value="4.8", suffix="★")', () => {
    const stats = fixture.debugElement
      .queryAll(By.directive(CardStatComponent))
      .map(de => de.componentInstance as CardStatComponent);
    expect(stats.some(s => s.value === '4.8' && s.suffix === '★')).toBe(true);
  });

  it('should render the "78%" stat (value="78", suffix="%")', () => {
    const stats = fixture.debugElement
      .queryAll(By.directive(CardStatComponent))
      .map(de => de.componentInstance as CardStatComponent);
    expect(stats.some(s => s.value === '78' && s.suffix === '%')).toBe(true);
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

  it('should pass variant="default" and bordered=false to every stat card', () => {
    const stats = fixture.debugElement
      .queryAll(By.directive(CardStatComponent))
      .map(de => de.componentInstance as CardStatComponent);

    stats.forEach(s => {
      expect(s.variant).toBe('default');
      expect(s.bordered).toBe(false);
    });
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

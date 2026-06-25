import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BusinessCollettiviPage } from './business-collettivi.page';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { CardSimpleComponent, CardMinimalComponent } from '@ui/custom-card/card-variants.component';
import { USE_CASES, VANTAGGI } from '@constants';

describe('BusinessCollettiviPage', () => {
  let component: BusinessCollettiviPage;
  let fixture: ComponentFixture<BusinessCollettiviPage>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessCollettiviPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessCollettiviPage);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose useCases from USE_CASES constant', () => {
    expect(component.useCases).toBe(USE_CASES);
  });

  it('should expose vantaggi from VANTAGGI constant', () => {
    expect(component.vantaggi).toBe(VANTAGGI);
  });

  it('should have at least one use case', () => {
    expect(component.useCases.length).toBeGreaterThan(0);
  });

  it('should have at least one vantaggio', () => {
    expect(component.vantaggi.length).toBeGreaterThan(0);
  });

  it('should render app-business-hero component', () => {
    expect(nativeEl.querySelector('app-business-hero')).not.toBeNull();
  });

  it('should pass correct badge to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('badge')).toBe('Per i collettivi studenteschi');
  });

  it('should pass correct title to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('title')).toBe('Cosa offriamo ai collettivi');
  });

  it('should pass correct subtitle to app-business-hero', () => {
    const hero = fixture.debugElement.query(By.directive(BusinessHeroComponent));
    expect((hero.componentInstance as BusinessHeroComponent).subtitle()).toContain(
      'non è solo per le aziende',
    );
  });

  it('should render app-business-cta component', () => {
    expect(nativeEl.querySelector('app-business-cta')).not.toBeNull();
  });

  it('should pass correct badge to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('badge')).toBe('Per i collettivi studenteschi');
  });

  it('should pass correct title to app-business-cta', () => {
    const cta = fixture.debugElement.query(By.directive(BusinessCtaComponent));
    expect((cta.componentInstance as BusinessCtaComponent).title()).toContain(
      'collettivo su OhMyUniversity',
    );
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

  it('should render one card per use case', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    expect(cards.length).toBe(USE_CASES.length);
  });

  it('should render the "Per quale tipo di collettivo sei?" heading', () => {
    const headings = nativeEl.querySelectorAll('h2');
    const found = Array.from(headings).find(h =>
      h.textContent?.includes('Per quale tipo di collettivo sei?'),
    );
    expect(found).not.toBeUndefined();
  });

  it('should render each use case title in an h3', () => {
    const h3s = Array.from(nativeEl.querySelectorAll('h3'));
    const titles = h3s.map(h => h.textContent?.trim());
    USE_CASES.forEach(uc => expect(titles).toContain(uc.title));
  });

  it('should render each use case description', () => {
    const allText = nativeEl.textContent ?? '';
    USE_CASES.forEach(uc => {
      expect(allText).toContain(uc.description.substring(0, 30));
    });
  });

  it('should render exactly as many h3 headings as use cases', () => {
    const h3s = nativeEl.querySelectorAll('h3');
    expect(h3s.length).toBe(USE_CASES.length);
  });

  it('should render the "Pensato anche per voi" heading', () => {
    const headings = nativeEl.querySelectorAll('h2');
    const found = Array.from(headings).find(h => h.textContent?.includes('Pensato anche per voi'));
    expect(found).not.toBeUndefined();
  });

  it('should render one list item per vantaggio', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardMinimalComponent));
    expect(cards.length).toBe(VANTAGGI.length);
  });

  it('should render each vantaggio text', () => {
    const allText = nativeEl.textContent ?? '';
    VANTAGGI.forEach(v => expect(allText).toContain(v.substring(0, 30)));
  });

  it('should render a checkmark icon for each vantaggio', () => {
    const cards = fixture.debugElement
      .queryAll(By.directive(CardMinimalComponent))
      .map(de => de.componentInstance as CardMinimalComponent);
    expect(cards.length).toBe(VANTAGGI.length);
    cards.forEach(c => expect(c.icon).toBeTruthy());
  });

  it('should render each checkmark icon with text-blue-600 class', () => {
    const icons = nativeEl.querySelectorAll('li svg');
    icons.forEach(icon => expect(icon.classList).toContain('text-blue-600'));
  });

  it('should render the discount callout box', () => {
    expect(nativeEl.querySelector('div.bg-amber-50')).not.toBeNull();
  });

  it('should render the callout amber border', () => {
    expect(nativeEl.querySelector('div.border-amber-200')).not.toBeNull();
  });

  it('should render the callout heading about collettivi studenteschi', () => {
    expect(nativeEl.textContent).toContain('Sei un collettivo studentesco universitario?');
  });

  it('should render the 40% discount mention in the callout', () => {
    expect(nativeEl.textContent).toContain('40%');
  });

  it('should render the onboarding affiliation mention in the callout', () => {
    expect(nativeEl.textContent).toContain('affiliazione universitaria');
  });

  it('should render callout title with text-amber-800 class', () => {
    expect(nativeEl.querySelector('p.text-amber-800')).not.toBeNull();
  });

  it('should render callout body with text-amber-700 class', () => {
    expect(nativeEl.querySelector('p.text-amber-700')).not.toBeNull();
  });

  it('should render use cases section with bg-white', () => {
    expect(nativeEl.querySelector('section.bg-white')).not.toBeNull();
  });

  it('should render vantaggi section with bg-gray-50', () => {
    expect(nativeEl.querySelector('section.bg-gray-50')).not.toBeNull();
  });
});

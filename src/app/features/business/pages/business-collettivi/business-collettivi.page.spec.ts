import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BusinessCollettiviPage } from './business-collettivi.page';
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
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero).not.toBeNull();
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
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('subtitle')).toContain('non è solo per le aziende');
  });

  it('should render app-business-cta component', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta).not.toBeNull();
  });

  it('should pass correct badge to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('badge')).toBe('Per i collettivi studenteschi');
  });

  it('should pass correct title to app-business-cta', () => {
    const cta = nativeEl.querySelector('app-business-cta');
    expect(cta?.getAttribute('title')).toContain('collettivo su OhMyUniversity');
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
    const cards = nativeEl.querySelectorAll('div.rounded-xl.border.border-gray-100');
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
    const items = nativeEl.querySelectorAll('li');
    expect(items.length).toBe(VANTAGGI.length);
  });

  it('should render each vantaggio text', () => {
    const allText = nativeEl.textContent ?? '';
    VANTAGGI.forEach(v => expect(allText).toContain(v.substring(0, 30)));
  });

  it('should render a checkmark icon for each vantaggio', () => {
    const icons = nativeEl.querySelectorAll('li svg');
    expect(icons.length).toBe(VANTAGGI.length);
  });

  it('should render each checkmark icon with text-blue-600 class', () => {
    const icons = nativeEl.querySelectorAll('li svg');
    icons.forEach(icon => expect(icon.classList).toContain('text-blue-600'));
  });

  it('should render the discount callout box', () => {
    const callout = nativeEl.querySelector('div.bg-amber-50');
    expect(callout).not.toBeNull();
  });

  it('should render the callout amber border', () => {
    const callout = nativeEl.querySelector('div.border-amber-200');
    expect(callout).not.toBeNull();
  });

  it('should render the callout heading about collettivi studenteschi', () => {
    const allText = nativeEl.textContent ?? '';
    expect(allText).toContain('Sei un collettivo studentesco universitario?');
  });

  it('should render the 40% discount mention in the callout', () => {
    const allText = nativeEl.textContent ?? '';
    expect(allText).toContain('40%');
  });

  it('should render the onboarding affiliation mention in the callout', () => {
    const allText = nativeEl.textContent ?? '';
    expect(allText).toContain('affiliazione universitaria');
  });

  it('should render callout title with text-amber-800 class', () => {
    const title = nativeEl.querySelector('p.text-amber-800');
    expect(title).not.toBeNull();
  });

  it('should render callout body with text-amber-700 class', () => {
    const body = nativeEl.querySelector('p.text-amber-700');
    expect(body).not.toBeNull();
  });

  it('should render use cases section with bg-white', () => {
    const section = nativeEl.querySelector('section.bg-white');
    expect(section).not.toBeNull();
  });

  it('should render vantaggi section with bg-gray-50', () => {
    const section = nativeEl.querySelector('section.bg-gray-50');
    expect(section).not.toBeNull();
  });
});

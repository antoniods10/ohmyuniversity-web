import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BusinessRegistrazionePage } from './business-registrazione.page';
import {
  BUSINESS_REGISTRAZIONE_STEPS,
  BUSINESS_REGISTRAZIONE_REQUIREMENTS,
  BUSINESS_REGISTRAZIONE_FAQ,
} from '@constants';

describe('BusinessRegistrazionePage', () => {
  let component: BusinessRegistrazionePage;
  let fixture: ComponentFixture<BusinessRegistrazionePage>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRegistrazionePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessRegistrazionePage);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose steps from BUSINESS_REGISTRAZIONE_STEPS', () => {
    expect(component.steps).toBe(BUSINESS_REGISTRAZIONE_STEPS);
  });

  it('should expose requirements from BUSINESS_REGISTRAZIONE_REQUIREMENTS', () => {
    expect(component.requirements).toBe(BUSINESS_REGISTRAZIONE_REQUIREMENTS);
  });

  it('should expose faq from BUSINESS_REGISTRAZIONE_FAQ', () => {
    expect(component.faq).toBe(BUSINESS_REGISTRAZIONE_FAQ);
  });

  it('should have at least one step', () => {
    expect(component.steps.length).toBeGreaterThan(0);
  });

  it('should have at least one requirement', () => {
    expect(component.requirements.length).toBeGreaterThan(0);
  });

  it('should have at least one faq item', () => {
    expect(component.faq.length).toBeGreaterThan(0);
  });

  it('should render app-business-hero', () => {
    expect(nativeEl.querySelector('app-business-hero')).not.toBeNull();
  });

  it('should pass correct title to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('title')).toBe('Come creare un profilo organizzazione');
  });

  it('should pass correct subtitle to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('subtitle')).toContain('meno di una settimana');
  });

  it('should render the "Il processo, passo dopo passo" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('passo dopo passo'))).toBe(true);
  });

  it('should render one step block per step', () => {
    const stepBlocks = nativeEl.querySelectorAll('div.rounded-xl.border.border-gray-100.bg-white');
    expect(stepBlocks.length).toBe(BUSINESS_REGISTRAZIONE_STEPS.length);
  });

  it('should render each step number badge', () => {
    const badges = Array.from(nativeEl.querySelectorAll('div.bg-blue-600.rounded-full'));
    const numbers = badges.map(b => Number.parseInt(b.textContent?.trim() ?? '0', 10));
    BUSINESS_REGISTRAZIONE_STEPS.forEach(s => expect(numbers).toContain(s.number));
  });

  it('should render each step title', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_REGISTRAZIONE_STEPS.forEach(s => expect(allText).toContain(s.title));
  });

  it('should render each step description', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_REGISTRAZIONE_STEPS.forEach(s =>
      expect(allText).toContain(s.description.substring(0, 30)),
    );
  });

  it('should render each step duration badge', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_REGISTRAZIONE_STEPS.forEach(s => expect(allText).toContain(s.duration));
  });

  it('should prefix duration with ~', () => {
    const durationBadges = Array.from(nativeEl.querySelectorAll('span.rounded-full.bg-gray-100'));
    durationBadges.forEach(badge => {
      expect(badge.textContent?.trim().startsWith('~')).toBe(true);
    });
  });

  it('should render a connector line between steps (not after last)', () => {
    const connectors = nativeEl.querySelectorAll('div.w-px.bg-gray-200');
    expect(connectors.length).toBe(BUSINESS_REGISTRAZIONE_STEPS.length - 1);
  });

  it('should NOT render a connector line after the last step', () => {
    const connectors = nativeEl.querySelectorAll('div.w-px.bg-gray-200');
    expect(connectors.length).toBeLessThan(BUSINESS_REGISTRAZIONE_STEPS.length);
  });

  it('should render the "Cosa ti serve per iniziare" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('Cosa ti serve per iniziare'))).toBe(true);
  });

  it('should render the "Per le aziende" column label', () => {
    expect(nativeEl.textContent).toContain('Per le aziende');
  });

  it('should render the "Per i collettivi studenteschi" column label', () => {
    expect(nativeEl.textContent).toContain('Per i collettivi studenteschi');
  });

  it('should render requirements for aziende (forType azienda or entrambi)', () => {
    const azReqs = BUSINESS_REGISTRAZIONE_REQUIREMENTS.filter(
      r => r.forType === 'azienda' || r.forType === 'entrambi',
    );
    const allText = nativeEl.textContent ?? '';
    azReqs.forEach(r => expect(allText).toContain(r.label.substring(0, 20)));
  });

  it('should render requirements for collettivi (forType collettivo or entrambi)', () => {
    const colReqs = BUSINESS_REGISTRAZIONE_REQUIREMENTS.filter(
      r => r.forType === 'collettivo' || r.forType === 'entrambi',
    );
    const allText = nativeEl.textContent ?? '';
    colReqs.forEach(r => expect(allText).toContain(r.label.substring(0, 20)));
  });

  it('should render bullet dots for each visible requirement', () => {
    const azCount = BUSINESS_REGISTRAZIONE_REQUIREMENTS.filter(
      r => r.forType === 'azienda' || r.forType === 'entrambi',
    ).length;
    const colCount = BUSINESS_REGISTRAZIONE_REQUIREMENTS.filter(
      r => r.forType === 'collettivo' || r.forType === 'entrambi',
    ).length;
    const totalExpected = azCount + colCount;
    const dots = nativeEl.querySelectorAll('div.bg-blue-100.rounded-full');
    expect(dots.length).toBe(totalExpected);
  });

  it('should render the requirements section with bg-gray-50', () => {
    expect(nativeEl.querySelector('section.bg-gray-50')).not.toBeNull();
  });

  it('should render the "Domande frequenti sull\'onboarding" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('Domande frequenti'))).toBe(true);
  });

  it('should render each FAQ question', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_REGISTRAZIONE_FAQ.forEach(f => expect(allText).toContain(f.q.substring(0, 30)));
  });

  it('should render each FAQ answer', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_REGISTRAZIONE_FAQ.forEach(f => expect(allText).toContain(f.a.substring(0, 30)));
  });

  it('should render the final CTA section with bg-blue-600', () => {
    expect(nativeEl.querySelector('section.bg-blue-600')).not.toBeNull();
  });

  it('should render the "Inizia ora - è gratis per 14 giorni" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('gratis per 14 giorni'))).toBe(true);
  });

  it('should render the CTA subtitle mentioning 2 giorni lavorativi', () => {
    expect(nativeEl.textContent).toContain('2 giorni lavorativi');
  });

  it('should render the onboarding request link', () => {
    const link = nativeEl.querySelector('section.bg-blue-600 a');
    expect(link).not.toBeNull();
  });

  it('should set correct mailto href on the CTA link', () => {
    const link = nativeEl.querySelector('section.bg-blue-600 a');
    expect(link?.getAttribute('href')).toContain('mailto:business@ohmyuniversity.it');
  });

  it('should include subject in mailto href', () => {
    const link = nativeEl.querySelector('section.bg-blue-600 a');
    expect(link?.getAttribute('href')).toContain('subject=');
  });

  it('should render the CTA link text', () => {
    const link = nativeEl.querySelector('section.bg-blue-600 a');
    expect(link?.textContent?.trim()).toBe('Invia richiesta di onboarding');
  });

  it('should render the email address mention in the CTA footer text', () => {
    expect(nativeEl.textContent).toContain('business@ohmyuniversity.it');
  });

  it('should render the email with text-white font-medium styling', () => {
    const emailSpan = nativeEl.querySelector('section.bg-blue-600 span.text-white.font-medium');
    expect(emailSpan).not.toBeNull();
    expect(emailSpan?.textContent?.trim()).toBe('business@ohmyuniversity.it');
  });

  it('should render CTA heading in text-white', () => {
    const heading = nativeEl.querySelector('section.bg-blue-600 h2');
    expect(heading?.classList).toContain('text-white');
  });

  it('should render 5 sections', () => {
    expect(nativeEl.querySelectorAll('section').length).toBe(5);
  });

  it('should render steps section with bg-white', () => {
    const sections = Array.from(nativeEl.querySelectorAll('section.bg-white'));
    expect(sections.length).toBeGreaterThan(0);
  });
});

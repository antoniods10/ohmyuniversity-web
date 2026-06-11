import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BusinessContattiPage } from './business-contatti.page';
import {
  BUSINESS_USER_TYPES,
  BUSINESS_CONTACT_CHANNELS,
  BUSINESS_ONBOARDING_STEPS,
} from '@constants';

describe('BusinessContattiPage', () => {
  let component: BusinessContattiPage;
  let fixture: ComponentFixture<BusinessContattiPage>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessContattiPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessContattiPage);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose userTypes from BUSINESS_USER_TYPES constant', () => {
    expect(component.userTypes).toBe(BUSINESS_USER_TYPES);
  });

  it('should expose contactChannels from BUSINESS_CONTACT_CHANNELS constant', () => {
    expect(component.contactChannels).toBe(BUSINESS_CONTACT_CHANNELS);
  });

  it('should expose onboardingSteps from BUSINESS_ONBOARDING_STEPS constant', () => {
    expect(component.onboardingSteps).toBe(BUSINESS_ONBOARDING_STEPS);
  });

  it('should have at least one userType', () => {
    expect(component.userTypes.length).toBeGreaterThan(0);
  });

  it('should have at least one contactChannel', () => {
    expect(component.contactChannels.length).toBeGreaterThan(0);
  });

  it('should have at least one onboardingStep', () => {
    expect(component.onboardingSteps.length).toBeGreaterThan(0);
  });

  it('should render app-business-hero', () => {
    expect(nativeEl.querySelector('app-business-hero')).not.toBeNull();
  });

  it('should pass correct title to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('title')).toBe('Come creare un profilo');
  });

  it('should pass correct subtitle to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('subtitle')).toContain('non serve nessuna registrazione');
  });

  it('should render the "Seleziona chi sei" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('Seleziona chi sei'))).toBe(true);
  });

  it('should render one card per userType', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-2xl');
    expect(cards.length).toBe(BUSINESS_USER_TYPES.length);
  });

  it('should render each userType emoji', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_USER_TYPES.forEach(t => expect(allText).toContain(t.emoji));
  });

  it('should render each userType title', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_USER_TYPES.forEach(t => expect(allText).toContain(t.title));
  });

  it('should render each userType description', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_USER_TYPES.forEach(t => expect(allText).toContain(t.description.substring(0, 30)));
  });

  it('should render each userType action label', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_USER_TYPES.forEach(t => expect(allText).toContain(t.action));
  });

  it('should apply border-blue-200 and bg-blue-50 to highlighted cards', () => {
    const cards = Array.from(nativeEl.querySelectorAll('div.rounded-2xl'));
    BUSINESS_USER_TYPES.forEach((type, i) => {
      if (type.highlight) {
        expect(cards[i].classList).toContain('border-blue-200');
        expect(cards[i].classList).toContain('bg-blue-50');
      }
    });
  });

  it('should apply border-gray-100 and bg-white to non-highlighted cards', () => {
    const cards = Array.from(nativeEl.querySelectorAll('div.rounded-2xl'));
    BUSINESS_USER_TYPES.forEach((type, i) => {
      if (!type.highlight) {
        expect(cards[i].classList).toContain('border-gray-100');
        expect(cards[i].classList).toContain('bg-white');
      }
    });
  });

  it('should apply shadow-sm to non-highlighted cards', () => {
    const cards = Array.from(nativeEl.querySelectorAll('div.rounded-2xl'));
    BUSINESS_USER_TYPES.forEach((type, i) => {
      if (!type.highlight) {
        expect(cards[i].classList).toContain('shadow-sm');
      }
    });
  });

  it('should render an <a href> for external userType actions', () => {
    const externalTypes = BUSINESS_USER_TYPES.filter(t => t.isExternal);
    externalTypes.forEach(type => {
      const link = Array.from(nativeEl.querySelectorAll('a[href]')).find(
        a => a.getAttribute('href') === type.actionLink,
      );
      expect(link).not.toBeUndefined();
    });
  });

  it('should render a routerLink for internal userType actions', () => {
    const internalTypes = BUSINESS_USER_TYPES.filter(t => !t.isExternal);
    internalTypes.forEach(type => {
      const link = Array.from(nativeEl.querySelectorAll('a[href]')).find(
        a => a.getAttribute('href') === type.actionLink,
      );
      expect(link).not.toBeUndefined();
    });
  });

  it('should render bg-blue-600 on external action links', () => {
    const externalLinks = Array.from(nativeEl.querySelectorAll('a.bg-blue-600'));
    const externalCount = BUSINESS_USER_TYPES.filter(t => t.isExternal).length;
    expect(externalLinks.length).toBe(externalCount);
  });

  it('should render border-gray-300 on internal action links', () => {
    const internalLinks = Array.from(nativeEl.querySelectorAll('a.border-gray-300'));
    const internalCount = BUSINESS_USER_TYPES.filter(t => !t.isExternal).length;
    expect(internalLinks.length).toBe(internalCount);
  });

  it('should render the onboarding heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes("Come funziona l'onboarding"))).toBe(true);
  });

  it('should render the onboarding subtitle', () => {
    expect(nativeEl.textContent).toContain('nessuna competenza tecnica');
  });

  it('should render one list item per onboarding step', () => {
    const items = nativeEl.querySelectorAll('ol li');
    expect(items.length).toBe(BUSINESS_ONBOARDING_STEPS.length);
  });

  it('should render each onboarding step text', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_ONBOARDING_STEPS.forEach(step => {
      expect(allText).toContain(step.substring(0, 30));
    });
  });

  it('should render numbered badges for each onboarding step', () => {
    const badges = nativeEl.querySelectorAll('ol li div.bg-blue-600');
    expect(badges.length).toBe(BUSINESS_ONBOARDING_STEPS.length);
  });

  it('should render correct step numbers in badges', () => {
    const badges = Array.from(nativeEl.querySelectorAll('ol li div.bg-blue-600'));
    badges.forEach((badge, i) => {
      expect(badge.textContent?.trim()).toBe(String(i + 1));
    });
  });

  it('should render the free trial callout box', () => {
    expect(nativeEl.querySelector('div.bg-blue-50')).not.toBeNull();
  });

  it('should render the gift emoji in the callout', () => {
    expect(nativeEl.textContent).toContain('🎁');
  });

  it('should render the "14 giorni di prova gratuita" callout title', () => {
    expect(nativeEl.textContent).toContain('14 giorni di prova gratuita');
  });

  it('should render the "Nessuna carta di credito" mention in the callout', () => {
    expect(nativeEl.textContent).toContain('Nessuna carta di credito');
  });

  it('should render the callout title with text-blue-800', () => {
    const title = nativeEl.querySelector('p.text-blue-800');
    expect(title).not.toBeNull();
  });

  it('should render the callout body with text-blue-700', () => {
    const body = nativeEl.querySelector('p.text-blue-700');
    expect(body).not.toBeNull();
  });

  it('should render the "Come contattarci" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('Come contattarci'))).toBe(true);
  });

  it('should render one contact channel link per BUSINESS_CONTACT_CHANNELS entry', () => {
    const links = Array.from(nativeEl.querySelectorAll('a[target="_blank"]'));
    expect(links.length).toBe(BUSINESS_CONTACT_CHANNELS.length);
  });

  it('should render each contact channel emoji', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_CONTACT_CHANNELS.forEach(ch => expect(allText).toContain(ch.emoji));
  });

  it('should render each contact channel title', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_CONTACT_CHANNELS.forEach(ch => expect(allText).toContain(ch.title));
  });

  it('should render each contact channel description', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_CONTACT_CHANNELS.forEach(ch =>
      expect(allText).toContain(ch.description.substring(0, 20)),
    );
  });

  it('should render each contact channel value', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_CONTACT_CHANNELS.forEach(ch => expect(allText).toContain(ch.value));
  });

  it('should set correct href on each contact channel link', () => {
    BUSINESS_CONTACT_CHANNELS.forEach(ch => {
      const link = Array.from(nativeEl.querySelectorAll('a[target="_blank"]')).find(
        a => a.getAttribute('href') === ch.href,
      );
      expect(link).not.toBeUndefined();
    });
  });

  it('should set target="_blank" on all contact channel links', () => {
    const links = nativeEl.querySelectorAll('a[target="_blank"]');
    links.forEach(l => expect(l.getAttribute('target')).toBe('_blank'));
  });

  it('should set rel="noopener noreferrer" on all contact channel links', () => {
    const links = nativeEl.querySelectorAll('a[target="_blank"]');
    links.forEach(l => expect(l.getAttribute('rel')).toBe('noopener noreferrer'));
  });

  it('should render channel value with text-blue-600 class', () => {
    const values = nativeEl.querySelectorAll('p.text-blue-600');
    expect(values.length).toBe(BUSINESS_CONTACT_CHANNELS.length);
  });

  it('should render the onboarding section with bg-gray-50', () => {
    const section = nativeEl.querySelector('section.bg-gray-50');
    expect(section).not.toBeNull();
  });

  it('should render the contact section with bg-white', () => {
    const sections = Array.from(nativeEl.querySelectorAll('section.bg-white'));
    expect(sections.length).toBeGreaterThan(0);
  });
});

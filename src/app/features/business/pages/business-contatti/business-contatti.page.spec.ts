import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BusinessContattiPage } from './business-contatti.page';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import {
  BUSINESS_USER_TYPES,
  BUSINESS_CONTACT_CHANNELS,
  BUSINESS_ONBOARDING_STEPS,
} from '@constants';

describe('BusinessContattiPage', () => {
  let component: BusinessContattiPage;
  let fixture: ComponentFixture<BusinessContattiPage>;
  let nativeEl: HTMLElement;
  // The onboarding section (bg-gray-50) is the only one with that exact
  // class in the page, so it's a safe anchor: every userType card precedes
  // it in the DOM, every contact channel card follows it. We can't rely on
  // section index (app-business-hero renders its own <section class="bg-white">
  // ahead of the page's own sections) or on "bg-white" (ambiguous: both the
  // hero and two page sections use it).
  let onboardingSectionEl: Element;

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

    onboardingSectionEl = nativeEl.querySelector('section.bg-gray-50')!;
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

  // allContactChannels = BUSINESS_CONTACT_CHANNELS + the GitHub channel appended
  // by the component itself, so it always has exactly one more entry.
  it('should append the GitHub channel to allContactChannels', () => {
    expect(component.allContactChannels.length).toBe(BUSINESS_CONTACT_CHANNELS.length + 1);
  });

  it('should render app-business-hero', () => {
    expect(nativeEl.querySelector('app-business-hero')).not.toBeNull();
  });

  it('should pass correct title to app-business-hero', () => {
    const hero = nativeEl.querySelector('app-business-hero');
    expect(hero?.getAttribute('title')).toBe('Come creare un profilo');
  });

  it('should render the "Seleziona chi sei" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('Seleziona chi sei'))).toBe(true);
  });

  it('should render one app-custom-card per userType', () => {
    // userType cards don't set [mode] in the template (CustomCardComponent
    // defaults to mode="default"), same as the nested card inside the
    // free-trial callout. We distinguish them by DOM position: userType
    // cards precede the onboarding section, the callout's nested card is
    // inside it.
    const cards = fixture.debugElement
      .queryAll(By.directive(CustomCardComponent))
      .filter(
        de =>
          de.componentInstance.mode === 'default' &&
          onboardingSectionEl.compareDocumentPosition(de.nativeElement) &
            Node.DOCUMENT_POSITION_PRECEDING,
      );
    expect(cards.length).toBe(BUSINESS_USER_TYPES.length);
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

  it('should pass variant="primary" and accentBar=true to highlighted userType cards', () => {
    const cards = fixture.debugElement
      .queryAll(By.directive(CustomCardComponent))
      .filter(
        de =>
          de.componentInstance.mode === 'default' &&
          onboardingSectionEl.compareDocumentPosition(de.nativeElement) &
            Node.DOCUMENT_POSITION_PRECEDING,
      )
      .map(de => de.componentInstance as CustomCardComponent);

    BUSINESS_USER_TYPES.forEach((type, i) => {
      if (type.highlight) {
        expect(cards[i].variant).toBe('primary');
        expect(cards[i].accentBar).toBe(true);
        expect(cards[i].shadow).toBe('md');
      }
    });
  });

  it('should pass variant="default" and shadow="sm" to non-highlighted userType cards', () => {
    const cards = fixture.debugElement
      .queryAll(By.directive(CustomCardComponent))
      .filter(
        de =>
          de.componentInstance.mode === 'default' &&
          onboardingSectionEl.compareDocumentPosition(de.nativeElement) &
            Node.DOCUMENT_POSITION_PRECEDING,
      )
      .map(de => de.componentInstance as CustomCardComponent);

    BUSINESS_USER_TYPES.forEach((type, i) => {
      if (!type.highlight) {
        expect(cards[i].variant).toBe('default');
        expect(cards[i].accentBar).toBe(false);
        expect(cards[i].shadow).toBe('sm');
      }
    });
  });

  it('should pass mode="link-external" to action buttons of external userTypes', () => {
    const actionButtons = fixture.debugElement
      .queryAll(By.directive(CustomButtonComponent))
      .map(de => de.componentInstance as CustomButtonComponent);

    BUSINESS_USER_TYPES.forEach((type, i) => {
      expect(actionButtons[i].mode).toBe(type.isExternal ? 'link-external' : 'link-internal');
      expect(actionButtons[i].href).toBe(type.actionLink);
      expect(actionButtons[i].target).toBe(type.isExternal ? '_blank' : '_self');
    });
  });

  it('should pass variant="primary" to action buttons of highlighted userTypes', () => {
    const actionButtons = fixture.debugElement
      .queryAll(By.directive(CustomButtonComponent))
      .map(de => de.componentInstance as CustomButtonComponent);

    BUSINESS_USER_TYPES.forEach((type, i) => {
      expect(actionButtons[i].variant).toBe(type.highlight ? 'primary' : 'outline');
    });
  });

  it('should render the onboarding heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes("Come funziona l'onboarding"))).toBe(true);
  });

  it('should render the onboarding subtitle', () => {
    expect(nativeEl.textContent).toContain('nessuna competenza tecnica');
  });

  it('should render one row per onboarding step', () => {
    // Onboarding steps are rendered as <div class="flex items-start gap-5">
    // rows, not <ol><li> items.
    const rows = nativeEl.querySelectorAll('section.bg-gray-50 .flex.items-start.gap-5');
    expect(rows.length).toBe(BUSINESS_ONBOARDING_STEPS.length);
  });

  it('should render each onboarding step text', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_ONBOARDING_STEPS.forEach(step => {
      expect(allText).toContain(step.substring(0, 30));
    });
  });

  it('should render a numbered app-custom-badge for each onboarding step, in order', () => {
    // Onboarding number badges use size="md" (shape="pill", variant="primary"),
    // which distinguishes them from any other badge elsewhere on the page.
    const badges = fixture.debugElement
      .queryAll(By.directive(CustomBadgeComponent))
      .map(de => de.componentInstance as CustomBadgeComponent)
      .filter(b => b.size === 'md' && b.shape === 'pill' && b.variant === 'primary');

    expect(badges.length).toBe(BUSINESS_ONBOARDING_STEPS.length);
    badges.forEach((badge, i) => {
      expect(badge.label).toBe(String(i + 1));
    });
  });

  it('should render the free trial callout as an app-card-status', () => {
    const statusCards = fixture.debugElement.queryAll(By.directive(CardStatusComponent));
    const calloutCard = statusCards.find(
      de => (de.componentInstance as CardStatusComponent).title === '14 giorni di prova gratuita',
    );

    expect(calloutCard).not.toBeUndefined();
  });

  it('should render the "14 giorni di prova gratuita" callout title', () => {
    expect(nativeEl.textContent).toContain('14 giorni di prova gratuita');
  });

  it('should render the "Nessuna carta di credito" mention in the callout', () => {
    expect(nativeEl.textContent).toContain('Nessuna carta di credito');
  });

  it('should pass statusVariant="info" to the callout card', () => {
    const statusCards = fixture.debugElement
      .queryAll(By.directive(CardStatusComponent))
      .map(de => de.componentInstance as CardStatusComponent);

    expect(statusCards[0].statusVariant).toBe('info');
  });

  it('should render the "Come contattarci" heading', () => {
    const headings = Array.from(nativeEl.querySelectorAll('h2'));
    expect(headings.some(h => h.textContent?.includes('Come contattarci'))).toBe(true);
  });

  it('should render one app-custom-card per allContactChannels entry (including GitHub)', () => {
    // The free-trial callout (app-card-status) also wraps an app-custom-card
    // internally (with mode left at its 'default'), so a plain DOM-position
    // filter isn't enough. We identify contact channel cards by mode="link-external",
    // which is the actual distinguishing trait set by the template.
    const cards = fixture.debugElement
      .queryAll(By.directive(CustomCardComponent))
      .map(de => de.componentInstance as CustomCardComponent)
      .filter(c => c.mode === 'link-external');

    expect(cards.length).toBe(component.allContactChannels.length);
  });

  it('should render each contact channel title', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_CONTACT_CHANNELS.forEach(ch => expect(allText).toContain(ch.title));
  });

  it('should render each contact channel value', () => {
    const allText = nativeEl.textContent ?? '';
    BUSINESS_CONTACT_CHANNELS.forEach(ch => expect(allText).toContain(ch.value));
  });

  it('should pass mode="link-external" and target="_blank" to every contact channel card', () => {
    const cards = fixture.debugElement
      .queryAll(By.directive(CustomCardComponent))
      .map(de => de.componentInstance as CustomCardComponent)
      .filter(c => c.mode === 'link-external');

    cards.forEach((card, i) => {
      expect(card.mode).toBe('link-external');
      expect(card.target).toBe('_blank');
      expect(card.href).toBe(component.allContactChannels[i].href);
    });
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

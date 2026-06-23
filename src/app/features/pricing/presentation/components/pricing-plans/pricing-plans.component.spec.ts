import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { PricingPlans } from './pricing-plans.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { PricingPlan } from '@types';

const mockPlanBase: PricingPlan = {
  name: 'Base',
  price: '€0',
  priceDetail: 'per sempre',
  description: 'Il piano gratuito per iniziare.',
  highlighted: false,
  features: [
    { label: 'Accesso base', included: true },
    { label: 'Supporto email', included: false },
    { label: 'Report avanzati', included: '3 al mese' },
  ],
  label: 'Inizia gratis',
  url: '/registrati',
};

const mockPlanPro: PricingPlan = {
  name: 'Pro',
  price: '€9',
  priceDetail: 'al mese',
  description: 'Il piano per studenti seri.',
  highlighted: true,
  badge: 'Più popolare',
  features: [
    { label: 'Accesso base', included: true },
    { label: 'Supporto email', included: true },
    { label: 'Report avanzati', included: 'Illimitati' },
  ],
  label: 'Scegli Pro',
  url: '/pro',
};

const mockPlanEnterprise: PricingPlan = {
  name: 'Enterprise',
  price: '€29',
  priceDetail: 'al mese',
  description: 'Per università e organizzazioni.',
  highlighted: false,
  features: [
    { label: 'Accesso base', included: true },
    { label: 'Supporto email', included: true },
    { label: 'Report avanzati', included: 'Illimitati' },
  ],
  label: 'Contattaci',
  url: '/contatti',
};

const mockPlans: PricingPlan[] = [mockPlanBase, mockPlanPro, mockPlanEnterprise];
const emptyPlans: PricingPlan[] = [];
const singleNormalPlan: PricingPlan[] = [mockPlanBase];

function setPlans(f: ComponentFixture<PricingPlans>, plans: PricingPlan[]): void {
  f.componentRef.setInput('plans', plans);
  f.detectChanges();
}

describe('PricingPlans', () => {
  let component: PricingPlans;
  let fixture: ComponentFixture<PricingPlans>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPlans],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PricingPlans);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    setPlans(fixture, mockPlans);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cards rendering', () => {
    it('should render one app-custom-card per plan', () => {
      const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
      expect(cards.length).toBe(mockPlans.length);
    });

    it('should render no cards when plans is empty', () => {
      setPlans(fixture, emptyPlans);
      const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
      expect(cards.length).toBe(0);
    });

    it('should render a single card when plans has one element', () => {
      setPlans(fixture, singleNormalPlan);
      const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
      expect(cards.length).toBe(1);
    });
  });

  describe('plan content', () => {
    it('should render the name of each plan', () => {
      const names = nativeEl.querySelectorAll('p.uppercase');
      expect(names[0].textContent?.trim()).toBe('Base');
      expect(names[1].textContent?.trim()).toBe('Pro');
      expect(names[2].textContent?.trim()).toBe('Enterprise');
    });

    it('should render the price for each plan', () => {
      const prices = nativeEl.querySelectorAll('span.text-4xl');
      expect(prices[0].textContent?.trim()).toBe('€0');
      expect(prices[1].textContent?.trim()).toBe('€9');
      expect(prices[2].textContent?.trim()).toBe('€29');
    });

    it('should render the priceDetail for each plan', () => {
      const details = nativeEl.querySelectorAll('p.text-xs.text-gray-400');
      expect(details[0].textContent?.trim()).toBe('per sempre');
      expect(details[1].textContent?.trim()).toBe('al mese');
    });

    it('should render the description for each plan', () => {
      const descs = nativeEl.querySelectorAll('p.text-gray-500');
      expect(descs[0].textContent?.trim()).toContain('gratuito');
      expect(descs[1].textContent?.trim()).toContain('seri');
    });
  });

  describe('card variant/shadow based on highlighted', () => {
    it('should pass variant="primary" and shadow="lg" to the highlighted card', () => {
      const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
      const proCard = cards[1].componentInstance as CustomCardComponent;

      expect(proCard.variant).toBe('primary');
      expect(proCard.shadow).toBe('lg');
      expect(proCard.accentBar).toBe(true);
    });

    it('should pass variant="default" and shadow="sm" to non-highlighted cards', () => {
      const cards = fixture.debugElement.queryAll(By.directive(CustomCardComponent));
      const baseCard = cards[0].componentInstance as CustomCardComponent;
      const enterpriseCard = cards[2].componentInstance as CustomCardComponent;

      expect(baseCard.variant).toBe('default');
      expect(baseCard.shadow).toBe('sm');
      expect(baseCard.accentBar).toBe(false);

      expect(enterpriseCard.variant).toBe('default');
      expect(enterpriseCard.shadow).toBe('sm');
      expect(enterpriseCard.accentBar).toBe(false);
    });
  });

  describe('badge', () => {
    it('should render a badge for the highlighted plan with the right label', () => {
      const badges = fixture.debugElement.queryAll(By.directive(CustomBadgeComponent));
      expect(badges.length).toBe(1);
      expect((badges[0].componentInstance as CustomBadgeComponent).label).toBe('Più popolare');
    });

    it('should NOT render a badge for plans without one', () => {
      setPlans(fixture, singleNormalPlan);
      const badges = fixture.debugElement.queryAll(By.directive(CustomBadgeComponent));
      expect(badges.length).toBe(0);
    });
  });

  describe('CTA button', () => {
    it('should render one app-custom-button per plan', () => {
      const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
      expect(buttons.length).toBe(mockPlans.length);
    });

    it('should pass the correct label and href to each CTA', () => {
      const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
      const instances = buttons.map(b => b.componentInstance as CustomButtonComponent);

      expect(instances[0].label).toBe('Inizia gratis');
      expect(instances[0].href).toBe('/registrati');

      expect(instances[1].label).toBe('Scegli Pro');
      expect(instances[1].href).toBe('/pro');

      expect(instances[2].label).toBe('Contattaci');
      expect(instances[2].href).toBe('/contatti');
    });

    it('should set mode="link-internal" and fullWidth on every CTA', () => {
      const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
      buttons.forEach(b => {
        const instance = b.componentInstance as CustomButtonComponent;
        expect(instance.mode).toBe('link-internal');
        expect(instance.fullWidth).toBe(true);
      });
    });

    it('should pass variant="primary" to the CTA of the highlighted plan', () => {
      const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
      const proButton = buttons[1].componentInstance as CustomButtonComponent;
      expect(proButton.variant).toBe('primary');
    });

    it('should pass variant="ghost" to the CTA of non-highlighted plans', () => {
      const buttons = fixture.debugElement.queryAll(By.directive(CustomButtonComponent));
      const baseButton = buttons[0].componentInstance as CustomButtonComponent;
      const enterpriseButton = buttons[2].componentInstance as CustomButtonComponent;

      expect(baseButton.variant).toBe('ghost');
      expect(enterpriseButton.variant).toBe('ghost');
    });
  });

  describe('features list', () => {
    it('should render a list item for each feature of each plan', () => {
      const lists = nativeEl.querySelectorAll('ul');
      expect(lists.length).toBe(mockPlans.length);
      lists.forEach((ul, i) => {
        const items = ul.querySelectorAll('li');
        expect(items.length).toBe(mockPlans[i].features.length);
      });
    });

    it('should render the feature label for each feature', () => {
      const firstPlanItems = nativeEl.querySelectorAll('ul')[0].querySelectorAll('li');
      expect(firstPlanItems[0].textContent).toContain('Accesso base');
      expect(firstPlanItems[1].textContent).toContain('Supporto email');
      expect(firstPlanItems[2].textContent).toContain('Report avanzati');
    });

    it('should render a check icon when feature is included (included === true)', () => {
      const firstPlanItems = nativeEl.querySelectorAll('ul')[0].querySelectorAll('li');
      const iconSpan = firstPlanItems[0].querySelector('span:first-child');
      expect(iconSpan?.querySelector('svg')).not.toBeNull();
    });

    it('should render the string value when included is a string (e.g. "3 al mese")', () => {
      const firstPlanItems = nativeEl.querySelectorAll('ul')[0].querySelectorAll('li');
      const valueSpan = firstPlanItems[2].querySelector('span:first-child');
      expect(valueSpan?.textContent?.trim()).toBe('3 al mese');
    });

    it('should apply text-gray-300 to the label when feature is not included', () => {
      const firstPlanItems = nativeEl.querySelectorAll('ul')[0].querySelectorAll('li');
      const labelSpan = firstPlanItems[1].querySelector('span:last-child');
      expect(labelSpan?.classList).toContain('text-gray-300');
    });

    it('should apply text-gray-700 to the label when feature is included', () => {
      const firstPlanItems = nativeEl.querySelectorAll('ul')[0].querySelectorAll('li');
      const labelSpan = firstPlanItems[0].querySelector('span:last-child');
      expect(labelSpan?.classList).toContain('text-gray-700');
    });
  });

  describe('layout', () => {
    it('should render the outer grid container', () => {
      const grid = nativeEl.querySelector('div.grid');
      expect(grid).not.toBeNull();
      expect(grid?.classList).toContain('gap-6');
    });

    it('should render a divider line inside each card', () => {
      const dividers = nativeEl.querySelectorAll('div.border-t');
      expect(dividers.length).toBe(mockPlans.length);
    });
  });
});

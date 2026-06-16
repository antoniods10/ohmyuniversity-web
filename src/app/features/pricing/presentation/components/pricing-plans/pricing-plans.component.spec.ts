import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PricingPlans } from './pricing-plans.component';
import { PricingPlan } from '@types';

const mockPlanBase: PricingPlan = {
  name: 'Base',
  price: '€0',
  priceDetail: 'per sempre',
  description: 'Il piano gratuito per iniziare.',
  cta: 'Inizia gratis',
  ctaLink: '/registrati',
  highlighted: false,
  features: [
    { label: 'Accesso base', included: true },
    { label: 'Supporto email', included: false },
    { label: 'Report avanzati', included: '3 al mese' },
  ],
};

const mockPlanPro: PricingPlan = {
  name: 'Pro',
  price: '€9',
  priceDetail: 'al mese',
  description: 'Il piano per studenti seri.',
  cta: 'Scegli Pro',
  ctaLink: '/pro',
  highlighted: true,
  badge: 'Più popolare',
  features: [
    { label: 'Accesso base', included: true },
    { label: 'Supporto email', included: true },
    { label: 'Report avanzati', included: 'Illimitati' },
  ],
};

const mockPlanEnterprise: PricingPlan = {
  name: 'Enterprise',
  price: '€29',
  priceDetail: 'al mese',
  description: 'Per università e organizzazioni.',
  cta: 'Contattaci',
  ctaLink: '/contatti',
  highlighted: false,
  features: [
    { label: 'Accesso base', included: true },
    { label: 'Supporto email', included: true },
    { label: 'Report avanzati', included: 'Illimitati' },
  ],
};

const mockPlans: PricingPlan[] = [mockPlanBase, mockPlanPro, mockPlanEnterprise];
const emptyPlans: PricingPlan[] = [];
const singleNormalPlan: PricingPlan[] = [mockPlanBase];

function setPlans(f: ComponentFixture<PricingPlans>, plans: PricingPlan[]) {
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

  it('should render one card per plan', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-2xl');
    expect(cards.length).toBe(mockPlans.length);
  });

  it('should render no cards when plans is empty', () => {
    setPlans(fixture, emptyPlans);
    const cards = nativeEl.querySelectorAll('div.rounded-2xl');
    expect(cards.length).toBe(0);
  });

  it('should render a single card when plans has one element', () => {
    setPlans(fixture, singleNormalPlan);
    const cards = nativeEl.querySelectorAll('div.rounded-2xl');
    expect(cards.length).toBe(1);
  });

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
    expect(details[0].textContent?.trim()).toContain('per sempre');
    expect(details[1].textContent?.trim()).toContain('al mese');
  });

  it('should render the description for each plan', () => {
    const descs = nativeEl.querySelectorAll('p.text-gray-500');
    expect(descs[0].textContent?.trim()).toContain('gratuito');
    expect(descs[1].textContent?.trim()).toContain('seri');
  });

  it('should render a CTA anchor for each plan', () => {
    const links = nativeEl.querySelectorAll('a');
    expect(links.length).toBe(mockPlans.length);
  });

  it('should render the correct CTA text for each plan', () => {
    const links = nativeEl.querySelectorAll('a');
    expect(links[0].textContent?.trim()).toBe('Inizia gratis');
    expect(links[1].textContent?.trim()).toBe('Scegli Pro');
    expect(links[2].textContent?.trim()).toBe('Contattaci');
  });

  it('should set routerLink to the correct path on each CTA', () => {
    const links = nativeEl.querySelectorAll('a');
    expect(links[0].getAttribute('href')).toBe('/registrati');
    expect(links[1].getAttribute('href')).toBe('/pro');
    expect(links[2].getAttribute('href')).toBe('/contatti');
  });

  it('should render a badge for the highlighted plan', () => {
    const badges = nativeEl.querySelectorAll('span.rounded-full');
    expect(badges.length).toBe(1);
    expect(badges[0].textContent?.trim()).toBe('Più popolare');
  });

  it('should NOT render a badge for non-highlighted plans without badge', () => {
    setPlans(fixture, singleNormalPlan);
    const badges = nativeEl.querySelectorAll('span.rounded-full');
    expect(badges.length).toBe(0);
  });

  it('should render badge with correct background color', () => {
    const badge = nativeEl.querySelector('span.rounded-full');
    expect(badge?.classList).toContain('bg-blue-600');
  });

  it('should apply border-blue-500 to the highlighted plan card', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-2xl');
    expect(cards[1].classList).toContain('border-blue-500');
  });

  it('should apply shadow-lg to the highlighted plan card', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-2xl');
    expect(cards[1].classList).toContain('shadow-lg');
  });

  it('should apply border-gray-200 to non-highlighted plan cards', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-2xl');
    expect(cards[0].classList).toContain('border-gray-200');
    expect(cards[2].classList).toContain('border-gray-200');
  });

  it('should apply shadow-sm to non-highlighted plan cards', () => {
    const cards = nativeEl.querySelectorAll('div.rounded-2xl');
    expect(cards[0].classList).toContain('shadow-sm');
    expect(cards[2].classList).toContain('shadow-sm');
  });

  it('should apply bg-blue-600 to the CTA of the highlighted plan', () => {
    const links = nativeEl.querySelectorAll('a');
    expect(links[1].classList).toContain('bg-blue-600');
  });

  it('should apply text-white to the CTA of the highlighted plan', () => {
    const links = nativeEl.querySelectorAll('a');
    expect(links[1].classList).toContain('text-white');
  });

  it('should apply bg-gray-100 to the CTA of non-highlighted plans', () => {
    const links = nativeEl.querySelectorAll('a');
    expect(links[0].classList).toContain('bg-gray-100');
    expect(links[2].classList).toContain('bg-gray-100');
  });

  it('should apply text-gray-800 to the CTA of non-highlighted plans', () => {
    const links = nativeEl.querySelectorAll('a');
    expect(links[0].classList).toContain('text-gray-800');
    expect(links[2].classList).toContain('text-gray-800');
  });

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

  it('featureValue() should return ✓ for true', () => {
    expect(component.featureValue(true)).toBe('✓');
  });

  it('featureValue() should return - for false', () => {
    expect(component.featureValue(false)).toBe('-');
  });

  it('featureValue() should return the string value as-is', () => {
    expect(component.featureValue('Illimitati')).toBe('Illimitati');
    expect(component.featureValue('3 al mese')).toBe('3 al mese');
  });

  it('featureClass() should return text-gray-300 for false', () => {
    expect(component.featureClass(false)).toBe('text-gray-300');
  });

  it('featureClass() should return text-blue-500 font-medium for true', () => {
    expect(component.featureClass(true)).toBe('text-blue-500 font-medium');
  });

  it('featureClass() should return text-gray-700 font-medium for a string value', () => {
    expect(component.featureClass('Illimitati')).toBe('text-gray-700 font-medium');
    expect(component.featureClass('3 al mese')).toBe('text-gray-700 font-medium');
  });

  it('should apply text-gray-300 to the feature icon span when feature is not included', () => {
    const firstPlanItems = nativeEl.querySelectorAll('ul')[0].querySelectorAll('li');
    const iconSpan = firstPlanItems[1].querySelector('span:first-child');
    expect(iconSpan?.classList).toContain('text-gray-300');
  });

  it('should apply text-gray-300 to the label span when feature is not included', () => {
    const firstPlanItems = nativeEl.querySelectorAll('ul')[0].querySelectorAll('li');
    const labelSpan = firstPlanItems[1].querySelector('span:last-child');
    expect(labelSpan?.classList).toContain('text-gray-300');
  });

  it('should apply text-gray-700 to the label span when feature is included', () => {
    const firstPlanItems = nativeEl.querySelectorAll('ul')[0].querySelectorAll('li');
    const labelSpan = firstPlanItems[0].querySelector('span:last-child');
    expect(labelSpan?.classList).toContain('text-gray-700');
  });

  it('should render the outer grid container', () => {
    const grid = nativeEl.querySelector('div.grid');
    expect(grid).not.toBeNull();
  });

  it('should apply gap-6 to the grid container', () => {
    const grid = nativeEl.querySelector('div.grid');
    expect(grid?.classList).toContain('gap-6');
  });

  it('should render a divider line inside each card', () => {
    const dividers = nativeEl.querySelectorAll('div.border-t');
    expect(dividers.length).toBe(mockPlans.length);
  });
});

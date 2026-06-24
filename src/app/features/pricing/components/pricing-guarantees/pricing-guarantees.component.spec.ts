import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PricingGuarantees } from './pricing-guarantees.component';
import { CardSimpleComponent } from '@ui/custom-card/card-variants.component';

describe('PricingGuarantees', () => {
  let component: PricingGuarantees;
  let fixture: ComponentFixture<PricingGuarantees>;
  let nativeEl: HTMLElement;
  let cards: CardSimpleComponent[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingGuarantees],
    }).compileComponents();

    fixture = TestBed.createComponent(PricingGuarantees);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();

    cards = fixture.debugElement
      .queryAll(By.directive(CardSimpleComponent))
      .map(de => de.componentInstance as CardSimpleComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render exactly 3 app-card-simple cards', () => {
    expect(cards.length).toBe(3);
  });

  it('should render a wrapper grid container', () => {
    const grid = nativeEl.querySelector('div.grid');
    expect(grid).not.toBeNull();
  });

  describe('"Pagamenti sicuri" card', () => {
    it('should receive the shield icon and "success" variant', () => {
      expect(cards[0].icon).toBe(component.iconShield);
      expect(cards[0].variant).toBe('success');
    });

    it('should receive the correct title and body', () => {
      expect(cards[0].title).toBe('Pagamenti sicuri');
      expect(cards[0].body).toContain('Stripe');
      expect(cards[0].body).toContain('crittografia end-to-end');
      expect(cards[0].body).toContain('server');
    });
  });

  describe('"Disdetta facile" card', () => {
    it('should receive the refresh icon and "info" variant', () => {
      expect(cards[1].icon).toBe(component.iconRefresh);
      expect(cards[1].variant).toBe('info');
    });

    it('should receive the correct title and body', () => {
      expect(cards[1].title).toBe('Disdetta facile');
      expect(cards[1].body).toContain('Nessun vincolo');
      expect(cards[1].body).toContain('online');
      expect(cards[1].body).toContain('chiamare');
    });
  });

  describe('"Supporto reale" card', () => {
    it('should receive the message icon and "tertiary" variant', () => {
      expect(cards[2].icon).toBe(component.iconMessage);
      expect(cards[2].variant).toBe('tertiary');
    });

    it('should receive the correct title and body', () => {
      expect(cards[2].title).toBe('Supporto reale');
      expect(cards[2].body).toContain('Non chatbot');
      expect(cards[2].body).toContain('persone vere');
      expect(cards[2].body).toContain('tempi');
    });
  });

  it('should pass padding="lg" and shadow="sm" to every card', () => {
    cards.forEach(c => {
      expect(c.padding).toBe('lg');
      expect(c.shadow).toBe('sm');
    });
  });

  it('should pass stretchHeight=true to every card', () => {
    cards.forEach(c => {
      expect(c.stretchHeight).toBe(true);
    });
  });

  it('should render the title of every card in the DOM', () => {
    const titles = nativeEl.querySelectorAll('h3.card-simple__title');
    expect(titles.length).toBe(3);
    expect(titles[0].textContent?.trim()).toBe('Pagamenti sicuri');
    expect(titles[1].textContent?.trim()).toBe('Disdetta facile');
    expect(titles[2].textContent?.trim()).toBe('Supporto reale');
  });

  it('should render the body text of every card in the DOM', () => {
    const bodies = nativeEl.querySelectorAll('p.card-simple__body');
    expect(bodies.length).toBe(3);
    bodies.forEach(b => expect(b.textContent?.trim().length).toBeGreaterThan(0));
  });

  it('should render an svg icon for every card', () => {
    const icons = nativeEl.querySelectorAll('.card-simple__icon-wrap svg');
    expect(icons.length).toBe(3);
  });
});

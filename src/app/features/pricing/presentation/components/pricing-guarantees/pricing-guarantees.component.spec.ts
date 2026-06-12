import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricingGuarantees } from './pricing-guarantees.component';

describe('PricingGuarantees', () => {
  let component: PricingGuarantees;
  let fixture: ComponentFixture<PricingGuarantees>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingGuarantees],
    }).compileComponents();

    fixture = TestBed.createComponent(PricingGuarantees);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render exactly 3 guarantee cards', () => {
    const cards = nativeEl.querySelectorAll('div.text-center');
    expect(cards.length).toBe(3);
  });

  it('should render a wrapper grid container', () => {
    const grid = nativeEl.querySelector('div.grid');
    expect(grid).not.toBeNull();
  });

  it('should render the "Pagamenti sicuri" emoji', () => {
    const emojis = nativeEl.querySelectorAll('p.text-2xl');
    expect(emojis[0].textContent?.trim()).toBe('🔒');
  });

  it('should render the "Pagamenti sicuri" title', () => {
    const titles = nativeEl.querySelectorAll('p.font-semibold');
    expect(titles[0].textContent?.trim()).toBe('Pagamenti sicuri');
  });

  it('should render the "Pagamenti sicuri" description', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[0].textContent?.trim()).toContain('Stripe');
  });

  it('should render end-to-end encryption mention in first card', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[0].textContent?.trim()).toContain('crittografia end-to-end');
  });

  it('should render the "Disdetta facile" emoji', () => {
    const emojis = nativeEl.querySelectorAll('p.text-2xl');
    expect(emojis[1].textContent?.trim()).toBe('🔄');
  });

  it('should render the "Disdetta facile" title', () => {
    const titles = nativeEl.querySelectorAll('p.font-semibold');
    expect(titles[1].textContent?.trim()).toBe('Disdetta facile');
  });

  it('should render the "Disdetta facile" description', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[1].textContent?.trim()).toContain('Nessun vincolo');
  });

  it('should mention online cancellation in second card description', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[1].textContent?.trim()).toContain('online');
  });

  it('should render the "Supporto reale" emoji', () => {
    const emojis = nativeEl.querySelectorAll('p.text-2xl');
    expect(emojis[2].textContent?.trim()).toBe('💬');
  });

  it('should render the "Supporto reale" title', () => {
    const titles = nativeEl.querySelectorAll('p.font-semibold');
    expect(titles[2].textContent?.trim()).toBe('Supporto reale');
  });

  it('should render the "Supporto reale" description', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[2].textContent?.trim()).toContain('Non chatbot');
  });

  it('should mention real people in third card description', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[2].textContent?.trim()).toContain('persone vere');
  });

  it('should apply text-center class to all cards', () => {
    const cards = nativeEl.querySelectorAll('div.text-center');
    cards.forEach(card => {
      expect(card.classList).toContain('text-center');
    });
  });

  it('should apply text-2xl class to all emoji paragraphs', () => {
    const emojis = nativeEl.querySelectorAll('p.text-2xl');
    expect(emojis.length).toBe(3);
  });

  it('should apply font-semibold to all title paragraphs', () => {
    const titles = nativeEl.querySelectorAll('p.font-semibold');
    titles.forEach(t => expect(t.classList).toContain('font-semibold'));
  });

  it('should apply text-gray-800 to all title paragraphs', () => {
    const titles = nativeEl.querySelectorAll('p.font-semibold');
    titles.forEach(t => expect(t.classList).toContain('text-gray-800'));
  });

  it('should apply text-xs to all description paragraphs', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    descs.forEach(d => expect(d.classList).toContain('text-xs'));
  });

  it('should apply text-gray-500 to all description paragraphs', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    descs.forEach(d => expect(d.classList).toContain('text-gray-500'));
  });

  it('should not render empty title paragraphs', () => {
    const titles = nativeEl.querySelectorAll('p.font-semibold');
    titles.forEach(t => expect(t.textContent?.trim().length).toBeGreaterThan(0));
  });

  it('should not render empty description paragraphs', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    descs.forEach(d => expect(d.textContent?.trim().length).toBeGreaterThan(0));
  });

  it('should not render empty emoji paragraphs', () => {
    const emojis = nativeEl.querySelectorAll('p.text-2xl');
    emojis.forEach(e => expect(e.textContent?.trim().length).toBeGreaterThan(0));
  });

  it('should render exactly 3 emoji paragraphs', () => {
    const emojis = nativeEl.querySelectorAll('p.text-2xl');
    expect(emojis.length).toBe(3);
  });

  it('should render exactly 3 title paragraphs', () => {
    const titles = nativeEl.querySelectorAll('p.font-semibold');
    expect(titles.length).toBe(3);
  });

  it('should render exactly 3 description paragraphs', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs.length).toBe(3);
  });

  it('should mention no server data storage in first card', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[0].textContent?.trim()).toContain('server');
  });

  it('should mention no phone call needed in second card', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[1].textContent?.trim()).toContain('chiamare');
  });

  it('should mention response times in third card', () => {
    const descs = nativeEl.querySelectorAll('p.text-xs');
    expect(descs[2].textContent?.trim()).toContain('tempi');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PartnerBenefitsComponent } from '../partner-benefits/partner-benefits.component';
import { CardSimpleComponent } from '@ui/custom-card/card-variants.component';
import { PARTNER_BENEFITS } from '@constants';

describe('PartnerBenefitsComponent', () => {
  let component: PartnerBenefitsComponent;
  let fixture: ComponentFixture<PartnerBenefitsComponent>;
  let componentRef: ComponentRef<PartnerBenefitsComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerBenefitsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerBenefitsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    nativeEl = fixture.nativeElement;

    componentRef.setInput('benefits', PARTNER_BENEFITS);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section with bg-white', () => {
    const section = nativeEl.querySelector('section.bg-white');
    expect(section).not.toBeNull();
  });

  it('should render the "Perché scegliere" heading', () => {
    const h2 = nativeEl.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2!.textContent).toContain('Perché scegliere');
  });

  it('should render the subtitle mentioning "Non un altro portale"', () => {
    const allText = nativeEl.textContent ?? '';
    expect(allText).toContain('Non un altro portale');
  });

  it('should render one app-card-simple per benefit', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    expect(cards.length).toBe(PARTNER_BENEFITS.length);
  });

  it('should pass correct title to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    PARTNER_BENEFITS.forEach((b, i) => {
      expect(cards[i].componentInstance.title).toBe(b.title);
    });
  });

  it('should pass correct body (description) to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    PARTNER_BENEFITS.forEach((b, i) => {
      expect(cards[i].componentInstance.body).toBe(b.description);
    });
  });

  it('should pass variant="primary" to each card', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardSimpleComponent));
    cards.forEach(c => expect(c.componentInstance.variant).toBe('primary'));
  });

  it('should render a grid container', () => {
    const grid = nativeEl.querySelector('.grid');
    expect(grid).not.toBeNull();
  });
});

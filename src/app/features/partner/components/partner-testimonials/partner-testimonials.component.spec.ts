import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PartnerTestimonialsComponent } from './partner-testimonials.component';
import { CardReviewComponent } from '@ui/custom-card/card-variants.component';
import { PARTNER_TESTIMONIALS } from '@constants';

describe('PartnerTestimonialsComponent', () => {
  let component: PartnerTestimonialsComponent;
  let fixture: ComponentFixture<PartnerTestimonialsComponent>;
  let componentRef: ComponentRef<PartnerTestimonialsComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerTestimonialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerTestimonialsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    nativeEl = fixture.nativeElement;

    componentRef.setInput('testimonials', PARTNER_TESTIMONIALS);
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

  it('should render the "Chi ha già scelto" heading', () => {
    const h2 = nativeEl.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2!.textContent).toContain('Chi ha già scelto');
  });

  it('should render one app-card-review per testimonial', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    expect(cards.length).toBe(PARTNER_TESTIMONIALS.length);
  });

  it('should pass rating=5 to each card-review', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach(c => expect(c.componentInstance.rating).toBe(5));
  });

  it('should pass correct quote as body to each card-review', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    PARTNER_TESTIMONIALS.forEach((t, i) => {
      expect(cards[i].componentInstance.body).toBe(t.quote);
    });
  });

  it('should pass correct name in reviewer to each card-review', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    PARTNER_TESTIMONIALS.forEach((t, i) => {
      expect(cards[i].componentInstance.reviewer.name).toBe(t.name);
    });
  });

  it('should pass correct role as university in reviewer to each card-review', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    PARTNER_TESTIMONIALS.forEach((t, i) => {
      expect(cards[i].componentInstance.reviewer.university).toBe(t.role);
    });
  });

  it('should pass showRatingNumber=false to each card-review', () => {
    const cards = fixture.debugElement.queryAll(By.directive(CardReviewComponent));
    cards.forEach(c => expect(c.componentInstance.showRatingNumber).toBe(false));
  });

  it('should render a grid container', () => {
    const grid = nativeEl.querySelector('.grid');
    expect(grid).not.toBeNull();
  });
});

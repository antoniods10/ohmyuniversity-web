import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PartnerPage } from './partner.page';
import { PARTNER_BENEFITS, PARTNER_LINKS, PARTNER_STATS, PARTNER_TESTIMONIALS } from '@constants';

describe('PartnerPage', () => {
  let component: PartnerPage;
  let fixture: ComponentFixture<PartnerPage>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerPage);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose benefits from PARTNER_BENEFITS constant', () => {
    expect(component.benefits).toBe(PARTNER_BENEFITS);
  });

  it('should expose partnerLinks from PARTNER_LINKS constant', () => {
    expect(component.partnerLinks).toBe(PARTNER_LINKS);
  });

  it('should expose testimonials from PARTNER_TESTIMONIALS constant', () => {
    expect(component.testimonials).toBe(PARTNER_TESTIMONIALS);
  });

  it('should expose stats from PARTNER_STATS constant', () => {
    expect(component.stats).toBe(PARTNER_STATS);
  });

  it('should render the app-partner-hero child component', () => {
    expect(nativeEl.querySelector('app-partner-hero')).not.toBeNull();
  });

  it('should render the app-partner-stats child component', () => {
    expect(nativeEl.querySelector('app-partner-stats')).not.toBeNull();
  });

  it('should render the app-partner-benefits child component', () => {
    expect(nativeEl.querySelector('app-partner-benefits')).not.toBeNull();
  });

  it('should render the app-partner-links child component', () => {
    expect(nativeEl.querySelector('app-partner-links')).not.toBeNull();
  });

  it('should render the app-partner-testimonials child component', () => {
    expect(nativeEl.querySelector('app-partner-testimonials')).not.toBeNull();
  });

  it('should render the app-partner-cta child component', () => {
    expect(nativeEl.querySelector('app-partner-cta')).not.toBeNull();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PricingPlans } from './pricing-plans.component';
import { PricingPlan } from '@types';

const mockPlans: PricingPlan[] = [];

describe('PricingPlans', () => {
  let component: PricingPlans;
  let fixture: ComponentFixture<PricingPlans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPlans],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PricingPlans);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('plans', mockPlans);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

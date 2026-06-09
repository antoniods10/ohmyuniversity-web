import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PricingPlans } from '../components/pricing-plans/pricing-plans.component';
import { PricingGuarantees } from '../components/pricing-guarantees/pricing-guarantees.component';
import { PricingAudience, PricingPlan } from '@types';
import { ORG_PLANS, INSTITUTION_PLANS } from '@constants';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [RouterLink, PricingPlans, PricingGuarantees],
  templateUrl: './pricing.page.html',
})
export class PricingPage {
  readonly audience = signal<PricingAudience>('organizations');

  setAudience(value: PricingAudience): void {
    this.audience.set(value);
  }

  readonly orgPlans = ORG_PLANS;
  readonly institutionPlans = INSTITUTION_PLANS;

  readonly activePlans = (): PricingPlan[] =>
    this.audience() === 'organizations' ? this.orgPlans : this.institutionPlans;
}

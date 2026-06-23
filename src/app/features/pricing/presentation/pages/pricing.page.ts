import { Component, signal } from '@angular/core';
import { PricingPlans } from '../components/pricing-plans/pricing-plans.component';
import { PricingGuarantees } from '../components/pricing-guarantees/pricing-guarantees.component';
import { PricingAudience, PricingPlan } from '@types';
import { ORG_PLANS, INSTITUTION_PLANS, APP } from '@shared/constants';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [
    PricingPlans,
    PricingGuarantees,
    CustomBadgeComponent,
    CustomTabsComponent,
    CustomButtonComponent,
  ],
  templateUrl: './pricing.page.html',
})
export class PricingPage {
  readonly APP = APP;

  readonly audience = signal<PricingAudience>('organizations');

  readonly audienceTabs: TabItem[] = [
    { id: 'organizations', label: 'Aziende & Collettivi' },
    { id: 'institutions', label: 'Atenei & Istituzioni' },
  ];

  setAudience(value: string): void {
    this.audience.set(value as PricingAudience);
  }

  readonly orgPlans = ORG_PLANS;
  readonly institutionPlans = INSTITUTION_PLANS;

  readonly activePlans = (): PricingPlan[] =>
    this.audience() === 'organizations' ? this.orgPlans : this.institutionPlans;
}

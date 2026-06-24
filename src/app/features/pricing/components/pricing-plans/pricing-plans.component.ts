import { Component, input } from '@angular/core';
import { LucideDynamicIcon, LucideCheck, LucideMinus } from '@lucide/angular';
import { PricingPlan } from '@types';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';

@Component({
  selector: 'app-pricing-plans',
  imports: [CustomCardComponent, CustomBadgeComponent, CustomButtonComponent, LucideDynamicIcon],
  templateUrl: './pricing-plans.component.html',
})
export class PricingPlans {
  readonly plans = input.required<PricingPlan[]>();

  readonly iconCheck = LucideCheck;
  readonly iconMinus = LucideMinus;
}

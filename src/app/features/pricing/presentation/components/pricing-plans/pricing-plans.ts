import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PricingPlan } from '../../pricing.types';

@Component({
  selector: 'app-pricing-plans',
  imports: [RouterLink],
  templateUrl: './pricing-plans.html',
})
export class PricingPlans {
  readonly plans = input.required<PricingPlan[]>();

  featureValue(value: boolean | string): string {
    if (value === true) return '✓';
    if (value === false) return '-';
    return value;
  }

  featureClass(value: boolean | string): string {
    if (value === false) return 'text-gray-300';
    if (value === true) return 'text-blue-500 font-medium';
    return 'text-gray-700 font-medium';
  }
}

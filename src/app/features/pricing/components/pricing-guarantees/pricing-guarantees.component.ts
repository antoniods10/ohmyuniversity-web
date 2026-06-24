import { Component } from '@angular/core';
import { LucideShield, LucideRefreshCw, LucideMessageCircle } from '@lucide/angular';
import { CardSimpleComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-pricing-guarantees',
  imports: [CardSimpleComponent],
  templateUrl: './pricing-guarantees.component.html',
})
export class PricingGuarantees {
  readonly iconShield = LucideShield;
  readonly iconRefresh = LucideRefreshCw;
  readonly iconMessage = LucideMessageCircle;
}

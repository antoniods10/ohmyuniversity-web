import { Component, input } from '@angular/core';
import { PartnerBenefit } from '@types';
import { CardSimpleComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-partner-benefits',
  standalone: true,
  imports: [CardSimpleComponent],
  templateUrl: './partner-benefits.component.html',
})
export class PartnerBenefitsComponent {
  readonly benefits = input.required<PartnerBenefit[]>();
}

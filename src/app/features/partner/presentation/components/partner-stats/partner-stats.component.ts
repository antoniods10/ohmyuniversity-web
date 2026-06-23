import { Component, input } from '@angular/core';
import { CardStatComponent } from '@ui/custom-card/card-variants.component';

export interface PartnerStat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-partner-stats',
  standalone: true,
  imports: [CardStatComponent],
  templateUrl: './partner-stats.component.html',
})
export class PartnerStatsComponent {
  readonly stats = input.required<PartnerStat[]>();
}

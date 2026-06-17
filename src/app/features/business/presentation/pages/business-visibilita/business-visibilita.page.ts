import { Component } from '@angular/core';
import { LucideListChecks } from '@lucide/angular';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardSimpleComponent, CardStatusComponent } from '@ui/custom-card/card-variants.component';
import {
  BUSINESS_TARGETING_OPTIONS,
  BUSINESS_VISIBILITA_STEPS,
  BUSINESS_ANALYTICS_METRICS,
  PLAN_LABELS,
} from '@constants';
import { BadgeVariant } from '@ui/custom-badge/custom-badge.component';

@Component({
  selector: 'app-business-visibilita-page',
  standalone: true,
  imports: [
    BusinessHeroComponent,
    BusinessCtaComponent,
    CustomBadgeComponent,
    CardSimpleComponent,
    CardStatusComponent,
  ],
  templateUrl: './business-visibilita.page.html',
})
export class BusinessVisibilitaPage {
  readonly iconStep = LucideListChecks;
  readonly steps = BUSINESS_VISIBILITA_STEPS;
  readonly targetingOptions = BUSINESS_TARGETING_OPTIONS;
  readonly analyticsMetrics = BUSINESS_ANALYTICS_METRICS;
  readonly planLabel = PLAN_LABELS;

  readonly planVariant: Record<string, BadgeVariant> = {
    tutti: 'success',
    professional: 'info',
    enterprise: 'secondary',
  };
}

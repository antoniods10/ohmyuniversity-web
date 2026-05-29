import { Component } from '@angular/core';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import {
  BUSINESS_TARGETING_OPTIONS,
  BUSINESS_VISIBILITA_STEPS,
  PLAN_COLORS,
  PLAN_LABELS,
} from '@constants';

@Component({
  selector: 'app-business-visibilita-page',
  standalone: true,
  imports: [BusinessHeroComponent, BusinessCtaComponent],
  templateUrl: './business-visibilita.page.html',
})
export class BusinessVisibilitaPage {
  readonly steps = BUSINESS_VISIBILITA_STEPS;
  readonly targetingOptions = BUSINESS_TARGETING_OPTIONS;
  readonly planLabel = PLAN_LABELS;
  readonly planColor = PLAN_COLORS;
}

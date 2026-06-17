import { Component } from '@angular/core';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import {
  CardSimpleComponent,
  CardStatusComponent,
  CardStatComponent,
} from '@ui/custom-card/card-variants.component';
import { BUSINESS_OFFERS, BUSINESS_DIFFERENTIATORS, APP_NAME } from '@shared/constants';

@Component({
  selector: 'app-business-offerta-page',
  standalone: true,
  imports: [
    BusinessHeroComponent,
    BusinessCtaComponent,
    CardSimpleComponent,
    CardStatusComponent,
    CardStatComponent,
  ],
  templateUrl: './business-offerta.page.html',
})
export class BusinessOffertaPage {
  readonly APP_NAME = APP_NAME;

  readonly offers = BUSINESS_OFFERS;
  readonly differentiators = BUSINESS_DIFFERENTIATORS;
}

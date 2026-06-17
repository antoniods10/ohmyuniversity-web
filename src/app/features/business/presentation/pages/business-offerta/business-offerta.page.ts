import { Component } from '@angular/core';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import {
  CardSimpleComponent,
  CardStatusComponent,
  CardStatComponent,
} from '@ui/custom-card/card-variants.component';
import { BUSINESS_OFFERS, BUSINESS_DIFFERENTIATORS } from '@constants';

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
  readonly offers = BUSINESS_OFFERS;
  readonly differentiators = BUSINESS_DIFFERENTIATORS;
}

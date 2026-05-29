import { Component } from '@angular/core';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import {
  BUSINESS_REGISTRAZIONE_STEPS,
  BUSINESS_REGISTRAZIONE_REQUIREMENTS,
  BUSINESS_REGISTRAZIONE_FAQ,
} from '@constants';

@Component({
  selector: 'app-business-registrazione-page',
  standalone: true,
  imports: [BusinessHeroComponent],
  templateUrl: './business-registrazione.page.html',
})
export class BusinessRegistrazionePage {
  readonly steps = BUSINESS_REGISTRAZIONE_STEPS;
  readonly requirements = BUSINESS_REGISTRAZIONE_REQUIREMENTS;
  readonly faq = BUSINESS_REGISTRAZIONE_FAQ;
}

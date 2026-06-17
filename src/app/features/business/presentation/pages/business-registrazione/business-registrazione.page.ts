import { Component } from '@angular/core';
import { LucideListChecks, LucideCheck } from '@lucide/angular';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent, CardMinimalComponent } from '@ui/custom-card/card-variants.component';
import {
  BUSINESS_REGISTRAZIONE_STEPS,
  BUSINESS_REGISTRAZIONE_REQUIREMENTS,
  BUSINESS_REGISTRAZIONE_FAQ,
} from '@constants';
import { CustomAccordionComponent } from '@ui/custom-accordion/custom-accordion.component';
import { CustomEmailComponent } from '@ui/custom-email/custom-email.component';

@Component({
  selector: 'app-business-registrazione-page',
  standalone: true,
  imports: [
    BusinessHeroComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
    CardMinimalComponent,
    CustomAccordionComponent,
    CustomEmailComponent,
  ],
  templateUrl: './business-registrazione.page.html',
})
export class BusinessRegistrazionePage {
  readonly iconStep = LucideListChecks;
  readonly iconCheck = LucideCheck;
  readonly steps = BUSINESS_REGISTRAZIONE_STEPS;
  readonly requirements = BUSINESS_REGISTRAZIONE_REQUIREMENTS;
  readonly faq = BUSINESS_REGISTRAZIONE_FAQ;

  readonly faqAccordionItems = BUSINESS_REGISTRAZIONE_FAQ.map(item => ({
    title: item.q,
    content: item.a,
  }));
}

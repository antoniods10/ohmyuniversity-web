import { Component } from '@angular/core';
import { LucideTriangleAlert } from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { CustomEmailComponent } from '@ui/custom-email/custom-email.component';
import {
  LEGAL_UPDATE,
  LEGAL_CONTACT_EMAIL,
  TERMS_INTRO_WARNING,
  TERMS_DEFINITIONS,
  TERMS_SERVICE_DESCRIPTION,
  TERMS_ACCESS,
  TERMS_USER_OBLIGATIONS,
  TERMS_AVAILABILITY,
  TERMS_IP,
  TERMS_PAID_PLANS,
  TERMS_LIABILITY,
  TERMS_CHANGES,
  TERMS_JURISDICTION,
  TERMS_RELATED_DOCS,
} from '@constants';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [CustomCardComponent, CardStatusComponent, CustomLinkComponent, CustomEmailComponent],
  templateUrl: './terms-conditions.page.html',
})
export class TermsPage {
  readonly iconAlert = LucideTriangleAlert;

  readonly lastUpdated = LEGAL_UPDATE.termsConditions;
  readonly contactEmail = LEGAL_CONTACT_EMAIL;

  readonly introWarning = TERMS_INTRO_WARNING;
  readonly definitions = TERMS_DEFINITIONS;
  readonly serviceDescription = TERMS_SERVICE_DESCRIPTION;
  readonly access = TERMS_ACCESS;
  readonly userObligations = TERMS_USER_OBLIGATIONS;
  readonly availability = TERMS_AVAILABILITY;
  readonly ip = TERMS_IP;
  readonly paidPlans = TERMS_PAID_PLANS;
  readonly liability = TERMS_LIABILITY;
  readonly changes = TERMS_CHANGES;
  readonly jurisdiction = TERMS_JURISDICTION;
  readonly relatedDocs = TERMS_RELATED_DOCS;
}

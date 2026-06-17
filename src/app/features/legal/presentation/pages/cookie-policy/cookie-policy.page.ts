import { Component } from '@angular/core';
import { LucideScale } from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { CustomEmailComponent } from '@ui/custom-email/custom-email.component';
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_UPDATE,
  COOKIE_POLICY_INTRO,
  COOKIE_TECHNICAL_INTRO,
  COOKIE_TECHNICAL_TABLE,
  COOKIE_ANALYTICS_INTRO,
  COOKIE_ANALYTICS_TABLE,
  COOKIE_NOT_USED,
  COOKIE_MANAGEMENT_TEXT,
  COOKIE_BROWSER_LINKS,
  LEGAL_RELATED_DOCS,
} from '@constants';

@Component({
  selector: 'app-cookie-policy-page',
  standalone: true,
  imports: [CustomCardComponent, CardStatusComponent, CustomLinkComponent, CustomEmailComponent],
  templateUrl: './cookie-policy.page.html',
})
export class CookiePolicyPage {
  readonly iconScale = LucideScale;

  readonly lastUpdated = LEGAL_UPDATE.cookiePolicy;
  readonly contactEmail = LEGAL_CONTACT_EMAIL;

  readonly intro = COOKIE_POLICY_INTRO;
  readonly technicalIntro = COOKIE_TECHNICAL_INTRO;
  readonly technicalCookies = COOKIE_TECHNICAL_TABLE;
  readonly analyticsIntro = COOKIE_ANALYTICS_INTRO;
  readonly analyticsCookies = COOKIE_ANALYTICS_TABLE;
  readonly notUsed = COOKIE_NOT_USED;
  readonly management = COOKIE_MANAGEMENT_TEXT;
  readonly browserLinks = COOKIE_BROWSER_LINKS;
  readonly relatedDocs = LEGAL_RELATED_DOCS;
}

import { Component, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon, LucideMapPin } from '@lucide/angular';
import { getCurrentYear } from '@shared/utils/date.utils';
import { APP_LOGO, APP_NAME, ORGANIZATION_NAME } from '@shared/constants';
import {
  FOOTER_EMAIL,
  FOOTER_GITHUB_ORG_URL,
  FOOTER_VAT_NUMBER,
  FOOTER_NAV_LINKS,
  FOOTER_BUSINESS_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_FAQ_LINKS,
  FOOTER_SOCIALS,
  FOOTER_SUPPORT_LINKS,
  FOOTER_UNIVERSITIES,
} from '@constants';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomEmailComponent } from '@ui/custom-email/custom-email.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    LucideDynamicIcon,
    CustomCardComponent,
    CustomEmailComponent,
    CustomLinkComponent,
    NgComponentOutlet,
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly currentYear = getCurrentYear();
  readonly vatNumber = FOOTER_VAT_NUMBER;
  readonly isDashboard = input<boolean>(false);
  readonly APP_NAME = APP_NAME;
  readonly APP_LOGO = APP_LOGO;
  readonly ORGANIZATION_NAME = ORGANIZATION_NAME;

  readonly footerEmail = FOOTER_EMAIL;
  readonly githubOrgUrl = FOOTER_GITHUB_ORG_URL;

  readonly iconMapPin = LucideMapPin;

  readonly universities = FOOTER_UNIVERSITIES;
  readonly navLinks = FOOTER_NAV_LINKS;
  readonly businessLinks = FOOTER_BUSINESS_LINKS;
  readonly legalLinks = FOOTER_LEGAL_LINKS;
  readonly faqLinks = FOOTER_FAQ_LINKS;
  readonly socials = FOOTER_SOCIALS;
  readonly supportLinks = FOOTER_SUPPORT_LINKS;
}

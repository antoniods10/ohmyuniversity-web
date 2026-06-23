import { Component, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon, LucideMapPin } from '@lucide/angular';
import { getCurrentYear } from '@shared/utils/date.utils';
import {
  APP,
  ORGANIZATION,
  FOOTER_NAV_LINKS,
  FOOTER_BUSINESS_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_FAQ_LINKS,
  FOOTER_SOCIALS,
  FOOTER_SUPPORT_LINKS,
  FOOTER_UNIVERSITIES,
} from '@shared/constants';
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
  readonly iconMapPin = LucideMapPin;

  readonly currentYear = getCurrentYear();
  readonly isDashboard = input<boolean>(false);

  readonly APP = APP;
  readonly ORGANIZATION = ORGANIZATION;

  readonly universities = FOOTER_UNIVERSITIES;
  readonly navLinks = FOOTER_NAV_LINKS;
  readonly businessLinks = FOOTER_BUSINESS_LINKS;
  readonly legalLinks = FOOTER_LEGAL_LINKS;
  readonly faqLinks = FOOTER_FAQ_LINKS;
  readonly socials = FOOTER_SOCIALS;
  readonly supportLinks = FOOTER_SUPPORT_LINKS;
}

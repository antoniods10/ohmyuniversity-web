import { Component } from '@angular/core';
import { PARTNER_BENEFITS, PARTNER_LINKS, PARTNER_STATS, PARTNER_TESTIMONIALS } from '@constants';
import { PartnerBenefitsComponent } from '../components/partner-benefits/partner-benefits.component';
import { PartnerCtaComponent } from '../components/partner-cta/partner-cta.component';
import { PartnerHeroComponent } from '../components/partner-hero/partner-hero.component';
import { PartnerLinksComponent } from '../components/partner-links/partner-links.component';
import { PartnerStatsComponent } from '../components/partner-stats/partner-stats.component';
import { PartnerTestimonialsComponent } from '../components/partner-testimonials/partner-testimonials.component';

@Component({
  selector: 'app-partner-page',
  standalone: true,
  imports: [
    PartnerHeroComponent,
    PartnerStatsComponent,
    PartnerBenefitsComponent,
    PartnerLinksComponent,
    PartnerTestimonialsComponent,
    PartnerCtaComponent,
  ],
  templateUrl: './partner.page.html',
})
export class PartnerPage {
  readonly benefits = PARTNER_BENEFITS;
  readonly partnerLinks = PARTNER_LINKS;
  readonly testimonials = PARTNER_TESTIMONIALS;
  readonly stats = PARTNER_STATS;
}

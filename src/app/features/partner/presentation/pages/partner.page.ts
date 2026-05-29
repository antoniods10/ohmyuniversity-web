import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PARTNER_BENEFITS, PARTNER_LINKS, PARTNER_STATS, PARTNER_TESTIMONIALS } from '@constants';

@Component({
  selector: 'app-partner-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './partner.page.html',
})
export class PartnerPage {
  readonly benefits = PARTNER_BENEFITS;
  readonly partnerLinks = PARTNER_LINKS;
  readonly testimonials = PARTNER_TESTIMONIALS;
  readonly stats = PARTNER_STATS;
}

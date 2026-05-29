import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_CONTACT_EMAIL, LEGAL_UPDATE } from '@constants';

@Component({
  selector: 'app-cookie-policy-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-policy.page.html',
})
export class CookiePolicyPage {
  readonly lastUpdated = LEGAL_UPDATE.cookiePolicy;
  readonly contactEmail = LEGAL_CONTACT_EMAIL;
}

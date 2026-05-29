import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_CONTACT_EMAIL, LEGAL_UPDATE } from '@constants';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy-policy.page.html',
})
export class PrivacyPolicyPage {
  readonly lastUpdated = LEGAL_UPDATE.privacyPolicy;
  readonly contactEmail = LEGAL_CONTACT_EMAIL;
}

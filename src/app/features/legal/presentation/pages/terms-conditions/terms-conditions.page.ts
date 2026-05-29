import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_UPDATE, LEGAL_CONTACT_EMAIL } from '@constants';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms-conditions.page.html',
})
export class TermsPage {
  readonly lastUpdated = LEGAL_UPDATE.termsConditions;
  readonly contactEmail = LEGAL_CONTACT_EMAIL;
}

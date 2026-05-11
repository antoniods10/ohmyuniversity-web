import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy-policy.page.html',
})
export class PrivacyPolicyPage {
  readonly lastUpdated = '7 maggio 2025';
  readonly contactEmail = 'privacy@ohmyuniversity.it';
}

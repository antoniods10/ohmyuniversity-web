import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-policy-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-policy.page.html',
})
export class CookiePolicyPage {
  readonly lastUpdated = '7 maggio 2025';
  readonly contactEmail = 'privacy@ohmyuniversity.it';
}

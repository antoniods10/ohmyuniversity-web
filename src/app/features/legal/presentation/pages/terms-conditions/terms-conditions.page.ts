import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms-conditions.page.html',
})
export class TermsPage {
  readonly lastUpdated = '7 maggio 2025';
  readonly contactEmail = 'legal@ohmyuniversity.it';
}

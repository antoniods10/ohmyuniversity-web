import { Component, input } from '@angular/core';
import { APP } from '@shared/constants';
import { PartnerLink } from '@shared/types';
import { CardNavComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-partner-links',
  standalone: true,
  imports: [CardNavComponent],
  templateUrl: './partner-links.component.html',
})
export class PartnerLinksComponent {
  readonly APP = APP;

  readonly links = input.required<PartnerLink[]>();
}

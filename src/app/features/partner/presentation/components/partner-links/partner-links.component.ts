import { Component, input } from '@angular/core';
import { APP_NAME } from '@shared/constants';
import { CardNavComponent } from '@ui/custom-card/card-variants.component';

export interface PartnerLink {
  path: string;
  label: string;
  description: string;
  icon: any;
}

@Component({
  selector: 'app-partner-links',
  standalone: true,
  imports: [CardNavComponent],
  templateUrl: './partner-links.component.html',
})
export class PartnerLinksComponent {
  readonly APP_NAME = APP_NAME;

  readonly links = input.required<PartnerLink[]>();
}

import { Component, input } from '@angular/core';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';

@Component({
  selector: 'app-business-cta',
  standalone: true,
  imports: [CustomButtonComponent, CustomBadgeComponent],
  templateUrl: './business-cta.component.html',
})
export class BusinessCtaComponent {
  readonly badge = input<string>();
  readonly title = input<string>('Pronto a iniziare?');
  readonly subtitle = input<string>(
    'Il nostro team commerciale è disponibile per una chiamata conoscitiva gratuita senza impegno.',
  );
  readonly primaryLabel = input<string>('Contattaci');
  readonly primaryLink = input<string>('/business/contatti');
  readonly secondaryLabel = input<string>('Vedi i piani');
  readonly secondaryLink = input<string>('/business/prezzi');
}

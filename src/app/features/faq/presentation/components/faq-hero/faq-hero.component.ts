import { Component, input } from '@angular/core';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-faq-hero',
  standalone: true,
  imports: [CustomBadgeComponent, CustomTextComponent],
  templateUrl: './faq-hero.component.html',
})
export class FaqHeroComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly badge = input<string>('');
}

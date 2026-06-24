import { Component, input } from '@angular/core';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';

@Component({
  selector: 'app-business-hero',
  standalone: true,
  imports: [CustomBadgeComponent],
  templateUrl: './business-hero.component.html',
})
export class BusinessHeroComponent {
  readonly badge = input<string>('Per le organizzazioni');
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
}

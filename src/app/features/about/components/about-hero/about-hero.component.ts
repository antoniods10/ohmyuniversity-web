import { Component } from '@angular/core';
import { APP } from '@shared/constants';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-about-hero',
  standalone: true,
  imports: [CustomBadgeComponent, CustomTextComponent],
  templateUrl: './about-hero.component.html',
})
export class AboutHeroComponent {
  readonly APP = APP;
}

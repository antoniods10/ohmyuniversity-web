import { Component } from '@angular/core';
import { LucideArrowRight } from '@lucide/angular';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';

@Component({
  selector: 'app-partner-hero',
  standalone: true,
  imports: [CustomBadgeComponent, CustomButtonComponent],
  templateUrl: './partner-hero.component.html',
})
export class PartnerHeroComponent {
  readonly iconArrowRight = LucideArrowRight;
}

import { Component } from '@angular/core';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CustomBadgeComponent, CustomButtonComponent],
  templateUrl: './home-hero.component.html',
})
export class HomeHeroComponent {}

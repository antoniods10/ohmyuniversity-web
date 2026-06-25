import { Component } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideShield,
  LucideLogOut,
  LucideTriangleAlert,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-profile-security',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CardStatusComponent, LucideDynamicIcon],
  templateUrl: './profile-security.component.html',
})
export class ProfileSecurityComponent {
  readonly iconShield = LucideShield;
  readonly iconLogOut = LucideLogOut;
  readonly iconAlertTriangle = LucideTriangleAlert;

  readonly sessions = [
    { device: 'Browser corrente', location: 'Sessione attiva', time: 'Ora', current: true },
  ];
}

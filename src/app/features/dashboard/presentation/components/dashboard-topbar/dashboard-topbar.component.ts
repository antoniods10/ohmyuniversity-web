import { Component } from '@angular/core';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucideBell } from '@lucide/angular';

@Component({
  selector: 'app-dashboard-topbar',
  standalone: true,
  imports: [CustomBadgeComponent, CustomButtonComponent],
  templateUrl: './dashboard-topbar.component.html',
})
export class DashboardTopbarComponent {
  readonly iconBell = LucideBell;

  // @TODO
  readonly notificationCount = 3;
}

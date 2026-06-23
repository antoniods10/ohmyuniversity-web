import { Component } from '@angular/core';
import { LucideTriangleAlert } from '@lucide/angular';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dashboard-settings-page',
  standalone: true,
  imports: [DashboardContainerComponent, DashboardHeaderComponent, CardStatusComponent],
  templateUrl: './settings.page.html',
})
export class SettingsPage {
  readonly lucideAlertTriangle = LucideTriangleAlert;
}

import { Component } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dashboard-settings-page',
  standalone: true,
  imports: [DashboardContainerComponent, DashboardHeaderComponent],
  templateUrl: './settings.page.html',
})
export class SettingsPage {}

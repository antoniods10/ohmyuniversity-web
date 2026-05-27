import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebarComponent } from '../components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardTopbarComponent } from '../components/dashboard-topbar/dashboard-topbar.component';
import { DashboardFooterComponent } from '../components/dashboard-footer/dashboard-footer.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardSidebarComponent,
    DashboardTopbarComponent,
    DashboardFooterComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  readonly sidebarOpen = signal(true);
}

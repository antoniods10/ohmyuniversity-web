import { Component } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-university-partner-page',
  imports: [DashboardContainerComponent, DashboardHeaderComponent],
  templateUrl: './university-partner.page.html',
})
export class UniversityPartnerPage {}

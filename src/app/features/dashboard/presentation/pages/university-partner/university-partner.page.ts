import { Component } from '@angular/core';
import { LucideTriangleAlert } from '@lucide/angular';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-university-partner-page',
  imports: [DashboardContainerComponent, DashboardHeaderComponent, CardStatusComponent],
  templateUrl: './university-partner.page.html',
})
export class UniversityPartnerPage {
  readonly lucideAlertTriangle = LucideTriangleAlert;
}

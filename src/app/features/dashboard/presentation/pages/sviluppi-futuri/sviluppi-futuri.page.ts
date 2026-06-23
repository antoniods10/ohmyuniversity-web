import { Component } from '@angular/core';
import { LucideTriangleAlert } from '@lucide/angular';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-sviluppi-futuri-page',
  imports: [DashboardContainerComponent, DashboardHeaderComponent, CardStatusComponent],
  templateUrl: './sviluppi-futuri.page.html',
})
export class SviluppiFuturiPage {
  readonly lucideAlertTriangle = LucideTriangleAlert;
}

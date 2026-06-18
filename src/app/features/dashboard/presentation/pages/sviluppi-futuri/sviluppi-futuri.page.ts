import { Component } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-sviluppi-futuri-page',
  imports: [DashboardContainerComponent, DashboardHeaderComponent],
  templateUrl: './sviluppi-futuri.page.html',
})
export class SviluppiFuturiPage {}

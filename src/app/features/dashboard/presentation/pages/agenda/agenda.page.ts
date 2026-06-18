import { Component } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dashboard-agenda-page',
  standalone: true,
  imports: [DashboardContainerComponent, DashboardHeaderComponent],
  templateUrl: './agenda.page.html',
})
export class AgendaPage {}

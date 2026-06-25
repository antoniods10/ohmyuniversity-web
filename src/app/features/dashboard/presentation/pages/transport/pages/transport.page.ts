import { Component, signal } from '@angular/core';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { LucideBus, LucideTrainFront, LucideTriangleAlert } from '@lucide/angular';
import {
  TransportCompany,
  TransportRoute,
} from '@shared/types/dashboard/dashboard-transport.types';
import { MOCK_TRANSPORT_ROUTES, MOCK_TRANSPORT_COMPANIES } from '@shared/data/mock/transport.mock';
import { APP } from '@shared/constants';
import { TransportRoutesTabComponent } from '../components/transport-routes-tab/transport-routes-tab.component';
import { TransportSearchCardComponent } from '../components/transport-search-card/transport-search-card.component';
import { TransportCompaniesTabComponent } from '../components/transport-companies-tab/transport-companies-tab.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomTabsComponent,
    TransportSearchCardComponent,
    TransportRoutesTabComponent,
    TransportCompaniesTabComponent,
    CardStatusComponent,
  ],
  templateUrl: './transport.page.html',
})
export class TransportPage {
  readonly lucideAlertTriangle = LucideTriangleAlert;

  readonly APP = APP;

  // @TODO: inject from config/service
  readonly universityName = 'Università di Bologna';
  readonly universityAddress = 'Via Zamboni 33, Bologna';

  readonly tabs: TabItem[] = [
    { id: 'public', label: 'Trasporto pubblico', icon: LucideBus },
    { id: 'companies', label: 'Aziende locali', icon: LucideTrainFront },
  ];

  readonly routes: TransportRoute[] = MOCK_TRANSPORT_ROUTES;
  readonly companies: TransportCompany[] = MOCK_TRANSPORT_COMPANIES;

  activeTab = signal<string>('public');

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }

  openGoogleMaps(from: string = ''): void {
    const encodedFrom = encodeURIComponent(from);
    const encodedTo = encodeURIComponent(this.universityAddress);
    const url = from
      ? `https://www.google.com/maps/dir/${encodedFrom}/${encodedTo}`
      : `https://www.google.com/maps/search/${encodedTo}`;
    window.open(url, '_blank');
  }
}

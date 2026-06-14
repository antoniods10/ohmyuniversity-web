import { Component, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

import {
  LucideDynamicIcon,
  LucideSearch,
  LucideMapPin,
  LucideBus,
  LucideTrain,
  LucideDownload,
  LucideExternalLink,
  LucideNavigation,
  LucideClock,
  LucideInfo,
  LucideWifi,
} from '@lucide/angular';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

export interface TransportCompany {
  id: string;
  name: string;
  type: 'bus' | 'train' | 'mixed';
  coverage: string;
  description: string;
  website: string;
  scheduleUrl?: string;
  appUrl?: string;
  color: string;
}

export interface TransportRoute {
  id: string;
  from: string;
  to: string;
  duration: string;
  changes: number;
  type: 'bus' | 'train' | 'mixed';
  departures: string[];
}

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [
    FormsModule,
    PageHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    CustomTabsComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './transport.page.html',
})
export class TransportPage {
  private sanitizer = inject(DomSanitizer);

  readonly iconSearch = LucideSearch;
  readonly iconMapPin = LucideMapPin;
  readonly iconBus = LucideBus;
  readonly iconTrain = LucideTrain;
  readonly iconDownload = LucideDownload;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconNavigation = LucideNavigation;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;
  readonly iconWifi = LucideWifi;

  activeTab = signal<string>('public');
  fromValue = signal<string>('');
  mapUrl = signal<SafeResourceUrl | null>(null);
  searching = signal<boolean>(false);

  // @TODO
  readonly universityName = 'Università di Bologna';
  readonly universityAddress = 'Via Zamboni 33, Bologna';

  readonly tabs: TabItem[] = [
    { id: 'public', label: 'Trasporto pubblico', icon: LucideBus },
    { id: 'companies', label: 'Aziende locali', icon: LucideTrain },
  ];

  // @TODO
  readonly routes: TransportRoute[] = [
    {
      id: 'r1',
      from: 'Stazione Centrale Bologna',
      to: 'Via Zamboni 33',
      duration: '18 min',
      changes: 0,
      type: 'bus',
      departures: ['07:15', '07:30', '07:45', '08:00', '08:15'],
    },
    {
      id: 'r2',
      from: 'Stazione Centrale Bologna',
      to: 'Via Zamboni 33',
      duration: '12 min',
      changes: 0,
      type: 'bus',
      departures: ['07:10', '07:25', '07:40', '07:55', '08:10'],
    },
    {
      id: 'r3',
      from: 'Aeroporto G. Marconi',
      to: 'Via Zamboni 33',
      duration: '35 min',
      changes: 1,
      type: 'mixed',
      departures: ['06:45', '07:15', '07:45', '08:15', '08:45'],
    },
  ];

  readonly companies: TransportCompany[] = [
    {
      id: 'c1',
      name: 'Tper',
      type: 'bus',
      coverage: 'Bologna e provincia',
      description:
        'Principale azienda di trasporto pubblico locale di Bologna. Gestisce bus urbani ed extraurbani.',
      website: 'https://www.tper.it',
      scheduleUrl: 'https://www.tper.it/orari',
      appUrl: 'https://www.tper.it/app',
      color: 'var(--color-primary-dark)',
    },
    {
      id: 'c2',
      name: 'Trenitalia',
      type: 'train',
      coverage: 'Nazionale',
      description:
        'Trasporto ferroviario nazionale. Collegamento da tutte le principali città italiane verso Bologna.',
      website: 'https://www.trenitalia.com',
      scheduleUrl: 'https://www.trenitalia.com/orari',
      appUrl: 'https://www.trenitalia.com/app',
      color: 'var(--color-error-dark)',
    },
    {
      id: 'c3',
      name: 'Italo',
      type: 'train',
      coverage: 'Nazionale — Alta velocità',
      description:
        'Alta velocità italiana. Collegamento rapido tra le principali città con fermata a Bologna AV.',
      website: 'https://www.italotreno.it',
      scheduleUrl: 'https://www.italotreno.it/orari',
      color: 'var(--color-tertiary-dark)',
    },
    {
      id: 'c4',
      name: 'FlixBus',
      type: 'bus',
      coverage: 'Nazionale e internazionale',
      description:
        'Autobus a lunga percorrenza. Collegamento economico da e verso Bologna da tutta Italia ed Europa.',
      website: 'https://www.flixbus.it',
      scheduleUrl: 'https://www.flixbus.it/orari',
      color: 'var(--color-success-dark)',
    },
    {
      id: 'c5',
      name: 'BusItalia',
      type: 'bus',
      coverage: 'Emilia-Romagna',
      description:
        'Trasporto extraurbano in Emilia-Romagna. Collegamento tra comuni della regione e Bologna.',
      website: 'https://www.busitalia.it',
      scheduleUrl: 'https://www.busitalia.it/orari',
      color: 'var(--color-warning-dark)',
    },
    {
      id: 'c6',
      name: 'Marconi Express',
      type: 'train',
      coverage: 'Bologna — Aeroporto',
      description:
        "Collegamento diretto tra l'aeroporto G. Marconi e la stazione centrale di Bologna.",
      website: 'https://www.marconiexpress.it',
      scheduleUrl: 'https://www.marconiexpress.it/orari',
      color: 'var(--color-secondary-dark)',
    },
  ];

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }

  onFromChange(val: string | number): void {
    this.fromValue.set(String(val));
  }

  searchRoute(): void {
    if (!this.fromValue()) return;
    this.searching.set(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const query = encodeURIComponent(`${this.fromValue()} to ${this.universityAddress}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const url = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyD-placeholder&origin=${encodeURIComponent(this.fromValue())}&destination=${encodeURIComponent(this.universityAddress)}&mode=transit`;

    // @TODO
    const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(this.universityAddress)}&output=embed`;
    this.mapUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(mapsUrl));
    this.searching.set(false);
  }

  openGoogleMaps(): void {
    const from = encodeURIComponent(this.fromValue() || '');
    const to = encodeURIComponent(this.universityAddress);
    const url = from
      ? `https://www.google.com/maps/dir/${from}/${to}`
      : `https://www.google.com/maps/search/${to}`;
    window.open(url, '_blank');
  }

  routeTypeVariant(type: string): 'primary' | 'secondary' | 'success' {
    const map: Record<string, 'primary' | 'secondary' | 'success'> = {
      bus: 'primary',
      train: 'secondary',
      mixed: 'success',
    };
    return map[type] ?? 'primary';
  }

  routeTypeLabel(type: string): string {
    const map: Record<string, string> = {
      bus: 'Bus',
      train: 'Treno',
      mixed: 'Bus + Treno',
    };
    return map[type] ?? type;
  }

  companyTypeIcon(type: string): any {
    return type === 'train' ? LucideTrain : LucideBus;
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import {
  LucideUser,
  LucideShield,
  LucideTriangleAlert,
  LucideGraduationCap,
} from '@lucide/angular';
import { CarrieraFacade } from '../../../application/facades/carriera.facade';
import { ProfiloResponse } from '../../../domain/models/profilo.model';
import { ProfileHeroComponent } from './components/profile-hero/profile-hero.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ProfileSecurityComponent } from './components/profile-security/profile-security.component';
import { CarrieraInfoResponse } from '../../../domain/models/carriera-info.model';
import { forkJoin } from 'rxjs';
import { ProfileCourseComponent } from './profile-course/profile-course.component';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomTabsComponent,
    CardStatusComponent,
    ProfileHeroComponent,
    ProfileInformationComponent,
    ProfileSecurityComponent,
    ProfileCourseComponent,
  ],
  templateUrl: './profilo.page.html',
})
export class ProfiloPage implements OnInit {
  private readonly carriera = inject(CarrieraFacade);

  readonly lucideAlertTriangle = LucideTriangleAlert;

  readonly tabs: TabItem[] = [
    { id: 'informazioni', label: 'Informazioni', icon: LucideUser },
    { id: 'corso', label: 'Corso di studi', icon: LucideGraduationCap },
    { id: 'sicurezza', label: 'Sicurezza', icon: LucideShield },
  ];

  readonly activeTab = signal<string>('informazioni');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly profilo = signal<ProfiloResponse | null>(null);
  readonly carrieraInfo = signal<CarrieraInfoResponse | null>(null);

  ngOnInit(): void {
    forkJoin({
      profilo: this.carriera.getProfilo(),
      info: this.carriera.getCarrieraInfo(),
    }).subscribe({
      next: ({ profilo, info }) => {
        this.profilo.set(profilo);
        this.carrieraInfo.set(info);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }
}

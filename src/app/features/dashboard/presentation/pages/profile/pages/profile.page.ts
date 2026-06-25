import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { ProfiloResponse } from '../../../../../../core/domain/models/career/profilo.model';
import { ProfileHeroComponent } from '../components/profile-hero/profile-hero.component';
import { ProfileInformationComponent } from '../components/profile-information/profile-information.component';
import { ProfileSecurityComponent } from '../components/profile-security/profile-security.component';
import { CarrieraInfoResponse } from '../../../../../../core/domain/models/career/carriera-info.model';
import { forkJoin } from 'rxjs';
import { ProfileCourseComponent } from '../components/profile-course/profile-course.component';
import { CarrieraFacade } from 'src/app/core/application/facades/carriera.facade';

@Component({
  selector: 'app-profile',
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
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {
  private readonly carriera = inject(CarrieraFacade);
  private readonly auth = inject(AuthFacade);

  readonly lucideAlertTriangle = LucideTriangleAlert;
  readonly hasCarriera = this.auth.hasCarriera();

  readonly tabs = computed<TabItem[]>(() => {
    const base: TabItem[] = [
      { id: 'informazioni', label: 'Informazioni', icon: LucideUser },
      { id: 'sicurezza', label: 'Sicurezza', icon: LucideShield },
    ];
    if (this.hasCarriera) {
      base.splice(1, 0, { id: 'corso', label: 'Corso di studi', icon: LucideGraduationCap });
    }
    return base;
  });

  readonly activeTab = signal<string>('informazioni');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly profilo = signal<ProfiloResponse | null>(null);
  readonly carrieraInfo = signal<CarrieraInfoResponse | null>(null);

  ngOnInit(): void {
    if (this.hasCarriera) {
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
    } else {
      console.log('PROFILO - ramo docente, chiamo getProfilo()');
      this.carriera.getProfilo().subscribe({
        next: profilo => {
          console.log('PROFILO DOCENTE OK:', profilo);
          this.profilo.set(profilo);
          this.loading.set(false);
        },
        error: err => {
          console.log('PROFILO DOCENTE ERROR:', err.status);
          this.error.set(true);
          this.loading.set(false);
        },
      });
    }
  }

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }
}

import { Component, signal, inject } from '@angular/core';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomInputComponent, SelectOption } from '@ui/custom-input/custom-input.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideDynamicIcon,
  LucideMapPin,
  LucideUsers,
  LucideMonitor,
  LucideWifi,
  LucideZap,
  LucideMap,
  LucideCalendarPlus,
  LucideInfo,
  LucideBuilding2,
  LucideLayers,
  LucideSearch,
  LucideTriangleAlert,
} from '@lucide/angular';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

import { Classroom, Building, Campus } from '@shared/types/dashboard/classrooms.types';
import { MOCK_CAMPUSES } from '@shared/data/mock/classrooms.mock';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';

@Component({
  selector: 'app-classrooms',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    CustomTabsComponent,
    CustomInputComponent,
    LucideDynamicIcon,
    CardStatusComponent,
  ],
  templateUrl: './classrooms.page.html',
})
export class ClassroomsPage {
  readonly lucideAlertTriangle = LucideTriangleAlert;

  private readonly toast = inject(ToastService);

  readonly iconMapPin = LucideMapPin;
  readonly iconUsers = LucideUsers;
  readonly iconMonitor = LucideMonitor;
  readonly iconWifi = LucideWifi;
  readonly iconZap = LucideZap;
  readonly iconMap = LucideMap;
  readonly iconCalendarPlus = LucideCalendarPlus;
  readonly iconInfo = LucideInfo;
  readonly iconBuilding = LucideBuilding2;
  readonly iconLayers = LucideLayers;
  readonly iconSearch = LucideSearch;

  activeCampusId = signal<string>('campobasso');
  activeBuilding = signal<string>('all');
  searchValue = signal<string>('');

  readonly campusTabs: TabItem[] = [
    { id: 'campobasso', label: 'Campobasso' },
    { id: 'termoli', label: 'Termoli' },
    { id: 'pesche', label: 'Pesche' },
  ];

  readonly campuses: Campus[] = MOCK_CAMPUSES;

  get activeCampus(): Campus {
    return this.campuses.find(c => c.id === this.activeCampusId()) ?? this.campuses[0];
  }

  get buildingOptions(): SelectOption[] {
    return [
      { value: 'all', label: 'Tutti gli edifici' },
      ...this.activeCampus.buildings.map(b => ({ value: b.id, label: b.name })),
    ];
  }

  get filteredBuildings(): Building[] {
    const buildings =
      this.activeBuilding() === 'all'
        ? this.activeCampus.buildings
        : this.activeCampus.buildings.filter(b => b.id === this.activeBuilding());

    const search = this.searchValue().toLowerCase().trim();
    if (!search) return buildings;

    return buildings
      .map(b => ({
        ...b,
        classrooms: b.classrooms.filter(
          c =>
            c.name.toLowerCase().includes(search) ||
            c.floor.toLowerCase().includes(search) ||
            c.type.toLowerCase().includes(search),
        ),
      }))
      .filter(b => b.classrooms.length > 0);
  }

  get totalClassrooms(): number {
    return this.filteredBuildings.reduce((acc, b) => acc + b.classrooms.length, 0);
  }

  get availableCount(): number {
    return this.filteredBuildings.reduce(
      (acc, b) => acc + b.classrooms.filter(c => c.available).length,
      0,
    );
  }

  onCampusChange(id: string): void {
    this.activeCampusId.set(id);
    this.activeBuilding.set('all');
    this.searchValue.set('');
  }

  onBuildingChange(val: string | number): void {
    this.activeBuilding.set(String(val));
  }

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  onBooking(): void {
    this.toast.show('Funzione disponibile a breve — riservata a docenti e tecnici.', 'info', {
      duration: 4000,
    });
  }

  typeLabel(type: Classroom['type']): string {
    const map: Record<Classroom['type'], string> = {
      lecture: 'Aula lezione',
      lab: 'Laboratorio',
      seminar: 'Sala seminari',
      exam: 'Aula esami',
    };
    return map[type];
  }

  typeVariant(type: Classroom['type']): 'primary' | 'secondary' | 'success' | 'warning' {
    const map: Record<Classroom['type'], 'primary' | 'secondary' | 'success' | 'warning'> = {
      lecture: 'primary',
      lab: 'secondary',
      seminar: 'success',
      exam: 'warning',
    };
    return map[type];
  }

  featureLabel(f: string): string {
    const map: Record<string, string> = {
      projector: 'Proiettore',
      lim: 'LIM',
      wifi: 'WiFi',
      power: 'Prese',
      ac: 'A/C',
    };
    return map[f] ?? f;
  }

  featureIcon(f: string): any {
    const map: Record<string, any> = {
      projector: LucideMonitor,
      lim: LucideMonitor,
      wifi: LucideWifi,
      power: LucideZap,
      ac: LucideZap,
    };
    return map[f] ?? LucideInfo;
  }
}

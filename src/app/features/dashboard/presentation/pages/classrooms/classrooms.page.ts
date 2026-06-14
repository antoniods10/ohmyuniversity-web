import { Component, signal } from '@angular/core';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { inject } from '@angular/core';
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
} from '@lucide/angular';
import { SelectOption } from '@ui/custom-input/custom-input.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

export interface Classroom {
  id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  features: ('projector' | 'lim' | 'wifi' | 'power' | 'ac')[];
  available: boolean;
  type: 'lecture' | 'lab' | 'seminar' | 'exam';
}

export interface Building {
  id: string;
  name: string;
  address: string;
  classrooms: Classroom[];
}

export interface Campus {
  id: string;
  city: string;
  label: string;
  buildings: Building[];
}

@Component({
  selector: 'app-classrooms',
  standalone: true,
  imports: [
    PageHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    CustomTabsComponent,
    CustomInputComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './classrooms.page.html',
})
export class ClassroomsPage {
  private toast = inject(ToastService);

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

  // @TODO — dati reali da service
  readonly campuses: Campus[] = [
    {
      id: 'campobasso',
      city: 'Campobasso',
      label: 'Sede principale',
      buildings: [
        {
          id: 'b-cb-1',
          name: 'Edificio A — Rettoria',
          address: 'Via Francesco De Sanctis 1, Campobasso',
          classrooms: [
            {
              id: 'cb-a-1',
              name: 'Aula Magna',
              building: 'Edificio A — Rettoria',
              floor: 'Piano terra',
              capacity: 300,
              features: ['projector', 'lim', 'wifi', 'power', 'ac'],
              available: true,
              type: 'lecture',
            },
            {
              id: 'cb-a-2',
              name: 'Aula A1',
              building: 'Edificio A — Rettoria',
              floor: '1° piano',
              capacity: 80,
              features: ['projector', 'wifi', 'power', 'ac'],
              available: true,
              type: 'lecture',
            },
            {
              id: 'cb-a-3',
              name: 'Aula A2',
              building: 'Edificio A — Rettoria',
              floor: '1° piano',
              capacity: 60,
              features: ['projector', 'wifi', 'ac'],
              available: false,
              type: 'lecture',
            },
            {
              id: 'cb-a-4',
              name: 'Sala Seminari',
              building: 'Edificio A — Rettoria',
              floor: '2° piano',
              capacity: 30,
              features: ['lim', 'wifi', 'power'],
              available: true,
              type: 'seminar',
            },
          ],
        },
        {
          id: 'b-cb-2',
          name: 'Edificio B — Scienze',
          address: 'Via Francesco De Sanctis 5, Campobasso',
          classrooms: [
            {
              id: 'cb-b-1',
              name: 'Laboratorio Informatica 1',
              building: 'Edificio B — Scienze',
              floor: 'Piano terra',
              capacity: 40,
              features: ['projector', 'lim', 'wifi', 'power', 'ac'],
              available: true,
              type: 'lab',
            },
            {
              id: 'cb-b-2',
              name: 'Laboratorio Informatica 2',
              building: 'Edificio B — Scienze',
              floor: 'Piano terra',
              capacity: 40,
              features: ['projector', 'wifi', 'power'],
              available: false,
              type: 'lab',
            },
            {
              id: 'cb-b-3',
              name: 'Aula B1',
              building: 'Edificio B — Scienze',
              floor: '1° piano',
              capacity: 100,
              features: ['projector', 'wifi', 'power', 'ac'],
              available: true,
              type: 'lecture',
            },
          ],
        },
      ],
    },
    {
      id: 'termoli',
      city: 'Termoli',
      label: 'Sede di Termoli',
      buildings: [
        {
          id: 'b-te-1',
          name: 'Polo Didattico Termoli',
          address: 'Via Lungotevere 12, Termoli',
          classrooms: [
            {
              id: 'te-1',
              name: 'Aula T1',
              building: 'Polo Didattico Termoli',
              floor: 'Piano terra',
              capacity: 60,
              features: ['projector', 'wifi', 'ac'],
              available: true,
              type: 'lecture',
            },
            {
              id: 'te-2',
              name: 'Aula T2',
              building: 'Polo Didattico Termoli',
              floor: 'Piano terra',
              capacity: 40,
              features: ['lim', 'wifi', 'power'],
              available: true,
              type: 'lecture',
            },
            {
              id: 'te-3',
              name: 'Laboratorio Scienze',
              building: 'Polo Didattico Termoli',
              floor: '1° piano',
              capacity: 24,
              features: ['projector', 'wifi', 'power', 'ac'],
              available: false,
              type: 'lab',
            },
          ],
        },
      ],
    },
    {
      id: 'pesche',
      city: 'Pesche',
      label: 'Sede di Pesche',
      buildings: [
        {
          id: 'b-pe-1',
          name: 'Centro Congressi Pesche',
          address: 'Contrada Fonte Lappone, Pesche',
          classrooms: [
            {
              id: 'pe-1',
              name: 'Sala Convegni',
              building: 'Centro Congressi Pesche',
              floor: 'Piano terra',
              capacity: 150,
              features: ['projector', 'lim', 'wifi', 'power', 'ac'],
              available: true,
              type: 'lecture',
            },
            {
              id: 'pe-2',
              name: 'Aula P1',
              building: 'Centro Congressi Pesche',
              floor: '1° piano',
              capacity: 50,
              features: ['projector', 'wifi', 'ac'],
              available: true,
              type: 'seminar',
            },
          ],
        },
      ],
    },
  ];

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

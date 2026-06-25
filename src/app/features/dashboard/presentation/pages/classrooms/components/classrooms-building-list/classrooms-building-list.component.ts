import { Component, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucideMapPin,
  LucideUsers,
  LucideBuilding2,
  LucideLayers,
  LucideCalendarPlus,
  LucideSearch,
} from '@lucide/angular';
import { Building, Classroom } from '@shared/types/dashboard/dashboard-classrooms.types';

@Component({
  selector: 'app-classrooms-building-list',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './classrooms-building-list.component.html',
})
export class ClassroomsBuildingListComponent {
  readonly buildings = input.required<Building[]>();
  readonly booking = output<void>();

  readonly iconMapPin = LucideMapPin;
  readonly iconUsers = LucideUsers;
  readonly iconBuilding = LucideBuilding2;
  readonly iconLayers = LucideLayers;
  readonly iconCalendarPlus = LucideCalendarPlus;
  readonly iconSearch = LucideSearch;

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
}

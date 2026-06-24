import { Component, input } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideEuro,
  LucideCalendarDays,
  LucideExternalLink,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { Bando, BandoStatus } from '@shared/types/dashboard/secretariat.types';

@Component({
  selector: 'app-bandi-tab',
  standalone: true,
  imports: [LucideDynamicIcon, CustomCardComponent, CustomBadgeComponent, CustomButtonComponent],
  templateUrl: './bandi-tab.component.html',
})
export class BandiTabComponent {
  readonly bandi = input.required<Bando[]>();

  readonly iconEuro = LucideEuro;
  readonly iconCalendar = LucideCalendarDays;
  readonly iconExternalLink = LucideExternalLink;

  statusLabel(status: BandoStatus): string {
    const map: Record<BandoStatus, string> = {
      open: 'Aperto',
      closing: 'In scadenza',
      closed: 'Chiuso',
    };
    return map[status];
  }

  statusVariant(status: BandoStatus): 'success' | 'warning' | 'neutral' {
    const map: Record<BandoStatus, 'success' | 'warning' | 'neutral'> = {
      open: 'success',
      closing: 'warning',
      closed: 'neutral',
    };
    return map[status];
  }
}

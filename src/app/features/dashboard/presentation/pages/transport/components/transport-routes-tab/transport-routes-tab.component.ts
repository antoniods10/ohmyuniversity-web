import { Component, input, output } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucideBus,
  LucideTrainFront,
  LucideExternalLink,
  LucideNavigation,
  LucideClock,
  LucideInfo,
} from '@lucide/angular';
import { TransportRoute } from '@shared/types/dashboard/transport.types';

@Component({
  selector: 'app-transport-routes-tab',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './transport-routes-tab.component.html',
})
export class TransportRoutesTabComponent {
  readonly universityAddress = input.required<string>();
  readonly routes = input.required<TransportRoute[]>();

  readonly openMaps = output<void>();

  readonly iconBus = LucideBus;
  readonly iconTrain = LucideTrainFront;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconNavigation = LucideNavigation;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;

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
}

import { Component, input } from '@angular/core';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucideBus,
  LucideTrainFront,
  LucideDownload,
  LucideExternalLink,
  LucideInfo,
  LucideWifi,
} from '@lucide/angular';
import { TransportCompany } from '@shared/types/dashboard/dashboard-transport.types';
import { APP } from '@shared/constants';

@Component({
  selector: 'app-transport-companies-tab',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './transport-companies-tab.component.html',
})
export class TransportCompaniesTabComponent {
  readonly companies = input.required<TransportCompany[]>();
  readonly APP = APP;

  readonly iconBus = LucideBus;
  readonly iconTrain = LucideTrainFront;
  readonly iconDownload = LucideDownload;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconInfo = LucideInfo;
  readonly iconWifi = LucideWifi;

  companyTypeIcon(type: string): any {
    return type === 'train' ? LucideTrainFront : LucideBus;
  }
}

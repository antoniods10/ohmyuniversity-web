import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucidePrinter } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { LATEST_RESOURCE } from '@shared/data/mock/dashboard-secretariat.mock';

@Component({
  selector: 'app-secretariat-overview-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './secretariat-overview.widget.html',
})
export class SecretariatOverviewWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly resource = LATEST_RESOURCE;
  readonly lucidePrinter = LucidePrinter;
}

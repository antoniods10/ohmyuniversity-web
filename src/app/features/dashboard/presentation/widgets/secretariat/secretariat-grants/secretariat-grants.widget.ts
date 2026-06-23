import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucidePrinter } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_GRANTS } from '@shared/data/mock/dashboard-secretariat.mock';

@Component({
  selector: 'app-secretariat-grants-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './secretariat-grants.widget.html',
})
export class SecretariatGrantsWidgetComponent {
  @Input() size: WidgetSize = 'large';
  readonly grants = MOCK_GRANTS;
  readonly lucidePrinter = LucidePrinter;
}

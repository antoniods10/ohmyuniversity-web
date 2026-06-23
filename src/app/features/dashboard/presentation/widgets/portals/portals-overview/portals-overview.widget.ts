import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucideExternalLink } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { ALL_PORTALS } from '@shared/data/mock/dashboard-portals.mock';

@Component({
  selector: 'app-portals-overview-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './portals-overview.widget.html',
})
export class PortalsOverviewWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly portals = ALL_PORTALS;
  readonly lucideExternal = LucideExternalLink;
}

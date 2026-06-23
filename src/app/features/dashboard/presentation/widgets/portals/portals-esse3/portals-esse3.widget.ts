import { Component, Input } from '@angular/core';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideExternalLink } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_PORTALS } from '@shared/data/mock/dashboard-portals.mock';

@Component({
  selector: 'app-portals-esse3-widget',
  standalone: true,
  imports: [CustomButtonComponent, CustomLinkComponent, DashboardWidgetCardComponent],
  templateUrl: './portals-esse3.widget.html',
})
export class PortalsEsse3WidgetComponent {
  @Input() size: WidgetSize = 'small';
  readonly portal = MOCK_PORTALS['esse3'];
  readonly lucideExternal = LucideExternalLink;
}

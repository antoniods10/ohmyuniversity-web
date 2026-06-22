import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucideExternalLink } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_PORTALS } from '@shared/data/mock/dashboard-portals.mock';

@Component({
  selector: 'app-portals-website-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomButtonComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './portals-website.widget.html',
})
export class PortalsWebsiteWidgetComponent {
  @Input() size: WidgetSize = 'small';
  readonly portal = MOCK_PORTALS['website'];
  readonly lucideExternal = LucideExternalLink;
}

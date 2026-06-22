import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucidePrinter } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_CALLS } from '@shared/data/mock/dashboard-secretariat.mock';

@Component({
  selector: 'app-secretariat-calls-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './secretariat-calls.widget.html',
})
export class SecretariatCallsWidgetComponent {
  @Input() size: WidgetSize = 'large';
  readonly calls = MOCK_CALLS;
  readonly lucidePrinter = LucidePrinter;
}

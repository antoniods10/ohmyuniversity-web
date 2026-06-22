import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucideChartLine } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { WidgetSize } from '@shared/types';
import { MOCK_CAREER_DATA } from '@shared/data/mock/widget-career.mock';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';

@Component({
  selector: 'app-career-overview-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
    RouterLink,
  ],
  templateUrl: './career-overview.widget.html',
})
export class CareerOverviewWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly data = MOCK_CAREER_DATA;
  readonly lucideChart = LucideChartLine;

  get percentage(): number {
    return Math.round((this.data.obtainedCfu / this.data.totalCfu) * 100);
  }
}

import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideChartLine } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_CAREER_DATA } from '@shared/data/mock/widget-career.mock';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';

@Component({
  selector: 'app-career-weighted-avg-widget',
  standalone: true,
  imports: [CustomTextComponent, CustomLinkComponent, DashboardWidgetCardComponent],
  templateUrl: './career-weighted-avg.widget.html',
})
export class CareerWeightedAvgWidgetComponent {
  @Input() size: WidgetSize = 'small';
  readonly data = MOCK_CAREER_DATA;
  readonly lucideChart = LucideChartLine;
}

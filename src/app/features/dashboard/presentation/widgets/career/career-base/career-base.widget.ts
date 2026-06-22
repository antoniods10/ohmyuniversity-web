import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucideChartLine } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { WidgetSize } from '@shared/types';
import { MOCK_CAREER_DATA } from '@shared/data/mock/widget-career.mock';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';

@Component({
  selector: 'app-career-base-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    DashboardWidgetCardComponent,
    CustomLinkComponent,
    LucideDynamicIcon,
    RouterLink,
  ],
  templateUrl: './career-base.widget.html',
})
export class CareerBaseWidgetComponent {
  @Input() size: WidgetSize = 'small';
  readonly data = MOCK_CAREER_DATA;
  readonly lucideChart = LucideChartLine;
}

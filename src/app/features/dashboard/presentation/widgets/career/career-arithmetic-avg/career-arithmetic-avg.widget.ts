import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucideChartLine } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_CAREER_DATA } from '@shared/data/mock/widget-career.mock';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';

@Component({
  selector: 'app-career-arithmetic-avg-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomButtonComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './career-arithmetic-avg.widget.html',
})
export class CareerArithmeticAvgWidgetComponent {
  @Input() size: WidgetSize = 'small';
  readonly data = MOCK_CAREER_DATA;
  readonly lucideChart = LucideChartLine;
}

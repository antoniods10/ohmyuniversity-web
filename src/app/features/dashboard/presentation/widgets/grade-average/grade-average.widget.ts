import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { WidgetSize } from '@shared/types';
import { LucideDynamicIcon, LucideChartLine } from '@lucide/angular';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';

interface GradeAverageData {
  weighted: number;
  arithmetic: number;
  honors: number;
}

const MOCK_GRADE_AVERAGE: GradeAverageData = {
  weighted: 27.5,
  arithmetic: 26.8,
  honors: 3,
};

@Component({
  selector: 'app-grade-average-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],

  templateUrl: './grade-average.widget.html',
})
export class GradeAverageWidgetComponent {
  @Input() size: WidgetSize = 'small';
  readonly data = MOCK_GRADE_AVERAGE;
  readonly lucideChart = LucideChartLine;
}

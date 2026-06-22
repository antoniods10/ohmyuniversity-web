import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucideGraduationCap } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { WidgetSize } from '@shared/types';
import { MOCK_CAREER_DATA } from '@shared/data/mock/widget-career.mock';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';

@Component({
  selector: 'app-career-cfu-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    DashboardWidgetCardComponent,
    CustomLinkComponent,
    LucideDynamicIcon,
    RouterLink,
  ],
  templateUrl: './career-cfu.widget.html',
})
export class CareerCfuWidgetComponent {
  @Input() size: WidgetSize = 'small';
  readonly data = MOCK_CAREER_DATA;
  readonly lucideGraduation = LucideGraduationCap;

  get percentage(): number {
    return Math.round((this.data.obtainedCfu / this.data.totalCfu) * 100);
  }
}

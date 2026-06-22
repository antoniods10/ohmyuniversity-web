import { Component, Input, computed, signal } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { WidgetSize } from '@shared/types';
import { LucideDynamicIcon, LucideGraduationCap } from '@lucide/angular';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';

interface CfuData {
  obtained: number;
  total: number;
  byYear: { year: string; obtained: number; total: number }[];
}

const MOCK_CFU: CfuData = {
  obtained: 142,
  total: 180,
  byYear: [
    { year: 'Primo anno', obtained: 60, total: 60 },
    { year: 'Secondo anno', obtained: 52, total: 60 },
    { year: 'Terzo anno', obtained: 30, total: 60 },
  ],
};

@Component({
  selector: 'app-cfu-progress-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],

  templateUrl: './cfu-progress.widget.html',
})
export class CfuProgressWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly data = MOCK_CFU;
  readonly lucideGraduation = LucideGraduationCap;

  get percentage(): number {
    return Math.round((this.data.obtained / this.data.total) * 100);
  }
}

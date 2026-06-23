import { Component, Input } from '@angular/core';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideCalendarClock, LucideDownload, LucideExternalLink } from '@lucide/angular';
import { WidgetSize } from '@shared/types';

@Component({
  selector: 'app-schedules-overview-widget',
  standalone: true,
  imports: [CustomButtonComponent, CustomLinkComponent, DashboardWidgetCardComponent],
  templateUrl: './schedules-overview.widget.html',
})
export class SchedulesOverviewWidgetComponent {
  @Input() size: WidgetSize = 'small';

  readonly LucideExternalLink = LucideExternalLink;
  readonly lucideDownload = LucideDownload;

  readonly mockCourseLabel = 'Ingegneria Informatica LM';
  readonly mockPdfUrl = '#';
  readonly lucideSchedule = LucideCalendarClock;
}

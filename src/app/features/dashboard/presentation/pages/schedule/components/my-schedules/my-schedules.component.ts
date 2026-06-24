import { Component, input } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideDownload,
  LucideExternalLink,
  LucideCalendarDays,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { TimetableResponse } from '../../../../../domain/models/timetable.model';

const DEGREE_TYPE_LABEL: Record<string, string> = {
  triennali: 'Triennale',
  magistrali: 'Magistrale',
  magistrali_ciclo_unico: 'Magistrale a ciclo unico',
};

@Component({
  selector: 'app-my-schedules',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CustomButtonComponent, LucideDynamicIcon],
  templateUrl: './my-schedules.component.html',
})
export class MySchedulesComponent {
  readonly schedules = input.required<TimetableResponse[]>();

  readonly iconCalendar = LucideCalendarDays;
  readonly iconDownload = LucideDownload;
  readonly iconExternalLink = LucideExternalLink;

  degreeTypeLabel(degreeType: string): string {
    return DEGREE_TYPE_LABEL[degreeType] ?? degreeType;
  }

  formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString('it-IT');
  }

  async downloadFile(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = url.split('/').pop() ?? 'orario';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, '_blank');
    }
  }

  courseNameFromUrl(url: string): string {
    const match = url.match(/\/corso\/([^/]+)_lezioni/);
    if (!match) return '';
    return match[1].replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}

import { Component, input, output } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideChevronRight,
  LucideEuro,
  LucideCalendarDays,
  LucideExternalLink,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { Scholarship, ScholarshipStatus } from '@shared/types/dashboard/secretariat.types';

@Component({
  selector: 'app-scholarships-tab',
  standalone: true,
  imports: [LucideDynamicIcon, CustomCardComponent, CustomBadgeComponent, CustomButtonComponent],
  templateUrl: './scholarships-tab.component.html',
})
export class ScholarshipsTabComponent {
  readonly scholarships = input.required<Scholarship[]>();
  readonly apply = output<Scholarship>();

  readonly iconChevron = LucideChevronRight;
  readonly iconEuro = LucideEuro;
  readonly iconCalendar = LucideCalendarDays;
  readonly iconExternalLink = LucideExternalLink;

  statusLabel(status: ScholarshipStatus): string {
    const map: Record<ScholarshipStatus, string> = {
      open: 'Aperta',
      closing: 'In scadenza',
      closed: 'Chiusa',
      awarded: 'Assegnata',
      'not-awarded': 'Non assegnata',
    };
    return map[status];
  }

  statusVariant(
    status: ScholarshipStatus,
  ): 'success' | 'warning' | 'neutral' | 'primary' | 'error' {
    const map: Record<ScholarshipStatus, 'success' | 'warning' | 'neutral' | 'primary' | 'error'> =
      {
        open: 'success',
        closing: 'warning',
        closed: 'neutral',
        awarded: 'primary',
        'not-awarded': 'error',
      };
    return map[status];
  }

  onApply(s: Scholarship): void {
    this.apply.emit(s);
  }
}

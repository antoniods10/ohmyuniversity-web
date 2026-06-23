import { Component, input, output } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideCalendarCheck,
  LucideCalendarDays,
  LucideClock,
  LucideUser,
  LucideUsers,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { Exam, ExamStatus } from '@shared/types/dashboard/exams.types';
import { acronymVariant } from '@shared/utils/ui.utils';

@Component({
  selector: 'app-exam-card',
  standalone: true,
  imports: [CustomCardComponent, CustomBadgeComponent, CustomButtonComponent, LucideDynamicIcon],
  templateUrl: './exam-card.component.html',
})
export class ExamCardComponent {
  readonly exam = input.required<Exam>();
  readonly bookClicked = output<Exam>();

  readonly iconCalendarCheck = LucideCalendarCheck;
  readonly iconCalendarDays = LucideCalendarDays;
  readonly iconClock = LucideClock;
  readonly iconUser = LucideUser;
  readonly iconUsers = LucideUsers;
  readonly acronymVariant = acronymVariant;

  statusLabel(status: ExamStatus): string {
    const map: Record<ExamStatus, string> = {
      open: 'Aperto',
      closing: 'In chiusura',
      closed: 'Chiuso',
      booked: 'Prenotato',
    };
    return map[status];
  }

  statusVariant(status: ExamStatus): 'success' | 'warning' | 'neutral' | 'primary' | 'error' {
    const map: Record<ExamStatus, 'success' | 'warning' | 'neutral' | 'primary' | 'error'> = {
      open: 'success',
      closing: 'warning',
      closed: 'error',
      booked: 'primary',
    };
    return map[status];
  }

  bookLabel(status: ExamStatus): string {
    const map: Record<ExamStatus, string> = {
      open: 'Prenota',
      closing: 'Prenota',
      closed: 'Chiuso',
      booked: 'Prenotato',
    };
    return map[status];
  }

  bookVariant(status: ExamStatus): 'primary' | 'success' | 'ghost' {
    const map: Record<ExamStatus, 'primary' | 'success' | 'ghost'> = {
      open: 'primary',
      closing: 'primary',
      closed: 'ghost',
      booked: 'success',
    };
    return map[status];
  }

  deadlineColor(status: ExamStatus): string {
    if (status === 'closed') return 'var(--color-neutral-400)';
    if (status === 'closing') return 'var(--color-warning-dark)';
    return 'var(--color-success-dark)';
  }

  deadlineBackground(status: ExamStatus): string {
    if (status === 'closed') return 'var(--color-neutral-100)';
    if (status === 'closing') return 'var(--color-warning-light)';
    return 'var(--color-success-light)';
  }

  countdownDays(): number | null {
    const raw = (this.exam() as any).dataInizioIscr;
    if (!raw || raw === 'N/D') return null;
    const parts = raw.split('/');
    if (parts.length !== 3) return null;
    const data = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);
    const diff = data.getTime() - oggi.getTime();
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : null;
  }
}

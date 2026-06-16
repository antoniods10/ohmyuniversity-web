import { Component, signal, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideCalendarCheck,
  LucideCalendarX,
  LucideCalendarDays,
  LucideClipboardList,
  LucideClipboardCheck,
  LucideClock,
  LucideMapPin,
  LucideUser,
  LucideUsers,
  LucideInfo,
  LucideFunnel,
} from '@lucide/angular';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

import { Exam, Questionnaire, ExamStatus } from '@shared/types/dashboard/exams.types';
import { MOCK_EXAMS, MOCK_QUESTIONNAIRES } from '@shared/data/mock/exams.mock';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PageHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    CustomTabsComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './exams.page.html',
})
export class ExamsPage {
  private readonly toast = inject(ToastService);

  readonly iconSearch = LucideSearch;
  readonly iconCalendarCheck = LucideCalendarCheck;
  readonly iconCalendarX = LucideCalendarX;
  readonly iconCalendarDays = LucideCalendarDays;
  readonly iconClipboard = LucideClipboardList;
  readonly iconClipboardDone = LucideClipboardCheck;
  readonly iconClock = LucideClock;
  readonly iconMapPin = LucideMapPin;
  readonly iconUser = LucideUser;
  readonly iconUsers = LucideUsers;
  readonly iconInfo = LucideInfo;
  readonly iconFilter = LucideFunnel;

  activeTab = signal<string>('exams');
  searchValue = signal<string>('');
  activeExamFilter = signal<'all' | 'open' | 'booked'>('all');

  readonly tabs: TabItem[] = [
    { id: 'exams', label: 'Appelli', icon: LucideCalendarDays },
    { id: 'questionnaires', label: 'Questionari', icon: LucideClipboardList },
  ];

  readonly exams: Exam[] = MOCK_EXAMS;
  readonly questionnaires: Questionnaire[] = MOCK_QUESTIONNAIRES;

  readonly filteredExams = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    let list = this.exams;

    if (this.activeExamFilter() === 'open') {
      list = list.filter(e => e.status === 'open' || e.status === 'closing');
    } else if (this.activeExamFilter() === 'booked') {
      list = list.filter(e => e.status === 'booked');
    }

    if (!q) return list;
    return list.filter(
      e =>
        e.courseName.toLowerCase().includes(q) ||
        e.professor.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q),
    );
  });

  readonly pendingQuestionnaires = computed(() =>
    this.questionnaires.filter(q => q.status === 'pending'),
  );

  readonly completedQuestionnaires = computed(() =>
    this.questionnaires.filter(q => q.status === 'completed'),
  );

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  setExamFilter(filter: 'all' | 'open' | 'booked'): void {
    this.activeExamFilter.set(filter);
  }

  onBookExam(exam: Exam): void {
    if (exam.status === 'booked') {
      this.toast.warning(`Sei già iscritto all'appello di ${exam.courseName}.`, { duration: 4000 });
      return;
    }
    if (exam.status === 'closed') {
      this.toast.error(`Le iscrizioni per ${exam.courseName} sono chiuse.`, { duration: 4000 });
      return;
    }
    this.toast.success(
      `Prenotazione per ${exam.courseName} registrata. Riceverai una conferma via email.`,
      { duration: 5000 },
    );
  }

  onFillQuestionnaire(q: Questionnaire): void {
    this.toast.info(
      `Il questionario per ${q.courseName} sarà disponibile a breve tramite il portale ESSE3.`,
      { duration: 5000 },
    );
  }

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

  spotsVariant(left: number, total: number): 'success' | 'warning' | 'error' | 'neutral' {
    if (left === 0) return 'error';
    const ratio = left / total;
    if (ratio <= 0.15) return 'warning';
    return 'success';
  }

  acronymVariant(acronym: string): 'primary' | 'secondary' | 'tertiary' | 'success' {
    const map: Record<string, 'primary' | 'secondary' | 'tertiary' | 'success'> = {
      L: 'primary',
      LM: 'secondary',
      LMcu: 'tertiary',
      DOC: 'success',
    };
    return map[acronym] ?? 'primary';
  }

  canBook(status: ExamStatus): boolean {
    return status === 'open' || status === 'closing';
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
}

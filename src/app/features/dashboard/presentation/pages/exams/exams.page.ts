import { Component, signal, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

import { ToastService } from '@ui/custom-toast/toast.service';
import { inject } from '@angular/core';
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

export type ExamStatus = 'open' | 'closing' | 'closed' | 'booked';
export type QuestionnaireStatus = 'pending' | 'completed';

export interface Exam {
  id: string;
  courseName: string;
  courseAcronym: string;
  professor: string;
  date: string;
  time: string;
  location: string;
  building: string;
  enrollDeadline: string;
  spotsTotal: number;
  spotsLeft: number;
  status: ExamStatus;
  cfu: number;
  year: number;
}

export interface Questionnaire {
  id: string;
  courseName: string;
  professor: string;
  type: string;
  deadline: string;
  status: QuestionnaireStatus;
  completedAt?: string;
}

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
  private toast = inject(ToastService);

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

  // @TODO — dati reali da service
  readonly exams: Exam[] = [
    {
      id: 'e1',
      courseName: 'Algoritmi e Strutture Dati',
      courseAcronym: 'LM',
      professor: 'Prof. Mario Bianchi',
      date: '28 giugno 2025',
      time: '09:00',
      location: 'Aula A1',
      building: 'Edificio A — Rettoria',
      enrollDeadline: '21 giugno 2025',
      spotsTotal: 80,
      spotsLeft: 34,
      status: 'open',
      cfu: 9,
      year: 1,
    },
    {
      id: 'e2',
      courseName: 'Sistemi Operativi',
      courseAcronym: 'LM',
      professor: 'Prof. Laura Conti',
      date: '2 luglio 2025',
      time: '10:00',
      location: 'Aula B1',
      building: 'Edificio B — Scienze',
      enrollDeadline: '25 giugno 2025',
      spotsTotal: 60,
      spotsLeft: 5,
      status: 'closing',
      cfu: 9,
      year: 1,
    },
    {
      id: 'e3',
      courseName: 'Basi di Dati',
      courseAcronym: 'LM',
      professor: 'Prof. Giovanni Serra',
      date: '5 luglio 2025',
      time: '14:00',
      location: 'Aula Magna',
      building: 'Edificio A — Rettoria',
      enrollDeadline: '28 giugno 2025',
      spotsTotal: 300,
      spotsLeft: 142,
      status: 'booked',
      cfu: 6,
      year: 1,
    },
    {
      id: 'e4',
      courseName: 'Analisi Matematica II',
      courseAcronym: 'L',
      professor: 'Prof. Carla Russo',
      date: '10 luglio 2025',
      time: '09:00',
      location: 'Aula T1',
      building: 'Polo Didattico Termoli',
      enrollDeadline: '3 luglio 2025',
      spotsTotal: 60,
      spotsLeft: 60,
      status: 'open',
      cfu: 12,
      year: 2,
    },
    {
      id: 'e5',
      courseName: 'Reti di Calcolatori',
      courseAcronym: 'LM',
      professor: 'Prof. Antonio Greco',
      date: '15 luglio 2025',
      time: '11:00',
      location: 'Laboratorio Informatica 1',
      building: 'Edificio B — Scienze',
      enrollDeadline: '8 luglio 2025',
      spotsTotal: 40,
      spotsLeft: 0,
      status: 'closed',
      cfu: 9,
      year: 1,
    },
    {
      id: 'e6',
      courseName: 'Ingegneria del Software',
      courseAcronym: 'LM',
      professor: 'Prof. Federica Longo',
      date: '18 luglio 2025',
      time: '15:00',
      location: 'Aula A2',
      building: 'Edificio A — Rettoria',
      enrollDeadline: '11 luglio 2025',
      spotsTotal: 60,
      spotsLeft: 28,
      status: 'open',
      cfu: 9,
      year: 2,
    },
  ];

  readonly questionnaires: Questionnaire[] = [
    {
      id: 'q1',
      courseName: 'Algoritmi e Strutture Dati',
      professor: 'Prof. Mario Bianchi',
      type: 'Valutazione della didattica',
      deadline: '25 giugno 2025',
      status: 'pending',
    },
    {
      id: 'q2',
      courseName: 'Sistemi Operativi',
      professor: 'Prof. Laura Conti',
      type: 'Valutazione della didattica',
      deadline: '28 giugno 2025',
      status: 'pending',
    },
    {
      id: 'q3',
      courseName: 'Analisi Matematica II',
      professor: 'Prof. Carla Russo',
      type: 'Valutazione della didattica',
      deadline: '—',
      status: 'completed',
      completedAt: '15 maggio 2025',
    },
    {
      id: 'q4',
      courseName: 'Programmazione I',
      professor: 'Prof. Marco Esposito',
      type: 'Valutazione della didattica',
      deadline: '—',
      status: 'completed',
      completedAt: '2 febbraio 2025',
    },
    {
      id: 'q5',
      courseName: 'Basi di Dati',
      professor: 'Prof. Giovanni Serra',
      type: 'Valutazione della didattica',
      deadline: '1 luglio 2025',
      status: 'pending',
    },
  ];

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

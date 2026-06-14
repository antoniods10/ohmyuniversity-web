import { Component, computed, signal } from '@angular/core';
import {
  LucideAward,
  LucideBookmark,
  LucideBookmarkCheck,
  LucideCalculator,
  LucideCalendar,
  LucideCheck,
  LucideClock,
  LucideDownload,
  LucideGraduationCap,
  LucideInfo,
  LucideMapPin,
  LucideScale,
  LucideUsers,
} from '@lucide/angular';

// ── Study-plan constants ───────────────────────────────────────────────────

const TOTAL_CFU = 180;
const MAX_GRADE = 30;
const GRADUATION_BASE_MAX = 110;
const AVERAGE_DECIMALS = 2;

// ── Shared types ───────────────────────────────────────────────────────────

type TabId = 'panoramica' | 'piano-studi' | 'appelli' | 'segreteria';

// ── Study-plan types ───────────────────────────────────────────────────────

export type ExamStatus = 'PASSED' | 'TO_TAKE';
export type CourseType = 'MANDATORY' | 'ELECTIVE';
export type ExamFilter = 'ALL' | 'PASSED' | 'TO_TAKE' | 'ELECTIVE';
export type TrendDirection = 'up' | 'down' | 'flat';

// ── Exam-booking types ─────────────────────────────────────────────────────

/** Exam modality: written test or oral interview. */
export type SessionType = 'WRITTEN' | 'ORAL';

/** Booking state of a single exam slot. */
export type BookingStatus = 'AVAILABLE' | 'BOOKED' | 'CLOSED';

/** Academic calendar session. */
export type AcademicSession = 'SUMMER' | 'WINTER' | 'EXTRAORDINARY';

/** Filter applied to the academic session column. */
export type SessionFilter = 'ALL' | AcademicSession;

/** Filter applied to the exam modality column. */
export type TypeFilter = 'ALL' | SessionType;

// ── Study-plan interfaces ──────────────────────────────────────────────────

export interface Exam {
  courseCode: string;
  courseName: string;
  cfu: number;
  grade: string;
  status: ExamStatus;
  type: CourseType;
  academicYear: number;
}

export interface FilterOption {
  id: ExamFilter;
  label: string;
}
export interface ExamGroup {
  year: number;
  yearLabel: string;
  exams: Exam[];
  passedCount: number;
}
export interface ChartPoint {
  value: number;
  isLast: boolean;
}
interface WeightedGrade {
  value: number;
  cfu: number;
}

// ── Exam-booking interfaces ────────────────────────────────────────────────

/** A single bookable exam slot in the student's study plan. */
export interface ExamSlot {
  id: string;
  courseCode: string;
  courseName: string;
  professor: string;
  date: string;
  time: string;
  type: SessionType;
  status: BookingStatus;
  session: AcademicSession;
  location: string;
  maxEnrollments: number;
  currentEnrollments: number;
}

/** Descriptor for session filter tabs. */
export interface SessionFilterOption {
  id: SessionFilter;
  label: string;
}

/** Descriptor for exam-type filter tabs. */
export interface TypeFilterOption {
  id: TypeFilter;
  label: string;
}

// ── Component ──────────────────────────────────────────────────────────────

@Component({
  selector: 'app-didattica-page',
  standalone: true,
  imports: [
    // LucideArrowDown,
    // LucideArrowUp,
    // LucideFileText,
    // LucideHistory,
    // LucideSearchX,
    // LucideTrendingUp,
    LucideAward,
    LucideBookmark,
    LucideBookmarkCheck,
    LucideCalculator,
    LucideCalendar,
    LucideCheck,
    LucideClock,
    LucideDownload,
    LucideGraduationCap,
    LucideInfo,
    LucideMapPin,
    LucideScale,
    LucideUsers,
  ],
  templateUrl: './career.page.html',
})
export class CareerPage {
  // ── Tab ─────────────────────────────────────────────────────────────────

  readonly activeTab = signal<TabId>('panoramica');

  // ── Study-plan state ─────────────────────────────────────────────────────

  readonly activeFilter = signal<ExamFilter>('ALL');

  readonly exams = signal<Exam[]>([
    {
      courseCode: 'INF-01',
      courseName: 'Programmazione I',
      cfu: 12,
      grade: '30L',
      type: 'MANDATORY',
      status: 'PASSED',
      academicYear: 1,
    },
    {
      courseCode: 'MAT-01',
      courseName: 'Analisi Matematica I',
      cfu: 9,
      grade: '24',
      type: 'MANDATORY',
      status: 'PASSED',
      academicYear: 1,
    },
    {
      courseCode: 'INF-02',
      courseName: 'Architettura degli Elaboratori',
      cfu: 6,
      grade: '28',
      type: 'MANDATORY',
      status: 'PASSED',
      academicYear: 1,
    },
    {
      courseCode: 'MAT-02',
      courseName: 'Geometria e Algebra Lineare',
      cfu: 6,
      grade: '30',
      type: 'MANDATORY',
      status: 'PASSED',
      academicYear: 1,
    },
    {
      courseCode: 'ENG-01',
      courseName: 'Lingua Inglese B2',
      cfu: 3,
      grade: '27',
      type: 'ELECTIVE',
      status: 'PASSED',
      academicYear: 1,
    },
    {
      courseCode: 'INF-03',
      courseName: 'Algoritmi e Strutture Dati',
      cfu: 9,
      grade: '27',
      type: 'MANDATORY',
      status: 'PASSED',
      academicYear: 2,
    },
    {
      courseCode: 'MAT-03',
      courseName: 'Calcolo delle Probabilità',
      cfu: 6,
      grade: '26',
      type: 'MANDATORY',
      status: 'PASSED',
      academicYear: 2,
    },
    {
      courseCode: 'INF-04',
      courseName: 'Basi di Dati',
      cfu: 9,
      grade: '30L',
      type: 'MANDATORY',
      status: 'PASSED',
      academicYear: 2,
    },
    {
      courseCode: 'INF-05',
      courseName: 'Ingegneria del Software',
      cfu: 9,
      grade: '',
      type: 'MANDATORY',
      status: 'TO_TAKE',
      academicYear: 2,
    },
    {
      courseCode: 'FIS-01',
      courseName: 'Fisica Generale',
      cfu: 6,
      grade: '',
      type: 'MANDATORY',
      status: 'TO_TAKE',
      academicYear: 2,
    },
    {
      courseCode: 'INF-06',
      courseName: 'Sistemi Operativi',
      cfu: 9,
      grade: '',
      type: 'MANDATORY',
      status: 'TO_TAKE',
      academicYear: 3,
    },
    {
      courseCode: 'INF-07',
      courseName: 'Reti di Calcolatori',
      cfu: 6,
      grade: '',
      type: 'MANDATORY',
      status: 'TO_TAKE',
      academicYear: 3,
    },
    {
      courseCode: 'INF-08',
      courseName: 'Machine Learning',
      cfu: 6,
      grade: '',
      type: 'ELECTIVE',
      status: 'TO_TAKE',
      academicYear: 3,
    },
  ]);

  readonly borseDiStudio = [
    { nome: 'Borsa di Studio INPS', tipo: 'Reddito', stato: 'Attiva' },
    { nome: 'Borsa Erasmus+', tipo: 'Mobilità', stato: 'Attiva' },
    { nome: 'Borsa di merito UNIMOL', tipo: 'Merito', stato: 'Scaduta' },
  ];

  readonly modulistica = [
    { nome: 'Modulo iscrizione esame', file: 'modulo_esame.pdf' },
    { nome: 'Certificato di laurea', file: 'certificato_laurea.pdf' },
    { nome: 'Piano di studi', file: 'piano_studi.pdf' },
  ];

  readonly tasse = [
    {
      tipo: 'Tassa 1° rata',
      importo: '450€',
      anno: '2025/26',
      scadenza: '31/01/2026',
      stato: 'Pagato',
    },
    {
      tipo: 'Tassa 2° rata',
      importo: '350€',
      anno: '2025/26',
      scadenza: '30/06/2026',
      stato: 'Da pagare',
    },
    {
      tipo: 'Tassa 3° rata',
      importo: '350€',
      anno: '2025/26',
      scadenza: '31/10/2026',
      stato: 'Da pagare',
    },
  ];

  readonly studenteBadge = {
    nome: 'Luca',
    cognome: 'Lanese',
    matricola: '178158',
    corsoDiLaurea: 'Software Technologies',
    annoAccademico: '2025/26',
    ateneo: 'UNIMOL',
  };

  // ── Exam-booking state ───────────────────────────────────────────────────

  /** Currently selected academic session filter. */
  readonly activeSessionFilter = signal<SessionFilter>('ALL');

  /** Currently selected exam-type filter. */
  readonly activeTypeFilter = signal<TypeFilter>('ALL');

  /** Complete list of exam slots available for the student's study plan (mock data). */
  readonly examSlots = signal<ExamSlot[]>([
    // ── Sessione Estiva ────────────────────────────────────────────────────
    {
      id: 'S1',
      courseCode: 'INF-05',
      courseName: 'Ingegneria del Software',
      professor: 'Prof. M. Rossi',
      date: '10/06/2026',
      time: '09:00',
      type: 'WRITTEN',
      status: 'BOOKED',
      session: 'SUMMER',
      location: 'Aula A1',
      maxEnrollments: 30,
      currentEnrollments: 18,
    },
    {
      id: 'S2',
      courseCode: 'INF-05',
      courseName: 'Ingegneria del Software',
      professor: 'Prof. M. Rossi',
      date: '01/07/2026',
      time: '14:00',
      type: 'ORAL',
      status: 'AVAILABLE',
      session: 'SUMMER',
      location: 'Aula B2',
      maxEnrollments: 15,
      currentEnrollments: 7,
    },
    {
      id: 'S3',
      courseCode: 'FIS-01',
      courseName: 'Fisica Generale',
      professor: 'Prof. A. Ferrari',
      date: '15/06/2026',
      time: '10:00',
      type: 'WRITTEN',
      status: 'AVAILABLE',
      session: 'SUMMER',
      location: 'Aula Magna',
      maxEnrollments: 40,
      currentEnrollments: 22,
    },
    {
      id: 'S4',
      courseCode: 'FIS-01',
      courseName: 'Fisica Generale',
      professor: 'Prof. A. Ferrari',
      date: '03/07/2026',
      time: '09:00',
      type: 'WRITTEN',
      status: 'AVAILABLE',
      session: 'SUMMER',
      location: 'Aula Magna',
      maxEnrollments: 40,
      currentEnrollments: 11,
    },
    {
      id: 'S5',
      courseCode: 'INF-06',
      courseName: 'Sistemi Operativi',
      professor: 'Prof. G. Bianchi',
      date: '20/06/2026',
      time: '11:00',
      type: 'ORAL',
      status: 'BOOKED',
      session: 'SUMMER',
      location: 'Aula C3',
      maxEnrollments: 20,
      currentEnrollments: 14,
    },
    {
      id: 'S6',
      courseCode: 'INF-07',
      courseName: 'Reti di Calcolatori',
      professor: 'Prof. L. Verdi',
      date: '25/06/2026',
      time: '14:00',
      type: 'WRITTEN',
      status: 'AVAILABLE',
      session: 'SUMMER',
      location: 'Laboratorio 1',
      maxEnrollments: 25,
      currentEnrollments: 14,
    },
    {
      id: 'S7',
      courseCode: 'INF-08',
      courseName: 'Machine Learning',
      professor: 'Prof. C. Esposito',
      date: '30/06/2026',
      time: '10:00',
      type: 'ORAL',
      status: 'AVAILABLE',
      session: 'SUMMER',
      location: 'Aula D4',
      maxEnrollments: 18,
      currentEnrollments: 5,
    },
    // ── Sessione Invernale ─────────────────────────────────────────────────
    {
      id: 'W1',
      courseCode: 'INF-05',
      courseName: 'Ingegneria del Software',
      professor: 'Prof. M. Rossi',
      date: '14/01/2027',
      time: '09:00',
      type: 'WRITTEN',
      status: 'AVAILABLE',
      session: 'WINTER',
      location: 'Aula A1',
      maxEnrollments: 30,
      currentEnrollments: 0,
    },
    {
      id: 'W2',
      courseCode: 'FIS-01',
      courseName: 'Fisica Generale',
      professor: 'Prof. A. Ferrari',
      date: '20/01/2027',
      time: '10:00',
      type: 'WRITTEN',
      status: 'AVAILABLE',
      session: 'WINTER',
      location: 'Aula Magna',
      maxEnrollments: 40,
      currentEnrollments: 0,
    },
    {
      id: 'W3',
      courseCode: 'INF-06',
      courseName: 'Sistemi Operativi',
      professor: 'Prof. G. Bianchi',
      date: '27/01/2027',
      time: '11:00',
      type: 'ORAL',
      status: 'AVAILABLE',
      session: 'WINTER',
      location: 'Aula C3',
      maxEnrollments: 20,
      currentEnrollments: 0,
    },
    {
      id: 'W4',
      courseCode: 'INF-07',
      courseName: 'Reti di Calcolatori',
      professor: 'Prof. L. Verdi',
      date: '29/01/2027',
      time: '14:00',
      type: 'WRITTEN',
      status: 'AVAILABLE',
      session: 'WINTER',
      location: 'Laboratorio 1',
      maxEnrollments: 25,
      currentEnrollments: 0,
    },
    // ── Sessione Straordinaria ─────────────────────────────────────────────
    {
      id: 'E1',
      courseCode: 'INF-06',
      courseName: 'Sistemi Operativi',
      professor: 'Prof. G. Bianchi',
      date: '12/10/2026',
      time: '09:00',
      type: 'ORAL',
      status: 'AVAILABLE',
      session: 'EXTRAORDINARY',
      location: 'Aula C3',
      maxEnrollments: 10,
      currentEnrollments: 3,
    },
    {
      id: 'E2',
      courseCode: 'INF-08',
      courseName: 'Machine Learning',
      professor: 'Prof. C. Esposito',
      date: '20/10/2026',
      time: '15:00',
      type: 'ORAL',
      status: 'AVAILABLE',
      session: 'EXTRAORDINARY',
      location: 'Aula D4',
      maxEnrollments: 8,
      currentEnrollments: 2,
    },
  ]);

  // ── Study-plan filter options ────────────────────────────────────────────

  readonly filterOptions: FilterOption[] = [
    { id: 'ALL', label: 'Tutti' },
    { id: 'PASSED', label: 'Superati' },
    { id: 'TO_TAKE', label: 'Da sostenere' },
    { id: 'ELECTIVE', label: 'A scelta' },
  ];

  readonly totalCfu = TOTAL_CFU;

  // ── Exam-booking filter options ──────────────────────────────────────────

  /** Session filter tab descriptors. */
  readonly sessionFilterOptions: SessionFilterOption[] = [
    { id: 'ALL', label: 'Tutti' },
    { id: 'SUMMER', label: 'Sessione Estiva' },
    { id: 'WINTER', label: 'Sessione Invernale' },
    { id: 'EXTRAORDINARY', label: 'Straordinaria' },
  ];

  /** Exam-type filter tab descriptors. */
  readonly typeFilterOptions: TypeFilterOption[] = [
    { id: 'ALL', label: 'Tutti' },
    { id: 'WRITTEN', label: 'Scritto' },
    { id: 'ORAL', label: 'Orale' },
  ];

  // ── Study-plan computed ──────────────────────────────────────────────────

  readonly filteredExams = computed<Exam[]>(() => {
    const all = this.exams();
    switch (this.activeFilter()) {
      case 'ALL':
        return all;
      case 'PASSED':
        return all.filter(e => e.status === 'PASSED');
      case 'TO_TAKE':
        return all.filter(e => e.status === 'TO_TAKE');
      case 'ELECTIVE':
        return all.filter(e => e.type === 'ELECTIVE');
    }
  });

  readonly examGroups = computed<ExamGroup[]>(() => {
    const byYear = new Map<number, Exam[]>();
    for (const exam of this.filteredExams()) {
      const list = byYear.get(exam.academicYear) ?? [];
      list.push(exam);
      byYear.set(exam.academicYear, list);
    }
    return Array.from(byYear.entries())
      .sort(([yearA], [yearB]) => yearA - yearB)
      .map(([year, exams]) => ({
        year,
        yearLabel: this.formatYearLabel(year),
        exams,
        passedCount: exams.filter(e => e.status === 'PASSED').length,
      }));
  });

  readonly earnedCfu = computed(() =>
    this.exams()
      .filter(e => e.status === 'PASSED')
      .reduce((sum, e) => sum + e.cfu, 0),
  );

  readonly cfuProgress = computed(() =>
    Math.min(100, Math.round((this.earnedCfu() / this.totalCfu) * 100)),
  );

  readonly weightedAverage = computed(() => {
    const grades = this.passedWeightedGrades();
    if (grades.length === 0) return 0;
    const weightedSum = grades.reduce((acc, g) => acc + g.value * g.cfu, 0);
    const totalWeight = grades.reduce((acc, g) => acc + g.cfu, 0);
    return this.roundAverage(weightedSum / totalWeight);
  });

  readonly arithmeticAverage = computed(() => {
    const grades = this.passedWeightedGrades();
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, g) => acc + g.value, 0);
    return this.roundAverage(sum / grades.length);
  });

  readonly graduationBase = computed(() =>
    Math.round((this.weightedAverage() / MAX_GRADE) * GRADUATION_BASE_MAX),
  );

  readonly gradeHistory = computed<ChartPoint[]>(() => {
    const grades = this.passedWeightedGrades();
    return grades.map((grade, index) => ({
      value: grade.value,
      isLast: index === grades.length - 1,
    }));
  });

  readonly averageHistory = computed<ChartPoint[]>(() => {
    const grades = this.passedWeightedGrades();
    let cumulativeWeighted = 0;
    let cumulativeCfu = 0;
    return grades.map((grade, index) => {
      cumulativeWeighted += grade.value * grade.cfu;
      cumulativeCfu += grade.cfu;
      return {
        value: this.roundAverage(cumulativeWeighted / cumulativeCfu),
        isLast: index === grades.length - 1,
      };
    });
  });

  readonly averageTrend = computed<TrendDirection>(() => {
    const history = this.averageHistory();
    if (history.length < 2) return 'flat';
    const last = history[history.length - 1].value;
    const previous = history[history.length - 2].value;
    if (last > previous) return 'up';
    if (last < previous) return 'down';
    return 'flat';
  });

  readonly passedExamsCount = computed(
    () => this.exams().filter(e => e.status === 'PASSED').length,
  );

  readonly totalExamsCount = computed(() => this.exams().length);

  // ── Exam-booking computed ────────────────────────────────────────────────

  /** Slots matching both active filters. */
  readonly filteredSlots = computed<ExamSlot[]>(() => {
    let slots = this.examSlots();

    if (this.activeSessionFilter() !== 'ALL') {
      slots = slots.filter(s => s.session === this.activeSessionFilter());
    }
    if (this.activeTypeFilter() !== 'ALL') {
      slots = slots.filter(s => s.type === this.activeTypeFilter());
    }

    return slots;
  });

  /** Number of AVAILABLE slots in the filtered view. */
  readonly availableCount = computed(
    () => this.filteredSlots().filter(s => s.status === 'AVAILABLE').length,
  );

  /** Total BOOKED slots across all sessions (unfiltered). */
  readonly bookedCount = computed(() => this.examSlots().filter(s => s.status === 'BOOKED').length);

  /** Earliest upcoming booked slot, or null if none exists. */
  readonly nextBookedExam = computed<ExamSlot | null>(() => {
    const booked = this.examSlots()
      .filter(s => s.status === 'BOOKED')
      .sort((a, b) => this.parseDateValue(a.date) - this.parseDateValue(b.date));
    return booked[0] ?? null;
  });

  /** Display label for the currently active session filter. */
  readonly activeSessionLabel = computed(
    () =>
      this.sessionFilterOptions.find(o => o.id === this.activeSessionFilter())?.label ?? 'Tutti',
  );

  // ── Study-plan methods ───────────────────────────────────────────────────

  applyFilter(filter: ExamFilter): void {
    this.activeFilter.set(filter);
  }

  // ── Exam-booking methods ─────────────────────────────────────────────────

  /**
   * Toggles the booking status of a slot.
   * AVAILABLE → BOOKED; BOOKED → AVAILABLE. CLOSED slots are ignored.
   *
   * @param slotId - ID of the slot to toggle.
   */
  toggleBooking(slotId: string): void {
    this.examSlots.update(slots =>
      slots.map(slot => {
        if (slot.id !== slotId) return slot;
        if (slot.status === 'AVAILABLE') {
          return {
            ...slot,
            status: 'BOOKED' as BookingStatus,
            currentEnrollments: slot.currentEnrollments + 1,
          };
        }
        if (slot.status === 'BOOKED') {
          return {
            ...slot,
            status: 'AVAILABLE' as BookingStatus,
            currentEnrollments: Math.max(0, slot.currentEnrollments - 1),
          };
        }
        return slot;
      }),
    );
  }

  /**
   * Applies a session filter.
   *
   * @param filter - The filter to activate.
   */
  applySessionFilter(filter: SessionFilter): void {
    this.activeSessionFilter.set(filter);
  }

  /**
   * Applies an exam-type filter.
   *
   * @param filter - The filter to activate.
   */
  applyTypeFilter(filter: TypeFilter): void {
    this.activeTypeFilter.set(filter);
  }

  /**
   * Returns the Italian display label for a session type.
   *
   * @param type - WRITTEN or ORAL.
   */
  getTypeLabel(type: SessionType): string {
    return type === 'WRITTEN' ? 'Scritto' : 'Orale';
  }

  /**
   * Returns the Italian display label for an academic session.
   *
   * @param session - SUMMER, WINTER, or EXTRAORDINARY.
   */
  getSessionLabel(session: AcademicSession): string {
    const labels: Record<AcademicSession, string> = {
      SUMMER: 'Sessione Estiva',
      WINTER: 'Sessione Invernale',
      EXTRAORDINARY: 'Straordinaria',
    };
    return labels[session];
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private passedWeightedGrades(): WeightedGrade[] {
    return this.exams()
      .filter(e => e.status === 'PASSED')
      .map(e => ({ value: this.parseGrade(e.grade) ?? 0, cfu: e.cfu }))
      .filter(g => g.value > 0);
  }

  private parseGrade(grade: string): number | null {
    if (!grade) return null;
    if (grade.toLowerCase().includes('l')) return MAX_GRADE;
    const parsed = parseInt(grade, 10);
    return isNaN(parsed) ? null : parsed;
  }

  private formatYearLabel(year: number): string {
    const labels: Record<number, string> = {
      1: 'Primo anno',
      2: 'Secondo anno',
      3: 'Terzo anno',
    };
    return labels[year] ?? `Anno ${year}`;
  }

  private roundAverage(value: number): number {
    const factor = Math.pow(10, AVERAGE_DECIMALS);
    return Math.round(value * factor) / factor;
  }

  /**
   * Parses a dd/MM/yyyy date string into a numeric timestamp for sorting.
   *
   * @param dateStr - Date formatted as "dd/MM/yyyy".
   */
  private parseDateValue(dateStr: string): number {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  }
}

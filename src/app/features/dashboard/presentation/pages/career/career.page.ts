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
import {
  MOCK_BORSE_DI_STUDIO,
  MOCK_EXAM_SLOTS,
  MOCK_EXAMS,
  MOCK_MODULISTICA,
  MOCK_STUDENTE_BADGE,
  MOCK_TASSE,
} from '@shared/data/mock/career.mock';
import type {
  AcademicSession,
  BookingStatus,
  ChartPoint,
  Exam,
  ExamFilter,
  ExamGroup,
  ExamSlot,
  FilterOption,
  SessionFilter,
  SessionFilterOption,
  SessionType,
  TrendDirection,
  TypeFilter,
  TypeFilterOption,
} from '@shared/types/dashboard/career.types';

// ── Study-plan constants ───────────────────────────────────────────────────

const TOTAL_CFU = 180;
const MAX_GRADE = 30;
const GRADUATION_BASE_MAX = 110;
const AVERAGE_DECIMALS = 2;

// ── Shared types ───────────────────────────────────────────────────────────

type TabId = 'panoramica' | 'piano-studi' | 'appelli' | 'segreteria';

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

  readonly exams = signal<Exam[]>(MOCK_EXAMS);

  readonly borseDiStudio = MOCK_BORSE_DI_STUDIO;
  readonly modulistica = MOCK_MODULISTICA;
  readonly tasse = MOCK_TASSE;
  readonly studenteBadge = MOCK_STUDENTE_BADGE;

  // ── Exam-booking state ───────────────────────────────────────────────────

  /** Currently selected academic session filter. */
  readonly activeSessionFilter = signal<SessionFilter>('ALL');

  /** Currently selected exam-type filter. */
  readonly activeTypeFilter = signal<TypeFilter>('ALL');

  /** Complete list of exam slots available for the student's study plan. */
  readonly examSlots = signal<ExamSlot[]>(MOCK_EXAM_SLOTS);

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

  private passedWeightedGrades(): { value: number; cfu: number }[] {
    return this.exams()
      .filter(e => e.status === 'PASSED')
      .map(e => ({ value: this.parseGrade(e.grade) ?? 0, cfu: e.cfu }))
      .filter(g => g.value > 0);
  }

  private parseGrade(grade: string): number | null {
    if (!grade) return null;
    if (grade.toLowerCase().includes('l')) return MAX_GRADE;
    const parsed = Number.parseInt(grade, 10);
    return Number.isNaN(parsed) ? null : parsed;
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

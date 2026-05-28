/**
 * @file career.page.ts
 * @description Career page component. Displays the student's academic
 * progress: weighted/arithmetic averages, graduation base, earned CFU,
 * the exams list grouped by academic year, and history charts for
 * grades and the running weighted average.
 */

import { Component, computed, signal } from '@angular/core';
import {
  LucideArrowDown,
  LucideArrowUp,
  LucideAward,
  LucideCalculator,
  LucideGraduationCap,
  LucideHistory,
  LucideInfo,
  LucideScale,
  LucideSearchX,
  LucideTrendingUp,
} from '@lucide/angular';

/** Total CFU required by the study plan. */
const TOTAL_CFU = 180;

/** Maximum grade in the Italian academic system (cum laude is treated as 30). */
const MAX_GRADE = 30;

/** Maximum graduation base score (out of 110). */
const GRADUATION_BASE_MAX = 110;

/** Number of decimals used when displaying averages. */
const AVERAGE_DECIMALS = 2;

/** Possible states an exam can be in. */
export type ExamStatus = 'PASSED' | 'TO_TAKE';

/** Course type within the study plan. */
export type CourseType = 'MANDATORY' | 'ELECTIVE';

/** Filter applied to the exams table. */
export type ExamFilter = 'ALL' | 'PASSED' | 'TO_TAKE' | 'ELECTIVE';

/** Direction of the running-average trend. */
export type TrendDirection = 'up' | 'down' | 'flat';

/** Single exam entry in the student's transcript. */
export interface Exam {
  courseCode: string;
  courseName: string;
  cfu: number;
  grade: string;
  status: ExamStatus;
  type: CourseType;
  academicYear: number;
}

/** Filter tab descriptor for the exams table. */
export interface FilterOption {
  id: ExamFilter;
  label: string;
}

/** Group of exams sharing the same academic year. */
export interface ExamGroup {
  year: number;
  yearLabel: string;
  exams: Exam[];
  passedCount: number;
}

/** Data point for the small history charts. */
export interface ChartPoint {
  value: number;
  isLast: boolean;
}

/** Numeric grade paired with the corresponding CFU weight. */
interface WeightedGrade {
  value: number;
  cfu: number;
}

@Component({
  selector: 'app-career-page',
  standalone: true,
  imports: [
    LucideArrowDown,
    LucideArrowUp,
    LucideAward,
    LucideCalculator,
    LucideGraduationCap,
    LucideHistory,
    LucideInfo,
    LucideScale,
    LucideSearchX,
    LucideTrendingUp,
  ],
  templateUrl: './career.page.html',
})
export class CareerPage {
  /** Currently selected filter for the exams table. */
  readonly activeFilter = signal<ExamFilter>('ALL');

  /** Full list of the student's exams (mocked, to be replaced by an API call). */
  readonly exams = signal<Exam[]>([
    { courseCode: 'INF-01', courseName: 'Programmazione I',               cfu: 12, grade: '30L', type: 'MANDATORY', status: 'PASSED',  academicYear: 1 },
    { courseCode: 'MAT-01', courseName: 'Analisi Matematica I',           cfu: 9,  grade: '24',  type: 'MANDATORY', status: 'PASSED',  academicYear: 1 },
    { courseCode: 'INF-02', courseName: 'Architettura degli Elaboratori', cfu: 6,  grade: '28',  type: 'MANDATORY', status: 'PASSED',  academicYear: 1 },
    { courseCode: 'MAT-02', courseName: 'Geometria e Algebra Lineare',    cfu: 6,  grade: '30',  type: 'MANDATORY', status: 'PASSED',  academicYear: 1 },
    { courseCode: 'ENG-01', courseName: 'Lingua Inglese B2',              cfu: 3,  grade: '27',  type: 'ELECTIVE',  status: 'PASSED',  academicYear: 1 },
    { courseCode: 'INF-03', courseName: 'Algoritmi e Strutture Dati',     cfu: 9,  grade: '27',  type: 'MANDATORY', status: 'PASSED',  academicYear: 2 },
    { courseCode: 'MAT-03', courseName: 'Calcolo delle Probabilità',      cfu: 6,  grade: '26',  type: 'MANDATORY', status: 'PASSED',  academicYear: 2 },
    { courseCode: 'INF-04', courseName: 'Basi di Dati',                   cfu: 9,  grade: '30L', type: 'MANDATORY', status: 'PASSED',  academicYear: 2 },
    { courseCode: 'INF-05', courseName: 'Ingegneria del Software',        cfu: 9,  grade: '',    type: 'MANDATORY', status: 'TO_TAKE', academicYear: 2 },
    { courseCode: 'FIS-01', courseName: 'Fisica Generale',                cfu: 6,  grade: '',    type: 'MANDATORY', status: 'TO_TAKE', academicYear: 2 },
    { courseCode: 'INF-06', courseName: 'Sistemi Operativi',              cfu: 9,  grade: '',    type: 'MANDATORY', status: 'TO_TAKE', academicYear: 3 },
    { courseCode: 'INF-07', courseName: 'Reti di Calcolatori',            cfu: 6,  grade: '',    type: 'MANDATORY', status: 'TO_TAKE', academicYear: 3 },
    { courseCode: 'INF-08', courseName: 'Machine Learning',               cfu: 6,  grade: '',    type: 'ELECTIVE',  status: 'TO_TAKE', academicYear: 3 },
  ]);

  /** Filter tabs shown above the exams table. */
  readonly filterOptions: FilterOption[] = [
    { id: 'ALL', label: 'Tutti' },
    { id: 'PASSED', label: 'Superati' },
    { id: 'TO_TAKE', label: 'Da sostenere' },
    { id: 'ELECTIVE', label: 'A scelta' },
  ];

  /** Total CFU required by the study plan (exposed to the template). */
  readonly totalCfu = TOTAL_CFU;

  /** Exams matching the current filter, in original order. */
  readonly filteredExams = computed<Exam[]>(() => {
    const all = this.exams();
    switch (this.activeFilter()) {
      case 'ALL':
        return all;
      case 'PASSED':
        return all.filter(exam => exam.status === 'PASSED');
      case 'TO_TAKE':
        return all.filter(exam => exam.status === 'TO_TAKE');
      case 'ELECTIVE':
        return all.filter(exam => exam.type === 'ELECTIVE');
    }
  });

  /** Filtered exams grouped by academic year, sorted ascending. */
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

  /** Number of exams the student has already passed. */
  readonly passedExamsCount = computed(
    () => this.exams().filter(exam => exam.status === 'PASSED').length,
  );

  /** Total number of exams in the study plan. */
  readonly totalExamsCount = computed(() => this.exams().length);

  /** Sum of CFU earned from passed exams. */
  readonly earnedCfu = computed(() =>
    this.exams()
      .filter(exam => exam.status === 'PASSED')
      .reduce((sum, exam) => sum + exam.cfu, 0),
  );

  /** CFU progress as a percentage (0-100). */
  readonly cfuProgress = computed(() =>
    Math.min(100, Math.round((this.earnedCfu() / this.totalCfu) * 100)),
  );

  /** Arithmetic average of passed exams, rounded to two decimals. */
  readonly arithmeticAverage = computed(() => {
    const grades = this.passedWeightedGrades();
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.value, 0);
    return this.roundAverage(sum / grades.length);
  });

  /** CFU-weighted average of passed exams, rounded to two decimals. */
  readonly weightedAverage = computed(() => {
    const grades = this.passedWeightedGrades();
    if (grades.length === 0) return 0;
    const weightedSum = grades.reduce(
      (acc, grade) => acc + grade.value * grade.cfu,
      0,
    );
    const totalWeight = grades.reduce((acc, grade) => acc + grade.cfu, 0);
    return totalWeight === 0
      ? 0
      : this.roundAverage(weightedSum / totalWeight);
  });

  /**
   * Graduation base score (out of 110) derived from the weighted average.
   * Italian formula: `(weightedAverage / 30) * 110`, rounded to the nearest integer.
   */
  readonly graduationBase = computed(() =>
    Math.round((this.weightedAverage() / MAX_GRADE) * GRADUATION_BASE_MAX),
  );

  /** Bar chart points for "Storico voti": one bar per passed exam. */
  readonly gradeHistory = computed<ChartPoint[]>(() => {
    const grades = this.passedWeightedGrades();
    return grades.map((grade, index) => ({
      value: grade.value,
      isLast: index === grades.length - 1,
    }));
  });

  /** Bar chart points for "Storico media": cumulative weighted average. */
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

  /**
   * Direction of the most recent change in the running weighted average.
   * Returns "flat" when fewer than two passed exams exist.
   */
  readonly averageTrend = computed<TrendDirection>(() => {
    const history = this.averageHistory();
    if (history.length < 2) return 'flat';
    const last = history[history.length - 1].value;
    const previous = history[history.length - 2].value;
    if (last > previous) return 'up';
    if (last < previous) return 'down';
    return 'flat';
  });

  /**
   * Updates the active filter for the exams table.
   *
   * @param filter - The filter to apply.
   */
  applyFilter(filter: ExamFilter): void {
    this.activeFilter.set(filter);
  }

  /**
   * Returns passed exams with a parseable grade, paired with their CFU.
   * Exams whose grade cannot be converted to a number (e.g. "Approvato")
   * are excluded so they do not skew the averages.
   */
  private passedWeightedGrades(): WeightedGrade[] {
    const result: WeightedGrade[] = [];
    for (const exam of this.exams()) {
      if (exam.status !== 'PASSED') continue;
      const value = this.parseGrade(exam.grade);
      if (value === null) continue;
      result.push({ value, cfu: exam.cfu });
    }
    return result;
  }

  /**
   * Parses an Italian academic grade string into a number.
   * Cum laude variants ("30L", "30 e Lode") are normalized to 30.
   *
   * @param grade - Raw grade string (e.g. "27", "30L", "Approvato").
   * @returns The numeric value, or null if the grade is not computable.
   */
  private parseGrade(grade: string): number | null {
    if (!grade) return null;
    const normalized = grade.trim().toLowerCase();
    if (normalized.includes('lode') || normalized === '30l') {
      return MAX_GRADE;
    }
    const parsed = parseInt(normalized, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }

  /**
   * Returns the Italian display label for an academic year number.
   *
   * @param year - 1-based academic year.
   */
  private formatYearLabel(year: number): string {
    const labels: Record<number, string> = {
      1: 'Primo anno',
      2: 'Secondo anno',
      3: 'Terzo anno',
      4: 'Quarto anno',
      5: 'Quinto anno',
    };
    return labels[year] ?? `Anno ${year}`;
  }

  /** Rounds a value to {@link AVERAGE_DECIMALS} decimal places. */
  private roundAverage(value: number): number {
    const factor = 10 ** AVERAGE_DECIMALS;
    return Math.round(value * factor) / factor;
  }
}
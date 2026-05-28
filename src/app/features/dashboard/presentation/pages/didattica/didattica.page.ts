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

const TOTAL_CFU = 180;
const MAX_GRADE = 30;
const GRADUATION_BASE_MAX = 110;
const AVERAGE_DECIMALS = 2;

export type ExamStatus = 'PASSED' | 'TO_TAKE';
export type CourseType = 'MANDATORY' | 'ELECTIVE';
export type ExamFilter = 'ALL' | 'PASSED' | 'TO_TAKE' | 'ELECTIVE';
export type TrendDirection = 'up' | 'down' | 'flat';

type TabId = 'panoramica' | 'esami' | 'piano-studi' | 'segreteria';

export interface Exam {
  courseCode: string;
  courseName: string;
  cfu: number;
  grade: string;
  status: ExamStatus;
  type: CourseType;
  academicYear: number;
}

export interface FilterOption { id: ExamFilter; label: string; }
export interface ExamGroup { year: number; yearLabel: string; exams: Exam[]; passedCount: number; }
export interface ChartPoint { value: number; isLast: boolean; }
interface WeightedGrade { value: number; cfu: number; }

@Component({
  selector: 'app-didattica-page',
  standalone: true,
  imports: [
    LucideArrowDown, LucideArrowUp, LucideAward, LucideCalculator,
    LucideGraduationCap, LucideHistory, LucideInfo, LucideScale,
    LucideSearchX, LucideTrendingUp,
  ],
  templateUrl: './didattica.page.html',
})
export class DidatticaPage {
  readonly activeTab = signal<TabId>('panoramica');
  readonly activeFilter = signal<ExamFilter>('ALL');

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

  readonly filterOptions: FilterOption[] = [
    { id: 'ALL', label: 'Tutti' },
    { id: 'PASSED', label: 'Superati' },
    { id: 'TO_TAKE', label: 'Da sostenere' },
    { id: 'ELECTIVE', label: 'A scelta' },
  ];

  readonly totalCfu = TOTAL_CFU;

  readonly filteredExams = computed<Exam[]>(() => {
    const all = this.exams();
    switch (this.activeFilter()) {
      case 'ALL': return all;
      case 'PASSED': return all.filter(e => e.status === 'PASSED');
      case 'TO_TAKE': return all.filter(e => e.status === 'TO_TAKE');
      case 'ELECTIVE': return all.filter(e => e.type === 'ELECTIVE');
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
    this.exams().filter(e => e.status === 'PASSED').reduce((sum, e) => sum + e.cfu, 0)
  );

  readonly cfuProgress = computed(() =>
    Math.min(100, Math.round((this.earnedCfu() / this.totalCfu) * 100))
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
    const sum = grades.reduce((acc, grade) => acc + grade.value, 0);
    return this.roundAverage(sum / grades.length);
  });

  readonly graduationBase = computed(() =>
    Math.round((this.weightedAverage() / MAX_GRADE) * GRADUATION_BASE_MAX)
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

  readonly passedExamsCount = computed(() => 
    this.exams().filter(exam => exam.status === 'PASSED').length
  );

  readonly totalExamsCount = computed(() => this.exams().length);

  applyFilter(filter: ExamFilter): void {
    this.activeFilter.set(filter);
  }

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
}
import { Component, computed, signal } from '@angular/core';
import { CareerStatsComponent } from '../components/career-stats/career-stats.component';
import { CareerChartsComponent } from '../components/career-charts/career-charts.component';
import { CareerExamsComponent } from '../components/career-exams/career-exams.component';
import { MOCK_EXAMS } from '@shared/data/mock/career.mock';
import type {
  ChartPoint,
  Exam,
  ExamFilter,
  ExamGroup,
  FilterOption,
} from '@shared/types/dashboard/career.types';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { SelectOption } from '@ui/custom-input/custom-input.component';

const TOTAL_CFU = 180;
const MAX_GRADE = 30;
const GRADUATION_BASE_MAX = 110;
const AVERAGE_DECIMALS = 2;

@Component({
  selector: 'app-didattica-page',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CareerStatsComponent,
    CareerChartsComponent,
    CareerExamsComponent,
  ],
  templateUrl: './career.page.html',
})
export class CareerPage {
  readonly studentLabel = 'Studente: Luca - Software Technologies (UNIMOL)';

  readonly activeFilter = signal<ExamFilter>('ALL');
  readonly exams = signal<Exam[]>(MOCK_EXAMS);
  readonly yearFilter = signal<number | 'ALL' | 'ELECTIVE'>('ALL');
  readonly totalCfu = TOTAL_CFU;

  readonly filterOptions: FilterOption[] = [
    { id: 'ALL', label: 'Tutti' },
    { id: 'PASSED', label: 'Superati' },
    { id: 'TO_TAKE', label: 'Da sostenere' },
  ];

  readonly filteredExams = computed<Exam[]>(() => {
    const all = this.exams();
    switch (this.activeFilter()) {
      case 'ALL':
        return all;
      case 'PASSED':
        return all.filter(e => e.status === 'PASSED');
      case 'TO_TAKE':
        return all.filter(e => e.status === 'TO_TAKE');
      default:
        return all;
    }
  });

  readonly yearFilterOptions = computed<SelectOption[]>(() => {
    const years = [
      ...new Set(
        this.exams()
          .filter(e => e.category === 'MANDATORY')
          .map(e => e.academicYear),
      ),
    ].sort();

    return [
      { value: 'ALL', label: 'Tutti gli anni' },
      ...years.map(y => ({ value: String(y), label: this.formatYearLabel(y) })),
      { value: 'ELECTIVE', label: 'A scelta' },
    ];
  });

  readonly electiveExams = computed<Exam[]>(() => {
    const yearFilter = this.yearFilter();
    const electives = this.filteredExams().filter(e => e.category === 'ELECTIVE');
    if (yearFilter === 'ALL' || yearFilter === 'ELECTIVE') return electives;
    return [];
  });

  readonly mandatoryGroups = computed<ExamGroup[]>(() => {
    const yearFilter = this.yearFilter();

    if (yearFilter === 'ELECTIVE') return [];

    const mandatory = this.filteredExams().filter(e => e.category === 'MANDATORY');
    const filtered =
      yearFilter === 'ALL'
        ? mandatory
        : mandatory.filter(e => e.academicYear === Number(yearFilter));

    const byYear = new Map<number, Exam[]>();
    for (const exam of filtered) {
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

  applyYearFilter(year: string): void {
    this.yearFilter.set(year === 'ALL' ? 'ALL' : year === 'ELECTIVE' ? 'ELECTIVE' : Number(year));
  }

  readonly earnedCfu = computed(() =>
    this.exams()
      .filter(e => e.status === 'PASSED')
      .reduce((sum, e) => sum + e.cfu, 0),
  );

  readonly cfuProgress = computed(() =>
    Math.min(100, Math.round((this.earnedCfu() / this.totalCfu) * 100)),
  );

  setSimulatedGrade(courseCode: string, grade: number | null): void {
    this.exams.update(exams =>
      exams.map(e =>
        e.courseCode === courseCode ? { ...e, simulatedGrade: grade ?? undefined } : e,
      ),
    );
  }

  readonly hasSimulation = computed(() =>
    this.exams().some(e => e.status !== 'PASSED' && e.simulatedGrade !== undefined),
  );

  readonly laudeCount = computed(
    () =>
      this.exams().filter(e => e.status === 'PASSED' && e.grade?.toUpperCase() === '30L').length,
  );

  private allGradesForComputation(): { value: number; cfu: number }[] {
    return this.exams()
      .map(e => {
        if (e.status === 'PASSED') {
          const val = this.parseGrade(e.grade) ?? 0;
          return val > 0 ? { value: val, cfu: e.cfu } : null;
        }
        if (e.simulatedGrade !== undefined) {
          return { value: e.simulatedGrade, cfu: e.cfu };
        }
        return null;
      })
      .filter((g): g is { value: number; cfu: number } => g !== null);
  }

  readonly weightedAverage = computed(() => {
    const grades = this.allGradesForComputation();
    if (grades.length === 0) return 0;
    const weightedSum = grades.reduce((acc, g) => acc + g.value * g.cfu, 0);
    const totalWeight = grades.reduce((acc, g) => acc + g.cfu, 0);
    return this.roundAverage(weightedSum / totalWeight);
  });

  readonly arithmeticAverage = computed(() => {
    const grades = this.allGradesForComputation();
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

  applyFilter(filter: ExamFilter): void {
    this.activeFilter.set(filter);
  }

  private passedWeightedGrades(): { value: number; cfu: number }[] {
    return this.exams()
      .filter(e => e.status === 'PASSED')
      .map(e => ({ value: this.parseGrade(e.grade) ?? 0, cfu: e.cfu }))
      .filter(g => g.value > 0);
  }

  private parseGrade(grade: string): number | null {
    if (!grade) return null;
    if (grade.toUpperCase() === '30L') return 30;
    const parsed = Number.parseInt(grade, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }

  private formatYearLabel(year: number): string {
    const labels: Record<number, string> = { 1: 'Primo anno', 2: 'Secondo anno', 3: 'Terzo anno' };
    return labels[year] ?? `Anno ${year}`;
  }

  private roundAverage(value: number): number {
    const factor = Math.pow(10, AVERAGE_DECIMALS);
    return Math.round(value * factor) / factor;
  }
}

import { Component, computed, signal } from '@angular/core';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
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
    CustomBadgeComponent,
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
  readonly totalCfu = TOTAL_CFU;

  readonly filterOptions: FilterOption[] = [
    { id: 'ALL', label: 'Tutti' },
    { id: 'PASSED', label: 'Superati' },
    { id: 'TO_TAKE', label: 'Da sostenere' },
  ];

  // Filtro ora lavora solo su status (PASSED/TO_TAKE), non più su category.
  // La distinzione MANDATORY/ELECTIVE è gestita a parte da mandatoryGroups
  // ed electiveExams, che restano due liste sempre separate indipendentemente
  // dal filtro di stato applicato.
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

  // Sostituisce il vecchio examGroups: stesso raggruppamento per anno, ma
  // solo sugli esami MANDATORY (piano di studi obbligatorio).
  readonly mandatoryGroups = computed<ExamGroup[]>(() => {
    const byYear = new Map<number, Exam[]>();
    for (const exam of this.filteredExams().filter(e => e.category === 'MANDATORY')) {
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

  // Nuovo: lista flat (non raggruppata per anno) dei soli esami ELECTIVE.
  readonly electiveExams = computed<Exam[]>(() =>
    this.filteredExams().filter(e => e.category === 'ELECTIVE'),
  );

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
    if (grade.toLowerCase().includes('l')) return MAX_GRADE;
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

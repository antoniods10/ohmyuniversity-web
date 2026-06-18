/**
 * @file career-exams.component.ts
 * @description Filterable, year-grouped exam register. Filter pills use
 * app-custom-tabs; the list itself stays a native table for dense tabular
 * data (no shared data-table component exists yet per project backlog).
 */

import { Component, input, output } from '@angular/core';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { ExamGroup, FilterOption, ExamFilter } from '@shared/types/dashboard/career.types';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';

@Component({
  selector: 'app-career-exams',
  standalone: true,
  imports: [CustomTabsComponent, CustomBadgeComponent, CustomCardComponent],
  templateUrl: './career-exams.component.html',
})
export class CareerExamsComponent {
  readonly examGroups = input.required<ExamGroup[]>();
  readonly filterOptions = input.required<FilterOption[]>();
  readonly activeFilter = input.required<ExamFilter>();
  readonly filterChange = output<ExamFilter>();

  onFilterChange(id: string): void {
    this.filterChange.emit(id as ExamFilter);
  }
}

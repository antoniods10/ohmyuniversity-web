/**
 * @file career-exams.component.ts
 * @description Replaces the previous "Registro Esami" table with two
 * expandable accordion sections: "Piano di Studi" (mandatory exams, grouped
 * by year) and "Esami a scelta" (elective exams, flat list). Each exam is
 * an expandable card showing its full metadata and CFU-by-CFU breakdown
 * when opened. Mandatory exams not yet passed link to the booking page;
 * elective exams not yet passed show a simple "—" badge instead, since not
 * every elective is meant to be booked.
 */

import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideDynamicIcon,
  LucideChevronDown,
  LucideCheck,
  LucideCalendarClock,
  LucideLock,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';
import { TEACHING_PERIOD_LABELS, ATTENDANCE_LABELS } from '@constants';
import { Exam, ExamFilter, ExamGroup, FilterOption, TeachingPeriod, AttendanceType } from '@types';

@Component({
  selector: 'app-career-exams',
  standalone: true,
  imports: [
    RouterLink,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTabsComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './career-exams.component.html',
})
export class CareerExamsComponent {
  readonly iconChevron = LucideChevronDown;
  readonly iconCheck = LucideCheck;
  readonly iconBooking = LucideCalendarClock;
  readonly iconLock = LucideLock;

  readonly mandatoryGroups = input.required<ExamGroup[]>();
  readonly electiveExams = input.required<Exam[]>();
  readonly filterOptions = input.required<FilterOption[]>();
  readonly activeFilter = input.required<ExamFilter>();
  readonly filterChange = output<ExamFilter>();

  readonly openExamCodes = new Set<string>();

  onFilterChange(id: string): void {
    this.filterChange.emit(id as ExamFilter);
  }

  toggleExam(courseCode: string): void {
    if (this.openExamCodes.has(courseCode)) {
      this.openExamCodes.delete(courseCode);
    } else {
      this.openExamCodes.add(courseCode);
    }
  }

  isOpen(courseCode: string): boolean {
    return this.openExamCodes.has(courseCode);
  }

  periodLabel(period: TeachingPeriod): string {
    return TEACHING_PERIOD_LABELS[period];
  }

  attendanceLabel(attendance: AttendanceType): string {
    return ATTENDANCE_LABELS[attendance];
  }
}

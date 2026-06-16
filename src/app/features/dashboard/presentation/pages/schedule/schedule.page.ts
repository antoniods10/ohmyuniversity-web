import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent, SelectOption } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import {
  LucideDynamicIcon,
  LucideDownload,
  LucideExternalLink,
  LucideCalendarDays,
  LucideSearch,
  LucideBookOpen,
  LucideBuilding2,
  LucideGraduationCap,
  LucideInfo,
} from '@lucide/angular';

import { CourseSchedule, ScheduleSearchResult } from '@shared/types/dashboard/schedule.types';
import { MOCK_MY_SCHEDULES } from '@shared/data/mock/schedule.mock';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    FormsModule,
    PageHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    CustomModalComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './schedule.page.html',
})
export class SchedulePage {
  readonly iconDownload = LucideDownload;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconCalendar = LucideCalendarDays;
  readonly iconSearch = LucideSearch;
  readonly iconBook = LucideBookOpen;
  readonly iconBuilding = LucideBuilding2;
  readonly iconGraduation = LucideGraduationCap;
  readonly iconInfo = LucideInfo;

  searchDepartment = signal<string>('');
  searchCourse = signal<string>('');
  searchSemester = signal<string>('');
  searchResult = signal<ScheduleSearchResult | null>(null);
  searching = signal<boolean>(false);

  readonly mySchedules: CourseSchedule[] = MOCK_MY_SCHEDULES;

  readonly departmentOptions: SelectOption[] = [
    { value: 'disi', label: 'DISI — Informatica e Ingegneria' },
    { value: 'fisica', label: 'Dipartimento di Fisica' },
    { value: 'matematica', label: 'Dipartimento di Matematica' },
    { value: 'economia', label: 'Dipartimento di Economia' },
    { value: 'giurisprudenza', label: 'Dipartimento di Giurisprudenza' },
  ];

  readonly courseOptions: SelectOption[] = [
    { value: 'ing-inf-lm', label: 'Ingegneria Informatica (LM)' },
    { value: 'ing-inf-l', label: 'Ingegneria Informatica (L)' },
    { value: 'fisica-lmcu', label: 'Fisica (LMcu)' },
    { value: 'matematica-lm', label: 'Matematica (LM)' },
    { value: 'economia-l', label: 'Economia (L)' },
  ];

  readonly semesterOptions: SelectOption[] = [
    { value: '1', label: '1° Semestre' },
    { value: '2', label: '2° Semestre' },
    { value: 'annuale', label: 'Corso annuale' },
  ];

  acronymVariant(acronym: string): 'primary' | 'secondary' | 'tertiary' | 'success' {
    const map: Record<string, 'primary' | 'secondary' | 'tertiary' | 'success'> = {
      L: 'primary',
      LM: 'secondary',
      LMcu: 'tertiary',
      DOC: 'success',
    };
    return map[acronym] ?? 'primary';
  }

  onDepartmentChange(val: string | number): void {
    this.searchDepartment.set(String(val));
    this.searchResult.set(null);
  }

  onCourseChange(val: string | number): void {
    this.searchCourse.set(String(val));
    this.searchResult.set(null);
  }

  onSemesterChange(val: string | number): void {
    this.searchSemester.set(String(val));
    this.searchResult.set(null);
  }

  get canSearch(): boolean {
    return !!this.searchDepartment() && !!this.searchCourse() && !!this.searchSemester();
  }

  searchSchedule(): void {
    if (!this.canSearch) return;
    this.searching.set(true);
    // @TODO
    setTimeout(() => {
      this.searchResult.set({
        courseName: this.courseOptions.find(o => o.value === this.searchCourse())?.label ?? '',
        department:
          this.departmentOptions.find(o => o.value === this.searchDepartment())?.label ?? '',
        semester: this.semesterOptions.find(o => o.value === this.searchSemester())?.label ?? '',
        university: 'Università di Bologna',
        downloadUrl: '#',
        externalUrl: 'https://unibo.it',
      });
      this.searching.set(false);
    }, 800);
  }

  resetSearch(modal: CustomModalComponent): void {
    this.searchDepartment.set('');
    this.searchCourse.set('');
    this.searchSemester.set('');
    this.searchResult.set(null);
    modal.close();
  }
}

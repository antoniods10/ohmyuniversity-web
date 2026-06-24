import { Component, computed, input, signal, viewChild } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideBookOpen,
  LucideBuilding2,
  LucideGraduationCap,
  LucideInfo,
  LucideCalendarDays,
  LucideDownload,
  LucideExternalLink,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent, SelectOption } from '@ui/custom-input/custom-input.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { TimetableResponse } from '../../../../../../../core/domain/models/timetable/timetable.model';
import { APP } from '@shared/constants';

@Component({
  selector: 'app-schedule-search-modal',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomModalComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './schedule-search-modal.component.html',
})
export class ScheduleSearchModalComponent {
  readonly APP = APP;

  readonly iconSearch = LucideSearch;
  readonly iconBook = LucideBookOpen;
  readonly iconBuilding = LucideBuilding2;
  readonly iconGraduation = LucideGraduationCap;
  readonly iconInfo = LucideInfo;
  readonly iconCalendar = LucideCalendarDays;
  readonly iconDownload = LucideDownload;
  readonly iconExternalLink = LucideExternalLink;

  private readonly modal = viewChild.required(CustomModalComponent);

  readonly timetables = input<TimetableResponse[]>([]);

  readonly searchDepartment = signal('');
  readonly searchCourse = signal('');
  readonly searchResults = signal<TimetableResponse[]>([]);
  readonly searching = signal(false);

  readonly departmentOptions = computed<SelectOption[]>(() => {
    const seen = new Set<string>();
    return this.timetables()
      .filter(t => {
        if (seen.has(t.departmentId)) return false;
        seen.add(t.departmentId);
        return true;
      })
      .map(t => ({ value: t.departmentId, label: t.departmentName }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  readonly courseOptions = computed<SelectOption[]>(() => {
    const dept = this.searchDepartment();
    if (!dept) return [];

    const seen = new Set<string>();
    return this.timetables()
      .filter(t => t.departmentId === dept)
      .filter(t => {
        const key = t.timetablePageUrl;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(t => ({
        value: t.timetablePageUrl,
        label: this.courseNameFromUrl(t.timetablePageUrl),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  get canSearch(): boolean {
    return !!this.searchDepartment() && !!this.searchCourse();
  }

  open(): void {
    this.modal().open();
  }

  onDepartmentChange(val: string | number): void {
    this.searchDepartment.set(String(val));
    this.searchCourse.set('');
    this.searchResults.set([]);
  }

  onCourseChange(val: string | number): void {
    this.searchCourse.set(String(val));
    this.searchResults.set([]);
  }

  searchSchedule(): void {
    if (!this.canSearch) return;
    this.searching.set(true);

    const results = this.timetables().filter(t => t.timetablePageUrl === this.searchCourse());

    this.searchResults.set(results);
    this.searching.set(false);
  }

  courseNameFromUrl(url: string): string {
    const match = url.match(/\/corso\/([^/]+)_lezioni/);
    if (!match) return url;
    return match[1].replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString('it-IT');
  }

  async downloadFile(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = url.split('/').pop() ?? 'orario';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, '_blank');
    }
  }
}

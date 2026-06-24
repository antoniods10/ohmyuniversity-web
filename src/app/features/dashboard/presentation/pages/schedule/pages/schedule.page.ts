import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucideDynamicIcon, LucideSearch } from '@lucide/angular';
import { MySchedulesComponent } from '../components/my-schedules/my-schedules.component';
import { ScheduleSearchModalComponent } from '../components/schedule-search-modal/schedule-search-modal.component';
import { AuthFacade } from 'src/app/features/auth/application/facades/auth.facade';
import { UNIVERSITY_ID_KEY } from 'src/app/features/auth/application/usecases/login.usecase';
import { CarrieraFacade } from 'src/app/features/dashboard/application/facades/carriera.facade';
import { TimetableFacade } from 'src/app/features/dashboard/application/facades/timetable.facade';
import { TimetableResponse } from 'src/app/features/dashboard/domain/models/timetable.model';

const DEGREE_TYPE_MAP: Record<string, string> = {
  L: 'triennali',
  L2: 'triennali',
  LM: 'magistrali',
  LM5: 'magistrali_ciclo_unico',
  LM6: 'magistrali_ciclo_unico',
  LMCU: 'magistrali_ciclo_unico',
};

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomCardComponent,
    CustomButtonComponent,
    MySchedulesComponent,
    ScheduleSearchModalComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './schedule.page.html',
})
export class SchedulePage implements OnInit {
  private readonly timetable = inject(TimetableFacade);
  private readonly auth = inject(AuthFacade);
  private readonly carriera = inject(CarrieraFacade);

  private readonly searchModal = viewChild.required(ScheduleSearchModalComponent);

  readonly iconSearch = LucideSearch;
  readonly mySchedules = signal<TimetableResponse[]>([]);
  readonly loading = signal(true);
  readonly allTimetables = signal<TimetableResponse[]>([]);

  ngOnInit(): void {
    const universityId = localStorage.getItem(UNIVERSITY_ID_KEY)?.toUpperCase() ?? 'UNIMOL';

    this.timetable.getTimetables(universityId).subscribe({
      next: data => this.allTimetables.set(data),
      error: () => {},
    });

    this.carriera.getCarrieraInfo().subscribe({
      next: info => {
        const degreeType = DEGREE_TYPE_MAP[info.tipoCorsoCod ?? ''] ?? 'triennali';
        const departmentId = info.facCod ? this.mapDepartmentId(info.facDes) : undefined;

        this.timetable.getTimetables(universityId, departmentId, degreeType).subscribe({
          next: data => {
            const byCorso = this.filterByCorso(data, info.cdsDes ?? '');
            const filtered = this.filterSchedules(byCorso, info.annoCorso ?? 1);
            this.mySchedules.set(filtered);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        });
      },
      error: () => {
        this.timetable.getTimetables(universityId).subscribe({
          next: data => {
            this.mySchedules.set(data);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        });
      },
    });
  }

  private mapDepartmentId(facDes: string): string {
    return facDes
      .toLowerCase()
      .replace(/^dipartimento\s+di\s+/i, '')
      .replace(/\s+e\s+/g, '-e-')
      .replace(/\s+/g, '-')
      .replace(/[àá]/g, 'a')
      .replace(/[èé]/g, 'e')
      .replace(/[ìí]/g, 'i')
      .replace(/[òó]/g, 'o')
      .replace(/[ùú]/g, 'u');
  }

  openSearch(): void {
    this.searchModal().open();
  }

  private filterSchedules(schedules: TimetableResponse[], annoCorso: number): TimetableResponse[] {
    const ANNO_LABELS: Record<number, string[]> = {
      1: ['PRIMO ANNO', 'PRIMO ANNO '],
      2: ['SECONDO ANNO', 'SECONDO ANNO '],
      3: ['TERZO ANNO', 'TERZO ANNO '],
      4: ['QUARTO ANNO', 'QUARTO ANNO '],
      5: ['QUINTO ANNO', 'QUINTO ANNO '],
    };

    const annoLabel = ANNO_LABELS[annoCorso] ?? [];

    const ALWAYS_INCLUDE = [
      'ADE',
      'CREDITI LIBERI',
      'CREDITI A SCELTA',
      'ESAMI A SCELTA',
      'INSEGNAMENTI LIBERI',
    ];

    return schedules.filter(s => {
      const label = (s.label ?? '').toUpperCase().trim();

      if (ALWAYS_INCLUDE.some(k => label.includes(k))) return true;

      if (annoLabel.some(a => label.startsWith(a))) return true;

      const hasAnyAnno = [
        'PRIMO ANNO',
        'SECONDO ANNO',
        'TERZO ANNO',
        'QUARTO ANNO',
        'QUINTO ANNO',
      ].some(a => label.includes(a));

      return !hasAnyAnno;
    });
  }

  private filterByCorso(schedules: TimetableResponse[], cdsDes: string): TimetableResponse[] {
    const slug = cdsDes
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[àá]/g, 'a')
      .replace(/[èé]/g, 'e')
      .replace(/[ìí]/g, 'i')
      .replace(/[òó]/g, 'o')
      .replace(/[ùú]/g, 'u');

    return schedules.filter(s => s.timetablePageUrl.includes(slug));
  }
}

import { Component, signal, inject, OnInit } from '@angular/core';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { LucideCalendarDays, LucideClipboardList } from '@lucide/angular';
import { Exam, Questionnaire, ExamStatus } from '@shared/types/dashboard/exams.types';
import { CarrieraFacade } from 'src/app/features/dashboard/application/facades/carriera.facade';
import {
  AppelloLibretto,
  IscrizioneAppello,
} from 'src/app/features/dashboard/domain/models/appelli.model';
import { ExamListComponent } from '../components/exam-list/exam-list.component';
import { QuestionnaireListComponent } from '../components/questionnaire-list/questionnaire-list.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomTabsComponent,
    ExamListComponent,
    QuestionnaireListComponent,
  ],
  templateUrl: './exams.page.html',
})
export class ExamsPage implements OnInit {
  private readonly toast = inject(ToastService);
  private readonly carriera = inject(CarrieraFacade);

  readonly tabs: TabItem[] = [
    { id: 'exams', label: 'Appelli', icon: LucideCalendarDays },
    { id: 'questionnaires', label: 'Questionari', icon: LucideClipboardList },
  ];

  readonly activeTab = signal<string>('exams');
  readonly examsLoading = signal(true);
  readonly examsError = signal(false);
  readonly exams = signal<Exam[]>([]);

  ngOnInit(): void {
    forkJoin({
      appelli: this.carriera.getAppelliPrenotabili(),
      prenotazioni: this.carriera.getPrenotazioniLibretto(),
      piano: this.carriera.getPiano(),
    }).subscribe({
      next: ({ appelli, prenotazioni, piano }) => {
        const pianoMap = new Map<string, { cfu: number; annoCorso: number }>();
        for (const riga of piano.righe ?? []) {
          if (riga.adCod)
            pianoMap.set(riga.adCod, { cfu: riga.cfu ?? 0, annoCorso: riga.annoCorso ?? 0 });
        }

        const prenotatiAdsceIds = new Set(prenotazioni.prenotazioni.map(p => p.adsceId));
        const prenotazioniMap = new Map(prenotazioni.prenotazioni.map(p => [p.adsceId, p]));

        const mapAppelli = appelli.appelli.map(a =>
          this.mapAppello(a, pianoMap, prenotazioniMap, prenotatiAdsceIds),
        );

        const idsGiaPresenti = new Set(appelli.appelli.map(a => a.adsceId));
        const prenotatiExtra = prenotazioni.prenotazioni
          .filter(p => !idsGiaPresenti.has(p.adsceId))
          .map(p => this.mapIscrizione(p, pianoMap));

        this.exams.set([...mapAppelli, ...prenotatiExtra]);
        this.examsLoading.set(false);
      },
      error: () => {
        this.examsError.set(true);
        this.examsLoading.set(false);
      },
    });
  }

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }

  onBookExam(exam: Exam): void {
    if (exam.status === 'booked') {
      this.toast.warning(`Sei già iscritto all'appello di ${exam.courseName}.`, { duration: 4000 });
      return;
    }
    if (exam.status === 'closed') {
      this.toast.error(`Le iscrizioni per ${exam.courseName} sono chiuse.`, { duration: 4000 });
      return;
    }
    this.toast.success(
      `Prenotazione per ${exam.courseName} registrata. Riceverai una conferma via email.`,
      { duration: 5000 },
    );
  }

  private mapAppello(
    a: AppelloLibretto,
    pianoMap: Map<string, { cfu: number; annoCorso: number }>,
    prenotazioniMap: Map<number, IscrizioneAppello>,
    prenotatiAdsceIds: Set<number>,
  ): Exam {
    const oggi = new Date();
    const parseData = (s: string | null): Date | null => {
      if (!s) return null;
      const parts = s.split(' ')[0].split('/');
      if (parts.length !== 3) return null;
      return new Date(+parts[2], +parts[1] - 1, +parts[0]);
    };

    const dataFineIscr = parseData(a.dataFineIscr);
    const dataInizioIscr = parseData(a.dataInizioIscr);
    const isPrenotato = prenotatiAdsceIds.has(a.adsceId);
    const prenotazione = prenotazioniMap.get(a.adsceId);
    const pianoInfo = pianoMap.get(a.adCod) ?? { cfu: 0, annoCorso: 0 };

    let ora = 'N/D';
    if (prenotazione?.dataOraTurno?.includes(' ')) {
      ora = prenotazione.dataOraTurno.split(' ')[1].substring(0, 5);
    } else if (a.oraEsa?.includes(' ')) {
      ora = a.oraEsa.split(' ')[1].substring(0, 5);
    }

    let status: ExamStatus;
    if (isPrenotato) {
      status = 'booked';
    } else if (a.stato === 'S') {
      status = 'closed';
    } else if (a.stato === 'I') {
      if (dataFineIscr && dataFineIscr < oggi) {
        status = 'closed';
      } else if (dataInizioIscr && dataInizioIscr > oggi) {
        status = 'closed';
      } else if (dataFineIscr) {
        const diff = dataFineIscr.getTime() - oggi.getTime();
        status = diff / (1000 * 60 * 60 * 24) <= 3 ? 'closing' : 'open';
      } else {
        status = 'open';
      }
    } else {
      status = 'closed';
    }

    return {
      id: String(a.appelloId ?? a.appId),
      courseName: a.adDes ?? a.desApp ?? 'N/D',
      courseAcronym: a.adCod ?? 'N/D',
      cfu: pianoInfo.cfu,
      year: pianoInfo.annoCorso,
      date: this.formatData(prenotazione?.dataOraTurno ?? a.dataInizioApp),
      time: ora,
      location: prenotazione?.aulaDes ?? 'N/D',
      building: 'N/D',
      professor: a.docente ?? 'N/D',
      enrollDeadline: this.formatData(a.dataFineIscr),
      spotsLeft: a.numIscritti ?? 0,
      spotsTotal: 0,
      status,
      dataInizioIscr: this.formatData(a.dataInizioIscr),
    } as any;
  }

  private mapIscrizione(
    p: IscrizioneAppello,
    pianoMap: Map<string, { cfu: number; annoCorso: number }>,
  ): Exam {
    const pianoInfo = pianoMap.get(p.adStuCod) ?? { cfu: 0, annoCorso: 0 };
    const ora = p.dataOraTurno?.includes(' ')
      ? p.dataOraTurno.split(' ')[1].substring(0, 5)
      : 'N/D';

    return {
      id: String(p.applistaId),
      courseName: p.adStuDes ?? 'N/D',
      courseAcronym: p.adStuCod ?? 'N/D',
      cfu: pianoInfo.cfu,
      year: pianoInfo.annoCorso,
      date: this.formatData(p.dataOraTurno),
      time: ora,
      location: p.aulaDes ?? 'N/D',
      building: 'N/D',
      professor: 'N/D',
      enrollDeadline: this.formatData(p.dataFineIscr),
      spotsLeft: 0,
      spotsTotal: 0,
      status: 'booked' as ExamStatus,
      dataInizioIscr: this.formatData(p.dataInizioIscr),
    } as any;
  }

  private formatData(s: string | null): string {
    if (!s) return 'N/D';
    const parts = s.split(' ')[0].split('/');
    if (parts.length !== 3) return s;
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }
}

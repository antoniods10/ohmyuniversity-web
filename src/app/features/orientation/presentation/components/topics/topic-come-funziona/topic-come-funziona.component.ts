import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CfuChartComponent } from '../../charts/cfu-chart/cfu-chart.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import {
  CardStatusComponent,
  CardSimpleComponent,
  CardMinimalComponent,
} from '@ui/custom-card/card-variants.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideTriangleAlert,
  LucideCircleCheck,
  LucideCheck,
  LucideInfo,
  LucideFilePenLine,
  LucideMessageSquare,
  LucideLayers,
  LucideFolderOpen,
  LucideCalendarDays,
  LucideCalendar,
  LucideSun,
} from '@lucide/angular';
import {
  COME_FUNZIONA_DIFFERENZE,
  COME_FUNZIONA_TIPI_ESAME,
  COME_FUNZIONA_SESSIONI,
  COME_FUNZIONA_TIPS,
  ORIENTATION_TOPICS,
} from '@constants';

// Icon map: exam type → Lucide icon (all registered in app.config.ts)
const EXAM_ICON_MAP: Record<string, any> = {
  Scritto: LucideFilePenLine,
  Orale: LucideMessageSquare,
  'Scritto + Orale': LucideLayers,
  'Progetto / Elaborato': LucideFolderOpen,
};

// Icon map: session label → Lucide icon
const SESSION_ICON_MAP: Record<string, any> = {
  'Sessione invernale': LucideCalendarDays,
  'Sessione estiva': LucideSun,
  'Sessione autunnale': LucideCalendar,
};

@Component({
  selector: 'app-topic-come-funziona',
  standalone: true,
  imports: [
    CommonModule,
    OrientationNavComponent,
    CfuChartComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
    CardSimpleComponent,
    CardMinimalComponent,
  ],
  templateUrl: './topic-come-funziona.component.html',
})
export class TopicComeFunzionaComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  private readonly toast = inject(ToastService);

  readonly iconWarn = LucideTriangleAlert;
  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconInfo = LucideInfo;

  readonly differenze = COME_FUNZIONA_DIFFERENZE;
  readonly tipiEsame = COME_FUNZIONA_TIPI_ESAME;
  readonly sessioniInfo = COME_FUNZIONA_SESSIONI;
  readonly tips = COME_FUNZIONA_TIPS;

  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'come-funziona')!.questions;
  readonly questionStudyStyle = this.questions[0];
  readonly questionExamType = this.questions[1];
  readonly questionAutonomy = this.questions[2];

  readonly selectedStudyStyle = signal<string | null>(null);
  readonly selectedExamType = signal<string | null>(null);
  readonly selectedAutonomy = signal<string | null>(null);

  scrollToQuestion(): void {
    document
      .getElementById('domanda-come-funziona')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getExamIcon(tipo: string): any {
    return EXAM_ICON_MAP[tipo] ?? LucideFilePenLine;
  }

  getSessionIcon(label: string): any {
    return SESSION_ICON_MAP[label] ?? LucideCalendar;
  }

  getSessionSubtitle(periodo: string, note: string): string {
    return `${periodo} · ${note}`;
  }

  isSelected(current: string | null, value: string): boolean {
    return current === value;
  }

  onSelectStudyStyle(value: string): void {
    if (this.selectedStudyStyle() === value) return;
    this.selectedStudyStyle.set(value);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectExamType(value: string): void {
    if (this.selectedExamType() === value) return;
    this.selectedExamType.set(value);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectAutonomy(value: string): void {
    if (this.selectedAutonomy() === value) return;
    this.selectedAutonomy.set(value);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

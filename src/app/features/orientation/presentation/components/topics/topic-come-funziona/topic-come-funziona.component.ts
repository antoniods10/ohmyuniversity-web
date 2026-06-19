import { Component, input, output, inject, computed } from '@angular/core';
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
  UNIVERSITY_VS_SCHOOL_DIFFERENCES,
  EXAM_TYPES,
  EXAM_SESSIONS,
  COME_FUNZIONA_TIPS,
  ORIENTATION_TOPICS,
} from '@constants';
import { OrientationStateService } from 'src/app/features/orientation/application/state/orientation.state';

const EXAM_ICON_MAP: Record<string, any> = {
  Scritto: LucideFilePenLine,
  Orale: LucideMessageSquare,
  'Scritto + Orale': LucideLayers,
  'Progetto / Elaborato': LucideFolderOpen,
};

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
  private readonly state = inject(OrientationStateService);

  readonly iconWarn = LucideTriangleAlert;
  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconInfo = LucideInfo;

  readonly differenze = UNIVERSITY_VS_SCHOOL_DIFFERENCES;
  readonly tipiEsame = EXAM_TYPES;
  readonly sessioniInfo = EXAM_SESSIONS;
  readonly tips = COME_FUNZIONA_TIPS;

  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'come-funziona')!.questions;
  readonly questionStudyStyle = this.questions[0];
  readonly questionExamType = this.questions[1];
  readonly questionAutonomy = this.questions[2];

  readonly selectedStudyStyle = computed(() => this.state.getAnswer(this.questionStudyStyle.id));
  readonly selectedExamType = computed(() => this.state.getAnswer(this.questionExamType.id));
  readonly selectedAutonomy = computed(() => this.state.getAnswer(this.questionAutonomy.id));

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
    const label = this.questionStudyStyle.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionStudyStyle.id, 'come-funziona', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectExamType(value: string): void {
    if (this.selectedExamType() === value) return;
    const label = this.questionExamType.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionExamType.id, 'come-funziona', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectAutonomy(value: string): void {
    if (this.selectedAutonomy() === value) return;
    const label = this.questionAutonomy.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionAutonomy.id, 'come-funziona', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

import { Component, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent, CardSimpleComponent } from '@ui/custom-card/card-variants.component';
import { CardVariant } from '@ui/custom-card/custom-card.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideCircleCheck,
  LucideCheck,
  LucideInfo,
  LucideCalendar,
  LucideBookOpen,
  LucideUsers,
  LucideZap,
} from '@lucide/angular';
import {
  VITA_TIMETABLE_TIPS,
  VITA_STUDY_TIPS,
  ORIENTATION_TOPICS,
  VITA_SCHEDULE_TIPS,
} from '@constants';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';

@Component({
  selector: 'app-topic-vita',
  standalone: true,
  imports: [
    CommonModule,
    OrientationNavComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
    CardSimpleComponent,
  ],
  templateUrl: './topic-vita.component.html',
})
export class TopicVitaComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  private readonly toast = inject(ToastService);
  private readonly state = inject(OrientationStateService);

  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconInfo = LucideInfo;

  readonly consigliOrari = VITA_TIMETABLE_TIPS;
  readonly consigliStudio = VITA_STUDY_TIPS;
  readonly scheduleTips = VITA_SCHEDULE_TIPS;

  readonly weekBlocks: {
    icon: any;
    label: string;
    subtitle: string;
    variant: CardVariant;
    ore: string;
  }[] = [
    {
      icon: LucideCalendar,
      label: 'Lezioni',
      subtitle: 'In aula o da remoto',
      variant: 'primary',
      ore: '15–20 ore/sett.',
    },
    {
      icon: LucideBookOpen,
      label: 'Studio individuale',
      subtitle: 'Ripasso, esercizi, appunti',
      variant: 'info',
      ore: '20–25 ore/sett.',
    },
    {
      icon: LucideUsers,
      label: 'Gruppi di studio',
      subtitle: 'Facoltativo ma molto utile',
      variant: 'success',
      ore: '0–5 ore/sett.',
    },
    {
      icon: LucideZap,
      label: 'Tempo libero e sport',
      subtitle: 'Fondamentale per la produttività',
      variant: 'warning',
      ore: '15–20 ore/sett.',
    },
  ];

  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'vita')!.questions;
  readonly questionStudyHours = this.questions[0];
  readonly questionWork = this.questions[1];

  readonly selectedStudyHours = computed(() => this.state.getAnswer(this.questionStudyHours.id));
  readonly selectedWork = computed(() => this.state.getAnswer(this.questionWork.id));

  scrollToQuestion(): void {
    document.getElementById('domanda-vita')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  isSelected(current: string | null, value: string): boolean {
    return current === value;
  }

  onSelectStudyHours(value: string): void {
    if (this.selectedStudyHours() === value) return;
    const label = this.questionStudyHours.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionStudyHours.id, 'vita', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectWork(value: string): void {
    if (this.selectedWork() === value) return;
    const label = this.questionWork.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionWork.id, 'vita', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

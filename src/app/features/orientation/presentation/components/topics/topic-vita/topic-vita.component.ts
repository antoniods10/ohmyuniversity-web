import { Component, input, output, inject, signal } from '@angular/core';
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
  VITA_CONSIGLI_ORARI,
  VITA_CONSIGLI_STUDIO,
  ORIENTATION_TOPICS,
  VITA_SCHEDULE_TIPS,
} from '@constants';

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

  // Icons
  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconInfo = LucideInfo;

  // Data
  readonly consigliOrari = VITA_CONSIGLI_ORARI;
  readonly consigliStudio = VITA_CONSIGLI_STUDIO;
  readonly scheduleTips = VITA_SCHEDULE_TIPS;

  // Weekly schedule blocks - defined locally, UI only
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

  // Questions
  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'vita')!.questions;
  readonly questionStudyHours = this.questions[0];
  readonly questionWork = this.questions[1];

  // Local selection state
  readonly selectedStudyHours = signal<string | null>(null);
  readonly selectedWork = signal<string | null>(null);

  scrollToQuestion(): void {
    document.getElementById('domanda-vita')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  isSelected(current: string | null, value: string): boolean {
    return current === value;
  }

  onSelectStudyHours(value: string): void {
    if (this.selectedStudyHours() === value) return;
    this.selectedStudyHours.set(value);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectWork(value: string): void {
    if (this.selectedWork() === value) return;
    this.selectedWork.set(value);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

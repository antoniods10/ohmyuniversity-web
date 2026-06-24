import { Component, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCheck,
  LucideInfo,
  LucideSparkles,
  LucideUsers,
  LucideCalculator,
  LucideClipboardList,
  LucideMapPin,
  LucideHourglass,
} from '@lucide/angular';
import { APP, COMMON_MISTAKES, ORIENTATION_TOPICS } from '@constants';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';

const ERROR_ICON_MAP: Record<string, any> = {
  'Scegliere per moda': LucideSparkles,
  'Seguire gli amici': LucideUsers,
  'Sottovalutare matematica e teoria': LucideCalculator,
  'Non informarsi sugli esami': LucideClipboardList,
  'Ignorare il fattore sede': LucideMapPin,
  'Non considerare i tempi reali di laurea': LucideHourglass,
};

@Component({
  selector: 'app-topic-errori',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    OrientationNavComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
  ],
  templateUrl: './topic-errori.component.html',
})
export class TopicErroriComponent {
  readonly APP = APP;

  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();
  readonly goToSummary = output<void>();

  private readonly toast = inject(ToastService);
  private readonly state = inject(OrientationStateService);

  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconInfo = LucideInfo;

  readonly errori = COMMON_MISTAKES;

  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'errori')!.questions;
  readonly questionConfidence = this.questions[0];
  readonly questionInfoSource = this.questions[1];
  readonly questionTalkedTo = this.questions[2];
  readonly questionStudyPlan = this.questions[3];

  readonly selectedConfidence = computed(() => this.state.getAnswer(this.questionConfidence.id));
  readonly selectedInfoSource = computed(() => this.state.getAnswer(this.questionInfoSource.id));
  readonly selectedTalkedTo = computed(() => this.state.getAnswer(this.questionTalkedTo.id));
  readonly selectedStudyPlan = computed(() => this.state.getAnswer(this.questionStudyPlan.id));

  scrollToQuestion(): void {
    document
      .getElementById('domanda-errori')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getErrorIcon(titolo: string): any {
    return ERROR_ICON_MAP[titolo] ?? LucideInfo;
  }

  isSelected(current: string | null, value: string): boolean {
    return current === value;
  }

  onSelectConfidence(value: string): void {
    if (this.selectedConfidence() === value) return;
    const label = this.questionConfidence.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionConfidence.id, 'errori', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectInfoSource(value: string): void {
    if (this.selectedInfoSource() === value) return;
    const label = this.questionInfoSource.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionInfoSource.id, 'errori', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectTalkedTo(value: string): void {
    if (this.selectedTalkedTo() === value) return;
    const label = this.questionTalkedTo.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionTalkedTo.id, 'errori', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectStudyPlan(value: string): void {
    if (this.selectedStudyPlan() === value) return;
    const label = this.questionStudyPlan.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionStudyPlan.id, 'errori', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

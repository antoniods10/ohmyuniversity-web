import { Component, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCheck,
  LucideInfo,
  LucideUsers,
  LucideBookOpen,
  LucideCalendar,
} from '@lucide/angular';
import { ToastService } from '@ui/custom-toast/toast.service';
import { TOLC_TESTS, ACCESS_TYPES, ACCESS_TIPS, ORIENTATION_TOPICS } from '@constants';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';

const ACCESS_ICON_MAP: Record<string, any> = {
  free: LucideBookOpen,
  'national-restricted': LucideUsers,
  'local-restricted': LucideCalendar,
};

const ACCESS_VARIANT_MAP: Record<string, string> = {
  free: 'success',
  'national-restricted': 'error',
  'local-restricted': 'warning',
};

@Component({
  selector: 'app-topic-quiz',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    OrientationNavComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
    CustomLinkComponent,
  ],
  templateUrl: './topic-quiz.component.html',
})
export class TopicQuizComponent {
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

  readonly accessTypes = ACCESS_TYPES;
  readonly tolcTests = TOLC_TESTS;
  readonly tips = ACCESS_TIPS;

  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'quiz')!.questions;
  readonly questionAccessType = this.questions[0];
  readonly questionTolcDone = this.questions[1];
  readonly questionTolcType = this.questions[2];

  readonly selectedAccessType = computed(() => this.state.getAnswer(this.questionAccessType.id));
  readonly selectedTolcDone = computed(() => this.state.getAnswer(this.questionTolcDone.id));
  readonly selectedTolcType = computed(() => this.state.getAnswer(this.questionTolcType.id));

  readonly showTolcType = computed(
    () => this.selectedTolcDone() === 'yes' || this.selectedTolcDone() === 'no-planning',
  );

  scrollToQuestion(): void {
    document.getElementById('domanda-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getAccessIcon(id: string): any {
    return ACCESS_ICON_MAP[id] ?? LucideBookOpen;
  }

  getAccessVariant(id: string): string {
    return ACCESS_VARIANT_MAP[id] ?? 'primary';
  }

  isSelected(current: string | null, value: string): boolean {
    return current === value;
  }

  onSelectAccessType(value: string): void {
    if (this.selectedAccessType() === value) return;
    const label = this.questionAccessType.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionAccessType.id, 'quiz', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectTolcDone(value: string): void {
    if (this.selectedTolcDone() === value) return;
    const label = this.questionTolcDone.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionTolcDone.id, 'quiz', value, label);
    this.state.clearAnswer(this.questionTolcType.id);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectTolcType(value: string): void {
    if (this.selectedTolcType() === value) return;
    const label = this.questionTolcType.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionTolcType.id, 'quiz', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

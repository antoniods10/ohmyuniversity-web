import { Component, output, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCheck,
  LucidePencil,
  LucideChevronRight,
  LucideInfo,
} from '@lucide/angular';
import {
  OrientationStateService,
  SavedAnswer,
} from '@orientation/application/state/orientation.state';
import { ORIENTATION_TOPICS } from '@constants';
import { TopicId, InlineOption } from '@types';

interface SummaryQuestion {
  questionId: string;
  topicId: TopicId;
  topicTitle: string;
  questionText: string;
  options: InlineOption[];
  savedAnswer: SavedAnswer | null;
}

@Component({
  selector: 'app-orientation-summary',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
  ],
  templateUrl: './orientation-summary.component.html',
})
export class OrientationSummaryComponent {
  readonly backToList = output<void>();
  readonly viewResult = output<void>();

  private readonly state = inject(OrientationStateService);

  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconInfo = LucideInfo;
  readonly iconEdit = LucidePencil;
  readonly iconChevron = LucideChevronRight;

  // Expanded question accordion
  readonly expandedQuestion = signal<string | null>(null);

  // Full list of all questions with their saved answers
  readonly summaryQuestions = computed<SummaryQuestion[]>(() => {
    const answers = this.state.answers();
    return ORIENTATION_TOPICS.flatMap(topic =>
      topic.questions.map(q => ({
        questionId: q.id,
        topicId: topic.id,
        topicTitle: topic.title,
        questionText: q.text,
        options: q.options ?? [],
        savedAnswer: answers.find(a => a.questionId === q.id) ?? null,
      })),
    );
  });

  readonly answeredCount = this.state.answeredCount;
  readonly totalCount = this.state.totalQuestions;

  toggleQuestion(questionId: string): void {
    this.expandedQuestion.set(this.expandedQuestion() === questionId ? null : questionId);
  }

  isExpanded(questionId: string): boolean {
    return this.expandedQuestion() === questionId;
  }

  isSelected(questionId: string, value: string): boolean {
    return this.state.getAnswer(questionId) === value;
  }

  onSelect(q: SummaryQuestion, value: string): void {
    const label = q.options.find(o => o.value === value)?.label ?? value;
    this.state.saveAnswer(q.questionId, q.topicId, value, label);
  }

  // Remove leading emoji from option labels (e.g. "Umanistica" → "Umanistica")
  getLabelClean(label: string): string {
    return label.replace(/^\S+\s/, '');
  }

  getCompletionVariant(): 'success' | 'warning' | 'info' {
    const pct = this.answeredCount() / this.totalCount();
    if (pct === 1) return 'success';
    if (pct >= 0.5) return 'warning';
    return 'info';
  }
}

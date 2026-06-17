import { Component, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { InlineQuestionComponent } from 'src/app/shared/components/ui/inline-question/inline-question.component';
import { LucideCircleCheck } from '@lucide/angular';
import { CORSO_AREE, CORSO_CONSIGLI, ORIENTATION_TOPICS } from '@constants';
import { OrientationStateService } from 'src/app/features/orientation/application/state/orientation.state';

@Component({
  selector: 'app-topic-corso',
  standalone: true,
  imports: [
    CommonModule,
    OrientationNavComponent,
    CustomTextComponent,
    CardStatusComponent,
    InlineQuestionComponent,
  ],
  templateUrl: './topic-corso.component.html',
})
export class TopicCorsoComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  private readonly state = inject(OrientationStateService);

  readonly iconCheck = LucideCircleCheck;
  readonly aree = CORSO_AREE;
  readonly consigli = CORSO_CONSIGLI;

  readonly question = ORIENTATION_TOPICS.find(t => t.id === 'corso')!.questions[0];

  readonly selectedValue = computed(() => {
    const answer = this.state.answers().find(a => a.questionId === this.question.id);
    return answer?.value ?? null;
  });

  onAnswered(value: string): void {
    this.state.setAnswer({
      questionId: this.question.id,
      topicId: 'corso',
      value,
    });
    this.state.markTopicComplete('corso');
  }
}

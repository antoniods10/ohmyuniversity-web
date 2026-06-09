import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { LucideCircleCheck } from '@lucide/angular';
import { QUIZ_TESTS_ESMPIO, QUIZ_CONSIGLI, QUIZ_AUTOVALUTAZIONE } from '@constants';

@Component({
  selector: 'app-topic-quiz',
  standalone: true,
  imports: [
    CommonModule,
    OrientationNavComponent,
    CustomTextComponent,
    CustomBadgeComponent,
    CardStatusComponent,
  ],
  templateUrl: './topic-quiz.component.html',
})
export class TopicQuizComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly iconCheck = LucideCircleCheck;
  readonly testsEsempio = QUIZ_TESTS_ESMPIO;
  readonly consigli = QUIZ_CONSIGLI;
  readonly autovalutazione = QUIZ_AUTOVALUTAZIONE;
}

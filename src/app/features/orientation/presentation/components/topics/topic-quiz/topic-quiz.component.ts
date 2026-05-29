import { Component, input, output } from '@angular/core';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { QUIZ_TESTS_ESMPIO, QUIZ_CONSIGLI, QUIZ_AUTOVALUTAZIONE } from '@constants';

@Component({
  selector: 'app-topic-quiz',
  standalone: true,
  imports: [OrientationNavComponent],
  templateUrl: './topic-quiz.component.html',
})
export class TopicQuizComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly testsEsempio = QUIZ_TESTS_ESMPIO;
  readonly consigli = QUIZ_CONSIGLI;
  readonly autovalutazione = QUIZ_AUTOVALUTAZIONE;
}

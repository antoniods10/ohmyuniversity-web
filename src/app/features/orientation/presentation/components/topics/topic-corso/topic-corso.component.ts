import { Component, input, output } from '@angular/core';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CORSO_AREE, CORSO_CONSIGLI } from '@constants';

@Component({
  selector: 'app-topic-corso',
  standalone: true,
  imports: [OrientationNavComponent],
  templateUrl: './topic-corso.component.html',
})
export class TopicCorsoComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly aree = CORSO_AREE;
  readonly consigli = CORSO_CONSIGLI;
}

import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { ERRORI_ORIENTAMENTO } from '@constants';

@Component({
  selector: 'app-topic-errori',
  standalone: true,
  imports: [OrientationNavComponent, RouterLink],
  templateUrl: './topic-errori.component.html',
})
export class TopicErroriComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly errori = ERRORI_ORIENTAMENTO;
}

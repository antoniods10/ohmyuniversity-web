import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-orientation-nav',
  standalone: true,
  templateUrl: './orientation-nav.component.html',
})
export class OrientationNavComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();

  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();
}

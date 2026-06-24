import { Component, input, output } from '@angular/core';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { LucideArrowLeft, LucideArrowRight } from '@lucide/angular';

@Component({
  selector: 'app-orientation-nav',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './orientation-nav.component.html',
})
export class OrientationNavComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly iconPrev = LucideArrowLeft;
  readonly iconNext = LucideArrowRight;
}

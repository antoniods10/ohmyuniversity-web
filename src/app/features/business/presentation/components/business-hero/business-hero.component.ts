import { Component, input } from '@angular/core';

@Component({
  selector: 'app-business-hero',
  standalone: true,
  templateUrl: './business-hero.component.html',
})
export class BusinessHeroComponent {
  readonly badge = input<string>('Per le organizzazioni');
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
}

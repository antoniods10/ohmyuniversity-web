import { Component, input } from '@angular/core';

@Component({
  selector: 'app-faq-hero',
  standalone: true,
  templateUrl: './faq-hero.component.html',
})
export class FaqHeroComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly badge = input<string>('');
}

import { Component, input, signal } from '@angular/core';
import { FaqCategory } from '@types';

@Component({
  selector: 'app-faq-list',
  standalone: true,
  templateUrl: './faq-list.component.html',
})
export class FaqListComponent {
  readonly categories = input.required<FaqCategory[]>();

  readonly openItems = signal<Map<number, number | null>>(new Map());

  toggle(catIndex: number, itemIndex: number): void {
    this.openItems.update(map => {
      const next = new Map(map);
      const current = next.get(catIndex);
      next.set(catIndex, current === itemIndex ? null : itemIndex);
      return next;
    });
  }

  isOpen(catIndex: number, itemIndex: number): boolean {
    return this.openItems().get(catIndex) === itemIndex;
  }
}

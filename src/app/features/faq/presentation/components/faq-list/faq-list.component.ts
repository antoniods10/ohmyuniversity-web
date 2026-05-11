import { Component, input, signal } from '@angular/core';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq-list',
  standalone: true,
  templateUrl: './faq-list.component.html',
})
export class FaqListComponent {
  readonly categories = input.required<FaqCategory[]>();

  // Tiene traccia dell'item aperto per ogni categoria: Map<catIndex, itemIndex | null>
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

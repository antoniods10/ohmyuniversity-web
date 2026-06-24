import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqCategory } from '@types';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { LucideDynamicIcon, LucideChevronDown } from '@lucide/angular';

@Component({
  selector: 'app-faq-list',
  standalone: true,
  imports: [CommonModule, CustomTextComponent, LucideDynamicIcon],
  templateUrl: './faq-list.component.html',
})
export class FaqListComponent {
  readonly categories = input.required<FaqCategory[]>();
  readonly iconChevron = LucideChevronDown;

  readonly openItems = signal<Map<number, number | null>>(new Map());

  toggle(catIndex: number, itemIndex: number): void {
    this.openItems.update(map => {
      const next = new Map(map);
      next.set(catIndex, next.get(catIndex) === itemIndex ? null : itemIndex);
      return next;
    });
  }

  isOpen(catIndex: number, itemIndex: number): boolean {
    return this.openItems().get(catIndex) === itemIndex;
  }
}

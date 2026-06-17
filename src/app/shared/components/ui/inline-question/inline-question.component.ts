import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineQuestion } from 'src/app/features/orientation/domain/models/topic.model';

@Component({
  selector: 'app-inline-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inline-question.component.html',
})
export class InlineQuestionComponent {
  readonly question = input.required<InlineQuestion>();
  readonly selectedValue = input<string | null>(null);
  readonly answered = output<string>();

  readonly isScale = computed(() => this.question().type === 'scale');
  readonly isYesNo = computed(() => this.question().type === 'yes-no');
  readonly isSingleSelect = computed(
    () => this.question().type === 'single-select' || this.question().type === 'yes-no-maybe',
  );

  readonly scaleOptions = computed(() => {
    const q = this.question();
    if (q.type !== 'scale') return [];
    const min = q.scaleMin ?? 1;
    const max = q.scaleMax ?? 5;
    return Array.from({ length: max - min + 1 }, (_, i) => ({
      value: String(min + i),
      label: q.options?.find(o => o.value === String(min + i))?.label ?? String(min + i),
    }));
  });

  select(value: string): void {
    this.answered.emit(value);
  }

  isSelected(value: string): boolean {
    return this.selectedValue() === value;
  }
}

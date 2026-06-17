import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCheck,
  LucideChevronRight,
  LucideInfo,
} from '@lucide/angular';
import { ToastService } from '@ui/custom-toast/toast.service';
import { CORSO_CONSIGLI, ORIENTATION_TOPICS } from '@constants';
import { AREE_ESTESE, AREA_ICONS } from 'src/app/shared/constants/orientation-icons-constants';
import { InlineOption } from '@types';
import {
  getIconBgClass,
  getIconColorClass,
  getLabelColorClass,
  getVariantBorderClass,
} from '@shared/utils/orientation.utils';

@Component({
  selector: 'app-topic-corso',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    OrientationNavComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
    CustomLinkComponent,
  ],
  templateUrl: './topic-corso.component.html',
})
export class TopicCorsoComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  private readonly toast = inject(ToastService);

  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconChevron = LucideChevronRight;
  readonly iconInfo = LucideInfo;

  readonly areeEstese = AREE_ESTESE;
  readonly consigli = CORSO_CONSIGLI;
  readonly question = ORIENTATION_TOPICS.find(t => t.id === 'corso')!.questions[0];
  readonly expandedArea = signal<string | null>(null);

  // Stato locale — verrà sostituito con OrientationStateService nella fase logica
  readonly selectedValue = signal<string | null>(null);

  // Funzioni utility dal shared/utils/ui.utils.ts
  readonly getIconBgClass = getIconBgClass;
  readonly getIconColorClass = getIconColorClass;
  readonly getLabelColorClass = getLabelColorClass;
  readonly getBorderClass = getVariantBorderClass;

  scrollToQuestion(): void {
    document
      .getElementById('domanda-corso')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleArea(value: string): void {
    this.expandedArea.set(this.expandedArea() === value ? null : value);
  }

  isExpanded(value: string): boolean {
    return this.expandedArea() === value;
  }

  isSelected(value: string): boolean {
    return this.selectedValue() === value;
  }

  getAreaIcon(value: string): any {
    return AREA_ICONS[value] ?? null;
  }

  getLabelClean(option: InlineOption): string {
    return option.label.replace(/^\S+\s/, '');
  }

  onSelect(value: string): void {
    const isNew = this.selectedValue() !== value;
    this.selectedValue.set(value);
    if (isNew) {
      const label = this.getLabelClean(
        this.question.options!.find((o: InlineOption) => o.value === value)!,
      );
      this.toast.success(`Area selezionata: ${label}`, { duration: 3000 });
    }
  }
}

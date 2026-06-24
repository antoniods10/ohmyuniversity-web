import { Component, input, output, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent, BadgeVariant } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCheck,
  LucideInfo,
  LucideChevronRight,
  LucideGraduationCap,
  LucideBookOpen,
  LucideWallet,
  LucideEuro,
} from '@lucide/angular';
import { BUDGET_LIVING_COSTS, ORIENTATION_TOPICS, BUDGET_TIPS } from '@constants';
import { OrientationStateService } from 'src/app/core/application/state/orientation/orientation.state';

const UNIVERSITY_COST_ITEMS: {
  icon: any;
  label: string;
  min: string;
  max: string;
  note: string;
  variant: BadgeVariant;
}[] = [
  {
    icon: LucideGraduationCap,
    label: 'Tasse universitarie',
    min: 'Gratis',
    max: '3.000 €/anno',
    note: 'Dipende da ISEE e ateneo. Sotto certi redditi può essere zero. Controlla sempre il regolamento tasse del tuo ateneo specifico.',
    variant: 'primary',
  },
  {
    icon: LucideBookOpen,
    label: 'Libri e materiale didattico',
    min: '200 €',
    max: '600 €/anno',
    note: 'Varia molto per corso. Ingegneria e Medicina tendono a costare di più. Molti studenti si organizzano con libri usati o PDF condivisi.',
    variant: 'info',
  },
  {
    icon: LucideWallet,
    label: 'Software e strumenti',
    min: 'Gratis',
    max: '300 €/anno',
    note: 'Molti atenei offrono licenze gratuite per studenti (Office, Adobe, Matlab, ecc.). Chiedilo alla segreteria prima di acquistare.',
    variant: 'success',
  },
  {
    icon: LucideEuro,
    label: 'Contributi e servizi',
    min: '50 €',
    max: '200 €/anno',
    note: 'Quota associativa studentesca, badge, accesso biblioteche e laboratori. Di solito inclusa nella prima rata delle tasse.',
    variant: 'warning',
  },
];

@Component({
  selector: 'app-topic-budget',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    OrientationNavComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    CardStatusComponent,
  ],
  templateUrl: './topic-budget.component.html',
})
export class TopicBudgetComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  private readonly toast = inject(ToastService);
  private readonly state = inject(OrientationStateService);

  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconInfo = LucideInfo;
  readonly iconChevron = LucideChevronRight;

  readonly universityCosts = UNIVERSITY_COST_ITEMS;
  readonly livingCosts = BUDGET_LIVING_COSTS;
  readonly tips = BUDGET_TIPS;

  readonly expandedCost = signal<string | null>(null);

  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'borse-studio')!.questions;
  readonly questionBudgetAvailability = this.questions[0];
  readonly questionMonthlyBudget = this.questions[1];

  readonly selectedBudgetAvailability = computed(() =>
    this.state.getAnswer(this.questionBudgetAvailability.id),
  );
  readonly selectedMonthlyBudget = computed(() =>
    this.state.getAnswer(this.questionMonthlyBudget.id),
  );

  scrollToQuestion(): void {
    document
      .getElementById('domanda-budget')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleCost(label: string): void {
    this.expandedCost.set(this.expandedCost() === label ? null : label);
  }

  isExpanded(label: string): boolean {
    return this.expandedCost() === label;
  }
  isSelected(current: string | null, value: string): boolean {
    return current === value;
  }

  onSelectBudgetAvailability(value: string): void {
    if (this.selectedBudgetAvailability() === value) return;
    const label = this.questionBudgetAvailability.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionBudgetAvailability.id, 'borse-studio', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectMonthlyBudget(value: string): void {
    if (this.selectedMonthlyBudget() === value) return;
    const label = this.questionMonthlyBudget.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionMonthlyBudget.id, 'borse-studio', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

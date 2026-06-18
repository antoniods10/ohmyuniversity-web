import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { SbocchiChartComponent } from '../../charts/sbocchi-chart/sbocchi-chart.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent, BadgeVariant } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { LucideCircleCheck, LucideCheck, LucideInfo, LucideTriangleAlert } from '@lucide/angular';
import { SBOCCHI_AREE, SBOCCHI_CONSIGLI, ORIENTATION_TOPICS } from '@constants';

@Component({
  selector: 'app-topic-sbocchi',
  standalone: true,
  imports: [
    CommonModule,
    OrientationNavComponent,
    SbocchiChartComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    CardStatusComponent,
  ],
  templateUrl: './topic-sbocchi.component.html',
})
export class TopicSbocchiComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  private readonly toast = inject(ToastService);

  // Icons
  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconInfo = LucideInfo;
  readonly iconWarn = LucideTriangleAlert;

  // Data
  readonly aree = SBOCCHI_AREE;
  readonly consigli = SBOCCHI_CONSIGLI;

  // Questions
  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'sbocchi')!.questions;
  readonly questionCareerPriority = this.questions[0];
  readonly questionWorkContext = this.questions[1];

  // Local selection state
  readonly selectedCareerPriority = signal<string | null>(null);
  readonly selectedWorkContext = signal<string | null>(null);

  scrollToQuestion(): void {
    document
      .getElementById('domanda-sbocchi')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  occupazioneVariant(val: number): BadgeVariant {
    if (val >= 75) return 'success';
    if (val >= 55) return 'warning';
    return 'error';
  }

  isSelected(current: string | null, value: string): boolean {
    return current === value;
  }

  onSelectCareerPriority(value: string): void {
    if (this.selectedCareerPriority() === value) return;
    this.selectedCareerPriority.set(value);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectWorkContext(value: string): void {
    if (this.selectedWorkContext() === value) return;
    this.selectedWorkContext.set(value);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

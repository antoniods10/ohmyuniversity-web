import { Component, output, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent, BadgeVariant } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideSparkle,
  LucideGraduationCap,
  LucideMapPin,
  LucideWallet,
  LucideBuilding2,
  LucideEuro,
  LucideBookOpen,
  LucideChevronDown,
} from '@lucide/angular';
import { OrientationStateService } from '@orientation/application/state/orientation.state';

const UNIVERSITY_TYPE_LABELS: Record<string, string> = {
  statale: 'Statale',
  privata: 'Privata',
  telematica: 'Telematica',
};

const UNIVERSITY_TYPE_VARIANTS: Record<string, BadgeVariant> = {
  statale: 'primary',
  privata: 'warning',
  telematica: 'success',
};

@Component({
  selector: 'app-orientation-result',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
  ],
  templateUrl: './orientation-result.component.html',
})
export class OrientationResultComponent {
  readonly backToSummary = output<void>();

  private readonly state = inject(OrientationStateService);

  readonly iconCheck = LucideCircleCheck;
  readonly iconSparkle = LucideSparkle;
  readonly iconCap = LucideGraduationCap;
  readonly iconMap = LucideMapPin;
  readonly iconWallet = LucideWallet;
  readonly iconBuilding = LucideBuilding2;
  readonly iconEuro = LucideEuro;
  readonly iconCourse = LucideBookOpen;
  readonly iconChevron = LucideChevronDown;

  readonly result = computed(() => this.state.result());

  /** id dell'università con l'accordion sedi attualmente aperto (una sola alla volta) */
  private readonly expandedCampuses = signal<string | null>(null);

  getUniversityTypeLabel(type: string): string {
    return UNIVERSITY_TYPE_LABELS[type] ?? type;
  }

  getUniversityTypeVariant(type: string): BadgeVariant {
    return UNIVERSITY_TYPE_VARIANTS[type] ?? 'neutral';
  }

  getAreaVariant(index: number): BadgeVariant {
    if (index === 0) return 'primary';
    if (index === 1) return 'info';
    return 'neutral';
  }

  isCampusesExpanded(universityId: string): boolean {
    return this.expandedCampuses() === universityId;
  }

  toggleCampuses(universityId: string): void {
    this.expandedCampuses.set(this.isCampusesExpanded(universityId) ? null : universityId);
  }
}

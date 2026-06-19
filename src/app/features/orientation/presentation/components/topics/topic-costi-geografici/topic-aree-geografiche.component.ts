import { Component, input, output, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCheck,
  LucideInfo,
  LucideChevronRight,
  LucideMapPin,
  LucideBriefcase,
  LucideZap,
  LucideWallet,
  LucideGraduationCap,
  LucideBuilding2,
  LucideCompass,
  LucideBookMarked,
  LucideThumbsUp,
  LucideSun,
} from '@lucide/angular';
import {
  GEOGRAPHIC_AREA_COSTS,
  TOP_CITIES,
  GEOGRAPHIC_AREA_INFO,
  GEO_TIPS,
  ORIENTATION_TOPICS,
} from '@constants';
import { OrientationStateService } from 'src/app/features/orientation/application/state/orientation.state';

const MAX_VOTO = 5;

const CITTA_COLOR_MAP: Record<
  string,
  { bgOn: string; bgOff: string; textOff: string; border: string; panel: string }
> = {
  Bologna: {
    bgOn: 'bg-blue-500',
    bgOff: 'bg-blue-50',
    textOff: 'text-blue-500',
    border: 'border-blue-100',
    panel: 'bg-blue-50',
  },
  Milano: {
    bgOn: 'bg-purple-500',
    bgOff: 'bg-purple-50',
    textOff: 'text-purple-500',
    border: 'border-purple-100',
    panel: 'bg-purple-50',
  },
  Torino: {
    bgOn: 'bg-sky-500',
    bgOff: 'bg-sky-50',
    textOff: 'text-sky-500',
    border: 'border-sky-100',
    panel: 'bg-sky-50',
  },
  Napoli: {
    bgOn: 'bg-green-500',
    bgOff: 'bg-green-50',
    textOff: 'text-green-500',
    border: 'border-green-100',
    panel: 'bg-green-50',
  },
  Pisa: {
    bgOn: 'bg-amber-500',
    bgOff: 'bg-amber-50',
    textOff: 'text-amber-500',
    border: 'border-amber-100',
    panel: 'bg-amber-50',
  },
  Bari: {
    bgOn: 'bg-rose-500',
    bgOff: 'bg-rose-50',
    textOff: 'text-rose-500',
    border: 'border-rose-100',
    panel: 'bg-rose-50',
  },
};

const AREA_ICON_MAP: Record<string, any> = {
  Nord: LucideBuilding2,
  Centro: LucideCompass,
  'Sud e Isole': LucideSun,
};

const CITTA_ICON_MAP: Record<string, any> = {
  Bologna: LucideBookMarked,
  Milano: LucideBriefcase,
  Torino: LucideZap,
  Napoli: LucideWallet,
  Pisa: LucideGraduationCap,
  Bari: LucideThumbsUp,
};

@Component({
  selector: 'app-topic-costi-geografici',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    OrientationNavComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
  ],
  templateUrl: './topic-aree-geografiche.component.html',
})
export class TopicCostiGeograficiComponent {
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

  readonly costiAree = GEOGRAPHIC_AREA_COSTS;
  readonly cittaTop = TOP_CITIES;
  readonly areeInfo = GEOGRAPHIC_AREA_INFO;
  readonly tips = GEO_TIPS;

  readonly activeArea = signal<string>('Nord');
  readonly expandedCitta = signal<string | null>(null);

  private readonly questions = ORIENTATION_TOPICS.find(t => t.id === 'costi-geografici')!.questions;
  readonly questionAreaPreference = this.questions[0];
  readonly questionCityPriority = this.questions[1];

  readonly selectedAreaPreference = computed(() =>
    this.state.getAnswer(this.questionAreaPreference.id),
  );
  readonly selectedCityPriority = computed(() =>
    this.state.getAnswer(this.questionCityPriority.id),
  );

  readonly dots = Array.from({ length: MAX_VOTO }, (_, i) => i);

  scrollToQuestion(): void {
    document.getElementById('domanda-geo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  setActiveArea(area: string): void {
    this.activeArea.set(area);
  }
  toggleCitta(citta: string): void {
    this.expandedCitta.set(this.expandedCitta() === citta ? null : citta);
  }
  isCittaExpanded(citta: string): boolean {
    return this.expandedCitta() === citta;
  }
  getAreaIcon(area: string): any {
    return AREA_ICON_MAP[area] ?? LucideMapPin;
  }
  getCittaIcon(citta: string): any {
    return CITTA_ICON_MAP[citta] ?? LucideMapPin;
  }
  getCittaColors(citta: string) {
    return CITTA_COLOR_MAP[citta] ?? CITTA_COLOR_MAP['Bologna'];
  }
  isSelected(current: string | null, value: string): boolean {
    return current === value;
  }
  isActiveArea(area: string): boolean {
    return this.activeArea() === area;
  }

  getAreaVariantBg(variant: string): string {
    return (
      (
        { primary: 'bg-blue-500', warning: 'bg-amber-500', success: 'bg-green-500' } as Record<
          string,
          string
        >
      )[variant] ?? 'bg-gray-500'
    );
  }

  getAreaVariantLight(variant: string): string {
    return (
      (
        {
          primary: 'bg-blue-50 border-blue-200',
          warning: 'bg-amber-50 border-amber-200',
          success: 'bg-green-50 border-green-200',
        } as Record<string, string>
      )[variant] ?? 'bg-gray-50 border-gray-200'
    );
  }

  getTabVariant(area: string): 'primary' | 'success' | 'warning' {
    if (this.activeArea() !== area) return 'primary';
    const info = this.areeInfo.find(a => a.area === area);
    return (
      (
        { primary: 'primary', warning: 'warning', success: 'success' } as Record<
          string,
          'primary' | 'success' | 'warning'
        >
      )[info?.variant ?? 'primary'] ?? 'primary'
    );
  }

  getCostoVariant(area: string): 'success' | 'warning' | 'error' {
    if (area === 'Sud e Isole') return 'success';
    if (area === 'Centro') return 'warning';
    return 'error';
  }

  onSelectAreaPreference(value: string): void {
    if (this.selectedAreaPreference() === value) return;
    const label = this.questionAreaPreference.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionAreaPreference.id, 'costi-geografici', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }

  onSelectCityPriority(value: string): void {
    if (this.selectedCityPriority() === value) return;
    const label = this.questionCityPriority.options!.find(o => o.value === value)!.label;
    this.state.saveAnswer(this.questionCityPriority.id, 'costi-geografici', value, label);
    this.toast.success('Risposta salvata', { duration: 3000 });
  }
}

import { Component, signal, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideWallet,
  LucideFileText,
  LucideMegaphone,
  LucideCreditCard,
  LucideExternalLink,
  LucideDownload,
  LucideCalendarDays,
  LucideCircleCheck,
  LucideCircleAlert,
  LucideClock,
  LucideInfo,
  LucideEuro,
  LucideChevronRight,
  LucideTriangleAlert,
} from '@lucide/angular';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

import {
  ScholarshipStatus,
  FeeStatus,
  BandoStatus,
  Scholarship,
  FormModule,
  Bando,
  Fee,
} from '@shared/types/dashboard/secretariat.types';
import {
  MOCK_SCHOLARSHIPS,
  MOCK_FORM_MODULES,
  MOCK_BANDI,
  MOCK_FEES,
} from '@shared/data/mock/secretariat.mock';
import { APP } from '@shared/constants';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CarrieraFacade } from '../../../application/facades/carriera.facade';
import { Addebito, TasseResponse } from '../../../domain/models/tasse.model';

@Component({
  selector: 'app-secretariat',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    CustomTabsComponent,
    CustomInputComponent,
    LucideDynamicIcon,
    CardStatusComponent,
  ],
  templateUrl: './secretariat.page.html',
})
export class SecretariatPage {
  readonly lucideAlertTriangle = LucideTriangleAlert;

  readonly APP = APP;

  private readonly toast = inject(ToastService);
  private readonly carriera = inject(CarrieraFacade);

  tasse = signal<TasseResponse | null>(null);
  tasseLoading = signal(true);
  tasseError = signal(false);

  readonly iconSearch = LucideSearch;
  readonly iconWallet = LucideWallet;
  readonly iconFile = LucideFileText;
  readonly iconMegaphone = LucideMegaphone;
  readonly iconCreditCard = LucideCreditCard;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconDownload = LucideDownload;
  readonly iconCalendar = LucideCalendarDays;
  readonly iconCheck = LucideCircleCheck;
  readonly iconAlert = LucideCircleAlert;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;
  readonly iconEuro = LucideEuro;
  readonly iconChevron = LucideChevronRight;

  activeTab = signal<string>('scholarships');
  searchValue = signal<string>('');

  readonly tabs: TabItem[] = [
    { id: 'scholarships', label: 'Borse di studio', icon: LucideWallet },
    { id: 'forms', label: 'Modulistica', icon: LucideFileText },
    { id: 'bandi', label: 'Bandi e concorsi', icon: LucideMegaphone },
    { id: 'fees', label: 'Tasse', icon: LucideCreditCard },
  ];

  readonly scholarships: Scholarship[] = MOCK_SCHOLARSHIPS;
  readonly formModules: FormModule[] = MOCK_FORM_MODULES;
  readonly bandi: Bando[] = MOCK_BANDI;
  readonly fees: Fee[] = MOCK_FEES;

  readonly filteredScholarships = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.scholarships;
    return this.scholarships.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    );
  });

  readonly filteredForms = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.formModules;
    return this.formModules.filter(
      f =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q),
    );
  });

  readonly filteredBandi = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.bandi;
    return this.bandi.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q),
    );
  });

  readonly formCategories = computed(() => {
    const cats = new Set(this.filteredForms().map(f => f.category));
    return Array.from(cats);
  });

  readonly totalPaid = computed(() => {
    const addebiti = this.tasse()?.addebiti ?? [];
    return addebiti
      .filter(a => a.pagatoFlg === 1 && a.annullataFlg !== 1)
      .reduce((acc, a) => acc + (a.importoVoce ?? 0), 0);
  });

  readonly totalPending = computed(() => {
    const addebiti = this.tasse()?.addebiti ?? [];
    return addebiti
      .filter(a => a.pagatoFlg !== 1 && a.annullataFlg !== 1)
      .reduce((acc, a) => acc + (a.importoVoce ?? 0), 0);
  });

  onTabChange(id: string): void {
    this.activeTab.set(id);
    this.searchValue.set('');
  }

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  onApplyScholarship(s: Scholarship): void {
    if (s.status === 'closed') {
      this.toast.warning('Le domande per questa borsa sono chiuse.', { duration: 4000 });
      return;
    }
    window.open(s.url, '_blank');
  }

  scholarshipStatusLabel(status: ScholarshipStatus): string {
    const map: Record<ScholarshipStatus, string> = {
      open: 'Aperta',
      closing: 'In scadenza',
      closed: 'Chiusa',
      awarded: 'Assegnata',
      'not-awarded': 'Non assegnata',
    };
    return map[status];
  }

  scholarshipStatusVariant(
    status: ScholarshipStatus,
  ): 'success' | 'warning' | 'neutral' | 'primary' | 'error' {
    const map: Record<ScholarshipStatus, 'success' | 'warning' | 'neutral' | 'primary' | 'error'> =
      {
        open: 'success',
        closing: 'warning',
        closed: 'neutral',
        awarded: 'primary',
        'not-awarded': 'error',
      };
    return map[status];
  }

  bandoStatusLabel(status: BandoStatus): string {
    const map: Record<BandoStatus, string> = {
      open: 'Aperto',
      closing: 'In scadenza',
      closed: 'Chiuso',
    };
    return map[status];
  }

  bandoStatusVariant(status: BandoStatus): 'success' | 'warning' | 'neutral' {
    const map: Record<BandoStatus, 'success' | 'warning' | 'neutral'> = {
      open: 'success',
      closing: 'warning',
      closed: 'neutral',
    };
    return map[status];
  }

  feeStatusLabel(status: FeeStatus): string {
    const map: Record<FeeStatus, string> = {
      paid: 'Pagata',
      pending: 'Da pagare',
      overdue: 'Scaduta',
    };
    return map[status];
  }

  feeStatusVariant(status: FeeStatus): 'success' | 'primary' | 'error' {
    const map: Record<FeeStatus, 'success' | 'primary' | 'error'> = {
      paid: 'success',
      pending: 'primary',
      overdue: 'error',
    };
    return map[status];
  }

  formsForCategory(category: string): FormModule[] {
    return this.filteredForms().filter(f => f.category === category);
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  feeIcon(status: FeeStatus): any {
    if (status === 'paid') return this.iconCheck;
    if (status === 'overdue') return this.iconAlert;
    return this.iconClock;
  }

  feeIconColor(status: FeeStatus): string {
    if (status === 'paid') return 'var(--color-success-dark)';
    if (status === 'overdue') return 'var(--color-error-dark)';
    return 'var(--color-primary-dark)';
  }

  feeIconBg(status: FeeStatus): string {
    if (status === 'paid') return 'var(--color-success-light)';
    if (status === 'overdue') return 'var(--color-error-light)';
    return 'var(--color-primary-light)';
  }

  ngOnInit(): void {
    this.carriera.getTasse().subscribe({
      next: data => {
        console.log('Tasse OK:', data);
        this.tasse.set(data);
        this.tasseLoading.set(false);
      },
      error: err => {
        console.error('Tasse ERROR:', err);
        this.tasseError.set(true);
        this.tasseLoading.set(false);
      },
    });
  }

  addebitoStatus(a: Addebito): FeeStatus {
    if (a.pagatoFlg === 1) return 'paid';
    if (a.scadutoFlg === 1 || a.fattScadutaFlg === 1) return 'overdue';
    return 'pending';
  }
}

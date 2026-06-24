import { Component, input, computed } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCircleAlert,
  LucideClock,
  LucideInfo,
  LucideTriangleAlert,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { APP } from '@shared/constants';
import { FeeStatus } from '@shared/types/dashboard/secretariat.types';
import {
  Addebito,
  TasseResponse,
} from '../../../../../../../core/domain/models/career/tasse.model';

@Component({
  selector: 'app-fees-tab',
  standalone: true,
  imports: [LucideDynamicIcon, CustomCardComponent, CustomBadgeComponent, CardStatusComponent],
  templateUrl: './fees-tab.component.html',
})
export class FeesTabComponent {
  readonly tasse = input.required<TasseResponse | null>();
  readonly loading = input.required<boolean>();
  readonly error = input.required<boolean>();
  readonly hasCarriera = input.required<boolean>();

  readonly APP = APP;
  readonly iconCheck = LucideCircleCheck;
  readonly iconAlert = LucideCircleAlert;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;
  readonly iconTriangle = LucideTriangleAlert;

  readonly totalPaid = computed(() =>
    (this.tasse()?.addebiti ?? [])
      .filter(a => a.pagatoFlg === 1 && a.annullataFlg !== 1)
      .reduce((acc, a) => acc + (a.importoVoce ?? 0), 0),
  );

  readonly totalPending = computed(() =>
    (this.tasse()?.addebiti ?? [])
      .filter(a => a.pagatoFlg !== 1 && a.annullataFlg !== 1)
      .reduce((acc, a) => acc + (a.importoVoce ?? 0), 0),
  );

  addebitoStatus(a: Addebito): FeeStatus {
    if (a.pagatoFlg === 1) return 'paid';
    if (a.scadutoFlg === 1 || a.fattScadutaFlg === 1) return 'overdue';
    return 'pending';
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

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
  }
}

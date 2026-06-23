import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucidePrinter } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_TAXES } from '@shared/data/mock/dashboard-secretariat.mock';

@Component({
  selector: 'app-secretariat-taxes-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomBadgeComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
  ],
  templateUrl: './secretariat-taxes.widget.html',
})
export class SecretariatTaxesWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly taxes = MOCK_TAXES;
  readonly lucidePrinter = LucidePrinter;

  getVariant(status: 'paid' | 'pending' | 'overdue'): 'success' | 'warning' | 'error' {
    const map = { paid: 'success', pending: 'warning', overdue: 'error' } as const;
    return map[status];
  }

  getLabel(status: 'paid' | 'pending' | 'overdue'): string {
    const map = { paid: 'Pagata', pending: 'Da pagare', overdue: 'Scaduta' };
    return map[status];
  }
}

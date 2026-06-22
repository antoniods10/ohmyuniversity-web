import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucidePrinter } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_FORMS } from '@shared/data/mock/dashboard-secretariat.mock';

@Component({
  selector: 'app-secretariat-forms-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './secretariat-forms.widget.html',
})
export class SecretariatFormsWidgetComponent {
  @Input() size: WidgetSize = 'large';
  readonly forms = MOCK_FORMS;
  readonly lucidePrinter = LucidePrinter;
}

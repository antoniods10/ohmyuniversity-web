import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideContactRound } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_USEFUL_CONTACTS } from '@shared/data/mock/dashboard-contacts.mock';

@Component({
  selector: 'app-contacts-useful-widget',
  standalone: true,
  imports: [CustomTextComponent, CustomLinkComponent, DashboardWidgetCardComponent],
  templateUrl: './contacts-useful.widget.html',
})
export class ContactsUsefulWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly contacts = MOCK_USEFUL_CONTACTS;
  readonly lucideContact = LucideContactRound;
}

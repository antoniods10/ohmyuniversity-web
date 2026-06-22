import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { DashboardWidgetCardComponent } from '@ui/dashboard-widget-card/dashboard-widget-card.component';
import { LucideDynamicIcon, LucideContactRound } from '@lucide/angular';
import { WidgetSize } from '@shared/types';
import { MOCK_TEACHERS } from '@shared/data/mock/dashboard-contacts.mock';

@Component({
  selector: 'app-contacts-teachers-widget',
  standalone: true,
  imports: [
    CustomTextComponent,
    CustomLinkComponent,
    DashboardWidgetCardComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './contacts-teachers.widget.html',
})
export class ContactsTeachersWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly teachers = MOCK_TEACHERS;
  readonly lucideContact = LucideContactRound;
}

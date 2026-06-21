import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { WidgetSize } from '@shared/types';

interface MessageItem {
  sender: string;
  subject: string;
  date: string;
  unread: boolean;
}

const MOCK_MESSAGES: MessageItem[] = [
  {
    sender: 'Segreteria Didattica',
    subject: 'Aggiornamento piano di studi',
    date: 'Oggi',
    unread: true,
  },
  { sender: 'Prof. Rossi', subject: 'Materiale lezione del 20/06', date: 'Ieri', unread: true },
  { sender: 'Ufficio Borse', subject: 'Conferma borsa di studio', date: '18 Giu', unread: false },
];

@Component({
  selector: 'app-messages-widget',
  standalone: true,
  imports: [CustomTextComponent, CustomBadgeComponent],
  templateUrl: './messages.widget.html',
})
export class MessagesWidgetComponent {
  @Input() size: WidgetSize = 'medium';
  readonly messages = MOCK_MESSAGES;
}

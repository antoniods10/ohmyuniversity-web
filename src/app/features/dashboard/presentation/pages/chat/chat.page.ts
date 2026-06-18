import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomAvatarComponent } from '@ui/custom-avatar/custom-avatar.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideSend,
  LucidePaperclip,
  LucideFile,
  LucideLink,
  LucideUsers,
  LucideDownload,
  LucideArrowLeft,
  LucideChevronRight,
} from '@lucide/angular';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

import {
  ChatRoom,
  ChatMessage,
  ChatMember,
  SharedFile,
  SharedLink,
} from '@shared/types/dashboard/chat.types';
import {
  MOCK_CHAT_ROOMS,
  MOCK_CHAT_MESSAGES,
  MOCK_CHAT_MEMBERS,
  MOCK_SHARED_FILES,
  MOCK_SHARED_LINKS,
} from '@shared/data/mock/chat.mock';
import { acronymVariant } from '@shared/utils/ui.utils';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    DashboardContainerComponent,
    NgTemplateOutlet,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTabsComponent,
    CustomTextComponent,
    CustomAvatarComponent,
    CustomModalComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './chat.page.html',
})
export class ChatPage {
  readonly iconSearch = LucideSearch;
  readonly iconSend = LucideSend;
  readonly iconPaperclip = LucidePaperclip;
  readonly iconFile = LucideFile;
  readonly iconLink = LucideLink;
  readonly iconUsers = LucideUsers;
  readonly iconDownload = LucideDownload;
  readonly iconArrowLeft = LucideArrowLeft;
  readonly iconChevronRight = LucideChevronRight;

  readonly acronymVariant = acronymVariant;

  mobileView = signal<'list' | 'chat'>('list');
  selectedRoomId = signal<string>('room-1');
  activeDetailTab = signal<string>('membri');
  messageValue = signal<string>('');

  detailsModal: CustomModalComponent | null = null;

  readonly detailTabs: TabItem[] = [
    { id: 'membri', label: 'Membri', badge: 8 },
    { id: 'file', label: 'File', badge: 4 },
    { id: 'link', label: 'Link', badge: 3 },
  ];

  readonly chatRooms: ChatRoom[] = MOCK_CHAT_ROOMS;
  readonly messages: ChatMessage[] = MOCK_CHAT_MESSAGES;
  readonly members: ChatMember[] = MOCK_CHAT_MEMBERS;
  readonly sharedFiles: SharedFile[] = MOCK_SHARED_FILES;
  readonly sharedLinks: SharedLink[] = MOCK_SHARED_LINKS;

  get selectedRoom(): ChatRoom {
    return this.chatRooms.find(r => r.id === this.selectedRoomId()) ?? this.chatRooms[0];
  }

  selectRoom(id: string): void {
    this.selectedRoomId.set(id);
    this.mobileView.set('chat');
  }

  goBackToList(): void {
    this.mobileView.set('list');
  }

  openDetails(modal: CustomModalComponent): void {
    modal.open();
  }

  onDetailTabChange(tabId: string): void {
    this.activeDetailTab.set(tabId);
  }

  onMessageChange(val: string | number): void {
    this.messageValue.set(String(val));
  }

  sendMessage(): void {
    // @TODO
    this.messageValue.set('');
  }
}

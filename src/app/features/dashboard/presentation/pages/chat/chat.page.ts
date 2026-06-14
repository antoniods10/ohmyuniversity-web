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

export interface ChatRoom {
  id: string;
  courseAcronym: string;
  courseName: string;
  university: string;
  lastMessage: string;
  lastSender: string;
  time: string;
  unread: number;
  online: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMine: boolean;
  type: 'text' | 'file';
  attachment?: string;
}

export interface ChatMember {
  name: string;
  role: 'student' | 'professor';
  status: 'online' | 'offline';
}

export interface SharedFile {
  name: string;
  size: string;
  sender: string;
  time: string;
}

export interface SharedLink {
  title: string;
  url: string;
  sender: string;
  time: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
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

  readonly chatRooms: ChatRoom[] = [
    {
      id: 'room-1',
      courseAcronym: 'LM',
      courseName: 'Algoritmi e Strutture Dati',
      university: 'Univ. Bologna',
      lastMessage: 'Qualcuno ha le slide del modulo 4?',
      lastSender: 'Giulia R.',
      time: '10:32',
      unread: 3,
      online: 12,
    },
    {
      id: 'room-2',
      courseAcronym: 'LM',
      courseName: 'Sistemi Operativi',
      university: 'Univ. Bologna',
      lastMessage: 'Esame spostato al 15 luglio',
      lastSender: 'Prof. Marini',
      time: '09:15',
      unread: 1,
      online: 8,
    },
    {
      id: 'room-3',
      courseAcronym: 'L',
      courseName: 'Analisi Matematica II',
      university: 'Univ. Bologna',
      lastMessage: 'Ho caricato gli esercizi svolti',
      lastSender: 'Marco T.',
      time: 'Ieri',
      unread: 0,
      online: 5,
    },
    {
      id: 'room-4',
      courseAcronym: 'LM',
      courseName: 'Basi di Dati',
      university: 'Univ. Bologna',
      lastMessage: "La query dell'esercizio 3 non gira...",
      lastSender: 'Sara P.',
      time: 'Ieri',
      unread: 7,
      online: 3,
    },
    {
      id: 'room-5',
      courseAcronym: 'LMcu',
      courseName: 'Fisica Teorica',
      university: 'Univ. Pisa',
      lastMessage: "Capitolo 7 è fondamentale per l'esame",
      lastSender: 'Luca M.',
      time: 'Lun',
      unread: 0,
      online: 2,
    },
  ];

  readonly messages: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'Giulia Rossi',
      content: 'Ciao a tutti! Qualcuno ha le slide del modulo 4 del prof. Bianchi?',
      time: '10:20',
      isMine: false,
      type: 'text',
    },
    {
      id: 'm2',
      sender: 'Marco Testa',
      content: 'Sì, le ho caricate su Drive. Ecco il link!',
      time: '10:22',
      isMine: false,
      type: 'text',
    },
    {
      id: 'm3',
      sender: 'Tu',
      content: 'Grazie mille Marco! Avevo perso la lezione di giovedì.',
      time: '10:25',
      isMine: true,
      type: 'text',
    },
    {
      id: 'm4',
      sender: 'Giulia Rossi',
      content: "Qualcuno sa se all'esame portano anche gli algoritmi del modulo 3?",
      time: '10:28',
      isMine: false,
      type: 'text',
    },
    {
      id: 'm5',
      sender: 'Tu',
      content: 'Sì, il prof ha detto che entra tutto dal modulo 1 al 4 incluso.',
      time: '10:30',
      isMine: true,
      type: 'text',
    },
    {
      id: 'm6',
      sender: 'Sara Pini',
      content: 'Ho trovato degli esercizi svolti degli anni precedenti, ve li condivido.',
      time: '10:32',
      isMine: false,
      type: 'file',
      attachment: 'Esercizi_ASD_2023.pdf',
    },
  ];

  readonly members: ChatMember[] = [
    { name: 'Prof. Bianchi', role: 'professor', status: 'online' },
    { name: 'Mario Rossi', role: 'student', status: 'online' },
    { name: 'Giulia Rossi', role: 'student', status: 'online' },
    { name: 'Marco Testa', role: 'student', status: 'online' },
    { name: 'Sara Pini', role: 'student', status: 'offline' },
    { name: 'Luca Ferrari', role: 'student', status: 'offline' },
    { name: 'Anna Conti', role: 'student', status: 'offline' },
    { name: 'Paolo Neri', role: 'student', status: 'offline' },
  ];

  readonly sharedFiles: SharedFile[] = [
    { name: 'Esercizi_ASD_2023.pdf', size: '2.4 MB', sender: 'Sara Pini', time: '10:32' },
    { name: 'Slide_Modulo4.pdf', size: '8.1 MB', sender: 'Prof. Bianchi', time: 'Ieri' },
    { name: 'Appunti_Modulo3.pdf', size: '1.2 MB', sender: 'Marco Testa', time: 'Lun' },
    { name: 'Progetto_finale.zip', size: '14.7 MB', sender: 'Giulia Rossi', time: '12 giu' },
  ];

  readonly sharedLinks: SharedLink[] = [
    {
      title: 'Documentazione ufficiale Java',
      url: 'docs.oracle.com/javase',
      sender: 'Prof. Bianchi',
      time: 'Ieri',
    },
    { title: 'Visualizzatore algoritmi', url: 'visualgo.net', sender: 'Marco Testa', time: 'Lun' },
    {
      title: 'Repository GitHub del corso',
      url: 'github.com/corso-asd',
      sender: 'Prof. Bianchi',
      time: '10 giu',
    },
  ];

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

  acronymVariant(acronym: string): 'primary' | 'secondary' | 'tertiary' | 'success' {
    const map: Record<string, 'primary' | 'secondary' | 'tertiary' | 'success'> = {
      L: 'primary',
      LM: 'secondary',
      LMcu: 'tertiary',
      DOC: 'success',
    };
    return map[acronym] ?? 'primary';
  }
}

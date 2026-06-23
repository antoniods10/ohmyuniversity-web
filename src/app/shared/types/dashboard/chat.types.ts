import { LinkBase } from '@shared/types';

/** Chat room */
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

/** Message in a chat room */
export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMine: boolean;
  type: 'text' | 'file';
  attachment?: string;
}

/** Member of a chat room */
export interface ChatMember {
  name: string;
  role: 'student' | 'professor';
  status: 'online' | 'offline';
}

/** Shared file in a chat room */
export interface SharedFile {
  name: string;
  size: string;
  sender: string;
  time: string;
}

/** Shared link in a chat room */
export interface SharedLink extends LinkBase {
  sender: string;
  time: string;
}

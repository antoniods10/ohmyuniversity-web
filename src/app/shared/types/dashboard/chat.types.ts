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

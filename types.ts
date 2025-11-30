export enum UserRole {
  CLIENT = 'CLIENT',
  EXPERT = 'EXPERT'
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  LIVE = 'LIVE'
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  hourlyRate: number;
  skills: string[];
  rating: number;
  reviewCount: number;
  bio: string;
  tags: string[];
}

export interface Session {
  id: string;
  expertId: string;
  expertName: string;
  clientId: string;
  clientName: string;
  date: string; // ISO String
  durationMinutes: number;
  status: SessionStatus;
  topic: string;
  notes?: string;
  price: number;
}

export interface Message {
  id: string | number;
  senderId?: string;
  sender: string;
  text: string;
  timestamp: string; // Time string like "10:00 AM"
  isMe: boolean;
  type?: 'text' | 'file';
  fileName?: string;
  fileSize?: string;
}

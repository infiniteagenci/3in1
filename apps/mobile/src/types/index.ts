export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  ageGroup?: AgeGroup;
}

export type AgeGroup = 'child' | 'teen' | 'young-adult' | 'adult' | 'midlife' | 'senior';

export interface Session {
  token: string;
  user: User;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  parts?: MessagePart[];
  createdAt?: string;
}

export interface MessagePart {
  type: 'text' | 'reasoning';
  text: string;
}

export interface SendMessageRequest {
  messages: Message[];
  conversationId?: string | null;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export interface PrayerProgress {
  streak: number;
  consistency: number;
  weeklyActivity: Array<{
    date: string;
    day: string;
    count: number;
  }>;
  encouragement?: string;
}

export interface DailyCheckinData {
  mood: string;
  energy: number;
  prayerFocus?: string;
  gratitude?: string;
  timestamp: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  prayers?: string[];
  catechism?: string;
  scripture?: string;
  icon?: string;
  category?: string;
  categoryKey?: string;
  resultType?: string;
}

export interface AuthResponse {
  user: User;
  session_token: string;
}

export interface SuggestionsResponse {
  suggestions: string[];
}

export interface NotesResponse {
  content: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

export type MenuCategory = keyof typeof import('../data/catholicContent').catholicContent;

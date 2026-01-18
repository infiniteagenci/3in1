import { create } from 'zustand';
import type { Message } from '../types';

interface ChatState {
  messages: Message[];
  isStreaming: boolean;
  currentResponse: string;
  conversationId: string | null;
  addMessage: (message: Message) => void;
  appendToCurrentResponse: (chunk: string) => void;
  startStreaming: () => void;
  stopStreaming: () => void;
  clearMessages: () => void;
  setConversationId: (id: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isStreaming: false,
  currentResponse: '',
  conversationId: null,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  appendToCurrentResponse: (chunk) =>
    set((state) => ({
      currentResponse: state.currentResponse + chunk,
    })),

  startStreaming: () =>
    set({
      isStreaming: true,
      currentResponse: '',
    }),

  stopStreaming: () =>
    set((state) => {
      if (!state.currentResponse) {
        return { isStreaming: false };
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: state.currentResponse,
        parts: [{ type: 'text', text: state.currentResponse }],
        createdAt: new Date().toISOString(),
      };

      return {
        messages: [...state.messages, assistantMessage],
        isStreaming: false,
        currentResponse: '',
      };
    }),

  clearMessages: () =>
    set({
      messages: [],
      conversationId: null,
    }),

  setConversationId: (id) => set({ conversationId: id }),
}));

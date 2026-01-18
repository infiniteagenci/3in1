import { useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import { apiClient } from '../api/client';
import type { Message } from '../types';

export function useChat() {
  const {
    messages,
    isStreaming,
    currentResponse,
    conversationId,
    addMessage,
    appendToCurrentResponse,
    startStreaming,
    stopStreaming,
    clearMessages,
    setConversationId,
  } = useChatStore();

  const send = useCallback(
    async (content: string) => {
      if (isStreaming) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        parts: [{ type: 'text', text: content }],
        createdAt: new Date().toISOString(),
      };

      addMessage(userMessage);
      startStreaming();

      try {
        await apiClient.stream(
          '/api/chat',
          { messages: [...messages, userMessage], conversationId },
          (chunk) => {
            appendToCurrentResponse(chunk);
          },
          () => {
            stopStreaming();
          },
          (error) => {
            console.error('Chat error:', error);
            stopStreaming();
          }
        );
      } catch (error) {
        console.error('Failed to send message:', error);
        stopStreaming();
      }
    },
    [messages, conversationId, isStreaming, addMessage, startStreaming, appendToCurrentResponse, stopStreaming]
  );

  const loadSuggestions = useCallback(async (): Promise<string[]> => {
    try {
      const response = await apiClient.post<{ suggestions: string[] }>('/api/suggestions', {});
      return response.suggestions;
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      return [];
    }
  }, []);

  const reset = useCallback(() => {
    clearMessages();
  }, [clearMessages]);

  return {
    messages,
    isStreaming,
    currentResponse,
    conversationId,
    send,
    loadSuggestions,
    reset,
    setConversationId,
  };
}

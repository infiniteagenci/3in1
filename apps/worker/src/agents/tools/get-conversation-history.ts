import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { getDatabase } from './database';

// Get conversation history tool
export const getConversationHistoryTool = createTool({
  id: 'get-conversation-history',
  description: 'Get recent conversation history with this user to understand context',
  inputSchema: z.object({
    conversationId: z.string().describe('The ID of the conversation'),
    userId: z.string().describe('The ID of the user'),
    maxMessages: z.number().optional().default(10).describe('Maximum number of recent messages to retrieve'),
  }),
  outputSchema: z.object({
    messages: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
      timestamp: z.string(),
    })).describe('Recent conversation messages'),
  }),
  execute: async (context) => {
    try {
      const { conversationId, userId, maxMessages } = context;
      const db = getDatabase();

      if (!db) {
        console.warn('Database not available in conversation history tool');
        return { messages: [] };
      }

      // Get the conversation from database
      const conversation = await db.prepare(
        'SELECT messages FROM conversations WHERE id = ? AND user_id = ?'
      ).bind(conversationId, userId).first();

      if (!conversation) {
        return { messages: [] };
      }

      // Parse messages and limit to maxMessages
      const allMessages = JSON.parse((conversation as any).messages);
      const recentMessages = allMessages.slice(-maxMessages);

      return {
        messages: recentMessages.map((msg: any) => ({
          role: msg.role,
          content: msg.content || msg.parts?.[0]?.text || '',
          timestamp: msg.createdAt || new Date().toISOString(),
        }))
      };
    } catch (error) {
      console.error('Error getting conversation history:', error);
      return { messages: [] };
    }
  },
});

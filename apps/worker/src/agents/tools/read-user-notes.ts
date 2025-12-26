import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { getDatabase } from './database';

// Read user notes tool
export const readNotesTool = createTool({
  id: 'read-user-notes',
  description: 'Read personal notes about the user to understand their context and spiritual journey',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user whose notes to read'),
  }),
  execute: async (context) => {
    try {
      const { userId } = context;
      const db = getDatabase();

      if (!db) {
        console.warn('Database not available in read notes tool');
        return {
          notes: 'Database not available',
          exists: false
        };
      }

      // Get the user's notes from database
      const result = await db.prepare(
        'SELECT content FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1'
      ).bind(userId).first();

      if (!result) {
        return {
          notes: '',
          exists: false
        };
      }

      return {
        notes: (result as any).content as string,
        exists: true
      };
    } catch (error) {
      console.error('Error reading notes:', error);
      return { notes: '', exists: false };
    }
  },
});

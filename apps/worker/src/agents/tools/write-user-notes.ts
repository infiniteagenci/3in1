import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { getDatabase, createId } from './database';

// Write user notes tool
export const writeNotesTool = createTool({
  id: 'write-user-notes',
  description: 'Update personal notes about the user with important information learned during conversations. Capture structured data about the user including age, gender, location, profession, likes/dislikes, family situation, spiritual background, and personal insights.',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user whose notes to update'),
    observation: z.string().describe('Important observation or insight about the user to remember'),
    category: z.enum(['personal', 'spiritual', 'emotional', 'family', 'work', 'preferences', 'challenges', 'joys']).optional().describe('Category of the observation for better organization'),
    conversationContext: z.string().optional().describe('Context from the current conversation'),
  }),
  outputSchema: z.object({
    success: z.boolean().describe('Whether the notes were successfully updated'),
    notesUpdated: z.string().describe('Confirmation of what was added to the notes'),
  }),
  execute: async (context) => {
    try {
      const { userId, observation, category, conversationContext } = context;
      const db = getDatabase();

      if (!db) {
        console.warn('Database not available in write notes tool');
        return {
          success: false,
          notesUpdated: 'Database not available'
        };
      }

      // Check if user already has notes
      const existingNotes = await db.prepare(
        'SELECT content, id FROM notes WHERE user_id = ? LIMIT 1'
      ).bind(userId).first();

      const timestamp = new Date().toISOString();
      const categoryTag = category ? `[${category.toUpperCase()}] ` : '';
      const newEntry = `${categoryTag}[${timestamp}] ${observation}${conversationContext ? `\nContext: ${conversationContext}` : ''}`;

      if (existingNotes) {
        // Append to existing notes
        const updatedContent = `${(existingNotes as any).content}\n\n${newEntry}`;
        await db.prepare(
          'UPDATE notes SET content = ?, updated_at = ? WHERE id = ?'
        ).bind(updatedContent, timestamp, (existingNotes as any).id).run();
      } else {
        // Create new notes with a structured header
        const notesId = createId();
        const initialContent = `=== USER PROFILE FOR SPIRIT ===\nProfile Started: ${timestamp}\n\n${newEntry}`;
        await db.prepare(
          'INSERT INTO notes (id, user_id, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
        ).bind(notesId, userId, initialContent, timestamp, timestamp).run();
      }

      console.log(`Saved note for user ${userId}: ${observation}`);

      return {
        success: true,
        notesUpdated: `Note recorded: ${observation}`
      };
    } catch (error) {
      console.error('Error writing notes:', error);
      return { success: false, notesUpdated: 'Failed to update notes' };
    }
  },
});

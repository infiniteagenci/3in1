import { Agent } from '@mastra/core/agent';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Simple ID generator function
function createId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Helper function to extract important information from conversation
function extractImportantInfo(userMessage: string, spiritResponse: string): string[] {
  const importantInfo: string[] = [];

  // Look for personal information shared by user
  const personalPatterns = [
    /my name is (\w+)/i,
    /i am (\d+) years? old/i,
    /i work as a/i,
    /i am (?:a|an) (\w+)/i,
    /i (?:have|am dealing with) (\w+)/i,
  ];

  for (const pattern of personalPatterns) {
    const match = userMessage.match(pattern);
    if (match) {
      importantInfo.push(`User mentioned: ${match[0]}`);
    }
  }

  // Look for spiritual concerns or questions
  const spiritualKeywords = ['pray', 'faith', 'god', 'jesus', 'bible', 'church', 'spiritual', 'sin', 'forgiveness'];
  if (spiritualKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
    importantInfo.push('User expressed spiritual concerns or questions');
  }

  return importantInfo;
}

// Create tools for Spirit agent
const readNotesTool = createTool({
  id: 'read-user-notes',
  description: 'Read personal notes about the user to understand their context and spiritual journey',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user whose notes to read'),
  }),
  outputSchema: z.object({
    notes: z.string().describe('The current notes about this user'),
    exists: z.boolean().describe('Whether any notes exist for this user'),
  }),
  execute: async ({ context, userId }) => {
    try {
      // The database is passed through the context when the agent is called
      const db = context?.db as D1Database;
      if (!db) {
        console.error('Database not available in tool context');
        return { notes: '', exists: false };
      }

      const notesResult = await db.prepare(
        'SELECT content FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1'
      ).bind(userId).first();

      const notes = notesResult?.content || '';
      console.log(`Read notes for user ${userId}: ${notes ? 'Found' : 'Not found'}`);

      return {
        notes,
        exists: !!notesResult
      };
    } catch (error) {
      console.error('Error reading notes:', error);
      return { notes: '', exists: false };
    }
  },
});

const writeNotesTool = createTool({
  id: 'write-user-notes',
  description: 'Update personal notes about the user with important information learned during conversations',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user whose notes to update'),
    observation: z.string().describe('Important observation or insight about the user to remember'),
    conversationContext: z.string().optional().describe('Context from the current conversation'),
  }),
  outputSchema: z.object({
    success: z.boolean().describe('Whether the notes were successfully updated'),
    notesUpdated: z.string().describe('Confirmation of what was added to the notes'),
  }),
  execute: async ({ context, userId, observation, conversationContext }) => {
    try {
      const db = context?.db as D1Database;
      if (!db) {
        console.error('Database not available in tool context');
        return { success: false, notesUpdated: 'Database not available' };
      }

      // Get existing notes
      const existingNotes = await db.prepare(
        'SELECT content FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1'
      ).bind(userId).first();

      let notesContent = existingNotes?.content || '';

      // Add new observation with timestamp
      const timestamp = new Date().toISOString();
      let newEntry = `\n\n${timestamp}: ${observation}`;

      if (conversationContext) {
        newEntry += `\nContext: ${conversationContext}`;
      }

      const updatedNotes = `${notesContent}${newEntry}`.trim();

      if (existingNotes) {
        await db.prepare(
          'UPDATE notes SET content = ?, updated_at = datetime("now") WHERE user_id = ?'
        ).bind(updatedNotes, userId).run();
      } else {
        const notesId = createId();
        await db.prepare(
          'INSERT INTO notes (id, user_id, content) VALUES (?, ?, ?)'
        ).bind(notesId, userId, updatedNotes).run();
      }

      console.log(`Updated notes for user ${userId}: Added observation at ${timestamp}`);

      return {
        success: true,
        notesUpdated: `Added observation about user at ${timestamp}`
      };
    } catch (error) {
      console.error('Error writing notes:', error);
      return { success: false, notesUpdated: 'Failed to update notes' };
    }
  },
});

const getConversationHistoryTool = createTool({
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
  execute: async ({ context, conversationId, userId, maxMessages }) => {
    try {
      const db = context?.db as D1Database;
      if (!db) {
        console.error('Database not available in tool context');
        return { messages: [] };
      }

      const conversationResult = await db.prepare(
        'SELECT messages FROM conversations WHERE id = ? AND user_id = ?'
      ).bind(conversationId, userId).first();

      if (!conversationResult) {
        console.log(`No conversation found for ID: ${conversationId}, user: ${userId}`);
        return { messages: [] };
      }

      const allMessages = JSON.parse(conversationResult.messages);
      const recentMessages = allMessages.slice(-maxMessages);

      console.log(`Retrieved ${recentMessages.length} messages for conversation ${conversationId}`);

      return { messages: recentMessages };
    } catch (error) {
      console.error('Error getting conversation history:', error);
      return { messages: [] };
    }
  },
});

// Create the Spirit agent with Mastra
export const spiritAgent = new Agent({
  id: 'spirit-agent',
  name: 'Spirit',
  description: `A compassionate spiritual guide who provides guidance based on Jesus's teachings and Catholic principles.
  Spirit deeply understands users through conversation and maintains personal notes to provide personalized spiritual guidance.
  Always responds with compassion, warmth, and sound biblical teaching.`,

  // System instructions for the Spirit agent
  instructions: `You are Spirit, a compassionate spiritual guide who provides guidance based on Jesus's teachings and Catholic principles.

Your Purpose:
- Provide spiritual guidance and support rooted in Catholic teaching
- Help users grow in their faith and understanding of Jesus's teachings
- Listen compassionately and offer hope and encouragement
- Remember important details about users to provide personalized guidance

Your Approach:
- Always respond with warmth, compassion, and empathy
- Base your guidance on Scripture and Catholic tradition
- Be encouraging and hopeful, never judgmental
- Keep responses concise but meaningful (around 150-200 words)
- Use the read-user-notes tool to understand the user's background and journey
- Use the write-user-notes tool to remember important information about the user
- Use the get-conversation-history tool to understand recent conversations

Key Principles:
- Pray for users and encourage prayer
- Reference relevant Bible passages when appropriate
- Point to Jesus's example and teachings
- Respect the user's journey and meet them where they are
- Encourage participation in Church life and sacraments
- Emphasize God's love and mercy

Remember that you are walking with users on their spiritual journey. Be a compassionate companion who points them toward Christ.`,

  // Configure the model (using OpenAI as specified in the original implementation)
  model: 'openai/gpt-4o-mini',

  // Add the tools for Spirit to use
  tools: {
    'read-user-notes': readNotesTool,
    'write-user-notes': writeNotesTool,
    'get-conversation-history': getConversationHistoryTool,
  },
});

export default spiritAgent;
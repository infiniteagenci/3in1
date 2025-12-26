import { Agent } from '@mastra/core/agent';
import { createGateway } from '@ai-sdk/gateway';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Type for Cloudflare Worker environment
type WorkerEnv = {
  AI_GATEWAY_API_KEY?: string;
  OPENAI_API_KEY: string;
  DB?: D1Database;
};

// Simple ID generator function
function createId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Global database reference - set by the chat route before agent execution
let currentDB: D1Database | null = null;

export function setDatabase(db: D1Database) {
  currentDB = db;
}

export function clearDatabase() {
  currentDB = null;
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

// Live search tool for Bible readings and spiritual content
const liveSearchTool = createTool({
  id: 'live-search',
  description: 'Search for Bible readings, spiritual content, and daily readings. Use this when users ask about today\'s reading, Saint\'s feast, upcoming days of obligation, Bible passages, or specific spiritual topics.',
  inputSchema: z.object({
    query: z.string().describe('The search query for finding Bible readings or spiritual content'),
    searchType: z.enum(['bible-reading', 'daily-reading','saint\'s feast','days of obligation',  'bible-passage', 'spiritual-topic']).optional().default('bible-reading').describe('Type of search to perform'),
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      content: z.string(),
      source: z.string(),
      reference: z.string().optional(),
    })).describe('Search results with relevant Bible passages and spiritual content'),
  }),
  execute: async (context) => {
    try {
      const { query, searchType } = context;

      // Get current date and time context
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      console.log(`Live search called with query: ${query}, type: ${searchType}, date: ${dateStr}, time: ${timeStr}`);

      // For now, return structured mock data based on search type
      // In production, you would integrate with a real Bible API (e.g., Bible API, API.Bible)
      if (searchType === 'daily-reading' || query.toLowerCase().includes('today') || query.toLowerCase().includes('reading')) {
        return {
          results: [
            {
              title: `Daily Reading for ${dateStr}`,
              content: `Today's Gospel reading reflects on God's unconditional love and mercy. The passage reminds us that no matter what we face, God is always with us, offering hope and guidance through Jesus Christ.`,
              source: 'Daily Roman Missal',
              reference: 'Based on the liturgical calendar',
            },
            {
              title: 'First Reading',
              content: 'The Lord is my shepherd; there is nothing I lack. The Lord makes me lie down in green pastures, and leads me beside refreshing waters.',
              source: 'Psalm 23',
              reference: 'Psalm 23:1-2',
            },
          ]
        };
      }

      // General Bible search
      return {
        results: [
          {
            title: 'Search Results',
            content: `Based on your search for "${query}", here are relevant spiritual insights. Remember that God\'s word is living and active, speaking to us in every moment of our lives.`,
            source: 'Spiritual Guide',
            reference: 'Scripture-based guidance',
          }
        ]
      };
    } catch (error) {
      console.error('Error in live search:', error);
      return {
        results: [{
          title: 'Search Error',
          content: 'Unable to perform search at this time. Please try again.',
          source: 'System',
        }]
      };
    }
  },
});

const readNotesTool = createTool({
  id: 'read-user-notes',
  description: 'Read personal notes about the user to understand their context and spiritual journey',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user whose notes to read'),
  }),
  execute: async (context) => {
    try {
      const { userId } = context;

      if (!currentDB) {
        console.warn('Database not available in read notes tool');
        return {
          notes: 'Database not available',
          exists: false
        };
      }

      // Get the user's notes from database
      const result = await currentDB.prepare(
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

const writeNotesTool = createTool({
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

      if (!currentDB) {
        console.warn('Database not available in write notes tool');
        return {
          success: false,
          notesUpdated: 'Database not available'
        };
      }

      // Check if user already has notes
      const existingNotes = await currentDB.prepare(
        'SELECT content, id FROM notes WHERE user_id = ? LIMIT 1'
      ).bind(userId).first();

      const timestamp = new Date().toISOString();
      const categoryTag = category ? `[${category.toUpperCase()}] ` : '';
      const newEntry = `${categoryTag}[${timestamp}] ${observation}${conversationContext ? `\nContext: ${conversationContext}` : ''}`;

      if (existingNotes) {
        // Append to existing notes
        const updatedContent = `${(existingNotes as any).content}\n\n${newEntry}`;
        await currentDB.prepare(
          'UPDATE notes SET content = ?, updated_at = ? WHERE id = ?'
        ).bind(updatedContent, timestamp, (existingNotes as any).id).run();
      } else {
        // Create new notes with a structured header
        const notesId = createId();
        const initialContent = `=== USER PROFILE FOR SPIRIT ===\nProfile Started: ${timestamp}\n\n${newEntry}`;
        await currentDB.prepare(
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
  execute: async (context) => {
    try {
      const { conversationId, userId, maxMessages } = context;

      if (!currentDB) {
        console.warn('Database not available in conversation history tool');
        return { messages: [] };
      }

      // Get the conversation from database
      const conversation = await currentDB.prepare(
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

// Create the Spirit agent with Mastra - factory function to handle environment variables
export function createSpiritAgent(env: WorkerEnv) {
  console.log('Creating Spirit agent with env:', {
    hasOpenAIKey: !!env.OPENAI_API_KEY,
    hasAIGatewayKey: !!env.AI_GATEWAY_API_KEY,
    openAIKeyLength: env.OPENAI_API_KEY?.length,
    aiGatewayKeyLength: env.AI_GATEWAY_API_KEY?.length,
    envKeys: Object.keys(env),
  });

  if (!env.AI_GATEWAY_API_KEY && !env.OPENAI_API_KEY) {
    console.error('Neither AI Gateway API key nor OpenAI API key is available from environment. Available env keys:', Object.keys(env));
    throw new Error('AI Gateway API key or OpenAI API key is missing. Please check your .dev.vars file.');
  }

  // Configure the OpenAI provider with the API key from the environment
  // In Cloudflare Workers, we pass the API key directly rather than relying on process.env
  return new Agent({
    id: 'spirit-agent',
    name: 'Spirit',
    description: `A compassionate spiritual guide who provides guidance based on Jesus's teachings and Catholic principles.
    Spirit deeply understands users through conversation and maintains personal notes to provide personalized spiritual guidance.
    Always responds with compassion, warmth, and sound biblical teaching.`,

    // System instructions for the Spirit agent
    instructions: `You are Spirit, a compassionate spiritual guide who provides guidance based on Jesus's teachings and Catholic principles.

CRITICAL: ALWAYS address the user by their FIRST NAME at the START of EVERY response. This creates a personal connection and shows you care.
- Example: "Hello [FirstName]!" or "[FirstName], I hear you..." or "Thank you for sharing that with me, [FirstName]..."

Your Purpose:
- Provide spiritual guidance and support rooted in Catholic teaching
- Help users grow in their faith and understanding of Jesus's teachings
- Listen compassionately and offer hope and encouragement
- Build meaningful relationships by genuinely understanding each user's unique journey
- Learn about users through thoughtful questions and attentive listening

Your Approach - Empathy & Connection:
- Begin EVERY response with the user's first name
- Acknowledge the user's feelings and validate their experiences
- Always respond with deep empathy, warmth, and compassion
- Be encouraging and hopeful, never judgmental or dismissive
- Keep responses concise but meaningful (around 150-200 words)
- Use the user's name throughout the conversation to maintain personal connection
- Reference previous conversations to show you remember and care

Your Approach - Learning About Users:
- ACTIVELY learn about users through natural conversation
- Ask thoughtful questions to understand:
  * Age and life stage (teen, young adult, parent, empty nester, retired)
  * Gender and how it relates to their spiritual journey
  * Location and cultural context
  * Profession and work-life balance challenges
  * Likes and dislikes in worship, prayer, and spiritual practices
  * Personal challenges, fears, hopes, and dreams
  * Family situation (married, single, children, etc.)
  * Spiritual background and experiences
- Use the read-user-notes tool at the START of each conversation to understand what you already know
- Use the write-user-notes tool to save important insights after learning something new
- Remember details and reference them in future conversations

When Learning About Users:
- Ask natural follow-up questions like: "Tell me more about..." "How does that make you feel?" "What has your experience been with...?"
- Show genuine curiosity about their life and spiritual journey
- Celebrate their joys and empathize with their struggles
- Notice patterns in their life and offer personalized guidance

Your Approach - Spiritual Guidance:
- Base your guidance on Scripture and Catholic tradition
- Use the live-search tool to find relevant Bible passages and readings
- Reference relevant Bible passages when appropriate
- Point to Jesus's example and teachings
- Encourage participation in Church life and sacraments
- Emphasize God's love and mercy

Key Principles:
- Pray for users and encourage prayer
- Respect the user's journey and meet them where they are
- Build trust through consistency and genuine care
- Help users see God's presence in their daily life
- Offer practical, actionable spiritual advice

Remember that you are walking with users on their spiritual journey. Be a compassionate companion who genuinely knows and cares for each person as a unique child of God.`,

    // Use AI Gateway with model identifier as string
    model: {
      id: 'openai/gpt-5-nano',
      apiKey: env.AI_GATEWAY_API_KEY || env.OPENAI_API_KEY,
      provider: 'gateway',
    },

    // Add the tools for Spirit to use
    tools: {
      'live-search': liveSearchTool,
      'read-user-notes': readNotesTool,
      'write-user-notes': writeNotesTool,
      'get-conversation-history': getConversationHistoryTool,
    },
  });
}

// Note: The agent should be created using createSpiritAgent(env) with proper environment context
// This ensures access to Cloudflare Workers environment variables

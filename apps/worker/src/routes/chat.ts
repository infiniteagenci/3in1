import { Hono } from 'hono';
import { createSpiritAgent } from '../agents/spirit-agent';
import { streamText, convertToModelMessages } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

// Simple ID generator function
function createId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

type Bindings = {
  DB: D1Database;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
  ENVIRONMENT: string;
  OPENAI_API_KEY: string;
  ANTHROPIC_API_KEY?: string;
  AI_GATEWAY_API_KEY?: string;
};

type Variables = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

const chat = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middleware to validate session
async function validateSession(c: any, next: any) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.substring(7);

  try {
    // Validate session token
    const session = await c.env.DB.prepare(
      'SELECT s.*, u.id as user_id, u.name, u.email FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > datetime("now")'
    ).bind(token).first();

    if (!session) {
      return c.json({ error: 'Invalid session' }, 401);
    }

    c.set('user', {
      id: session.user_id,
      name: session.name,
      email: session.email
    });

    await next();
  } catch (error) {
    console.error('Session validation error:', error);
    return c.json({ error: 'Session validation failed' }, 500);
  }
}

// POST /api/chat - Send message to Spirit (AI SDK v6 streaming)
chat.post('/chat', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };
    const body = await c.req.json();

    console.log('Request body:', JSON.stringify(body, null, 2));

    // AI SDK v5 sends messages in UIMessage format with parts array
    const messages = body.messages || [];

    if (!messages || messages.length === 0) {
      return c.json({ error: 'Messages are required' }, 400);
    }

    // Build conversation history from messages
    const conversationHistory = messages.map((msg: any) => {
      const text = msg.parts
        ?.filter((p: any) => p.type === 'text')
        .map((p: any) => p.text)
        .join(' ') || '';
      return {
        role: (msg.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: text
      };
    });

    // Get the last user message
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    const userMessage = lastMessage?.content || '';

    if (!userMessage.trim()) {
      return c.json({ error: 'Message text is required' }, 400);
    }

    // Get current date, time context for every message
    const now = new Date();
    const dateContext = {
      date: now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
      isoDate: now.toISOString(),
      dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
      // Could add location context from request headers or user settings in the future
    };

    // Build messages with system prompt - include date/time context
    const modelMessages = [
      {
        role: 'system' as const,
        content: `Current user: ${user.name} (ID: ${user.id}).
Current date and time: ${dateContext.date} at ${dateContext.time}.
Day of week: ${dateContext.dayOfWeek}.

You are Spirit, a compassionate spiritual guide who provides guidance based on Jesus's teachings and Catholic principles.
When users ask about daily readings, today's Scripture, or liturgical content, use the live-search tool to find relevant content for the current date (${dateContext.date}).`
      },
      ...conversationHistory
    ];

    // Use AI Gateway streaming
    const gateway = createGateway({
      apiKey: c.env.AI_GATEWAY_API_KEY || c.env.OPENAI_API_KEY,
    });

    const result = await streamText({
      model: gateway('openai/gpt-4o-mini'),
      messages: modelMessages,
      temperature: 0.7,
      maxOutputTokens: 1000,
    });

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error('Chat error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    return c.json({ error: 'Failed to process message', details: String(error) }, 500);
  }
});

// GET /api/conversations - Get user's conversations
chat.get('/conversations', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };

    const conversations = await c.env.DB.prepare(
      'SELECT id, title, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC'
    ).bind(user.id).all();

    return c.json({ conversations: conversations.results });
  } catch (error) {
    console.error('Get conversations error:', error);
    return c.json({ error: 'Failed to fetch conversations' }, 500);
  }
});

// GET /api/conversations/:id - Get specific conversation
chat.get('/conversations/:id', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };
    const conversationId = c.req.param('id');

    const conversation = await c.env.DB.prepare(
      'SELECT * FROM conversations WHERE id = ? AND user_id = ?'
    ).bind(conversationId, user.id).first();

    if (!conversation) {
      return c.json({ error: 'Conversation not found' }, 404);
    }

    return c.json({ conversation });
  } catch (error) {
    console.error('Get conversation error:', error);
    return c.json({ error: 'Failed to fetch conversation' }, 500);
  }
});

// Notes management is now handled automatically by the Mastra Spirit agent through its tools
// The agent reads and writes notes using its specialized tools for personalized spiritual guidance

// Streaming functionality temporarily disabled - will be added back later

// POST /api/chat/stream - Stream message to Spirit (temporarily disabled)
// chat.post('/stream', validateSession, async (c) => {
//   // Streaming functionality will be added back later
//   return c.json({ error: 'Streaming temporarily disabled' }, 503);
// });

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

export default chat;

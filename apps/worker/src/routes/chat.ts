import { Hono } from 'hono';
import { createSpiritAgent } from '../agents/spirit-agent';

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

// Mastra agent integration for Spirit
async function generateSpiritResponse(message: string, user: any, conversationId: string, db: D1Database, env: any): Promise<string> {
  try {
    console.log('=== Mastra Agent Response ===');
    console.log('User:', user.name);
    console.log('Message:', message);
    console.log('Conversation ID:', conversationId);
    console.log('==========================');

    // Create the Spirit agent with proper environment
    const spiritAgent = createSpiritAgent(env);

    // Add user context to the message for the agent
    const contextMessage = `Current user context:
- Name: ${user.name}
- Email: ${user.email}
- User ID: ${user.id}
- Conversation ID: ${conversationId}

Please provide personalized spiritual guidance for this user.`;

    // Create the message structure for Mastra agent
    const messages = [
      {
        role: 'system' as const,
        content: `You are Spirit, a compassionate spiritual guide. Database access is available through your tools for reading/writing notes and getting conversation history. Current context: User ID is ${user.id}, Conversation ID is ${conversationId}.`
      },
      {
        role: 'user' as const,
        content: `${contextMessage}\n\nUser message: ${message}`
      }
    ];

    // Generate response using Mastra Spirit agent
    const response = await spiritAgent.generate(messages);

    console.log('Mastra response received:', response.text);
    return response.text;
  } catch (error) {
    console.error('Mastra agent error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    return `I'm here to support you on your spiritual journey, ${user.name}. Based on Jesus's teachings, remember that God loves you deeply and is always with you. Take time to pray and reflect on His guidance in your life. I'm having some technical difficulty accessing my spiritual insights database, but I'd be happy to continue our conversation about your faith journey.`;
  }
}

// POST /api/chat - Send message to Spirit
chat.post('/chat', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };
    const { message, conversationId: inputConversationId } = await c.req.json() as { message: string; conversationId?: string };

    if (!message || !message.trim()) {
      return c.json({ error: 'Message is required' }, 400);
    }

    // Get or create conversation
    let conversation;
    let conversationId = inputConversationId;

    if (conversationId) {
      conversation = await c.env.DB.prepare(
        'SELECT * FROM conversations WHERE id = ? AND user_id = ?'
      ).bind(conversationId, user.id).first();
    }

    if (!conversation) {
      // Create new conversation
      conversationId = createId();
      const initialMessages = JSON.stringify([
        { role: 'user', content: message, timestamp: new Date().toISOString() }
      ]);

      await c.env.DB.prepare(
        'INSERT INTO conversations (id, user_id, title, messages) VALUES (?, ?, ?, ?)'
      ).bind(
        conversationId,
        user.id,
        message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        initialMessages
      ).run();
    } else {
      // Update existing conversation
      const existingMessages = JSON.parse(conversation.messages as string);
      existingMessages.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      });

      await c.env.DB.prepare(
        'UPDATE conversations SET messages = ?, updated_at = datetime("now") WHERE id = ?'
      ).bind(JSON.stringify(existingMessages), conversationId).run();
    }

    // Generate Spirit's response using Mastra agent
    const spiritResponse = await generateSpiritResponse(message, user, conversationId!, c.env.DB, c.env);

    // Store Spirit's response
    const updatedConversationResult = await c.env.DB.prepare(
      'SELECT messages FROM conversations WHERE id = ?'
    ).bind(conversationId).first();

    if (updatedConversationResult) {
      const messages = JSON.parse(updatedConversationResult.messages as string);
      messages.push({
        role: 'assistant',
        content: spiritResponse,
        timestamp: new Date().toISOString()
      });

      await c.env.DB.prepare(
        'UPDATE conversations SET messages = ?, updated_at = datetime("now") WHERE id = ?'
      ).bind(JSON.stringify(messages), conversationId).run();
    }

    // Notes are automatically managed by the Mastra Spirit agent through its tools
    console.log('Mastra agent has automatically managed user notes through its tools');

    return c.json({
      message: spiritResponse,
      conversationId
    });

  } catch (error) {
    console.error('Chat error:', error);
    return c.json({ error: 'Failed to process message' }, 500);
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

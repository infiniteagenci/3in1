import { Hono } from 'hono';
// import { mastra } from '../mastra';
// import { spiritAgent } from '../agents/spirit-agent';

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

const chat = new Hono<{ Bindings: Bindings }>();

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

// Simple response generator for Spirit (temporary until Mastra integration)
async function generateSpiritResponse(message: string, user: any, conversationId: string): Promise<string> {
  // Simple spiritual responses based on keywords
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('pray') || lowerMessage.includes('prayer')) {
    return `Hello ${user.name}, prayer is a beautiful way to connect with God. Jesus taught us to pray with sincerity and faith. Remember Matthew 6:6: "But when you pray, go into your room, close the door and pray to your Father, who is unseen." Take time today to speak with God openly and honestly.`;
  }

  if (lowerMessage.includes('faith') || lowerMessage.includes('believe')) {
    return `Faith is the foundation of our relationship with God, ${user.name}. Hebrews 11:1 tells us that "faith is confidence in what we hope for and assurance about what we do not see." Even in difficult times, trust that God has a plan for you and loves you unconditionally.`;
  }

  if (lowerMessage.includes('jesus') || lowerMessage.includes('christ')) {
    return `Jesus is our ultimate example of love and compassion, ${user.name}. His teachings in the Sermon on the Mount show us how to live with grace, humility, and love for others. Remember that Jesus said the greatest commandments are to love God and love your neighbor as yourself.`;
  }

  if (lowerMessage.includes('forgiveness') || lowerMessage.includes('forgive')) {
    return `Forgiveness is central to Jesus's teachings, ${user.name}. In Matthew 6:14-15, Jesus teaches us to forgive others as God has forgiven us. Forgiveness brings healing and freedom, allowing us to experience God's grace more fully.`;
  }

  // Default spiritual response
  return `Thank you for sharing with me, ${user.name}. I'm here to guide you on your spiritual journey. Remember that God loves you deeply and has a purpose for your life. Take time to read Scripture, pray, and seek wisdom from trusted spiritual mentors. Jesus said, "Come to me, all you who are weary and burdened, and I will give you rest." (Matthew 11:28)`;
}

// POST /api/chat - Send message to Spirit
chat.post('/', validateSession, async (c) => {
  try {
    const user = c.get('user');
    const { message, conversationId: inputConversationId } = await c.req.json();

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
      const existingMessages = JSON.parse(conversation.messages);
      existingMessages.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      });

      await c.env.DB.prepare(
        'UPDATE conversations SET messages = ?, updated_at = datetime("now") WHERE id = ?'
      ).bind(JSON.stringify(existingMessages), conversationId).run();
    }

    // Generate Spirit's response
    const spiritResponse = await generateSpiritResponse(message, user, conversationId);

    // Store Spirit's response
    const updatedConversationResult = await c.env.DB.prepare(
      'SELECT messages FROM conversations WHERE id = ?'
    ).bind(conversationId).first();

    if (updatedConversationResult) {
      const messages = JSON.parse(updatedConversationResult.messages);
      messages.push({
        role: 'assistant',
        content: spiritResponse,
        timestamp: new Date().toISOString()
      });

      await c.env.DB.prepare(
        'UPDATE conversations SET messages = ?, updated_at = datetime("now") WHERE id = ?'
      ).bind(JSON.stringify(messages), conversationId).run();
    }

    // Notes functionality will be added later with the Mastra integration
    console.log('Chat message processed successfully');

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
    const user = c.get('user');

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
    const user = c.get('user');
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

// Notes functionality will be added back later with the Mastra integration

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
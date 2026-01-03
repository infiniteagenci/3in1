import { Hono } from 'hono';
import { streamText, createGateway } from 'ai';
import type { Bindings, Variables } from './common';
import { validateSession, createId } from './common';

const chat = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Helper function to save conversation to database
async function saveConversation(
  db: D1Database,
  userId: string,
  conversationId: string | undefined,
  messages: any[],
  assistantResponse: string
) {
  try {
    // Add the assistant's response to messages
    const updatedMessages = [
      ...messages,
      {
        role: 'assistant',
        content: assistantResponse,
        createdAt: new Date().toISOString(),
      }
    ];

    // Generate title from first user message if this is a new conversation
    const firstUserMessage = messages.find((m: any) => m.role === 'user');
    const title = firstUserMessage
      ? (firstUserMessage.parts?.[0]?.text || firstUserMessage.content || 'New Conversation').substring(0, 50)
      : 'New Conversation';

    if (!conversationId) {
      // Create new conversation
      const newConversationId = createId();
      await db.prepare(
        'INSERT INTO conversations (id, user_id, title, messages, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        newConversationId,
        userId,
        title,
        JSON.stringify(updatedMessages),
        new Date().toISOString(),
        new Date().toISOString()
      ).run();
      console.log('Created new conversation:', newConversationId);
      return newConversationId;
    } else {
      // Update existing conversation
      await db.prepare(
        'UPDATE conversations SET messages = ?, updated_at = ? WHERE id = ? AND user_id = ?'
      ).bind(
        JSON.stringify(updatedMessages),
        new Date().toISOString(),
        conversationId,
        userId
      ).run();
      console.log('Updated conversation:', conversationId);
      return conversationId;
    }
  } catch (error) {
    console.error('Error saving conversation:', error);
    throw error;
  }
}

// System prompt for Spirit
const SPIRIT_SYSTEM_PROMPT = `You are Spirit, a warm and caring Catholic friend who loves nothing more than helping others draw closer to God through Jesus's beautiful teachings and the rich, loving traditions of our Catholic faith.

CRITICAL: ALWAYS address the user by their FIRST NAME at the START of EVERY response. This creates a warm, personal connection.

Your Purpose:
- Be a warm, supportive friend on someone's faith journey
- Help curious hearts discover the beauty of Catholic faith at their own pace
- Listen with genuine care and offer gentle encouragement
- Make faith feel approachable, joyful, and personal

Your Approach - Warmth & Connection:
- Begin EVERY response with the user's first name with genuine warmth
- Keep responses friendly, conversational, and encouraging (around 100-150 words)
- Be yourself - warm, kind, a little playful sometimes, deeply caring

Key Principles:
- Make everyone feel welcomed, valued, and loved just as they are
- Invite, never pressure - faith is a personal journey
- Be real, relatable, and genuinely caring
- Help people see God's loving presence in everyday moments
- End with a warm note of encouragement or a gentle invitation to pray`;

// POST /api/chat - Send message to Spirit using AI SDK directly
chat.post('/', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };
    const body = await c.req.json();

    console.log('Request body:', JSON.stringify(body, null, 2));

    // Set database for later use
    const db = c.env.DB;
    const conversationId = body.conversationId;

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
        .join(' ') || msg.content || '';
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

    // Get user's first name
    const userFirstName = user.name.split(' ')[0];

    console.log('User message:', userMessage);
    console.log('User first name:', userFirstName);

    // Create Vercel AI Gateway client
    const gateway = createGateway({
      apiKey: c.env.AI_GATEWAY_API_KEY,
    });

    // Build messages for the AI
    const aiMessages = [
      { role: 'system', content: `${SPIRIT_SYSTEM_PROMPT}\n\nCurrent user: ${user.name} (first name: ${userFirstName})` },
      ...conversationHistory,
    ];

    console.log('Sending request to Vercel AI Gateway...');

    // Stream the response using AI SDK via Vercel AI Gateway
    const result = await streamText({
      model: gateway('openai/gpt-4o-mini'),
      messages: aiMessages,
      onFinish: async ({ text, usage }: { text: string; usage?: any }) => {
        console.log('Stream complete:', { usage, textLength: text?.length });
        // Save conversation to database
        try {
          await saveConversation(db, user.id, conversationId, messages, text);
        } catch (error) {
          console.error('Error saving conversation after stream:', error);
        }
      },
    });

    console.log('Returning stream response...');

    // Return the streaming response as data stream (more reliable than text stream)
    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Chat error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    return c.json({ error: 'Failed to process message', details: String(error) }, 500);
  }
});

export default chat;

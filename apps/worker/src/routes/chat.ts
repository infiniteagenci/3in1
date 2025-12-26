import { Hono } from 'hono';
import { createSpiritAgent, setDatabase } from '../agents/spirit-agent';
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

// POST /api/chat - Send message to Spirit using Mastra Agent
chat.post('/', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };
    const body = await c.req.json();

    console.log('Request body:', JSON.stringify(body, null, 2));

    // Set database for agent tools to access
    setDatabase(c.env.DB);

    // Create the Spirit agent with environment context
    const agent = createSpiritAgent(c.env);

    // AI SDK v5 sends messages in UIMessage format with parts array
    const messages = body.messages || [];
    const conversationId = body.conversationId;

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
    };

    // Extract first name
    const userFirstName = user.name.split(' ')[0];

    // Build messages - the agent's instructions are already in the agent, so we just need to add user context
    const agentMessages = [
      {
        role: 'system' as const,
        content: `Current User Context:
- User's full name: ${user.name}
- User's first name: ${userFirstName} (IMPORTANT: Always address them by this name!)
- User ID: ${user.id}
- Current date and time: ${dateContext.date} at ${dateContext.time}
- Day of week: ${dateContext.dayOfWeek}

REMINDER: You MUST address the user by their first name "${userFirstName}" at the START of EVERY response.`
      },
      ...conversationHistory.slice(0, -1),
      {
        role: 'user' as const,
        content: userMessage
      }
    ];

    // Stream the response using Mastra agent
    const stream = await agent.stream(agentMessages, {
      maxSteps: 5, // Allow the agent to use tools
      onFinish: async ({ text, steps, usage }) => {
        console.log('Stream complete:', { usage, steps: steps.length });
        // Save conversation to database after stream completes
        try {
          await saveConversation(c.env.DB, user.id, conversationId, messages, text);
        } catch (error) {
          console.error('Error saving conversation after stream:', error);
        }
      },
    });

    // Create a streaming response using the Mastra stream's textStream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream.textStream) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    // Return the streaming response
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Chat error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    return c.json({ error: 'Failed to process message', details: String(error) }, 500);
  }
});

export default chat;

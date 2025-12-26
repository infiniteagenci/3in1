import { Hono } from 'hono';
import { streamText } from 'ai';
import { createGateway } from '@ai-sdk/gateway';
import { setDatabase } from '../agents/spirit-agent';
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

// Full Spirit agent instructions for streaming
const SPIRIT_AGENT_INSTRUCTIONS = `You are Spirit, a compassionate spiritual guide who provides guidance based on Jesus's teachings and Catholic principles.

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

Remember that you are walking with users on their spiritual journey. Be a compassionate companion who genuinely knows and cares for each person as a unique child of God.`;

// POST /api/chat - Send message to Spirit using Mastra Agent
chat.post('/', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };
    const body = await c.req.json();

    console.log('Request body:', JSON.stringify(body, null, 2));

    // Set database for agent tools to access
    setDatabase(c.env.DB);

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

    // Build messages with full system prompt that includes user info
    const modelMessages = [
      {
        role: 'system' as const,
        content: `${SPIRIT_AGENT_INSTRUCTIONS}

Current User Context:
- User's full name: ${user.name}
- User's first name: ${userFirstName} (IMPORTANT: Use this to address them!)
- User ID: ${user.id}
- Current date and time: ${dateContext.date} at ${dateContext.time}
- Day of week: ${dateContext.dayOfWeek}`
      },
      ...conversationHistory.slice(0, -1),
      {
        role: 'user' as const,
        content: userMessage
      }
    ];

    // Create gateway for streaming
    const gateway = createGateway({
      apiKey: c.env.AI_GATEWAY_API_KEY || c.env.OPENAI_API_KEY,
    });

    // Stream the response using AI SDK
    const result = streamText({
      model: gateway('openai/gpt-4o-mini'),
      messages: modelMessages,
      temperature: 0.7,
    });

    // Save conversation after stream completes (in the background)
    (async () => {
      try {
        const fullResponse = await result.text;
        await saveConversation(c.env.DB, user.id, conversationId, messages, fullResponse);
      } catch (error) {
        console.error('Error saving conversation after stream:', error);
      }
    })();

    // Return the streamable response
    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error('Chat error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    return c.json({ error: 'Failed to process message', details: String(error) }, 500);
  }
});

export default chat;

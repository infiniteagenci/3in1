import { Hono } from 'hono';
import type { AppContext, Bindings, Variables } from './common';
import { validateSession } from './common';

const conversations = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// GET /api/conversations - Get user's conversations
conversations.get('/', validateSession, async (c) => {
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
conversations.get('/:id', validateSession, async (c) => {
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

export default conversations;

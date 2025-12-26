import { Hono } from 'hono';
import type { Bindings, Variables } from './common';
import { validateSession } from './common';

const notes = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// GET /api/notes - Get user's notes for personalized suggestions
notes.get('/', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };

    const notes = await c.env.DB.prepare(
      'SELECT content FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1'
    ).bind(user.id).first();

    if (!notes) {
      return c.json({ notes: '', exists: false });
    }

    return c.json({
      notes: (notes as any).content as string,
      exists: true
    });
  } catch (error) {
    console.error('Get notes error:', error);
    return c.json({ error: 'Failed to fetch notes' }, 500);
  }
});

export default notes;

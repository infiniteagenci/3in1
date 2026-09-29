import { Hono } from 'hono';

export type Bindings = {
  DB: D1Database;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
  ENVIRONMENT: string;
  OPENAI_API_KEY: string;
  ANTHROPIC_API_KEY?: string;
  AI_GATEWAY_API_KEY?: string;
  // Optional override for the chat model via AI Gateway (e.g. "openai/gpt-4.1")
  AI_CHAT_MODEL?: string;
  // Optional overrides for Spirit's spoken voice via AI Gateway TTS
  // (e.g. "openai/tts-1", voice "shimmer")
  AI_TTS_MODEL?: string;
  AI_TTS_VOICE?: string;
};

export type Variables = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type AppContext = {
  Bindings: Bindings;
  Variables: Variables;
};

// Middleware to validate session
export async function validateSession(c: any, next: any) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.substring(7);

  try {
    // Validate session token
    const session = await c.env.DB.prepare(
      "SELECT s.*, u.id as user_id, u.name, u.email FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP"
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

// Simple ID generator function
export function createId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

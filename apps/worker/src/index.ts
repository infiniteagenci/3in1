import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import auth from './routes/auth';
import chat from './routes/chat';

type Bindings = {
  DB: D1Database;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
  ENVIRONMENT: string;
  OPENAI_API_KEY: string;
  ANTHROPIC_API_KEY?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware to set environment variables globally for Mastra/AI SDK compatibility
app.use('*', async (c, next) => {
  // Store original process.env to restore later
  const originalEnv = typeof process !== 'undefined' ? { ...process.env } : null;

  try {
    // Set the API key in global process.env for Mastra/AI SDK compatibility
    if (typeof process !== 'undefined' && process.env) {
      if (c.env.OPENAI_API_KEY) {
        process.env.OPENAI_API_KEY = c.env.OPENAI_API_KEY;
      }
      if (c.env.ANTHROPIC_API_KEY) {
        process.env.ANTHROPIC_API_KEY = c.env.ANTHROPIC_API_KEY;
      }
    } else if (typeof globalThis !== 'undefined') {
      if (!globalThis.process) {
        globalThis.process = { env: {} } as any;
      }
      globalThis.process.env = {
        ...(globalThis.process.env || {}),
        OPENAI_API_KEY: c.env.OPENAI_API_KEY,
        ANTHROPIC_API_KEY: c.env.ANTHROPIC_API_KEY
      };
    }

    await next();
  } finally {
    // Restore original process.env to prevent potential conflicts between concurrent requests
    if (originalEnv && typeof process !== 'undefined' && process.env) {
      Object.keys(process.env).forEach(key => {
        if (originalEnv[key] === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = originalEnv[key];
        }
      });
      // Add back any keys that were in originalEnv but might have been removed
      Object.keys(originalEnv).forEach(key => {
        if (process.env[key] === undefined) {
          process.env[key] = originalEnv[key];
        }
      });
    }
  }
});

app.use('*', cors());
app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: '3in1 Spiritual App API is running!',
    environment: c.env.ENVIRONMENT,
    version: '1.0.0'
  });
});

app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

// Auth routes
app.route('/auth', auth);

// Chat routes
app.route('/api', chat);

// Debug route to test if chat module is loaded
app.get('/api/test', (c) => {
  return c.json({
    message: 'API routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Debug route to check environment variables
app.get('/debug/env', (c) => {
  return c.json({
    envVars: {
      OPENAI_API_KEY: c.env.OPENAI_API_KEY ? 'Present' : 'Missing',
      GOOGLE_OAUTH_CLIENT_ID: c.env.GOOGLE_OAUTH_CLIENT_ID ? 'Present' : 'Missing',
      GOOGLE_OAUTH_CLIENT_SECRET: c.env.GOOGLE_OAUTH_CLIENT_SECRET ? 'Present' : 'Missing',
      ENVIRONMENT: c.env.ENVIRONMENT || 'Missing',
      DB: c.env.DB ? 'Present' : 'Missing'
    }
  });
});

// Protected route example
app.get('/api/me', async (c) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // In a real app, you'd validate the session token here
  // For now, just return a placeholder
  return c.json({ message: 'This is a protected route' });
});

export default {
  fetch: app.fetch,
};
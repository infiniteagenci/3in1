import { Hono } from 'hono';
import { GoogleUser, createOrUpdateUser, createSession, validateSession, deleteSession } from '../auth';

type Bindings = {
  DB: D1Database;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
  ENVIRONMENT: string;
};

const auth = new Hono<{ Bindings: Bindings }>();

// Google OAuth endpoints
auth.get('/google/url', (c) => {
  const clientId = c.env.GOOGLE_OAUTH_CLIENT_ID;
  // Redirect to frontend login page which will handle the OAuth callback
  // Default to 4321 for Astro dev, but check if frontend is on different port
  const frontendUrl = c.req.url.includes('localhost') ? 'http://localhost:4321' : `${c.req.url.split('/').slice(0, 3).join('/')}`;
  const redirectUri = `${frontendUrl}/login`;
  const scope = 'openid email profile';

  // Debug logging
  console.log('=== Google OAuth Debug ===');
  console.log('Client ID:', clientId);
  console.log('Client Secret:', c.env.GOOGLE_OAUTH_CLIENT_SECRET);
  console.log('Frontend URL:', frontendUrl);
  console.log('Redirect URI:', redirectUri);
  console.log('Request URL:', c.req.url);
  console.log('========================');

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('access_type', 'offline');

  return c.json({ url: authUrl.toString() });
});

auth.post('/google/callback', async (c) => {
  try {
    const { code } = await c.req.json();

    if (!code) {
      return c.json({ error: 'Authorization code is required' }, 400);
    }

    const clientId = c.env.GOOGLE_OAUTH_CLIENT_ID;
    const clientSecret = c.env.GOOGLE_OAUTH_CLIENT_SECRET;
    // Use the same redirect URI that was sent in the OAuth request
    const redirectUri = c.req.url.includes('localhost') ? 'http://localhost:4321/login' : `${new URL(c.req.url).origin}/login`;

    // Debug logging
    console.log('=== Google OAuth Token Exchange Debug ===');
    console.log('Client ID:', clientId);
    console.log('Client Secret:', clientSecret);
    console.log('Redirect URI:', redirectUri);
    console.log('Authorization Code:', code);
    console.log('=========================================');

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token exchange error:', error);
      return c.json({ error: 'Failed to exchange authorization code' }, 400);
    }

    const tokenData: { access_token: string } = await tokenResponse.json();

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      return c.json({ error: 'Failed to fetch user information' }, 400);
    }

    const googleUser: GoogleUser = await userResponse.json();

    // Create or update user in database
    const user = await createOrUpdateUser(c.env.DB, googleUser);

    // Create session
    const session = await createSession(c.env.DB, user.id);

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
      },
      session_token: session.token,
    });
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Validate session endpoint
auth.get('/validate', async (c) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'No session token provided' }, 401);
  }

  const token = authHeader.substring(7);
  const user = await validateSession(c.env.DB, token);

  if (!user) {
    return c.json({ error: 'Invalid or expired session' }, 401);
  }

  return c.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar_url: user.avatar_url,
    },
  });
});

// Logout endpoint
auth.post('/logout', async (c) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'No session token provided' }, 401);
  }

  const token = authHeader.substring(7);
  const success = await deleteSession(c.env.DB, token);

  if (!success) {
    return c.json({ error: 'Failed to delete session' }, 400);
  }

  return c.json({ message: 'Logged out successfully' });
});

export default auth;
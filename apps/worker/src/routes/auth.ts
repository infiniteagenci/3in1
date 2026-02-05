import { Hono } from 'hono';
import { GoogleUser, createOrUpdateUser, createSession, validateSession, deleteSession, hashPassword, verifyPassword } from '../auth';

type Bindings = {
  DB: D1Database;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
  ENVIRONMENT: string;
  BASE_API_URL: string;
  BASE_APP_URL: string;
};

const auth = new Hono<{ Bindings: Bindings }>();

// Email/password login endpoint
auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Find user by email
    const result = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first();

    if (!result) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    const user = result as any;

    // Check if user has password (might be Google OAuth only user)
    if (!user.password_hash) {
      return c.json({ error: 'Please sign in with Google or set a password' }, 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

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
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Email/password signup endpoint
auth.post('/signup', async (c) => {
  try {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ error: 'Name, email, and password are required' }, 400);
    }

    if (password.length < 8) {
      return c.json({ error: 'Password must be at least 8 characters' }, 400);
    }

    // Check if user already exists
    const existingUser = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first();

    if (existingUser) {
      return c.json({ error: 'An account with this email already exists' }, 409);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create new user
    const userId = crypto.randomUUID();
    const result = await c.env.DB.prepare(
      'INSERT INTO users (id, email, name, password_hash, google_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
      .bind(
        userId,
        email.toLowerCase(),
        name,
        passwordHash,
        `email_${userId}`, // Use email-based google_id for email users
        new Date().toISOString(),
        new Date().toISOString()
      )
      .run();

    if (!result.success) {
      return c.json({ error: 'Failed to create account' }, 500);
    }

    // Fetch the created user
    const newUser = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
      .bind(userId)
      .first() as any;

    // Create session
    const session = await createSession(c.env.DB, userId);

    return c.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar_url: newUser.avatar_url,
      },
      session_token: session.token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Forgot password endpoint
auth.post('/forgot-password', async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    // Check if user exists
    const user = await c.env.DB.prepare('SELECT id, email FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first();

    if (!user) {
      // Don't reveal if email exists or not
      return c.json({ message: 'If an account exists with this email, a password reset link will be sent' });
    }

    // In a real implementation, you would:
    // 1. Generate a reset token
    // 2. Store it in the database with expiration
    // 3. Send an email with the reset link

    // For now, return success (we'll implement email sending later)
    console.log('Password reset requested for:', email);
    return c.json({ message: 'If an account exists with this email, a password reset link will be sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Google OAuth endpoints
auth.get('/google/url', (c) => {
  const clientId = c.env.GOOGLE_OAUTH_CLIENT_ID;
  const redirectUri = `${c.env.BASE_APP_URL}/login`;
  console.log('redirectUri', redirectUri);
  const scope = 'openid email profile';

  // Debug logging
  console.log('=== Google OAuth Debug ===');
  console.log('Client ID:', clientId);
  console.log('Client Secret:', c.env.GOOGLE_OAUTH_CLIENT_SECRET);
  console.log('Base App URL:', c.env.BASE_APP_URL);
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
    const redirectUri = `${c.env.BASE_APP_URL}/login`;

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

// Dev login endpoint (only works in development)
auth.post('/dev-login', async (c) => {
  // Only allow in development
  if (c.env.ENVIRONMENT !== 'development') {
    return c.json({ error: 'Dev login only available in development' }, 403);
  }

  try {
    const { user } = await c.req.json();

    if (!user || !user.id || !user.email || !user.name) {
      return c.json({ error: 'User object is required with id, email, and name' }, 400);
    }

    // Create or update dev user in database
    const dbUser = await createOrUpdateUser(c.env.DB, {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.avatar_url,
    });

    // Create session
    const session = await createSession(c.env.DB, dbUser.id);

    return c.json({
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        avatar_url: dbUser.avatar_url,
      },
      session_token: session.token,
    });
  } catch (error) {
    console.error('Dev login error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default auth;

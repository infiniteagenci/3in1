import { Hono } from 'hono';
import { validator } from 'hono/validator';

type Bindings = {
  DB: D1Database;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
  ENVIRONMENT: string;
  OPENAI_API_KEY: string;
};

type Variables = {
  user: { id: string; name: string; email: string; avatar_url?: string };
};

const user = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middleware to validate session token
async function getSessionUser(c: any, next: any) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.substring(7);

  try {
    const result = await c.env.DB.prepare(
      'SELECT u.id, u.name, u.email, u.avatar_url FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > datetime("now")'
    ).bind(token).first();

    if (!result) {
      return c.json({ error: 'Invalid session' }, 401);
    }

    c.set('user', result as any);
    await next();
  } catch (error) {
    console.error('Error validating session:', error);
    return c.json({ error: 'Session validation failed' }, 500);
  }
}

// Update user profile (age group, etc.)
user.post('/profile', getSessionUser, async (c) => {
  const userData = c.get('user');
  const body = await c.req.json() as { ageGroup?: string };

  const { ageGroup } = body;

  if (!ageGroup) {
    return c.json({ error: 'ageGroup is required' }, 400);
  }

  try {
    // Update or insert user profile
    await c.env.DB.prepare(`
      INSERT INTO user_profiles (user_id, age_group, updated_at)
      VALUES (?, ?, datetime("now"))
      ON CONFLICT(user_id) DO UPDATE SET
        age_group = ?,
        updated_at = datetime("now")
    `).bind(userData.id, ageGroup, ageGroup).run();

    // Also save to notes for the AI agent to see
    await c.env.DB.prepare(`
      INSERT INTO notes (user_id, content, created_at)
      VALUES (?, ?, datetime("now"))
    `).bind(userData.id, JSON.stringify({ ageGroup })).run();

    return c.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

// Get user profile
user.get('/profile', getSessionUser, async (c) => {
  const userData = c.get('user');

  try {
    const userProfile = await c.env.DB.prepare(
      'SELECT age_group, created_at, updated_at FROM user_profiles WHERE user_id = ?'
    ).bind(userData.id).first();

    // Return combined user data and profile
    return c.json({
      name: userData.name,
      email: userData.email,
      avatar_url: userData.avatar_url,
      ageGroup: userProfile?.age_group || null,
      profile: userProfile || { ageGroup: null }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Update user photo/avatar
user.post('/photo', getSessionUser, async (c) => {
  const userData = c.get('user');
  const body = await c.req.json() as { avatar_url?: string };

  const { avatar_url } = body;

  if (!avatar_url) {
    return c.json({ error: 'avatar_url is required' }, 400);
  }

  try {
    // Update user's avatar_url in users table
    await c.env.DB.prepare(`
      UPDATE users SET avatar_url = ? WHERE id = ?
    `).bind(avatar_url, userData.id).run();

    return c.json({
      success: true,
      message: 'Photo updated successfully',
      avatar_url
    });
  } catch (error) {
    console.error('Error updating photo:', error);
    return c.json({ error: 'Failed to update photo' }, 500);
  }
});

// Delete user photo
user.delete('/photo', getSessionUser, async (c) => {
  const userData = c.get('user');

  try {
    // Remove user's avatar_url
    await c.env.DB.prepare(`
      UPDATE users SET avatar_url = NULL WHERE id = ?
    `).bind(userData.id).run();

    return c.json({
      success: true,
      message: 'Photo removed successfully'
    });
  } catch (error) {
    console.error('Error removing photo:', error);
    return c.json({ error: 'Failed to remove photo' }, 500);
  }
});

export default user;

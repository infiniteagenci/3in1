import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

type Variables = {
  user: { id: string; name: string; email: string; avatar_url?: string; role?: string };
};

const focus = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Middleware to validate session token
async function getSessionUser(c: any, next: any) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.substring(7);

  try {
    const result = await c.env.DB.prepare(
      'SELECT u.id, u.name, u.email, u.avatar_url, u.role FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > datetime("now")'
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

// Get all focus sessions
focus.get('/sessions', getSessionUser, async (c) => {
  const userData = c.get('user');

  try {
    const sessions = await c.env.DB.prepare(
      'SELECT id, start_time, end_time, duration, completed, notes, selected_music FROM focus_sessions WHERE user_id = ? ORDER BY start_time DESC LIMIT 50'
    ).bind(userData.id).all();

    const result = (sessions.results || []).map((s: any) => ({
      id: s.id,
      startTime: s.start_time,
      endTime: s.end_time,
      duration: s.duration,
      completed: s.completed === 1,
      notes: s.notes,
      selectedMusic: s.selected_music
    }));

    return c.json({ sessions: result });
  } catch (error) {
    console.error('Error fetching focus sessions:', error);
    return c.json({ error: 'Failed to fetch sessions' }, 500);
  }
});

// Save a focus session
focus.post('/sessions', getSessionUser, async (c) => {
  const userData = c.get('user');
  const body = await c.req.json() as {
    startTime: string;
    endTime?: string;
    duration: number;
    completed: boolean;
    notes?: string;
    selectedMusic?: string;
  };

  try {
    const id = crypto.randomUUID();
    await c.env.DB.prepare(`
      INSERT INTO focus_sessions (id, user_id, start_time, end_time, duration, completed, notes, selected_music)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      userData.id,
      body.startTime,
      body.endTime || null,
      body.duration,
      body.completed ? 1 : 0,
      body.notes || null,
      body.selectedMusic || null
    ).run();

    return c.json({ success: true, id });
  } catch (error) {
    console.error('Error saving focus session:', error);
    return c.json({ error: 'Failed to save session' }, 500);
  }
});

// Delete a focus session
focus.delete('/sessions/:sessionId', getSessionUser, async (c) => {
  const userData = c.get('user');
  const sessionId = c.req.param('sessionId');

  try {
    await c.env.DB.prepare(
      'DELETE FROM focus_sessions WHERE id = ? AND user_id = ?'
    ).bind(sessionId, userData.id).run();

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting focus session:', error);
    return c.json({ error: 'Failed to delete session' }, 500);
  }
});

// Get user achievements
focus.get('/achievements', getSessionUser, async (c) => {
  const userData = c.get('user');

  try {
    const achievements = await c.env.DB.prepare(
      'SELECT achievement_id, current_value, requirement, unlocked, unlocked_at FROM user_achievements WHERE user_id = ?'
    ).bind(userData.id).all();

    const result = (achievements.results || []).map((a: any) => ({
      achievementId: a.achievement_id,
      current: a.current_value,
      requirement: a.requirement,
      unlocked: a.unlocked === 1,
      unlockedAt: a.unlocked_at
    }));

    return c.json({ achievements: result });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return c.json({ error: 'Failed to fetch achievements' }, 500);
  }
});

// Save/update achievements
focus.post('/achievements', getSessionUser, async (c) => {
  const userData = c.get('user');
  const body = await c.req.json() as {
    achievements: Array<{
      id: string;
      current: number;
      requirement: number;
      unlocked: boolean;
      unlockedAt?: string;
    }>;
  };

  try {
    for (const ach of body.achievements) {
      // Check if achievement exists
      const existing = await c.env.DB.prepare(
        'SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?'
      ).bind(userData.id, ach.id).first();

      if (existing) {
        // Update existing achievement
        const unlockedAt = ach.unlocked && ach.unlockedAt ? ach.unlockedAt : null;
        await c.env.DB.prepare(`
          UPDATE user_achievements
          SET current_value = ?, requirement = ?, unlocked = ?, unlocked_at = ?, updated_at = datetime("now")
          WHERE user_id = ? AND achievement_id = ?
        `).bind(
          ach.current,
          ach.requirement,
          ach.unlocked ? 1 : 0,
          unlockedAt,
          userData.id,
          ach.id
        ).run();
      } else {
        // Insert new achievement
        const id = crypto.randomUUID();
        await c.env.DB.prepare(`
          INSERT INTO user_achievements (id, user_id, achievement_id, current_value, requirement, unlocked, unlocked_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          id,
          userData.id,
          ach.id,
          ach.current,
          ach.requirement,
          ach.unlocked ? 1 : 0,
          ach.unlockedAt || null
        ).run();
      }
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Error saving achievements:', error);
    return c.json({ error: 'Failed to save achievements' }, 500);
  }
});

// Get focus statistics (for weekly stats, etc.)
focus.get('/stats', getSessionUser, async (c) => {
  const userData = c.get('user');

  try {
    // Get total focus time
    const totalTime = await c.env.DB.prepare(
      'SELECT SUM(duration) as total FROM focus_sessions WHERE user_id = ? AND completed = 1'
    ).bind(userData.id).first();

    // Get sessions from last 7 days
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const weekSessions = await c.env.DB.prepare(
      'SELECT COUNT(*) as count, SUM(duration) as minutes FROM focus_sessions WHERE user_id = ? AND start_time > ? AND completed = 1'
    ).bind(userData.id, weekAgo).first();

    // Get unique days with sessions
    const uniqueDays = await c.env.DB.prepare(
      'SELECT COUNT(DISTINCT date(start_time)) as days FROM focus_sessions WHERE user_id = ? AND completed = 1'
    ).bind(userData.id).first();

    return c.json({
      totalSeconds: totalTime?.total || 0,
      weekSessions: weekSessions?.count || 0,
      weekMinutes: Math.floor(((weekSessions?.minutes as number) || 0) / 60),
      uniqueDays: uniqueDays?.days || 0
    });
  } catch (error) {
    console.error('Error fetching focus stats:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

export default focus;

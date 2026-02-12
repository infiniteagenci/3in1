import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
  SUPERADMIN_EMAIL: string;
};

type Variables = {
  user: { id: string; name: string; email: string; avatar_url?: string; role?: string };
};

const admin = new Hono<{ Bindings: Bindings; Variables: Variables }>();

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

// Middleware to check if user is superadmin
async function requireSuperadmin(c: any, next: any) {
  const userData = c.get('user');
  const superadminEmail = c.env.SUPERADMIN_EMAIL || '';

  // Check if user has superadmin role OR their email matches the configured superadmin email
  const isSuperadmin = userData.role === 'superadmin' || userData.email === superadminEmail;

  if (!isSuperadmin) {
    return c.json({ error: 'Forbidden - Superadmin access required' }, 403);
  }

  await next();
}

// Get overall analytics
admin.get('/analytics', getSessionUser, requireSuperadmin, async (c) => {
  try {
    // Total users
    const totalUsers = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM users'
    ).first();

    // Users registered in last 7 days
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const newUsers = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM users WHERE created_at > ?'
    ).bind(weekAgo).first();

    // Active sessions (valid sessions in database)
    const activeSessions = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM sessions WHERE expires_at > datetime("now")'
    ).first();

    // Total focus sessions across all users
    const totalFocusSessions = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM focus_sessions WHERE completed = 1'
    ).first();

    // Total focus time in minutes
    const totalFocusTime = await c.env.DB.prepare(
      'SELECT SUM(duration) as total FROM focus_sessions WHERE completed = 1'
    ).first();

    // Total study lessons completed
    const studyProgress = await c.env.DB.prepare(
      'SELECT plan_id, completed_lessons FROM study_progress'
    ).all();

    let totalLessonsCompleted = 0;
    for (const row of studyProgress.results || []) {
      const completed = row.completed_lessons ? JSON.parse(row.completed_lessons as string) : [];
      totalLessonsCompleted += completed.length;
    }

    // User activity by day for last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const dailyActivity = await c.env.DB.prepare(`
      SELECT
        date(created_at) as date,
        COUNT(*) as new_users
      FROM users
      WHERE created_at > ?
      GROUP BY date(created_at)
      ORDER BY date DESC
    `).bind(thirtyDaysAgo).all();

    return c.json({
      users: {
        total: totalUsers?.count || 0,
        newThisWeek: newUsers?.count || 0
      },
      sessions: {
        active: activeSessions?.count || 0
      },
      focus: {
        totalSessions: totalFocusSessions?.count || 0,
        totalMinutes: Math.floor(((totalFocusTime?.total as number) || 0) / 60)
      },
      study: {
        totalLessonsCompleted
      },
      dailyActivity: dailyActivity.results || []
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Get list of all users
admin.get('/users', getSessionUser, requireSuperadmin, async (c) => {
  try {
    const users = await c.env.DB.prepare(
      'SELECT id, email, name, avatar_url, role, created_at FROM users ORDER BY created_at DESC LIMIT 100'
    ).all();

    return c.json({ users: users.results || [] });
  } catch (error) {
    console.error('Error fetching users:', error);
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

// Get detailed stats for a specific user
admin.get('/users/:userId/stats', getSessionUser, requireSuperadmin, async (c) => {
  const userId = c.req.param('userId');

  try {
    // User info
    const user = await c.env.DB.prepare(
      'SELECT id, email, name, role, created_at FROM users WHERE id = ?'
    ).bind(userId).first();

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Focus sessions count and total time
    const focusStats = await c.env.DB.prepare(
      'SELECT COUNT(*) as count, SUM(duration) as total FROM focus_sessions WHERE user_id = ? AND completed = 1'
    ).bind(userId).first();

    // Study progress
    const studyProgress = await c.env.DB.prepare(
      'SELECT plan_id, completed_lessons, started_at FROM study_progress WHERE user_id = ?'
    ).bind(userId).all();

    let totalLessonsCompleted = 0;
    for (const row of studyProgress.results || []) {
      const completed = row.completed_lessons ? JSON.parse(row.completed_lessons as string) : [];
      totalLessonsCompleted += completed.length;
    }

    // Achievements unlocked
    const achievements = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM user_achievements WHERE user_id = ? AND unlocked = 1'
    ).bind(userId).first();

    // Recent activity
    const recentFocus = await c.env.DB.prepare(
      'SELECT start_time, duration, completed FROM focus_sessions WHERE user_id = ? ORDER BY start_time DESC LIMIT 5'
    ).bind(userId).all();

    return c.json({
      user,
      stats: {
        focusSessions: focusStats?.count || 0,
        focusMinutes: Math.floor(((focusStats?.total as number) || 0) / 60),
        studyPlans: (studyProgress.results || []).length,
        lessonsCompleted: totalLessonsCompleted,
        achievementsUnlocked: achievements?.count || 0
      },
      recentFocus: recentFocus.results || []
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return c.json({ error: 'Failed to fetch user stats' }, 500);
  }
});

// Update user role (promote/demote superadmin)
admin.post('/users/:userId/role', getSessionUser, requireSuperadmin, async (c) => {
  const userId = c.req.param('userId');
  const body = await c.req.json() as { role: string };

  if (body.role !== 'user' && body.role !== 'superadmin') {
    return c.json({ error: 'Invalid role' }, 400);
  }

  try {
    await c.env.DB.prepare(
      'UPDATE users SET role = ?, updated_at = datetime("now") WHERE id = ?'
    ).bind(body.role, userId).run();

    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating user role:', error);
    return c.json({ error: 'Failed to update role' }, 500);
  }
});

export default admin;

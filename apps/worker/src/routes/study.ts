import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

type Variables = {
  user: { id: string; name: string; email: string; avatar_url?: string; role?: string };
};

const study = new Hono<{ Bindings: Bindings; Variables: Variables }>();

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

// Get study progress for a plan
study.get('/progress/:planId', getSessionUser, async (c) => {
  const userData = c.get('user');
  const planId = c.req.param('planId');

  try {
    const progress = await c.env.DB.prepare(
      'SELECT completed_lessons, in_progress_lessons, current_lesson, started_at FROM study_progress WHERE user_id = ? AND plan_id = ?'
    ).bind(userData.id, planId).first();

    if (!progress) {
      return c.json({
        completed: [],
        inProgress: [],
        current: null,
        startedAt: null
      });
    }

    return c.json({
      completed: progress.completed_lessons ? JSON.parse(progress.completed_lessons as string) : [],
      inProgress: progress.in_progress_lessons ? JSON.parse(progress.in_progress_lessons as string) : [],
      current: progress.current_lesson,
      startedAt: progress.started_at
    });
  } catch (error) {
    console.error('Error fetching study progress:', error);
    return c.json({ error: 'Failed to fetch progress' }, 500);
  }
});

// Save/update study progress
study.post('/progress/:planId', getSessionUser, async (c) => {
  const userData = c.get('user');
  const planId = c.req.param('planId');
  const body = await c.req.json() as {
    completed?: string[];
    inProgress?: string[];
    current?: string;
  };

  try {
    // Get existing progress
    const existing = await c.env.DB.prepare(
      'SELECT completed_lessons, in_progress_lessons, current_lesson FROM study_progress WHERE user_id = ? AND plan_id = ?'
    ).bind(userData.id, planId).first();

    const completed = body.completed || (existing?.completed_lessons ? JSON.parse(existing.completed_lessons as string) : []);
    const inProgress = body.inProgress || (existing?.in_progress_lessons ? JSON.parse(existing.in_progress_lessons as string) : []);
    const current = body.current !== undefined ? body.current : existing?.current_lesson;

    if (existing) {
      // Update existing progress
      await c.env.DB.prepare(`
        UPDATE study_progress
        SET completed_lessons = ?, in_progress_lessons = ?, current_lesson = ?, updated_at = datetime("now")
        WHERE user_id = ? AND plan_id = ?
      `).bind(
        JSON.stringify(completed),
        JSON.stringify(inProgress),
        current || null,
        userData.id,
        planId
      ).run();
    } else {
      // Insert new progress
      const id = crypto.randomUUID();
      await c.env.DB.prepare(`
        INSERT INTO study_progress (id, user_id, plan_id, completed_lessons, in_progress_lessons, current_lesson)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        id,
        userData.id,
        planId,
        JSON.stringify(completed),
        JSON.stringify(inProgress),
        current || null
      ).run();
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Error saving study progress:', error);
    return c.json({ error: 'Failed to save progress' }, 500);
  }
});

// Get study notes for a lesson
study.get('/notes/:planId/:lessonId', getSessionUser, async (c) => {
  const userData = c.get('user');
  const planId = c.req.param('planId');
  const lessonId = c.req.param('lessonId');

  try {
    const notes = await c.env.DB.prepare(
      'SELECT personal_notes, question_notes, completed_at FROM study_notes WHERE user_id = ? AND plan_id = ? AND lesson_id = ?'
    ).bind(userData.id, planId, lessonId).first();

    if (!notes) {
      return c.json({ personal: '', questionNotes: {}, completedAt: null });
    }

    return c.json({
      personal: notes.personal_notes || '',
      questionNotes: notes.question_notes ? JSON.parse(notes.question_notes as string) : {},
      completedAt: notes.completed_at
    });
  } catch (error) {
    console.error('Error fetching study notes:', error);
    return c.json({ error: 'Failed to fetch notes' }, 500);
  }
});

// Save study notes for a lesson
study.post('/notes/:planId/:lessonId', getSessionUser, async (c) => {
  const userData = c.get('user');
  const planId = c.req.param('planId');
  const lessonId = c.req.param('lessonId');
  const body = await c.req.json() as {
    personal?: string;
    questionNotes?: Record<string, string>;
    completed?: boolean;
  };

  try {
    // Get existing notes
    const existing = await c.env.DB.prepare(
      'SELECT id FROM study_notes WHERE user_id = ? AND plan_id = ? AND lesson_id = ?'
    ).bind(userData.id, planId, lessonId).first();

    const personal = body.personal || '';
    const questionNotes = body.questionNotes || {};
    const completedAt = body.completed ? new Date().toISOString() : null;

    if (existing) {
      // Update existing notes
      await c.env.DB.prepare(`
        UPDATE study_notes
        SET personal_notes = ?, question_notes = ?, completed_at = ?, updated_at = datetime("now")
        WHERE user_id = ? AND plan_id = ? AND lesson_id = ?
      `).bind(
        personal,
        JSON.stringify(questionNotes),
        completedAt,
        userData.id,
        planId,
        lessonId
      ).run();
    } else {
      // Insert new notes
      const id = crypto.randomUUID();
      await c.env.DB.prepare(`
        INSERT INTO study_notes (id, user_id, plan_id, lesson_id, personal_notes, question_notes, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(
        id,
        userData.id,
        planId,
        lessonId,
        personal,
        JSON.stringify(questionNotes),
        completedAt
      ).run();
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Error saving study notes:', error);
    return c.json({ error: 'Failed to save notes' }, 500);
  }
});

// Get all study progress (for profile page)
study.get('/all', getSessionUser, async (c) => {
  const userData = c.get('user');

  try {
    const progressList = await c.env.DB.prepare(
      'SELECT plan_id, completed_lessons, in_progress_lessons, current_lesson, started_at FROM study_progress WHERE user_id = ?'
    ).bind(userData.id).all();

    const result: Record<string, any> = {};
    for (const row of progressList.results || []) {
      result[row.plan_id as string] = {
        completed: row.completed_lessons ? JSON.parse(row.completed_lessons as string) : [],
        inProgress: row.in_progress_lessons ? JSON.parse(row.in_progress_lessons as string) : [],
        current: row.current_lesson,
        startedAt: row.started_at
      };
    }

    // Also get all notes for completed lessons
    const notesList = await c.env.DB.prepare(
      'SELECT plan_id, lesson_id, personal_notes, question_notes, completed_at FROM study_notes WHERE user_id = ? AND completed_at IS NOT NULL'
    ).bind(userData.id).all();

    const notes: Record<string, any> = {};
    for (const row of notesList.results || []) {
      const key = `${row.plan_id}_${row.lesson_id}`;
      notes[key] = {
        personal: row.personal_notes || '',
        questionNotes: row.question_notes ? JSON.parse(row.question_notes as string) : {},
        completedAt: row.completed_at
      };
    }

    return c.json({ progress: result, notes });
  } catch (error) {
    console.error('Error fetching all study data:', error);
    return c.json({ error: 'Failed to fetch data' }, 500);
  }
});

export default study;

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  google_id: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

export async function createOrUpdateUser(
  db: D1Database,
  googleUser: GoogleUser
): Promise<User> {
  // Check if user exists
  const existingUser = await db
    .prepare('SELECT * FROM users WHERE google_id = ?')
    .bind(googleUser.id)
    .first<User>();

  if (existingUser) {
    // Update user data
    await db
      .prepare('UPDATE users SET email = ?, name = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(googleUser.email, googleUser.name, googleUser.picture, existingUser.id)
      .run();

    return { ...existingUser, email: googleUser.email, name: googleUser.name, avatar_url: googleUser.picture };
  }

  // Create new user
  const userId = crypto.randomUUID();
  const result = await db
    .prepare('INSERT INTO users (id, email, name, avatar_url, google_id) VALUES (?, ?, ?, ?, ?)')
    .bind(userId, googleUser.email, googleUser.name, googleUser.picture, googleUser.id)
    .run();

  if (!result.success) {
    throw new Error('Failed to create user');
  }

  const newUser = await db
    .prepare('SELECT * FROM users WHERE id = ?')
    .bind(userId)
    .first<User>();

  if (!newUser) {
    throw new Error('Failed to retrieve created user');
  }

  return newUser;
}

export async function createSession(
  db: D1Database,
  userId: string,
  expiresInSeconds: number = 7 * 24 * 60 * 60 // 7 days
): Promise<Session> {
  const sessionId = crypto.randomUUID();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();

  const result = await db
    .prepare('INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)')
    .bind(sessionId, userId, token, expiresAt)
    .run();

  if (!result.success) {
    throw new Error('Failed to create session');
  }

  const session = await db
    .prepare('SELECT * FROM sessions WHERE id = ?')
    .bind(sessionId)
    .first<Session>();

  if (!session) {
    throw new Error('Failed to retrieve created session');
  }

  return session;
}

export async function validateSession(
  db: D1Database,
  token: string
): Promise<User | null> {
  const session = await db
    .prepare(`
      SELECT s.*, u.*
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP
    `)
    .bind(token)
    .first<{ user_id: string } & User & Session>();

  if (!session) {
    return null;
  }

  // Return user data without session fields
  const { user_id, id: sessionId, token: sessionToken, expires_at, created_at: sessionCreatedAt, ...user } = session;
  return user as User;
}

export async function deleteSession(db: D1Database, token: string): Promise<boolean> {
  const result = await db
    .prepare('DELETE FROM sessions WHERE token = ?')
    .bind(token)
    .run();

  // Type assertion to handle TypeScript strictness with newer D1 types
  const resultAsAny = result as any;
  const changes = resultAsAny.changes ?? resultAsAny?.meta?.changes ?? 0;

  return result.success && changes > 0;
}

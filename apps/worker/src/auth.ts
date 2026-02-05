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
  password_hash?: string;
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

// Password hashing using Web Crypto API (PBKDF2)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Import the password as a key
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    data,
    'PBKDF2',
    false,
    ['deriveBits']
  );

  // Derive the hash
  const hash = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  // Combine salt and hash
  const combined = new Uint8Array(salt.length + hash.byteLength);
  combined.set(salt);
  combined.set(new Uint8Array(hash), salt.length);

  // Convert to base64
  return btoa(String.fromCharCode(...combined));
}

// Verify password against stored hash
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Decode the stored hash
    const combined = Uint8Array.from(atob(storedHash), c => c.charCodeAt(0));
    const salt = combined.slice(0, 16);
    const hash = combined.slice(16);

    // Import the password as a key
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      data,
      'PBKDF2',
      false,
      ['deriveBits']
    );

    // Derive the hash
    const derivedHash = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      256
    );

    // Compare hashes
    const derivedArray = new Uint8Array(derivedHash);
    if (derivedArray.length !== hash.length) {
      return false;
    }

    for (let i = 0; i < derivedArray.length; i++) {
      if (derivedArray[i] !== hash[i]) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

export async function createOrUpdateUser(
  db: D1Database,
  googleUser: GoogleUser
): Promise<User> {
  // Check if user exists by google_id
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

  // Check if user exists by email (for linking Google account to existing email account)
  const existingByEmail = await db
    .prepare('SELECT * FROM users WHERE email = ?')
    .bind(googleUser.email)
    .first<User>();

  if (existingByEmail) {
    // Link Google account to existing user
    await db
      .prepare('UPDATE users SET google_id = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(googleUser.id, googleUser.picture, existingByEmail.id)
      .run();

    return { ...existingByEmail, google_id: googleUser.id, avatar_url: googleUser.picture };
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

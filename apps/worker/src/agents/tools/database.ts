// Shared database reference for tools
// Set by the chat route before agent execution

let currentDB: D1Database | null = null;

export function setDatabase(db: D1Database) {
  currentDB = db;
}

export function getDatabase(): D1Database | null {
  return currentDB;
}

export function clearDatabase() {
  currentDB = null;
}

// Simple ID generator function
export function createId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

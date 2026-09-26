-- Create user_profiles table (exists in db/schema.sql but was missing from production)
CREATE TABLE IF NOT EXISTS user_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  age_group TEXT, -- 'child', 'teen', 'young-adult', 'adult', 'midlife', 'senior'
  preferences TEXT, -- JSON string for additional preferences
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
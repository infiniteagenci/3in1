-- Migration: Add user data tables and superadmin role
-- This migration adds tables for study progress, focus sessions, achievements
-- and adds a role field to users for superadmin functionality

-- Add role column to users table (default to 'user')
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';

-- Study progress table
CREATE TABLE IF NOT EXISTS study_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  completed_lessons TEXT, -- JSON array of completed lesson IDs
  in_progress_lessons TEXT, -- JSON array of in-progress lesson IDs
  current_lesson TEXT, -- Currently active lesson ID
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Study notes table
CREATE TABLE IF NOT EXISTS study_notes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  personal_notes TEXT, -- User's personal notes
  question_notes TEXT, -- JSON object of question answers
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, plan_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Focus sessions table
CREATE TABLE IF NOT EXISTS focus_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME,
  duration INTEGER, -- in seconds
  completed INTEGER DEFAULT 0, -- 0 or 1
  notes TEXT,
  selected_music TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  achievement_id TEXT NOT NULL,
  current_value INTEGER DEFAULT 0,
  requirement INTEGER NOT NULL,
  unlocked INTEGER DEFAULT 0, -- 0 or 1
  unlocked_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for new tables
CREATE INDEX IF NOT EXISTS idx_study_progress_user_id ON study_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_study_progress_plan_id ON study_progress(plan_id);
CREATE INDEX IF NOT EXISTS idx_study_notes_user_id ON study_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_study_notes_plan_id ON study_notes(plan_id);
CREATE INDEX IF NOT EXISTS idx_focus_sessions_user_id ON focus_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_focus_sessions_start_time ON focus_sessions(start_time);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

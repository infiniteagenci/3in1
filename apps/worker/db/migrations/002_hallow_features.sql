-- Migration 002: Hallow-like Features
-- Prayer routines, daily check-ins, progress tracking, novenas, prayer sessions, preferences, and daily content cache

-- 1. Prayer routines and schedules
CREATE TABLE IF NOT EXISTS prayer_routines (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  routine_type TEXT NOT NULL, -- 'morning-prayer', 'evening-prayer', 'angelus', 'divine-office', 'rosary', 'examen', 'novena'
  preferred_time TEXT, -- HH:MM format in user's timezone
  enabled BOOLEAN DEFAULT 1,
  notification_method TEXT DEFAULT 'in-app', -- 'in-app', 'push' (future)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 2. Daily check-ins with mood and energy tracking
CREATE TABLE IF NOT EXISTS daily_checkins (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  checkin_date DATE NOT NULL,
  mood TEXT NOT NULL, -- 'joyful', 'grateful', 'peaceful', 'anxious', 'sad', 'struggling', 'tired'
  energy_level INTEGER, -- 1-5 scale
  prayer_focus TEXT, -- What they want to pray about
  gratitude_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, checkin_date)
);

-- 3. Progress tracking (consistency, completed routines)
CREATE TABLE IF NOT EXISTS prayer_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  routine_type TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  duration_minutes INTEGER,
  started_at DATETIME,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, date, routine_type)
);

-- 4. Novena journey progress (9-day prayer journeys)
CREATE TABLE IF NOT EXISTS novena_journeys (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  novena_type TEXT NOT NULL, -- 'holy-spirit', 'sacred-heart', 'st-jude', 'st-joseph', etc.
  intention TEXT,
  day_number INTEGER DEFAULT 1, -- 1-9
  started_at DATETIME,
  current_day_date DATE,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Interactive prayer sessions (step-by-step state)
CREATE TABLE IF NOT EXISTS prayer_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  prayer_type TEXT NOT NULL, -- 'rosary', 'examen', 'guided-meditation', 'divine-office'
  current_step INTEGER DEFAULT 1,
  total_steps INTEGER NOT NULL,
  step_data TEXT, -- JSON for current step state
  started_at DATETIME,
  last_activity DATETIME,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. User prayer preferences
CREATE TABLE IF NOT EXISTS prayer_preferences (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  preferred_prayer_length TEXT DEFAULT '5-10', -- '1-3', '3-5', '5-10', '10-15', '15-20', '20+'
  music_preference BOOLEAN DEFAULT 1, -- Background ambient music
  voice_guide BOOLEAN DEFAULT 1, -- Voice guidance
  prayer_style TEXT DEFAULT 'contemplative', -- 'contemplative', 'energetic', 'traditional', 'contemporary'
  favorite_saints TEXT, -- JSON array
  favorite_prayers TEXT, -- JSON array
  timezone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Daily content cache (USCCB readings, saint of day)
CREATE TABLE IF NOT EXISTS daily_content (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  reading_type TEXT NOT NULL, -- 'usccb-readings', 'saint-of-day', 'gospel-reflection'
  content TEXT NOT NULL, -- JSON with full content
  source_url TEXT,
  fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_prayer_routines_user_id ON prayer_routines(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_routines_type ON prayer_routines(routine_type);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_date ON daily_checkins(user_id, checkin_date);
CREATE INDEX IF NOT EXISTS idx_prayer_progress_user_date ON prayer_progress(user_id, date);
CREATE INDEX IF NOT EXISTS idx_novena_journeys_user ON novena_journeys(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_sessions_user ON prayer_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_content_date ON daily_content(date);

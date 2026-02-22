-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  module TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content_json JSONB NOT NULL DEFAULT '{}',
  quiz_json JSONB,
  xp_reward INTEGER NOT NULL DEFAULT 50,
  sort_order INTEGER NOT NULL,
  is_free BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  quiz_score INTEGER,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);

-- Lessons are publicly readable
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  USING (true);

-- User progress is per-user
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

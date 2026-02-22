-- Watchlists table
CREATE TABLE IF NOT EXISTS watchlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('forex', 'index', 'crypto', 'commodity')),
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, symbol)
);

CREATE INDEX idx_watchlists_user_id ON watchlists(user_id);

-- RLS
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own watchlist"
  ON watchlists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own watchlist"
  ON watchlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own watchlist"
  ON watchlists FOR DELETE
  USING (auth.uid() = user_id);

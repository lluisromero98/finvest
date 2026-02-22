-- Portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Principal',
  initial_balance DECIMAL(15,2) NOT NULL DEFAULT 100000.00,
  current_balance DECIMAL(15,2) NOT NULL DEFAULT 100000.00,
  currency TEXT NOT NULL DEFAULT 'EUR',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);

-- RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own portfolios"
  ON portfolios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own portfolios"
  ON portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios"
  ON portfolios FOR UPDATE
  USING (auth.uid() = user_id);

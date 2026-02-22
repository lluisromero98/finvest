-- Trades table
CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('forex', 'index', 'crypto', 'commodity')),
  direction TEXT NOT NULL CHECK (direction IN ('long', 'short')),
  entry_price DECIMAL(15,6) NOT NULL,
  exit_price DECIMAL(15,6),
  quantity DECIMAL(15,6) NOT NULL,
  stop_loss DECIMAL(15,6),
  take_profit DECIMAL(15,6),
  leverage INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'cancelled')),
  pnl DECIMAL(15,2),
  pnl_percentage DECIMAL(8,4),
  strategy_tag TEXT,
  notes TEXT,
  opened_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at TIMESTAMPTZ
);

CREATE INDEX idx_trades_user_id ON trades(user_id);
CREATE INDEX idx_trades_status ON trades(user_id, status);
CREATE INDEX idx_trades_portfolio ON trades(portfolio_id);

-- RLS
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trades"
  ON trades FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trades"
  ON trades FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trades"
  ON trades FOR UPDATE
  USING (auth.uid() = user_id);

-- SMC Signals table (populated by AI engine)
CREATE TABLE IF NOT EXISTS smc_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL,
  signal_type TEXT NOT NULL
    CHECK (signal_type IN ('fvg', 'ob', 'bos', 'choch', 'liquidity', 'pdh_pdl', 'ndog', 'nwog')),
  direction TEXT CHECK (direction IN ('bullish', 'bearish')),
  timeframe TEXT NOT NULL,
  price_top DECIMAL(15,6),
  price_bottom DECIMAL(15,6),
  price_level DECIMAL(15,6),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'mitigated', 'expired')),
  metadata JSONB DEFAULT '{}',
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);

CREATE INDEX idx_smc_signals_symbol ON smc_signals(symbol, signal_type);
CREATE INDEX idx_smc_signals_active ON smc_signals(symbol, status) WHERE status = 'active';

-- Daily Bias table
CREATE TABLE IF NOT EXISTS daily_bias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol TEXT NOT NULL,
  date DATE NOT NULL,
  bias TEXT NOT NULL CHECK (bias IN ('bullish', 'bearish', 'neutral')),
  confidence DECIMAL(5,2),
  pdh DECIMAL(15,6),
  pdl DECIMAL(15,6),
  ndog DECIMAL(15,6),
  key_levels JSONB DEFAULT '[]',
  analysis_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(symbol, date)
);

CREATE INDEX idx_daily_bias_lookup ON daily_bias(symbol, date);

-- Public read access for signals and bias
ALTER TABLE smc_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_bias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view SMC signals"
  ON smc_signals FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view daily bias"
  ON daily_bias FOR SELECT
  USING (true);

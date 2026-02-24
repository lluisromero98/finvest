import type { OHLCVData } from "@/components/charts/candlestick-chart";

// Generate realistic OHLCV mock data
export function generateMockOHLCV(
  symbol: string,
  days: number = 120
): OHLCVData[] {
  const data: OHLCVData[] = [];

  const basePrices: Record<string, number> = {
    EURUSD: 1.08,
    GBPUSD: 1.26,
    USDJPY: 149.5,
    USDCHF: 0.88,
    AUDUSD: 0.654,
    NZDUSD: 0.598,
    USDCAD: 1.36,
    EURGBP: 0.856,
    BTCUSD: 95000,
    ETHUSD: 2700,
    SOLUSD: 170,
    XRPUSD: 2.45,
    ADAUSD: 0.72,
    DOTUSD: 7.8,
    SP500: 6000,
    NQ: 19400,
    DJI: 42500,
    DAX: 18700,
    FTSE: 8230,
    XAUUSD: 2900,
    XAGUSD: 32.5,
    USOIL: 72.5,
    AAPL: 228,
    TSLA: 340,
    MSFT: 430,
    AMZN: 205,
    GOOGL: 175,
    NVDA: 135,
    META: 580,
  };

  const volatilities: Record<string, number> = {
    EURUSD: 0.003,
    GBPUSD: 0.004,
    USDJPY: 0.5,
    USDCHF: 0.003,
    AUDUSD: 0.003,
    NZDUSD: 0.003,
    USDCAD: 0.004,
    EURGBP: 0.002,
    BTCUSD: 2000,
    ETHUSD: 80,
    SOLUSD: 8,
    XRPUSD: 0.08,
    ADAUSD: 0.03,
    DOTUSD: 0.3,
    SP500: 30,
    NQ: 100,
    DJI: 200,
    DAX: 80,
    FTSE: 40,
    XAUUSD: 20,
    XAGUSD: 0.5,
    USOIL: 1.5,
    AAPL: 4,
    TSLA: 12,
    MSFT: 6,
    AMZN: 4,
    GOOGL: 3,
    NVDA: 5,
    META: 10,
  };

  let price = basePrices[symbol] ?? 100;
  const vol = volatilities[symbol] ?? price * 0.003;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const trend = (Math.random() - 0.48) * vol * 2;
    const open = price;
    const close = open + trend;
    const highExtra = Math.abs(trend) * (0.5 + Math.random());
    const lowExtra = Math.abs(trend) * (0.5 + Math.random());
    const high = Math.max(open, close) + highExtra;
    const low = Math.min(open, close) - lowExtra;

    const volume = Math.floor(50000 + Math.random() * 150000);

    const isJPY = symbol === "USDJPY";
    const isLargeNum =
      symbol.includes("BTC") ||
      ["SP500", "NQ", "DJI", "DAX", "FTSE", "AAPL", "TSLA", "MSFT", "AMZN", "GOOGL", "NVDA", "META"].includes(symbol);
    const decimals = isJPY ? 3 : isLargeNum ? 2 : 5;

    data.push({
      time: date.toISOString().split("T")[0],
      open: Number(open.toFixed(decimals)),
      high: Number(high.toFixed(decimals)),
      low: Number(low.toFixed(decimals)),
      close: Number(close.toFixed(decimals)),
      volume,
    });

    price = close;
  }

  return data;
}

// Symbol display info
export const symbolInfo: Record<string, { name: string; type: string }> = {
  // Forex
  EURUSD: { name: "EUR/USD", type: "forex" },
  GBPUSD: { name: "GBP/USD", type: "forex" },
  USDJPY: { name: "USD/JPY", type: "forex" },
  USDCHF: { name: "USD/CHF", type: "forex" },
  AUDUSD: { name: "AUD/USD", type: "forex" },
  NZDUSD: { name: "NZD/USD", type: "forex" },
  USDCAD: { name: "USD/CAD", type: "forex" },
  EURGBP: { name: "EUR/GBP", type: "forex" },
  // Crypto
  BTCUSD: { name: "Bitcoin", type: "crypto" },
  ETHUSD: { name: "Ethereum", type: "crypto" },
  SOLUSD: { name: "Solana", type: "crypto" },
  XRPUSD: { name: "Ripple", type: "crypto" },
  ADAUSD: { name: "Cardano", type: "crypto" },
  DOTUSD: { name: "Polkadot", type: "crypto" },
  // Indices
  SP500: { name: "S&P 500", type: "index" },
  NQ: { name: "NASDAQ 100", type: "index" },
  DJI: { name: "Dow Jones", type: "index" },
  DAX: { name: "DAX 40", type: "index" },
  FTSE: { name: "FTSE 100", type: "index" },
  // Commodities
  XAUUSD: { name: "Gold", type: "commodity" },
  XAGUSD: { name: "Silver", type: "commodity" },
  USOIL: { name: "Crude Oil WTI", type: "commodity" },
  // Stocks
  AAPL: { name: "Apple Inc.", type: "stock" },
  TSLA: { name: "Tesla Inc.", type: "stock" },
  MSFT: { name: "Microsoft Corp.", type: "stock" },
  AMZN: { name: "Amazon.com Inc.", type: "stock" },
  GOOGL: { name: "Alphabet Inc.", type: "stock" },
  NVDA: { name: "NVIDIA Corp.", type: "stock" },
  META: { name: "Meta Platforms Inc.", type: "stock" },
};

// Mock search database for when API is not configured
export interface MockSearchResult {
  symbol: string;
  instrument_name: string;
  exchange: string;
  instrument_type: string;
  country: string;
  currency: string;
}

const mockSearchDatabase: MockSearchResult[] = [
  // Forex
  { symbol: "EUR/USD", instrument_name: "Euro / US Dollar", exchange: "Forex", instrument_type: "Physical Currency", country: "", currency: "USD" },
  { symbol: "GBP/USD", instrument_name: "British Pound / US Dollar", exchange: "Forex", instrument_type: "Physical Currency", country: "", currency: "USD" },
  { symbol: "USD/JPY", instrument_name: "US Dollar / Japanese Yen", exchange: "Forex", instrument_type: "Physical Currency", country: "", currency: "JPY" },
  { symbol: "USD/CHF", instrument_name: "US Dollar / Swiss Franc", exchange: "Forex", instrument_type: "Physical Currency", country: "", currency: "CHF" },
  { symbol: "AUD/USD", instrument_name: "Australian Dollar / US Dollar", exchange: "Forex", instrument_type: "Physical Currency", country: "", currency: "USD" },
  { symbol: "NZD/USD", instrument_name: "New Zealand Dollar / US Dollar", exchange: "Forex", instrument_type: "Physical Currency", country: "", currency: "USD" },
  { symbol: "USD/CAD", instrument_name: "US Dollar / Canadian Dollar", exchange: "Forex", instrument_type: "Physical Currency", country: "", currency: "CAD" },
  { symbol: "EUR/GBP", instrument_name: "Euro / British Pound", exchange: "Forex", instrument_type: "Physical Currency", country: "", currency: "GBP" },
  // Crypto
  { symbol: "BTC/USD", instrument_name: "Bitcoin", exchange: "Crypto", instrument_type: "Digital Currency", country: "", currency: "USD" },
  { symbol: "ETH/USD", instrument_name: "Ethereum", exchange: "Crypto", instrument_type: "Digital Currency", country: "", currency: "USD" },
  { symbol: "SOL/USD", instrument_name: "Solana", exchange: "Crypto", instrument_type: "Digital Currency", country: "", currency: "USD" },
  { symbol: "XRP/USD", instrument_name: "Ripple", exchange: "Crypto", instrument_type: "Digital Currency", country: "", currency: "USD" },
  { symbol: "ADA/USD", instrument_name: "Cardano", exchange: "Crypto", instrument_type: "Digital Currency", country: "", currency: "USD" },
  { symbol: "DOT/USD", instrument_name: "Polkadot", exchange: "Crypto", instrument_type: "Digital Currency", country: "", currency: "USD" },
  // Stocks
  { symbol: "AAPL", instrument_name: "Apple Inc", exchange: "NASDAQ", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "TSLA", instrument_name: "Tesla Inc", exchange: "NASDAQ", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "MSFT", instrument_name: "Microsoft Corporation", exchange: "NASDAQ", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "AMZN", instrument_name: "Amazon.com Inc", exchange: "NASDAQ", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "GOOGL", instrument_name: "Alphabet Inc", exchange: "NASDAQ", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "NVDA", instrument_name: "NVIDIA Corporation", exchange: "NASDAQ", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "META", instrument_name: "Meta Platforms Inc", exchange: "NASDAQ", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "NFLX", instrument_name: "Netflix Inc", exchange: "NASDAQ", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "JPM", instrument_name: "JPMorgan Chase & Co", exchange: "NYSE", instrument_type: "Common Stock", country: "US", currency: "USD" },
  { symbol: "V", instrument_name: "Visa Inc", exchange: "NYSE", instrument_type: "Common Stock", country: "US", currency: "USD" },
  // Indices
  { symbol: "SPX", instrument_name: "S&P 500", exchange: "NYSE", instrument_type: "Index", country: "US", currency: "USD" },
  { symbol: "IXIC", instrument_name: "NASDAQ Composite", exchange: "NASDAQ", instrument_type: "Index", country: "US", currency: "USD" },
  { symbol: "DJI", instrument_name: "Dow Jones Industrial Average", exchange: "NYSE", instrument_type: "Index", country: "US", currency: "USD" },
  // Commodities
  { symbol: "XAU/USD", instrument_name: "Gold Spot", exchange: "Commodity", instrument_type: "commodity", country: "", currency: "USD" },
  { symbol: "XAG/USD", instrument_name: "Silver Spot", exchange: "Commodity", instrument_type: "commodity", country: "", currency: "USD" },
  { symbol: "USOIL", instrument_name: "Crude Oil WTI", exchange: "Commodity", instrument_type: "commodity", country: "", currency: "USD" },
  // ETFs
  { symbol: "SPY", instrument_name: "SPDR S&P 500 ETF Trust", exchange: "NYSE", instrument_type: "ETF", country: "US", currency: "USD" },
  { symbol: "QQQ", instrument_name: "Invesco QQQ Trust", exchange: "NASDAQ", instrument_type: "ETF", country: "US", currency: "USD" },
];

export function getMockSearchResults(query: string): MockSearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return mockSearchDatabase.filter(
    (item) =>
      item.symbol.toLowerCase().includes(q) ||
      item.instrument_name.toLowerCase().includes(q) ||
      item.exchange.toLowerCase().includes(q) ||
      item.instrument_type.toLowerCase().includes(q)
  );
}

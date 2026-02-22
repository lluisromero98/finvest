import type { OHLCVData } from "@/components/charts/candlestick-chart";

// Generate realistic OHLCV mock data for EUR/USD
export function generateMockOHLCV(
  symbol: string,
  days: number = 120
): OHLCVData[] {
  const data: OHLCVData[] = [];

  // Base prices for different symbols
  const basePrices: Record<string, number> = {
    EURUSD: 1.08,
    GBPUSD: 1.26,
    USDJPY: 149.5,
    BTCUSD: 95000,
    ETHUSD: 2700,
    SOLUSD: 170,
    "SP500": 6000,
    NQ: 19400,
    XAUUSD: 2900,
  };

  const volatilities: Record<string, number> = {
    EURUSD: 0.003,
    GBPUSD: 0.004,
    USDJPY: 0.5,
    BTCUSD: 2000,
    ETHUSD: 80,
    SOLUSD: 8,
    "SP500": 30,
    NQ: 100,
    XAUUSD: 20,
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

    // Random walk with mean reversion
    const trend = (Math.random() - 0.48) * vol * 2;
    const open = price;
    const close = open + trend;
    const highExtra = Math.abs(trend) * (0.5 + Math.random());
    const lowExtra = Math.abs(trend) * (0.5 + Math.random());
    const high = Math.max(open, close) + highExtra;
    const low = Math.min(open, close) - lowExtra;

    const volume = Math.floor(50000 + Math.random() * 150000);

    data.push({
      time: date.toISOString().split("T")[0],
      open: Number(open.toFixed(symbol === "USDJPY" ? 3 : symbol.includes("BTC") || symbol.includes("SP") || symbol === "NQ" ? 2 : 5)),
      high: Number(high.toFixed(symbol === "USDJPY" ? 3 : symbol.includes("BTC") || symbol.includes("SP") || symbol === "NQ" ? 2 : 5)),
      low: Number(low.toFixed(symbol === "USDJPY" ? 3 : symbol.includes("BTC") || symbol.includes("SP") || symbol === "NQ" ? 2 : 5)),
      close: Number(close.toFixed(symbol === "USDJPY" ? 3 : symbol.includes("BTC") || symbol.includes("SP") || symbol === "NQ" ? 2 : 5)),
      volume,
    });

    price = close;
  }

  return data;
}

// Symbol display info
export const symbolInfo: Record<string, { name: string; type: string }> = {
  EURUSD: { name: "EUR/USD", type: "forex" },
  GBPUSD: { name: "GBP/USD", type: "forex" },
  USDJPY: { name: "USD/JPY", type: "forex" },
  AUDUSD: { name: "AUD/USD", type: "forex" },
  BTCUSD: { name: "BTC/USD", type: "crypto" },
  ETHUSD: { name: "ETH/USD", type: "crypto" },
  SOLUSD: { name: "SOL/USD", type: "crypto" },
  SP500: { name: "S&P 500", type: "index" },
  NQ: { name: "NASDAQ 100", type: "index" },
  XAUUSD: { name: "Gold", type: "commodity" },
};

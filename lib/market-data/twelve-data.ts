import type { OHLCVData } from "@/components/charts/candlestick-chart";

const BASE_URL = "https://api.twelvedata.com";
const API_KEY = process.env.TWELVE_DATA_API_KEY ?? "";

// --- Symbol mapping: internal → Twelve Data format ---
const symbolMap: Record<string, string> = {
  EURUSD: "EUR/USD",
  GBPUSD: "GBP/USD",
  USDJPY: "USD/JPY",
  AUDUSD: "AUD/USD",
  NZDUSD: "NZD/USD",
  USDCAD: "USD/CAD",
  USDCHF: "USD/CHF",
  BTCUSD: "BTC/USD",
  ETHUSD: "ETH/USD",
  SOLUSD: "SOL/USD",
  XRPUSD: "XRP/USD",
  SP500: "SPX",
  NQ: "IXIC",
  XAUUSD: "XAU/USD",
};

// Reverse map: Twelve Data → internal
const reverseSymbolMap: Record<string, string> = Object.fromEntries(
  Object.entries(symbolMap).map(([k, v]) => [v, k])
);

export function toTwelveDataSymbol(internal: string): string {
  return symbolMap[internal] ?? internal;
}

export function toInternalSymbol(tdSymbol: string): string {
  return reverseSymbolMap[tdSymbol] ?? tdSymbol.replace("/", "");
}

// --- Interval mapping ---
const intervalMap: Record<string, string> = {
  "1m": "1min",
  "5m": "5min",
  "15m": "15min",
  "30m": "30min",
  "1h": "1h",
  "4h": "4h",
  "1d": "1day",
  "1w": "1week",
};

export function toTwelveDataInterval(internal: string): string {
  return intervalMap[internal] ?? internal;
}

// --- In-memory cache ---
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

const CACHE_TTL: Record<string, number> = {
  quote: 30 * 1000, // 30 seconds
  time_series_1min: 30 * 1000,
  time_series_5min: 60 * 1000,
  time_series_15min: 2 * 60 * 1000,
  time_series_30min: 5 * 60 * 1000,
  time_series_1h: 10 * 60 * 1000,
  time_series_4h: 30 * 60 * 1000,
  time_series_1day: 5 * 60 * 1000, // 5 min (updates throughout the day)
  time_series_1week: 60 * 60 * 1000, // 1 hour
  search: 24 * 60 * 60 * 1000, // 24 hours
};

function getCacheTTL(type: string, interval?: string): number {
  if (type === "time_series" && interval) {
    return CACHE_TTL[`time_series_${interval}`] ?? 60 * 1000;
  }
  return CACHE_TTL[type] ?? 60 * 1000;
}

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T, ttl: number): void {
  cache.set(key, { data, expiresAt: Date.now() + ttl });

  // Evict old entries if cache grows too large
  if (cache.size > 500) {
    const now = Date.now();
    for (const [k, v] of cache) {
      if (now > v.expiresAt) cache.delete(k);
    }
  }
}

// --- Rate limiter (8 calls/minute) ---
const requestTimestamps: number[] = [];
const MAX_REQUESTS_PER_MINUTE = 8;

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  // Remove timestamps older than 1 minute
  while (requestTimestamps.length > 0 && now - requestTimestamps[0] > 60_000) {
    requestTimestamps.shift();
  }

  if (requestTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
    const waitMs = 60_000 - (now - requestTimestamps[0]) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  requestTimestamps.push(Date.now());
}

// --- API fetch helper ---
async function fetchTwelveData<T>(
  endpoint: string,
  params: Record<string, string>
): Promise<T> {
  if (!API_KEY) {
    throw new Error("TWELVE_DATA_API_KEY is not configured");
  }

  await waitForRateLimit();

  const url = new URL(`${BASE_URL}/${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `apikey ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Twelve Data API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.status === "error") {
    throw new Error(`Twelve Data: ${data.message ?? "Unknown error"}`);
  }

  return data as T;
}

// --- API Types ---
export interface TwelveDataQuote {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  previous_close: string;
  change: string;
  percent_change: string;
  is_market_open: boolean;
  fifty_two_week?: {
    low: string;
    high: string;
    range: string;
  };
}

interface TwelveDataTimeSeries {
  meta: {
    symbol: string;
    interval: string;
    type: string;
  };
  values: Array<{
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }>;
  status: string;
}

export interface TwelveDataSearchResult {
  symbol: string;
  instrument_name: string;
  exchange: string;
  instrument_type: string;
  country: string;
  currency: string;
}

interface TwelveDataSearchResponse {
  data: TwelveDataSearchResult[];
  status: string;
}

// --- Public API ---

export interface QuoteData {
  symbol: string;
  internalSymbol: string;
  name: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  previousClose: number;
  change: number;
  percentChange: number;
  isMarketOpen: boolean;
}

export async function getQuote(internalSymbol: string): Promise<QuoteData> {
  const tdSymbol = toTwelveDataSymbol(internalSymbol);
  const cacheKey = `quote:${tdSymbol}`;

  const cached = getCached<QuoteData>(cacheKey);
  if (cached) return cached;

  const raw = await fetchTwelveData<TwelveDataQuote>("quote", {
    symbol: tdSymbol,
  });

  const result: QuoteData = {
    symbol: tdSymbol,
    internalSymbol,
    name: raw.name,
    price: parseFloat(raw.close),
    open: parseFloat(raw.open),
    high: parseFloat(raw.high),
    low: parseFloat(raw.low),
    close: parseFloat(raw.close),
    volume: parseInt(raw.volume, 10) || 0,
    previousClose: parseFloat(raw.previous_close),
    change: parseFloat(raw.change),
    percentChange: parseFloat(raw.percent_change),
    isMarketOpen: raw.is_market_open,
  };

  setCache(cacheKey, result, getCacheTTL("quote"));
  return result;
}

export async function getMultipleQuotes(
  internalSymbols: string[]
): Promise<QuoteData[]> {
  // Twelve Data supports batch requests with comma-separated symbols
  const tdSymbols = internalSymbols.map(toTwelveDataSymbol);

  // Check which ones we already have cached
  const results: QuoteData[] = [];
  const uncached: { internal: string; td: string }[] = [];

  for (let i = 0; i < internalSymbols.length; i++) {
    const cacheKey = `quote:${tdSymbols[i]}`;
    const cached = getCached<QuoteData>(cacheKey);
    if (cached) {
      results.push(cached);
    } else {
      uncached.push({ internal: internalSymbols[i], td: tdSymbols[i] });
    }
  }

  if (uncached.length === 0) return results;

  // Fetch uncached quotes (batch request)
  const symbolParam = uncached.map((s) => s.td).join(",");
  const raw = await fetchTwelveData<Record<string, TwelveDataQuote> | TwelveDataQuote>(
    "quote",
    { symbol: symbolParam }
  );

  // Single symbol returns object directly, multiple returns keyed object
  if (uncached.length === 1) {
    const quote = raw as TwelveDataQuote;
    const result: QuoteData = {
      symbol: quote.symbol,
      internalSymbol: uncached[0].internal,
      name: quote.name,
      price: parseFloat(quote.close),
      open: parseFloat(quote.open),
      high: parseFloat(quote.high),
      low: parseFloat(quote.low),
      close: parseFloat(quote.close),
      volume: parseInt(quote.volume, 10) || 0,
      previousClose: parseFloat(quote.previous_close),
      change: parseFloat(quote.change),
      percentChange: parseFloat(quote.percent_change),
      isMarketOpen: quote.is_market_open,
    };
    setCache(`quote:${quote.symbol}`, result, getCacheTTL("quote"));
    results.push(result);
  } else {
    const batchData = raw as Record<string, TwelveDataQuote>;
    for (const item of uncached) {
      const quote = batchData[item.td];
      if (!quote || !quote.close) continue;
      const result: QuoteData = {
        symbol: item.td,
        internalSymbol: item.internal,
        name: quote.name,
        price: parseFloat(quote.close),
        open: parseFloat(quote.open),
        high: parseFloat(quote.high),
        low: parseFloat(quote.low),
        close: parseFloat(quote.close),
        volume: parseInt(quote.volume, 10) || 0,
        previousClose: parseFloat(quote.previous_close),
        change: parseFloat(quote.change),
        percentChange: parseFloat(quote.percent_change),
        isMarketOpen: quote.is_market_open,
      };
      setCache(`quote:${item.td}`, result, getCacheTTL("quote"));
      results.push(result);
    }
  }

  return results;
}

export async function getTimeSeries(
  internalSymbol: string,
  interval: string = "1d",
  outputSize: number = 120
): Promise<OHLCVData[]> {
  const tdSymbol = toTwelveDataSymbol(internalSymbol);
  const tdInterval = toTwelveDataInterval(interval);
  const cacheKey = `ts:${tdSymbol}:${tdInterval}:${outputSize}`;

  const cached = getCached<OHLCVData[]>(cacheKey);
  if (cached) return cached;

  const raw = await fetchTwelveData<TwelveDataTimeSeries>("time_series", {
    symbol: tdSymbol,
    interval: tdInterval,
    outputsize: outputSize.toString(),
    format: "JSON",
  });

  if (!raw.values || raw.values.length === 0) {
    return [];
  }

  // Twelve Data returns newest first, we need oldest first
  const data: OHLCVData[] = raw.values
    .reverse()
    .map((v) => ({
      time: v.datetime.includes(" ")
        ? v.datetime // intraday: "2021-09-16 15:59:00"
        : v.datetime, // daily: "2021-09-16"
      open: parseFloat(v.open),
      high: parseFloat(v.high),
      low: parseFloat(v.low),
      close: parseFloat(v.close),
      volume: parseInt(v.volume, 10) || 0,
    }));

  setCache(cacheKey, data, getCacheTTL("time_series", tdInterval));
  return data;
}

export async function searchSymbols(
  query: string,
  limit: number = 20
): Promise<TwelveDataSearchResult[]> {
  const cacheKey = `search:${query.toLowerCase()}`;

  const cached = getCached<TwelveDataSearchResult[]>(cacheKey);
  if (cached) return cached;

  const raw = await fetchTwelveData<TwelveDataSearchResponse>("symbol_search", {
    symbol: query,
    outputsize: limit.toString(),
  });

  const results = raw.data ?? [];
  setCache(cacheKey, results, getCacheTTL("search"));
  return results;
}

// --- Health check ---
export function isConfigured(): boolean {
  return API_KEY.length > 0;
}

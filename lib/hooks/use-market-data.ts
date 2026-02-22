"use client";

import useSWR from "swr";
import type { OHLCVData } from "@/components/charts/candlestick-chart";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Network error" }));
    throw new Error(error.error ?? `HTTP ${res.status}`);
  }
  return res.json();
};

// --- Quote hook ---

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

export function useQuote(symbol: string | null) {
  const { data, error, isLoading, mutate } = useSWR<QuoteData>(
    symbol ? `/api/market/quote?symbol=${encodeURIComponent(symbol)}` : null,
    fetcher,
    {
      refreshInterval: 30_000, // Refresh every 30s
      revalidateOnFocus: true,
      dedupingInterval: 10_000,
    }
  );

  return { quote: data, error, isLoading, refresh: mutate };
}

export function useMultipleQuotes(symbols: string[]) {
  const key = symbols.length > 0
    ? `/api/market/quote?symbol=${symbols.map(encodeURIComponent).join(",")}`
    : null;

  const { data, error, isLoading, mutate } = useSWR<QuoteData[]>(
    key,
    fetcher,
    {
      refreshInterval: 30_000,
      revalidateOnFocus: true,
      dedupingInterval: 10_000,
    }
  );

  return { quotes: data, error, isLoading, refresh: mutate };
}

// --- Time Series hook ---

interface TimeSeriesResponse {
  symbol: string;
  interval: string;
  data: OHLCVData[];
}

export function useTimeSeries(
  symbol: string | null,
  interval: string = "1d",
  outputSize: number = 120
) {
  const { data, error, isLoading, mutate } = useSWR<TimeSeriesResponse>(
    symbol
      ? `/api/market/time-series?symbol=${encodeURIComponent(symbol)}&interval=${interval}&outputsize=${outputSize}`
      : null,
    fetcher,
    {
      refreshInterval: interval === "1d" || interval === "1w" ? 5 * 60_000 : 60_000,
      revalidateOnFocus: false,
      dedupingInterval: 30_000,
    }
  );

  return {
    data: data?.data ?? null,
    error,
    isLoading,
    refresh: mutate,
  };
}

// --- Search hook ---

export interface SearchResult {
  symbol: string;
  instrument_name: string;
  exchange: string;
  instrument_type: string;
  country: string;
  currency: string;
}

interface SearchResponse {
  results: SearchResult[];
}

export function useSymbolSearch(query: string | null) {
  const { data, error, isLoading } = useSWR<SearchResponse>(
    query && query.length >= 1
      ? `/api/market/search?q=${encodeURIComponent(query)}`
      : null,
    fetcher,
    {
      dedupingInterval: 60_000,
      revalidateOnFocus: false,
    }
  );

  return {
    results: data?.results ?? [],
    error,
    isLoading,
  };
}

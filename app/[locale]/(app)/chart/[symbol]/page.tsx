import { setRequestLocale } from "next-intl/server";
import { symbolInfo } from "@/lib/market-data/mock-data";
import { ChartPageClient } from "./chart-client";

function inferAssetType(symbol: string): string {
  const s = symbol.toUpperCase();
  if (s.includes("USD") && s.length === 6 && !s.startsWith("X")) return "forex";
  if (s.startsWith("XAU") || s.startsWith("XAG")) return "commodity";
  if (s.includes("OIL") || s.includes("GAS")) return "commodity";
  if (s.includes("BTC") || s.includes("ETH") || s.includes("SOL") || s.includes("XRP") || s.includes("ADA") || s.includes("DOT")) return "crypto";
  if (s === "SP500" || s === "NQ" || s === "DJI" || s === "DAX" || s === "FTSE" || s === "SPX" || s === "IXIC") return "index";
  if (s === "SPY" || s === "QQQ" || s === "IWM" || s === "DIA") return "etf";
  return "stock";
}

export default async function ChartPage({
  params,
}: {
  params: Promise<{ locale: string; symbol: string }>;
}) {
  const { locale, symbol } = await params;
  setRequestLocale(locale);

  const decodedSymbol = decodeURIComponent(symbol);
  const info = symbolInfo[decodedSymbol];

  return (
    <ChartPageClient
      symbol={decodedSymbol}
      displayName={info?.name ?? decodedSymbol}
      assetType={info?.type ?? inferAssetType(decodedSymbol)}
    />
  );
}

import { setRequestLocale } from "next-intl/server";
import { symbolInfo } from "@/lib/market-data/mock-data";
import { ChartPageClient } from "./chart-client";

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
      assetType={info?.type ?? "forex"}
    />
  );
}

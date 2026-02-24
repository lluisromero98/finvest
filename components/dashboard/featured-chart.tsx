"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { useTimeSeries, useQuote } from "@/lib/hooks/use-market-data";
import { generateMockOHLCV, symbolInfo } from "@/lib/market-data/mock-data";
import { useUserPreferences } from "@/lib/stores/user-preferences";
import {
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  Loader2,
} from "lucide-react";

const CandlestickChart = dynamic(
  () =>
    import("@/components/charts/candlestick-chart").then(
      (mod) => mod.CandlestickChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <Skeleton className="h-[90%] w-[95%] rounded-lg" />
      </div>
    ),
  }
);

const timeframes = [
  { label: "1H", value: "1h" },
  { label: "4H", value: "4h" },
  { label: "1D", value: "1day" },
];

export function FeaturedChart() {
  const { featuredSymbol } = useUserPreferences();
  const [timeframe, setTimeframe] = useState("1day");

  const { data: realData, isLoading } = useTimeSeries(featuredSymbol, timeframe);
  const { quote } = useQuote(featuredSymbol);
  const mockData = useMemo(
    () => generateMockOHLCV(featuredSymbol, 120),
    [featuredSymbol]
  );

  const data = realData && realData.length > 0 ? realData : mockData;
  const usingRealData = realData && realData.length > 0;

  const info = symbolInfo[featuredSymbol];
  const displayName = info?.name ?? featuredSymbol;

  const lastCandle = data[data.length - 1];
  const prevCandle = data[data.length - 2];
  const isUp = quote
    ? quote.percentChange >= 0
    : lastCandle && prevCandle && lastCandle.close >= prevCandle.close;
  const changePercent = quote
    ? quote.percentChange.toFixed(2)
    : lastCandle && prevCandle
      ? (
          ((lastCandle.close - prevCandle.close) / prevCandle.close) *
          100
        ).toFixed(2)
      : "0.00";
  const displayPrice = quote ? quote.price : lastCandle?.close;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{displayName}</CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  {info?.type?.toUpperCase() ?? "ASSET"}
                </Badge>
                {usingRealData ? (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-500 text-[10px]"
                  >
                    LIVE
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-amber-500/30 text-amber-500 text-[10px]"
                  >
                    MOCK
                  </Badge>
                )}
              </div>
              {displayPrice && (
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-xl font-bold font-mono">
                    {typeof displayPrice === "number" && displayPrice > 1000
                      ? displayPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : displayPrice}
                  </span>
                  <div
                    className={`flex items-center gap-0.5 text-sm font-medium ${
                      isUp ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {isUp ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {isUp ? "+" : ""}
                    {changePercent}%
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Timeframe selector */}
            <div className="flex rounded-lg border border-border/50 p-0.5">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                    timeframe === tf.value
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
            <Link href={`/chart/${featuredSymbol}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative h-[250px] p-0 sm:h-[300px]">
        {isLoading && !data.length && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        <CandlestickChart data={data} />
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartControls } from "@/components/charts/chart-controls";
import { generateMockOHLCV } from "@/lib/market-data/mock-data";
import {
  TrendingUp,
  TrendingDown,
  Maximize2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Dynamic import - Lightweight Charts only works in browser
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

interface ChartPageClientProps {
  symbol: string;
  displayName: string;
  assetType: string;
}

export function ChartPageClient({
  symbol,
  displayName,
  assetType,
}: ChartPageClientProps) {
  const t = useTranslations("trading");
  const [timeframe, setTimeframe] = useState("1d");
  const [activeOverlays, setActiveOverlays] = useState<string[]>([
    "pdh_pdl",
    "fvg",
  ]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const data = useMemo(() => generateMockOHLCV(symbol, 120), [symbol]);
  const lastCandle = data[data.length - 1];
  const prevCandle = data[data.length - 2];
  const isUp = lastCandle && prevCandle && lastCandle.close >= prevCandle.close;
  const changePercent =
    lastCandle && prevCandle
      ? (((lastCandle.close - prevCandle.close) / prevCandle.close) * 100).toFixed(2)
      : "0.00";

  function toggleOverlay(overlay: string) {
    setActiveOverlays((prev) =>
      prev.includes(overlay)
        ? prev.filter((o) => o !== overlay)
        : [...prev, overlay]
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : "h-full"}`}>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold sm:text-2xl">{displayName}</h1>
              <Badge variant="outline" className="text-xs">
                {assetType.toUpperCase()}
              </Badge>
            </div>
            {lastCandle && (
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-lg font-bold font-mono">
                  {lastCandle.close}
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
          {/* OHLCV Info */}
          {lastCandle && (
            <div className="hidden items-center gap-3 text-xs text-muted-foreground lg:flex">
              <span>
                O <span className="font-mono text-foreground">{lastCandle.open}</span>
              </span>
              <span>
                H{" "}
                <span className="font-mono text-emerald-500">
                  {lastCandle.high}
                </span>
              </span>
              <span>
                L{" "}
                <span className="font-mono text-red-500">{lastCandle.low}</span>
              </span>
              <span>
                C <span className="font-mono text-foreground">{lastCandle.close}</span>
              </span>
              <span>
                V{" "}
                <span className="font-mono text-foreground">
                  {lastCandle.volume?.toLocaleString()}
                </span>
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Controls */}
      <ChartControls
        activeTimeframe={timeframe}
        onTimeframeChange={setTimeframe}
        activeOverlays={activeOverlays}
        onToggleOverlay={toggleOverlay}
      />

      {/* Chart */}
      <Card className="flex-1 overflow-hidden">
        <CardContent className="h-full min-h-[400px] p-0 sm:min-h-[500px]">
          <CandlestickChart data={data} />
        </CardContent>
      </Card>

      {/* Active Overlays Info */}
      {activeOverlays.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {activeOverlays.includes("pdh_pdl") && (
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 border-t-2 border-dashed border-amber-500" />
              <span>PDH/PDL</span>
            </div>
          )}
          {activeOverlays.includes("fvg") && (
            <div className="flex items-center gap-1">
              <div className="h-3 w-4 rounded-sm bg-emerald-500/20 border border-emerald-500/40" />
              <span>FVG</span>
            </div>
          )}
          {activeOverlays.includes("ob") && (
            <div className="flex items-center gap-1">
              <div className="h-3 w-4 rounded-sm bg-blue-500/20 border border-blue-500/40" />
              <span>Order Blocks</span>
            </div>
          )}
          {activeOverlays.includes("bos") && (
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 border-t-2 border-dashed border-purple-500" />
              <span>BOS</span>
            </div>
          )}
          {activeOverlays.includes("choch") && (
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 border-t-2 border-dotted border-rose-500" />
              <span>ChoCH</span>
            </div>
          )}
          {activeOverlays.includes("liquidity") && (
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 border-t-2 border-dashed border-cyan-500" />
              <span>BSL/SSL</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

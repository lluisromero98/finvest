"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuote } from "@/lib/hooks/use-market-data";
import {
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";

interface StatCardProps {
  label: string;
  symbol: string;
  icon: React.ReactNode;
}

function StatCard({ label, symbol, icon }: StatCardProps) {
  const { quote, isLoading } = useQuote(symbol);

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
              {icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              {isLoading ? (
                <Loader2 className="mt-1 h-4 w-4 animate-spin text-muted-foreground" />
              ) : quote ? (
                <p className="font-mono text-sm font-semibold">
                  {quote.price > 1000
                    ? quote.price.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                    : quote.price.toFixed(2)}
                </p>
              ) : (
                <p className="font-mono text-sm text-muted-foreground">—</p>
              )}
            </div>
          </div>
          {quote && (
            <Badge
              variant="outline"
              className={
                quote.percentChange >= 0
                  ? "border-emerald-500/30 text-emerald-500"
                  : "border-red-500/30 text-red-500"
              }
            >
              <span className="flex items-center gap-0.5 text-[10px]">
                {quote.percentChange >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {quote.percentChange >= 0 ? "+" : ""}
                {quote.percentChange.toFixed(2)}%
              </span>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MarketStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Gold (XAU/USD)"
        symbol="XAUUSD"
        icon={<span className="text-sm">🥇</span>}
      />
      <StatCard
        label="S&P 500"
        symbol="SP500"
        icon={<span className="text-sm">📊</span>}
      />
      <StatCard
        label="Bitcoin"
        symbol="BTCUSD"
        icon={<span className="text-sm">₿</span>}
      />
      <StatCard
        label="EUR/USD"
        symbol="EURUSD"
        icon={<span className="text-sm">💱</span>}
      />
    </div>
  );
}

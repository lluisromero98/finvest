"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  LineChart,
  Brain,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useMultipleQuotes, type QuoteData } from "@/lib/hooks/use-market-data";

const mockMarketData = {
  forex: [
    { symbol: "EUR/USD", name: "Euro / US Dollar", price: "1.0847", change: "+0.12%", up: true },
    { symbol: "GBP/USD", name: "British Pound / US Dollar", price: "1.2634", change: "-0.08%", up: false },
    { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", price: "149.82", change: "-0.31%", up: false },
    { symbol: "AUD/USD", name: "Australian Dollar / US Dollar", price: "0.6543", change: "+0.24%", up: true },
  ],
  indices: [
    { symbol: "S&P 500", name: "Standard & Poor's 500", price: "6,012.45", change: "+0.45%", up: true },
    { symbol: "NASDAQ", name: "Nasdaq Composite", price: "19,478.32", change: "+1.23%", up: true },
    { symbol: "DAX", name: "Deutscher Aktienindex", price: "18,692.10", change: "-0.15%", up: false },
    { symbol: "FTSE 100", name: "Financial Times SE 100", price: "8,234.56", change: "+0.32%", up: true },
  ],
  crypto: [
    { symbol: "BTC/USD", name: "Bitcoin", price: "97,245", change: "+2.34%", up: true },
    { symbol: "ETH/USD", name: "Ethereum", price: "2,731.40", change: "+1.87%", up: true },
    { symbol: "SOL/USD", name: "Solana", price: "178.23", change: "+3.12%", up: true },
    { symbol: "XRP/USD", name: "Ripple", price: "2.45", change: "-0.98%", up: false },
  ],
};

// Symbols to fetch real quotes for
const FOREX_SYMBOLS = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"];
const INDEX_SYMBOLS = ["SP500", "NQ"];
const CRYPTO_SYMBOLS = ["BTCUSD", "ETHUSD", "SOLUSD", "XRPUSD"];
const ALL_SYMBOLS = [...FOREX_SYMBOLS, ...INDEX_SYMBOLS, ...CRYPTO_SYMBOLS];

function quoteToAsset(q: QuoteData): {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  chartSymbol: string;
} {
  const isCrypto = q.internalSymbol.includes("BTC") || q.internalSymbol.includes("ETH") || q.internalSymbol.includes("SOL") || q.internalSymbol.includes("XRP");
  const isIndex = q.internalSymbol === "SP500" || q.internalSymbol === "NQ";
  const decimals = q.internalSymbol === "USDJPY" ? 3 : isCrypto || isIndex ? 2 : 5;

  return {
    symbol: q.symbol.includes("/") ? q.symbol : q.name,
    name: q.name,
    price: isCrypto && q.price > 1000
      ? q.price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      : q.price.toFixed(decimals),
    change: `${q.percentChange >= 0 ? "+" : ""}${q.percentChange.toFixed(2)}%`,
    up: q.percentChange >= 0,
    chartSymbol: q.internalSymbol,
  };
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const tTrading = useTranslations("trading");

  // Fetch real quotes
  const { quotes, isLoading: isLoadingQuotes } = useMultipleQuotes(ALL_SYMBOLS);

  // Build market data from real quotes or fall back to mock
  const realMarketData = quotes
    ? {
        forex: quotes
          .filter((q) => FOREX_SYMBOLS.includes(q.internalSymbol))
          .map(quoteToAsset),
        indices: quotes
          .filter((q) => INDEX_SYMBOLS.includes(q.internalSymbol))
          .map(quoteToAsset),
        crypto: quotes
          .filter((q) => CRYPTO_SYMBOLS.includes(q.internalSymbol))
          .map(quoteToAsset),
      }
    : null;

  const marketData = realMarketData ?? mockMarketData;
  const usingRealData = realMarketData !== null;

  return (
    <div className="space-y-6">
      {/* Welcome + Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("welcome")} 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Smart Money Trading Platform
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/chart/EURUSD">
            <Button variant="outline" size="sm">
              <LineChart className="mr-2 h-4 w-4" />
              Ver gráfico
            </Button>
          </Link>
          <Link href="/simulator">
            <Button
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva Operación
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={tTrading("balance")}
          value="€100,000.00"
          subtitle={tTrading("virtualCapital")}
          icon={<DollarSign className="h-4 w-4" />}
          trend={null}
        />
        <StatsCard
          title="P&L Total"
          value="+€0.00"
          subtitle="+0.00%"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title={tTrading("openPositions")}
          value="0"
          subtitle={tTrading("noPositions")}
          icon={<BarChart3 className="h-4 w-4" />}
          trend={null}
        />
        <StatsCard
          title="Win Rate"
          value="—"
          subtitle="0 trades"
          icon={<TrendingDown className="h-4 w-4" />}
          trend={null}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Market Overview - 2 cols */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>{t("marketOverview")}</CardTitle>
                <div className="flex items-center gap-2">
                  {isLoadingQuotes && (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                  {usingRealData ? (
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 text-[10px]">
                      LIVE
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-amber-500/30 text-amber-500 text-[10px]">
                      MOCK
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="forex">
                <TabsList className="mb-4">
                  <TabsTrigger value="forex">{t("forex")}</TabsTrigger>
                  <TabsTrigger value="indices">{t("indices")}</TabsTrigger>
                  <TabsTrigger value="crypto">{t("crypto")}</TabsTrigger>
                </TabsList>

                {(
                  Object.entries(marketData) as [
                    string,
                    typeof mockMarketData.forex,
                  ][]
                ).map(([key, assets]) => (
                  <TabsContent key={key} value={key} className="space-y-2">
                    {assets.map((asset) => (
                      <Link
                        key={asset.symbol}
                        href={`/chart/${"chartSymbol" in asset ? asset.chartSymbol : asset.symbol.replace("/", "")}`}
                      >
                        <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-all duration-200 hover:border-emerald-500/30 hover:bg-accent/50">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                asset.up
                                  ? "bg-emerald-500/10"
                                  : "bg-red-500/10"
                              }`}
                            >
                              {asset.up ? (
                                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <ArrowDownRight className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{asset.symbol}</p>
                              <p className="text-xs text-muted-foreground">
                                {asset.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-semibold">
                              {asset.price}
                            </p>
                            <Badge
                              variant="outline"
                              className={
                                asset.up
                                  ? "border-emerald-500/30 text-emerald-500"
                                  : "border-red-500/30 text-red-500"
                              }
                            >
                              {asset.change}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Daily BIAS */}
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <CardTitle className="text-base">{t("dailyBias")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">EUR/USD</span>
                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                    Bullish
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>PDH</span>
                    <span className="font-mono">1.0872</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PDL</span>
                    <span className="font-mono">1.0821</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <Brain className="mr-1 inline h-3 w-3" />
                  IA: FVG alcista en 1H + BOS confirmado. Bias bullish con
                  target en PDH.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{t("watchlist")}</CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <Plus className="mr-1 h-3 w-3" />
                  {t("addToWatchlist")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { symbol: "EUR/USD", price: "1.0847", change: "+0.12%", up: true },
                  { symbol: "BTC/USD", price: "97,245", change: "+2.34%", up: true },
                  { symbol: "NQ", price: "19,478", change: "+1.23%", up: true },
                ].map((item) => (
                  <Link
                    key={item.symbol}
                    href={`/chart/${item.symbol.replace("/", "")}`}
                  >
                    <div className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-accent/50">
                      <span className="text-sm font-medium">
                        {item.symbol}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{item.price}</span>
                        <span
                          className={`text-xs ${
                            item.up ? "text-emerald-500" : "text-red-500"
                          }`}
                        >
                          {item.change}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: "up" | "down" | null;
}) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            trend === "up"
              ? "bg-emerald-500/10 text-emerald-500"
              : trend === "down"
                ? "bg-red-500/10 text-red-500"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${
            trend === "up"
              ? "text-emerald-500"
              : trend === "down"
                ? "text-red-500"
                : ""
          }`}
        >
          {value}
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
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
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  LineChart,
  Search,
  Loader2,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useMultipleQuotes, type QuoteData } from "@/lib/hooks/use-market-data";
import { useUserPreferences } from "@/lib/stores/user-preferences";
import { symbolInfo } from "@/lib/market-data/mock-data";
import { FeaturedChart } from "@/components/dashboard/featured-chart";
import { KillZoneClock, KillZoneInline } from "@/components/dashboard/kill-zone-clock";
import { MarketStats } from "@/components/dashboard/market-stats";
import { CommandSearch } from "@/components/search/command-search";

const mockMarketData = {
  forex: [
    { symbol: "EUR/USD", name: "Euro / US Dollar", price: "1.0847", change: "+0.12%", up: true, chartSymbol: "EURUSD" },
    { symbol: "GBP/USD", name: "British Pound / US Dollar", price: "1.2634", change: "-0.08%", up: false, chartSymbol: "GBPUSD" },
    { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", price: "149.82", change: "-0.31%", up: false, chartSymbol: "USDJPY" },
    { symbol: "AUD/USD", name: "Australian Dollar / US Dollar", price: "0.6543", change: "+0.24%", up: true, chartSymbol: "AUDUSD" },
  ],
  indices: [
    { symbol: "S&P 500", name: "Standard & Poor's 500", price: "6,012", change: "+0.45%", up: true, chartSymbol: "SP500" },
    { symbol: "NASDAQ", name: "Nasdaq Composite", price: "19,478", change: "+1.23%", up: true, chartSymbol: "NQ" },
  ],
  crypto: [
    { symbol: "BTC/USD", name: "Bitcoin", price: "97,245", change: "+2.34%", up: true, chartSymbol: "BTCUSD" },
    { symbol: "ETH/USD", name: "Ethereum", price: "2,731", change: "+1.87%", up: true, chartSymbol: "ETHUSD" },
    { symbol: "SOL/USD", name: "Solana", price: "178.23", change: "+3.12%", up: true, chartSymbol: "SOLUSD" },
  ],
  commodities: [
    { symbol: "XAU/USD", name: "Gold", price: "2,912", change: "+0.56%", up: true, chartSymbol: "XAUUSD" },
    { symbol: "XAG/USD", name: "Silver", price: "32.50", change: "+0.82%", up: true, chartSymbol: "XAGUSD" },
    { symbol: "Oil WTI", name: "Crude Oil", price: "72.50", change: "-1.20%", up: false, chartSymbol: "USOIL" },
  ],
};

const FOREX_SYMBOLS = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"];
const INDEX_SYMBOLS = ["SP500", "NQ"];
const CRYPTO_SYMBOLS = ["BTCUSD", "ETHUSD", "SOLUSD"];
const COMMODITY_SYMBOLS = ["XAUUSD", "XAGUSD"];
const ALL_SYMBOLS = [...FOREX_SYMBOLS, ...INDEX_SYMBOLS, ...CRYPTO_SYMBOLS, ...COMMODITY_SYMBOLS];

function quoteToAsset(q: QuoteData): {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  chartSymbol: string;
} {
  const isCrypto =
    q.internalSymbol.includes("BTC") ||
    q.internalSymbol.includes("ETH") ||
    q.internalSymbol.includes("SOL") ||
    q.internalSymbol.includes("XRP");
  const isIndex = q.internalSymbol === "SP500" || q.internalSymbol === "NQ";
  const decimals =
    q.internalSymbol === "USDJPY" ? 3 : isCrypto || isIndex ? 2 : 5;

  return {
    symbol: q.symbol.includes("/") ? q.symbol : q.name,
    name: q.name,
    price:
      (isCrypto || isIndex) && q.price > 1000
        ? q.price.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        : q.price.toFixed(decimals),
    change: `${q.percentChange >= 0 ? "+" : ""}${q.percentChange.toFixed(2)}%`,
    up: q.percentChange >= 0,
    chartSymbol: q.internalSymbol,
  };
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const [searchOpen, setSearchOpen] = useState(false);
  const { watchlist, removeFromWatchlist } = useUserPreferences();

  const { quotes, isLoading: isLoadingQuotes } = useMultipleQuotes(ALL_SYMBOLS);
  const { quotes: watchlistQuotes } = useMultipleQuotes(watchlist);

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
        commodities: quotes
          .filter((q) => COMMODITY_SYMBOLS.includes(q.internalSymbol))
          .map(quoteToAsset),
      }
    : null;

  const marketData = realMarketData ?? mockMarketData;
  const usingRealData = realMarketData !== null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {t("welcome")}
            </h1>
            <p className="text-sm text-muted-foreground">
              Smart Money Trading Platform
            </p>
          </div>
          <div className="hidden sm:block">
            <KillZoneInline />
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/chart/EURUSD">
            <Button variant="outline" size="sm">
              <LineChart className="mr-2 h-4 w-4" />
              {tCommon("openChart")}
            </Button>
          </Link>
          <Button
            size="sm"
            className="bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            {tCommon("searchAsset")}
          </Button>
        </div>
      </div>

      {/* Featured Chart */}
      <FeaturedChart />

      {/* Market Stats */}
      <MarketStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Market Overview */}
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
                  <TabsTrigger value="commodities">{t("commodities")}</TabsTrigger>
                </TabsList>

                {(
                  Object.entries(marketData) as [
                    string,
                    typeof mockMarketData.forex,
                  ][]
                ).map(([key, assets]) => (
                  <TabsContent key={key} value={key} className="space-y-2">
                    {assets.map((asset) => (
                      <Link key={asset.symbol} href={`/chart/${asset.chartSymbol}`}>
                        <div className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-all duration-200 hover:border-emerald-500/30 hover:bg-accent/50">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                asset.up ? "bg-emerald-500/10" : "bg-red-500/10"
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
                              <p className="text-xs text-muted-foreground">{asset.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-semibold">{asset.price}</p>
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
          <KillZoneClock />

          {/* Watchlist */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{t("watchlist")}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setSearchOpen(true)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  {t("addToWatchlist")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {watchlist.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("noWatchlist")}</p>
              ) : (
                <div className="space-y-2">
                  {watchlist.map((sym) => {
                    const si = symbolInfo[sym];
                    const wq = watchlistQuotes?.find((q) => q.internalSymbol === sym);
                    return (
                      <div
                        key={sym}
                        className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-accent/50"
                      >
                        <Link href={`/chart/${sym}`} className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium">{si?.name ?? sym}</span>
                              <span className="ml-2 text-[10px] text-muted-foreground">
                                {si?.type?.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {wq ? (
                                <>
                                  <span className="font-mono text-sm">
                                    {wq.price > 1000
                                      ? wq.price.toLocaleString("en-US", { maximumFractionDigits: 0 })
                                      : wq.price.toFixed(sym === "USDJPY" ? 3 : 2)}
                                  </span>
                                  <span
                                    className={`text-xs ${
                                      wq.percentChange >= 0 ? "text-emerald-500" : "text-red-500"
                                    }`}
                                  >
                                    {wq.percentChange >= 0 ? "+" : ""}
                                    {wq.percentChange.toFixed(2)}%
                                  </span>
                                </>
                              ) : (
                                <span className="font-mono text-sm text-muted-foreground">—</span>
                              )}
                            </div>
                          </div>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-6 w-6 text-muted-foreground hover:text-red-500"
                          onClick={() => removeFromWatchlist(sym)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

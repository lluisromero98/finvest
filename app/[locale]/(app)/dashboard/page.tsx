import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("dashboard");
  const tTrading = useTranslations("trading");

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">{t("welcome")} 👋</h1>
        <p className="text-muted-foreground">
          Smart Money Trading Platform
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {tTrading("balance")}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€100,000.00</div>
            <p className="text-xs text-muted-foreground">
              {tTrading("virtualCapital")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              P&L
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">+€0.00</div>
            <p className="text-xs text-muted-foreground">+0.00%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {tTrading("openPositions")}
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              {tTrading("noPositions")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Win Rate
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">
              0 trades
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Market Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("marketOverview")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Sample market data - will be replaced with real API data */}
                {[
                  { symbol: "EUR/USD", price: "1.0847", change: "+0.12%", up: true },
                  { symbol: "GBP/USD", price: "1.2634", change: "-0.08%", up: false },
                  { symbol: "BTC/USD", price: "97,245", change: "+2.34%", up: true },
                  { symbol: "ETH/USD", price: "2,731", change: "+1.87%", up: true },
                  { symbol: "S&P 500", price: "6,012", change: "+0.45%", up: true },
                  { symbol: "NASDAQ", price: "19,478", change: "-0.23%", up: false },
                ].map((asset) => (
                  <div
                    key={asset.symbol}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-colors hover:bg-accent/50 cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{asset.symbol}</p>
                      <p className="text-lg font-bold">{asset.price}</p>
                    </div>
                    <Badge
                      variant={asset.up ? "default" : "destructive"}
                      className={
                        asset.up
                          ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                          : ""
                      }
                    >
                      {asset.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Watchlist */}
        <Card>
          <CardHeader>
            <CardTitle>{t("watchlist")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("noWatchlist")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

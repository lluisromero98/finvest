import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t("totalPnl"), value: "€0.00" },
          { label: t("winRate"), value: "—" },
          { label: t("profitFactor"), value: "—" },
          { label: t("maxDrawdown"), value: "—" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trade History */}
      <Card>
        <CardHeader>
          <CardTitle>{t("tradeHistory")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{t("noTrades")}</p>
        </CardContent>
      </Card>
    </div>
  );
}

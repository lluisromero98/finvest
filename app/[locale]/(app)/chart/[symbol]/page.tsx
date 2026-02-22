import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ChartPage({
  params,
}: {
  params: Promise<{ locale: string; symbol: string }>;
}) {
  const { locale, symbol } = await params;
  setRequestLocale(locale);

  const decodedSymbol = decodeURIComponent(symbol);

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{decodedSymbol}</h1>
          <Badge variant="outline">1H</Badge>
        </div>
      </div>

      {/* Chart Area - Placeholder */}
      <Card className="flex-1">
        <CardContent className="flex h-full min-h-[500px] items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium">Gráfico {decodedSymbol}</p>
            <p className="text-sm">Lightweight Charts s&apos;integrarà a la Setmana 3</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

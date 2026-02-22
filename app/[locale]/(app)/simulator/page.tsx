import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SimulatorPage() {
  const t = useTranslations("trading");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{useTranslations("nav")("simulator")}</h1>
        <p className="text-muted-foreground">
          {t("virtualCapital")}: €100,000.00
        </p>
      </div>

      <Card>
        <CardContent className="flex min-h-[400px] items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium">Simulador de Trading</p>
            <p className="text-sm">S&apos;implementarà a la Setmana 5</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export default function AcademyPage() {
  const t = useTranslations("academy");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Levels */}
      {[
        {
          level: t("beginner"),
          lessons: [
            "Qué es Forex?",
            "Tipos de Brokers",
            "Spread, Swap, Apalancamiento",
            "CFDs, ETFs, Futuros",
            "Velas Japonesas",
          ],
          unlocked: true,
        },
        {
          level: t("intermediate"),
          lessons: [
            "Smart Money Concepts",
            "Order Blocks",
            "Fair Value Gaps",
            "Break of Structure",
          ],
          unlocked: false,
        },
        {
          level: t("advanced"),
          lessons: ["MSS vs CISD", "BIAS Diario", "Elliott Waves"],
          unlocked: false,
        },
        {
          level: t("expert"),
          lessons: ["Modelo Unicorn ICT", "Wyckoff", "Calendario Económico"],
          unlocked: false,
        },
      ].map((section) => (
        <div key={section.level}>
          <h2 className="mb-3 text-lg font-semibold">{section.level}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.lessons.map((lesson) => (
              <Card
                key={lesson}
                className={
                  section.unlocked
                    ? "cursor-pointer transition-colors hover:border-emerald-500/30"
                    : "opacity-50"
                }
              >
                <CardContent className="flex items-center justify-between pt-6">
                  <div>
                    <p className="font-medium">{lesson}</p>
                    <p className="text-xs text-muted-foreground">+50 XP</p>
                  </div>
                  {!section.unlocked && (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

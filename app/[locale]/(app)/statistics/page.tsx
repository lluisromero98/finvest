"use client";

import { useTranslations } from "next-intl";
import { PositionCalculator } from "@/components/tools/position-calculator";
import { RRCalculator } from "@/components/tools/rr-calculator";
import { KillZoneClockFull } from "@/components/tools/kill-zone-clock-full";
import { StatisticsReference } from "@/components/tools/statistics-reference";

export default function StatisticsPage() {
  const t = useTranslations("statistics");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <PositionCalculator />
          <RRCalculator />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <KillZoneClockFull />
          <StatisticsReference />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { academyModules } from "@/lib/academy/content";
import { useUserPreferences } from "@/lib/stores/user-preferences";
import { ModuleCard } from "@/components/academy/module-card";
import { ProgressTracker } from "@/components/academy/progress-tracker";

export default function AcademyPage() {
  const t = useTranslations("academy");
  const locale = useLocale();
  const { completedLessons } = useUserPreferences();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <ProgressTracker />

      <div className="grid gap-4 sm:grid-cols-2">
        {academyModules.map((mod) => {
          const completedCount = mod.lessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;
          return (
            <ModuleCard
              key={mod.id}
              module={mod}
              locale={locale}
              completedCount={completedCount}
              totalCount={mod.lessons.length}
            />
          );
        })}
      </div>
    </div>
  );
}

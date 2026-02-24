"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getModule } from "@/lib/academy/content";
import { useUserPreferences } from "@/lib/stores/user-preferences";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";

export default function ModulePage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("academy");
  const loc = locale as "es" | "en" | "ca";
  const moduleId = params.module as string;
  const mod = getModule(moduleId);
  const { completedLessons } = useUserPreferences();

  if (!mod) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Module not found</p>
      </div>
    );
  }

  const completedCount = mod.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const progress = mod.lessons.length > 0 ? (completedCount / mod.lessons.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link href="/academy">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("title")}
        </Button>
      </Link>

      {/* Module header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {mod.title[loc]}
          </h1>
          <Badge variant="outline" className="text-xs">
            {mod.lessons.length} lessons
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{mod.description[loc]}</p>
        <div className="flex items-center gap-2 pt-1">
          <Progress value={progress} className="h-2 max-w-xs" />
          <span className="text-xs text-muted-foreground">
            {completedCount}/{mod.lessons.length}
          </span>
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {mod.lessons.map((lesson, i) => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <Link key={lesson.id} href={`/academy/${moduleId}/${lesson.id}`}>
              <Card className="transition-all duration-200 hover:shadow-md hover:border-emerald-500/30 cursor-pointer">
                <CardContent className="flex items-center gap-4 p-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                      isCompleted
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{lesson.title[loc]}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {lesson.description[loc]}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

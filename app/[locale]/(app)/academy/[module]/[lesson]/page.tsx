"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getModule, getLesson } from "@/lib/academy/content";
import { LessonRenderer } from "@/components/academy/lesson-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LessonPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("academy");
  const tCommon = useTranslations("common");
  const loc = locale as "es" | "en" | "ca";

  const moduleId = params.module as string;
  const lessonId = params.lesson as string;

  const mod = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);

  if (!mod || !lesson) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  // Find prev/next lessons
  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < mod.lessons.length - 1
      ? mod.lessons[lessonIndex + 1]
      : null;

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href={`/academy/${moduleId}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {mod.title[loc]}
          </Button>
        </Link>
        <Badge variant="outline" className="text-xs">
          {lessonIndex + 1} / {mod.lessons.length}
        </Badge>
      </div>

      {/* Lesson title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {lesson.title[loc]}
        </h1>
        <p className="text-sm text-muted-foreground">
          {lesson.description[loc]}
        </p>
      </div>

      {/* Lesson content */}
      <LessonRenderer lesson={lesson} locale={locale} />

      {/* Prev/Next navigation */}
      <div className="flex items-center justify-between border-t border-border/40 pt-4">
        {prevLesson ? (
          <Link href={`/academy/${moduleId}/${prevLesson.id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {tCommon("previous")}
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link href={`/academy/${moduleId}/${nextLesson.id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              {tCommon("next")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Link href="/academy">
            <Button variant="outline" size="sm" className="gap-2">
              {tCommon("back")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

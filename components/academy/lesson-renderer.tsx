"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/lib/stores/user-preferences";
import {
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Lightbulb,
} from "lucide-react";
import type { Lesson } from "@/lib/academy/types";

interface LessonRendererProps {
  lesson: Lesson;
  locale: string;
}

export function LessonRenderer({ lesson, locale }: LessonRendererProps) {
  const loc = locale as "es" | "en" | "ca";
  const { completedLessons, markLessonComplete } = useUserPreferences();
  const isCompleted = completedLessons.includes(lesson.id);

  return (
    <div className="space-y-6">
      {/* Sections */}
      {lesson.sections.map((section, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{section.title[loc]}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {section.content[loc]}
            </p>
          </CardContent>
        </Card>
      ))}

      {/* Key Takeaways */}
      <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <CardTitle className="text-base">
              {loc === "es"
                ? "Puntos Clave"
                : loc === "ca"
                  ? "Punts Clau"
                  : "Key Takeaways"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {lesson.keyTakeaways[loc].map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* When to Buy / Sell */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Buy */}
        <Card className="border-emerald-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-emerald-500" />
              <CardTitle className="text-base text-emerald-500">
                {loc === "es"
                  ? "Cuándo COMPRAR"
                  : loc === "ca"
                    ? "Quan COMPRAR"
                    : "When to BUY"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.whenToBuy[loc].map((condition, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Sell */}
        <Card className="border-red-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4 text-red-500" />
              <CardTitle className="text-base text-red-500">
                {loc === "es"
                  ? "Cuándo VENDER"
                  : loc === "ca"
                    ? "Quan VENDRE"
                    : "When to SELL"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.whenToSell[loc].map((condition, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Complete button */}
      <div className="flex justify-center">
        {isCompleted ? (
          <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-4 py-2 text-sm">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {loc === "es"
              ? "Lección completada"
              : loc === "ca"
                ? "Lliçó completada"
                : "Lesson completed"}
          </Badge>
        ) : (
          <Button
            className="bg-emerald-600 text-white hover:bg-emerald-700 px-6"
            onClick={() => markLessonComplete(lesson.id)}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {loc === "es"
              ? "Completar lección"
              : loc === "ca"
                ? "Completar lliçó"
                : "Complete lesson"}
          </Button>
        )}
      </div>
    </div>
  );
}

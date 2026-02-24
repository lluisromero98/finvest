"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserPreferences } from "@/lib/stores/user-preferences";
import { getTotalLessonCount } from "@/lib/academy/content";
import { GraduationCap, Trophy } from "lucide-react";

export function ProgressTracker() {
  const { completedLessons } = useUserPreferences();
  const total = getTotalLessonCount();
  const completed = completedLessons.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
            {progress >= 100 ? (
              <Trophy className="h-6 w-6 text-amber-500" />
            ) : (
              <GraduationCap className="h-6 w-6 text-emerald-500" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">
                {progress >= 100 ? "Course Completed!" : "Your Progress"}
              </p>
              <span className="text-sm font-mono font-semibold text-emerald-500">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completed} / {total} lessons completed
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

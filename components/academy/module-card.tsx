"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  Layers,
  Droplets,
  Clock,
  Target,
  Shield,
  TrendingUp,
} from "lucide-react";
import type { Module } from "@/lib/academy/types";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Layers,
  Droplets,
  Clock,
  Target,
  Shield,
  TrendingUp,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/30" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/30" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "border-cyan-500/30" },
  green: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/30" },
  red: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/30" },
};

interface ModuleCardProps {
  module: Module;
  locale: string;
  completedCount: number;
  totalCount: number;
}

export function ModuleCard({ module, locale, completedCount, totalCount }: ModuleCardProps) {
  const Icon = iconMap[module.icon] ?? BookOpen;
  const colors = colorMap[module.color] ?? colorMap.emerald;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const loc = locale as "es" | "en" | "ca";

  return (
    <Link href={`/academy/${module.id}`}>
      <Card className={`transition-all duration-200 hover:shadow-md hover:${colors.border} cursor-pointer`}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}>
              <Icon className={`h-6 w-6 ${colors.text}`} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{module.title[loc]}</h3>
                <Badge variant="outline" className={`text-[10px] ${colors.border} ${colors.text}`}>
                  {module.lessons.length} lessons
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {module.description[loc]}
              </p>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-1.5 flex-1" />
                <span className="text-[10px] text-muted-foreground">
                  {completedCount}/{totalCount}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

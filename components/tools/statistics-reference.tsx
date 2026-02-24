"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface Metric {
  name: string;
  formula: string;
  description: string;
  target: string;
  color: string;
}

const metrics: Metric[] = [
  {
    name: "Win Rate",
    formula: "Wins / Total Trades × 100",
    description: "Percentage of profitable trades out of total trades taken.",
    target: "> 40% (with good R:R)",
    color: "text-emerald-500",
  },
  {
    name: "Profit Factor",
    formula: "Gross Profit / Gross Loss",
    description: "Total gains divided by total losses. Above 1 means net profitable.",
    target: "> 1.5",
    color: "text-blue-500",
  },
  {
    name: "Max Drawdown",
    formula: "(Peak - Trough) / Peak × 100",
    description: "Largest peak-to-trough decline in account equity.",
    target: "< 10%",
    color: "text-red-500",
  },
  {
    name: "Sharpe Ratio",
    formula: "(Rp - Rf) / σp",
    description: "Risk-adjusted return. Measures excess return per unit of risk.",
    target: "> 1.0",
    color: "text-purple-500",
  },
  {
    name: "Expectancy",
    formula: "(Win% × Avg Win) - (Loss% × Avg Loss)",
    description: "Average amount expected to win or lose per trade.",
    target: "> 0 (positive)",
    color: "text-amber-500",
  },
  {
    name: "Risk:Reward",
    formula: "Potential Reward / Potential Risk",
    description: "Ratio comparing potential profit to potential loss per trade.",
    target: "> 1:2",
    color: "text-cyan-500",
  },
];

const ictLevels = [
  { name: "PDH", desc: "Previous Day High", color: "bg-emerald-500" },
  { name: "PDL", desc: "Previous Day Low", color: "bg-red-500" },
  { name: "PWH", desc: "Previous Week High", color: "bg-emerald-500" },
  { name: "PWL", desc: "Previous Week Low", color: "bg-red-500" },
  { name: "PMH", desc: "Previous Month High", color: "bg-emerald-500" },
  { name: "PML", desc: "Previous Month Low", color: "bg-red-500" },
];

export function StatisticsReference() {
  return (
    <div className="space-y-6">
      {/* Metrics Reference */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-cyan-500" />
            <CardTitle className="text-base">Metrics Reference</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics.map((m) => (
            <div
              key={m.name}
              className="space-y-1 rounded-lg border border-border/50 p-3"
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${m.color}`}>{m.name}</span>
                <Badge variant="outline" className="text-[10px]">
                  {m.target}
                </Badge>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                {m.formula}
              </p>
              <p className="text-xs text-muted-foreground">{m.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ICT Key Levels */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">ICT Key Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {ictLevels.map((level) => (
              <div
                key={level.name}
                className="flex items-center gap-2 rounded-lg border border-border/50 p-2"
              >
                <div className={`h-2 w-2 rounded-full ${level.color}`} />
                <div>
                  <span className="text-xs font-semibold">{level.name}</span>
                  <span className="ml-1.5 text-[10px] text-muted-foreground">
                    {level.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

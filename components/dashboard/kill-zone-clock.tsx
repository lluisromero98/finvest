"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface KillZone {
  name: string;
  startUTC: number;
  endUTC: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

const killZones: KillZone[] = [
  {
    name: "Asian",
    startUTC: 0, // 00:00 UTC (7PM EST)
    endUTC: 3,   // 03:00 UTC (10PM EST)
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    name: "London",
    startUTC: 7,  // 07:00 UTC (2AM EST)
    endUTC: 10,   // 10:00 UTC (5AM EST)
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
  {
    name: "NY AM",
    startUTC: 12, // 12:00 UTC (7AM EST)
    endUTC: 15,   // 15:00 UTC (10AM EST)
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    name: "NY PM",
    startUTC: 18, // 18:00 UTC (1:30PM EST approx)
    endUTC: 21,   // 21:00 UTC (4PM EST)
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
];

function getActiveKillZone(utcHour: number): KillZone | null {
  return killZones.find(
    (kz) => utcHour >= kz.startUTC && utcHour < kz.endUTC
  ) ?? null;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatUTCTime(date: Date): string {
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
}

export function KillZoneClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const utcHour = now.getUTCHours();
  const activeZone = getActiveKillZone(utcHour);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">Kill Zones</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current time */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">UTC</span>
          <span className="font-mono font-semibold">{formatUTCTime(now)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Local</span>
          <span className="font-mono font-semibold">{formatTime(now)}</span>
        </div>

        {/* Active session badge */}
        {activeZone ? (
          <div className={`rounded-lg border p-2 text-center ${activeZone.bgColor} ${activeZone.borderColor}`}>
            <span className={`text-sm font-semibold ${activeZone.color}`}>
              {activeZone.name} Session
            </span>
          </div>
        ) : (
          <div className="rounded-lg border border-border/50 bg-muted/30 p-2 text-center">
            <span className="text-sm text-muted-foreground">No Active Session</span>
          </div>
        )}

        {/* Timeline bar */}
        <div className="relative h-6 w-full overflow-hidden rounded-full bg-muted/50">
          {killZones.map((kz) => {
            const left = (kz.startUTC / 24) * 100;
            const width = ((kz.endUTC - kz.startUTC) / 24) * 100;
            const isActive = activeZone?.name === kz.name;
            return (
              <div
                key={kz.name}
                className={`absolute top-0 h-full transition-opacity ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor:
                    kz.name === "Asian"
                      ? "#3b82f6"
                      : kz.name === "London"
                        ? "#f59e0b"
                        : kz.name === "NY AM"
                          ? "#10b981"
                          : "#8b5cf6",
                }}
              />
            );
          })}
          {/* Current time marker */}
          <div
            className="absolute top-0 h-full w-0.5 bg-white shadow-sm"
            style={{ left: `${(utcHour / 24) * 100}%` }}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          {killZones.map((kz) => (
            <div key={kz.name} className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    kz.name === "Asian"
                      ? "#3b82f6"
                      : kz.name === "London"
                        ? "#f59e0b"
                        : kz.name === "NY AM"
                          ? "#10b981"
                          : "#8b5cf6",
                }}
              />
              <span className="text-muted-foreground">
                {kz.name} ({kz.startUTC}:00-{kz.endUTC}:00)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Compact inline version for dashboard header
export function KillZoneInline() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const utcHour = now.getUTCHours();
  const activeZone = getActiveKillZone(utcHour);

  if (!activeZone) {
    return (
      <Badge variant="outline" className="gap-1 border-border/50 text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span className="text-[10px]">{formatUTCTime(now)} UTC</span>
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={`gap-1 ${activeZone.borderColor} ${activeZone.color}`}>
      <div
        className="h-1.5 w-1.5 rounded-full animate-pulse"
        style={{
          backgroundColor:
            activeZone.name === "Asian"
              ? "#3b82f6"
              : activeZone.name === "London"
                ? "#f59e0b"
                : activeZone.name === "NY AM"
                  ? "#10b981"
                  : "#8b5cf6",
        }}
      />
      <span className="text-[10px]">{activeZone.name}</span>
      <span className="text-[10px] text-muted-foreground">{formatUTCTime(now)} UTC</span>
    </Badge>
  );
}

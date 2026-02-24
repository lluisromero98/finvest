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
  description: string;
}

const killZones: KillZone[] = [
  {
    name: "Asian",
    startUTC: 0,
    endUTC: 3,
    color: "#3b82f6",
    bgColor: "bg-blue-500/10",
    description: "Lowest volatility. Range-bound markets. Good for identifying key levels for London session.",
  },
  {
    name: "London",
    startUTC: 7,
    endUTC: 10,
    color: "#f59e0b",
    bgColor: "bg-amber-500/10",
    description: "Highest volatility for EUR pairs. Often sweeps Asian session highs/lows. Best session for FX.",
  },
  {
    name: "NY AM",
    startUTC: 12,
    endUTC: 15,
    color: "#10b981",
    bgColor: "bg-emerald-500/10",
    description: "Overlaps with London close. Major news releases. High liquidity for USD pairs and indices.",
  },
  {
    name: "NY PM",
    startUTC: 18,
    endUTC: 21,
    color: "#8b5cf6",
    bgColor: "bg-purple-500/10",
    description: "Lower volatility. Often retraces NY AM moves. Good for position management.",
  },
];

const silverBullet = {
  name: "Silver Bullet",
  windows: [
    { name: "London SB", startUTC: 10, endUTC: 11 },
    { name: "NY AM SB", startUTC: 14, endUTC: 15 },
    { name: "NY PM SB", startUTC: 20, endUTC: 21 },
  ],
};

export function KillZoneClockFull() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();
  const activeZone = killZones.find(
    (kz) => utcHour >= kz.startUTC && utcHour < kz.endUTC
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-emerald-500" />
          <CardTitle className="text-base">Kill Zones Clock</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current time display */}
        <div className="flex items-center justify-center gap-6 rounded-lg border border-border/50 bg-muted/30 p-4">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">UTC</p>
            <p className="font-mono text-2xl font-bold">
              {String(utcHour).padStart(2, "0")}:{String(utcMinute).padStart(2, "0")}
            </p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">LOCAL</p>
            <p className="font-mono text-2xl font-bold">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
            </p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">SESSION</p>
            {activeZone ? (
              <p className="text-lg font-bold" style={{ color: activeZone.color }}>
                {activeZone.name}
              </p>
            ) : (
              <p className="text-lg font-bold text-muted-foreground">Closed</p>
            )}
          </div>
        </div>

        {/* 24h Timeline */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">24h Timeline (UTC)</p>
          <div className="relative h-8 w-full overflow-hidden rounded-lg bg-muted/50">
            {killZones.map((kz) => {
              const left = (kz.startUTC / 24) * 100;
              const width = ((kz.endUTC - kz.startUTC) / 24) * 100;
              const isActive = activeZone?.name === kz.name;
              return (
                <div
                  key={kz.name}
                  className={`absolute top-0 h-full flex items-center justify-center transition-opacity ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundColor: kz.color,
                  }}
                >
                  <span className="text-[9px] font-semibold text-white">{kz.name}</span>
                </div>
              );
            })}
            {/* Current time marker */}
            <div
              className="absolute top-0 h-full w-0.5 bg-white shadow-md z-10"
              style={{ left: `${((utcHour + utcMinute / 60) / 24) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Kill Zone details */}
        <div className="space-y-3">
          {killZones.map((kz) => {
            const isActive = activeZone?.name === kz.name;
            return (
              <div
                key={kz.name}
                className={`rounded-lg border p-3 transition-all ${
                  isActive
                    ? `${kz.bgColor} border-current`
                    : "border-border/50"
                }`}
                style={isActive ? { borderColor: kz.color + "40" } : {}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: kz.color }}
                    />
                    <span className="text-sm font-semibold" style={isActive ? { color: kz.color } : {}}>
                      {kz.name} Kill Zone
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(kz.startUTC).padStart(2, "0")}:00 - {String(kz.endUTC).padStart(2, "0")}:00 UTC
                    </span>
                    {isActive && (
                      <Badge variant="outline" className="text-[10px] animate-pulse" style={{ borderColor: kz.color + "50", color: kz.color }}>
                        ACTIVE
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {kz.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Silver Bullet Windows */}
        <div className="rounded-lg border border-border/50 p-3">
          <p className="text-sm font-semibold text-muted-foreground">
            Silver Bullet Windows
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ICT Silver Bullet: High-probability 1-hour windows for entries.
          </p>
          <div className="mt-2 space-y-1">
            {silverBullet.windows.map((w) => {
              const isActive = utcHour >= w.startUTC && utcHour < w.endUTC;
              return (
                <div
                  key={w.name}
                  className={`flex items-center justify-between rounded-md p-1.5 text-xs ${
                    isActive ? "bg-amber-500/10" : ""
                  }`}
                >
                  <span className={isActive ? "font-semibold text-amber-500" : "text-muted-foreground"}>
                    {w.name}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {String(w.startUTC).padStart(2, "0")}:00 - {String(w.endUTC).padStart(2, "0")}:00 UTC
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

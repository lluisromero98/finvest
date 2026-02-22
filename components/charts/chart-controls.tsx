"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ChartControlsProps {
  activeTimeframe: string;
  onTimeframeChange: (tf: string) => void;
  activeOverlays: string[];
  onToggleOverlay: (overlay: string) => void;
}

const timeframes = [
  { value: "1m", label: "1M" },
  { value: "5m", label: "5M" },
  { value: "15m", label: "15M" },
  { value: "30m", label: "30M" },
  { value: "1h", label: "1H" },
  { value: "4h", label: "4H" },
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
];

const smcOverlays = [
  { value: "pdh_pdl", label: "PDH/PDL", color: "text-amber-500 border-amber-500/30" },
  { value: "fvg", label: "FVG", color: "text-emerald-500 border-emerald-500/30" },
  { value: "ob", label: "OB", color: "text-blue-500 border-blue-500/30" },
  { value: "bos", label: "BOS", color: "text-purple-500 border-purple-500/30" },
  { value: "choch", label: "ChoCH", color: "text-rose-500 border-rose-500/30" },
  { value: "liquidity", label: "BSL/SSL", color: "text-cyan-500 border-cyan-500/30" },
];

export function ChartControls({
  activeTimeframe,
  onTimeframeChange,
  activeOverlays,
  onToggleOverlay,
}: ChartControlsProps) {
  const t = useTranslations("chart");

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Timeframes */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-muted/30 p-1">
        {timeframes.map((tf) => (
          <Button
            key={tf.value}
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 px-2.5 text-xs font-medium",
              activeTimeframe === tf.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onTimeframeChange(tf.value)}
          >
            {tf.label}
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* SMC Overlays */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {t("indicators")}:
        </span>
        {smcOverlays.map((overlay) => {
          const isActive = activeOverlays.includes(overlay.value);
          return (
            <Badge
              key={overlay.value}
              variant="outline"
              className={cn(
                "cursor-pointer select-none text-xs transition-all",
                isActive
                  ? `${overlay.color} bg-current/5`
                  : "text-muted-foreground opacity-50 hover:opacity-80"
              )}
              onClick={() => onToggleOverlay(overlay.value)}
            >
              {overlay.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";

export function RRCalculator() {
  const [entryPrice, setEntryPrice] = useState(1.085);
  const [stopLoss, setStopLoss] = useState(1.083);
  const [takeProfit, setTakeProfit] = useState(1.091);

  const riskPips = Math.abs(entryPrice - stopLoss) * 10000;
  const rewardPips = Math.abs(takeProfit - entryPrice) * 10000;
  const ratio = riskPips > 0 ? rewardPips / riskPips : 0;
  const isGood = ratio >= 2;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-purple-500" />
          <CardTitle className="text-base">R:R Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Entry Price</Label>
          <Input
            type="number"
            step="0.00001"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Stop Loss</Label>
          <Input
            type="number"
            step="0.00001"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Take Profit</Label>
          <Input
            type="number"
            step="0.00001"
            value={takeProfit}
            onChange={(e) => setTakeProfit(Number(e.target.value))}
            className="h-9"
          />
        </div>

        {/* Results */}
        <div className="space-y-2 rounded-lg border border-border/50 bg-muted/30 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">R:R Ratio</span>
            <span
              className={`font-mono text-lg font-bold ${
                isGood ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              1:{ratio.toFixed(1)}
            </span>
          </div>

          {/* Visual bar */}
          <div className="flex h-4 w-full overflow-hidden rounded-full">
            <div
              className="bg-red-500/80 transition-all"
              style={{
                width: `${(riskPips / (riskPips + rewardPips || 1)) * 100}%`,
              }}
            />
            <div
              className="bg-emerald-500/80 transition-all"
              style={{
                width: `${(rewardPips / (riskPips + rewardPips || 1)) * 100}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-red-500">
              Risk: {riskPips.toFixed(1)} pips
            </span>
            <span className="text-emerald-500">
              Reward: {rewardPips.toFixed(1)} pips
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

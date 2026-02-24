"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

export function PositionCalculator() {
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopLossPips, setStopLossPips] = useState(20);

  const riskAmount = accountSize * (riskPercent / 100);
  const pipValue = 10; // Standard lot pip value for most pairs
  const lotSize = stopLossPips > 0 ? riskAmount / (stopLossPips * pipValue) : 0;
  const units = Math.round(lotSize * 100000);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-500" />
          <CardTitle className="text-base">Position Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="account-size" className="text-xs text-muted-foreground">
            Account Size ($)
          </Label>
          <Input
            id="account-size"
            type="number"
            value={accountSize}
            onChange={(e) => setAccountSize(Number(e.target.value))}
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="risk-percent" className="text-xs text-muted-foreground">
            Risk (%)
          </Label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0.1}
              max={5}
              step={0.1}
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="flex-1 accent-emerald-500"
            />
            <span className="w-12 text-right font-mono text-sm font-semibold">
              {riskPercent.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sl-pips" className="text-xs text-muted-foreground">
            Stop Loss (pips)
          </Label>
          <Input
            id="sl-pips"
            type="number"
            value={stopLossPips}
            onChange={(e) => setStopLossPips(Number(e.target.value))}
            className="h-9"
          />
        </div>

        {/* Results */}
        <div className="space-y-2 rounded-lg border border-border/50 bg-muted/30 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Risk Amount</span>
            <span className="font-mono text-sm font-semibold text-red-500">
              ${riskAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Lot Size</span>
            <span className="font-mono text-sm font-semibold">
              {lotSize.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Units</span>
            <span className="font-mono text-sm font-semibold">
              {units.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

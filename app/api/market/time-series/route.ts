import { NextRequest, NextResponse } from "next/server";
import { getTimeSeries, isConfigured } from "@/lib/market-data/twelve-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const symbol = searchParams.get("symbol");
  const interval = searchParams.get("interval") ?? "1d";
  const outputSize = parseInt(searchParams.get("outputsize") ?? "120", 10);

  if (!symbol) {
    return NextResponse.json(
      { error: "Missing 'symbol' parameter" },
      { status: 400 }
    );
  }

  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Market data API not configured" },
      { status: 503 }
    );
  }

  const clampedSize = Math.min(Math.max(outputSize, 1), 5000);

  try {
    const data = await getTimeSeries(symbol, interval, clampedSize);
    return NextResponse.json({ symbol, interval, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[API] Time series error for ${symbol}:`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

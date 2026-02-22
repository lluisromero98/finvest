import { NextRequest, NextResponse } from "next/server";
import { getQuote, getMultipleQuotes, isConfigured } from "@/lib/market-data/twelve-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const symbol = searchParams.get("symbol");

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

  try {
    // Support multiple symbols: ?symbol=EURUSD,GBPUSD
    const symbols = symbol.split(",").map((s) => s.trim());

    if (symbols.length === 1) {
      const quote = await getQuote(symbols[0]);
      return NextResponse.json(quote);
    }

    const quotes = await getMultipleQuotes(symbols);
    return NextResponse.json(quotes);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[API] Quote error for ${symbol}:`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { searchSymbols, isConfigured } from "@/lib/market-data/twelve-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q");

  if (!query || query.length < 1) {
    return NextResponse.json(
      { error: "Missing 'q' parameter" },
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
    const results = await searchSymbols(query);
    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[API] Search error for ${query}:`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

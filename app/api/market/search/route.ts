import { NextRequest, NextResponse } from "next/server";
import { searchSymbols, isConfigured } from "@/lib/market-data/twelve-data";
import { getMockSearchResults } from "@/lib/market-data/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q");

  if (!query || query.length < 1) {
    return NextResponse.json(
      { error: "Missing 'q' parameter" },
      { status: 400 }
    );
  }

  // If API not configured, use mock search
  if (!isConfigured()) {
    const results = getMockSearchResults(query);
    return NextResponse.json({ results });
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

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSymbolSearch, type SearchResult } from "@/lib/hooks/use-market-data";
import { useUserPreferences } from "@/lib/stores/user-preferences";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Gem,
  Clock,
  Search,
} from "lucide-react";

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  "Common Stock": <TrendingUp className="h-4 w-4 text-blue-500" />,
  "Digital Currency": <DollarSign className="h-4 w-4 text-amber-500" />,
  forex: <DollarSign className="h-4 w-4 text-emerald-500" />,
  "Physical Currency": <DollarSign className="h-4 w-4 text-emerald-500" />,
  commodity: <Gem className="h-4 w-4 text-yellow-500" />,
  ETF: <BarChart3 className="h-4 w-4 text-purple-500" />,
  Index: <BarChart3 className="h-4 w-4 text-cyan-500" />,
};

const typeBadgeColors: Record<string, string> = {
  "Common Stock": "border-blue-500/30 text-blue-500",
  "Digital Currency": "border-amber-500/30 text-amber-500",
  forex: "border-emerald-500/30 text-emerald-500",
  "Physical Currency": "border-emerald-500/30 text-emerald-500",
  commodity: "border-yellow-500/30 text-yellow-500",
  ETF: "border-purple-500/30 text-purple-500",
  Index: "border-cyan-500/30 text-cyan-500",
};

function getTypeLabel(type: string): string {
  const map: Record<string, string> = {
    "Common Stock": "Stock",
    "Digital Currency": "Crypto",
    "Physical Currency": "Forex",
    forex: "Forex",
    commodity: "Commodity",
    ETF: "ETF",
    Index: "Index",
  };
  return map[type] ?? type;
}

function groupResults(results: SearchResult[]) {
  const groups: Record<string, SearchResult[]> = {};
  for (const r of results) {
    const label = getTypeLabel(r.instrument_type);
    if (!groups[label]) groups[label] = [];
    groups[label].push(r);
  }
  return groups;
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const t = useTranslations("common");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { recentSearches, addRecentSearch } = useUserPreferences();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const { results, isLoading } = useSymbolSearch(
    debouncedQuery.length >= 1 ? debouncedQuery : null
  );

  const grouped = useMemo(() => groupResults(results), [results]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      const internalSymbol = result.symbol.replace("/", "");
      addRecentSearch(internalSymbol);
      router.push(`/chart/${internalSymbol}`);
      onOpenChange(false);
      setQuery("");
    },
    [router, onOpenChange, addRecentSearch]
  );

  const handleRecentSelect = useCallback(
    (symbol: string) => {
      router.push(`/chart/${symbol}`);
      onOpenChange(false);
      setQuery("");
    },
    [router, onOpenChange]
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder={`${t("search")} (EUR/USD, AAPL, BTC, Gold...)`}
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              <span className="text-muted-foreground">Searching...</span>
            </div>
          ) : (
            <div className="text-muted-foreground">
              {query.length > 0 ? t("noResults") : `${t("search")}...`}
            </div>
          )}
        </CommandEmpty>

        {/* Recent searches - show when no query */}
        {query.length === 0 && recentSearches.length > 0 && (
          <CommandGroup heading="Recent">
            {recentSearches.slice(0, 5).map((symbol) => (
              <CommandItem
                key={symbol}
                value={`recent-${symbol}`}
                onSelect={() => handleRecentSelect(symbol)}
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono font-medium">{symbol}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Search results grouped by type */}
        {Object.entries(grouped).map(([type, items]) => (
          <CommandGroup key={type} heading={type}>
            {items.slice(0, 5).map((result) => (
              <CommandItem
                key={`${result.symbol}-${result.exchange}`}
                value={`${result.symbol} ${result.instrument_name}`}
                onSelect={() => handleSelect(result)}
              >
                {typeIcons[result.instrument_type] ?? (
                  <Search className="h-4 w-4 text-muted-foreground" />
                )}
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">
                      {result.symbol}
                    </span>
                    <span className="text-muted-foreground truncate max-w-[200px]">
                      {result.instrument_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">
                      {result.exchange}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        typeBadgeColors[result.instrument_type] ?? ""
                      }`}
                    >
                      {getTypeLabel(result.instrument_type)}
                    </Badge>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSelector } from "@/components/layout/language-selector";
import { UserMenu } from "@/components/layout/user-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AppHeader() {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/40 bg-background/80 px-4 backdrop-blur-lg sm:px-6">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* Search */}
      <div className="flex flex-1 items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`${t("search")} (EUR/USD, BTC, NQ...)`}
            className="h-9 pl-9 bg-muted/50"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
        </Button>
        <UserMenu />
      </div>
    </header>
  );
}

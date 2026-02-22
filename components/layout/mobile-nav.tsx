"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  LayoutDashboard,
  LineChart,
  BarChart3,
  Briefcase,
  GraduationCap,
  Settings,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard" as const },
  { href: "/chart/EURUSD", icon: LineChart, labelKey: "chart" as const },
  { href: "/simulator", icon: BarChart3, labelKey: "simulator" as const },
  { href: "/portfolio", icon: Briefcase, labelKey: "portfolio" as const },
  { href: "/academy", icon: GraduationCap, labelKey: "academy" as const },
  { href: "/settings", icon: Settings, labelKey: "settings" as const },
];

export function MobileNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border/40 px-6">
        <TrendingUp className="h-7 w-7 text-emerald-500" />
        <span className="text-xl font-bold tracking-tight">FINVEST</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

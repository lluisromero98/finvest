import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  BarChart3,
  LineChart,
  Brain,
  GraduationCap,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // We need to handle the async params but for landing page we just use translations
  const t = useTranslations("landing");
  const tCommon = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-emerald-500" />
            <span className="text-xl font-bold tracking-tight">
              {tCommon("appName")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {useTranslations("auth")("login")}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                {useTranslations("auth")("register")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  {t("hero.ctaSecondary")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            {t("features.title")}
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<LineChart className="h-8 w-8 text-emerald-500" />}
              title={t("features.charts.title")}
              description={t("features.charts.description")}
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-emerald-500" />}
              title={t("features.simulator.title")}
              description={t("features.simulator.description")}
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-emerald-500" />}
              title={t("features.ai.title")}
              description={t("features.ai.description")}
            />
            <FeatureCard
              icon={<GraduationCap className="h-8 w-8 text-emerald-500" />}
              title={t("features.academy.title")}
              description={t("features.academy.description")}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span className="font-semibold">{tCommon("appName")}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {useTranslations()("disclaimer")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/50 bg-card/50 transition-colors hover:border-emerald-500/30">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

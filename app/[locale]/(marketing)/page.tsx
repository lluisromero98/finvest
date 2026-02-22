import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  BarChart3,
  LineChart,
  Brain,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Target,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  const t = useTranslations("landing");
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tDisclaimer = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              {tCommon("appName")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {tAuth("login")}
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {tAuth("register")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 border-emerald-500/30 px-4 py-1.5 text-sm"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
              ICT / Smart Money / Wyckoff / Elliott
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {t("hero.subtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 sm:w-auto"
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t("hero.ctaSecondary")}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-500" />
                100% gratuito para empezar
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="h-4 w-4 text-emerald-500" />
                €100,000 capital virtual
              </div>
              <div className="flex items-center gap-1.5">
                <Brain className="h-4 w-4 text-emerald-500" />
                IA Smart Money integrada
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Ticker Mock */}
      <section className="border-y border-border/40 bg-muted/30 py-3">
        <div className="mx-auto max-w-7xl overflow-hidden px-4">
          <div className="flex animate-scroll items-center gap-8 whitespace-nowrap">
            {[
              { symbol: "EUR/USD", price: "1.0847", change: "+0.12%", up: true },
              { symbol: "BTC/USD", price: "97,245", change: "+2.34%", up: true },
              { symbol: "S&P 500", price: "6,012", change: "+0.45%", up: true },
              { symbol: "GBP/USD", price: "1.2634", change: "-0.08%", up: false },
              { symbol: "NASDAQ", price: "19,478", change: "+1.23%", up: true },
              { symbol: "ETH/USD", price: "2,731", change: "+1.87%", up: true },
              { symbol: "USD/JPY", price: "149.82", change: "-0.31%", up: false },
              { symbol: "GOLD", price: "2,935", change: "+0.67%", up: true },
            ].map((item) => (
              <div key={item.symbol} className="flex items-center gap-3">
                <span className="font-medium">{item.symbol}</span>
                <span className="text-muted-foreground">{item.price}</span>
                <span
                  className={
                    item.up ? "text-emerald-500" : "text-red-500"
                  }
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Funcionalidades
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("features.title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<LineChart className="h-6 w-6" />}
              title={t("features.charts.title")}
              description={t("features.charts.description")}
              gradient="from-emerald-500 to-teal-500"
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title={t("features.simulator.title")}
              description={t("features.simulator.description")}
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6" />}
              title={t("features.ai.title")}
              description={t("features.ai.description")}
              gradient="from-violet-500 to-purple-500"
            />
            <FeatureCard
              icon={<GraduationCap className="h-6 w-6" />}
              title={t("features.academy.title")}
              description={t("features.academy.description")}
              gradient="from-amber-500 to-orange-500"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="border-y border-border/40 bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              3 pasos
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Empieza a operar como un profesional
            </h2>
            <p className="mt-4 text-muted-foreground">
              De cero a trader en minutos. Sin riesgo, sin complicaciones.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <StepCard
              step="01"
              title="Aprende los conceptos"
              description="Nuestra Academia te enseña ICT y Smart Money Concepts desde cero. Lecciones interactivas, quizzes y sistema de XP para motivarte."
              icon={<GraduationCap className="h-6 w-6" />}
            />
            <StepCard
              step="02"
              title="Practica sin riesgo"
              description="Usa el simulador con €100,000 virtuales. Detecta FVG, Order Blocks y BOS automáticamente en gráficos reales."
              icon={<Target className="h-6 w-6" />}
            />
            <StepCard
              step="03"
              title="Analiza con IA"
              description="Nuestra IA escanea los mercados buscando patrones SMC. Recibe alertas y el BIAS diario antes de operar."
              icon={<Brain className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* SMC Concepts Preview */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4">
                Tecnología
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Detección automática de patrones Smart Money
              </h2>
              <p className="mt-4 text-muted-foreground">
                Nuestro motor de IA analiza los mercados en tiempo real y
                detecta los patrones que usan los traders institucionales.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  "Fair Value Gaps (FVG)",
                  "Order Blocks (OB)",
                  "Break of Structure (BOS)",
                  "Change of Character (ChoCH)",
                  "Liquidez BSL/SSL",
                  "PDH/PDL automático",
                  "BIAS diario con IA",
                  "SMT Divergence",
                ].map((concept) => (
                  <div
                    key={concept}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    {concept}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/register">
                  <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                    Empezar ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Chart Preview Mock */}
            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-2xl shadow-emerald-500/5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">EUR/USD</span>
                  <Badge variant="outline" className="text-xs">
                    1H
                  </Badge>
                </div>
                <div className="flex gap-1">
                  {["FVG", "OB", "BOS"].map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-emerald-500/10 text-emerald-500 text-xs hover:bg-emerald-500/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* Mock candlestick chart */}
              <div className="relative h-64 rounded-lg bg-muted/50 overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-around px-2 pb-2">
                  {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 70, 90, 85, 95, 88, 92, 78, 85, 90, 95].map(
                    (h, i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5">
                        <div
                          className="w-1 rounded-full bg-muted-foreground/20"
                          style={{ height: `${Math.random() * 20 + 5}px` }}
                        />
                        <div
                          className={`w-2 rounded-sm ${
                            i % 3 === 0
                              ? "bg-red-500/70"
                              : "bg-emerald-500/70"
                          }`}
                          style={{ height: `${h * 2.2}px` }}
                        />
                        <div
                          className="w-1 rounded-full bg-muted-foreground/20"
                          style={{ height: `${Math.random() * 15 + 5}px` }}
                        />
                      </div>
                    )
                  )}
                </div>
                {/* FVG zone mock */}
                <div className="absolute left-[30%] right-[45%] top-[25%] h-8 rounded border border-emerald-500/30 bg-emerald-500/10">
                  <span className="absolute -top-5 left-0 text-[10px] font-medium text-emerald-500">
                    FVG
                  </span>
                </div>
                {/* OB zone mock */}
                <div className="absolute bottom-[20%] left-[55%] right-[20%] h-6 rounded border border-blue-500/30 bg-blue-500/10">
                  <span className="absolute -top-5 left-0 text-[10px] font-medium text-blue-500">
                    OB
                  </span>
                </div>
                {/* PDH line */}
                <div className="absolute left-0 right-0 top-[15%] border-t border-dashed border-amber-500/40">
                  <span className="absolute -top-4 right-2 text-[10px] font-medium text-amber-500">
                    PDH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "10+", label: "Conceptos SMC integrados" },
              { value: "8", label: "Temporalidades disponibles" },
              { value: "€100K", label: "Capital virtual gratuito" },
              { value: "3", label: "Idiomas (ES/EN/CA)" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-emerald-500 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDIwIEwgMjAgMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNncmlkKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                ¿Listo para operar como Smart Money?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-emerald-100">
                Únete a FINVEST y empieza a dominar los mercados con la
                metodología que usan los traders institucionales.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full bg-white text-emerald-700 shadow-lg hover:bg-emerald-50 sm:w-auto"
                  >
                    Crear cuenta gratuita
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <span className="font-semibold">{tCommon("appName")}</span>
            </div>
            <p className="max-w-md text-center text-xs text-muted-foreground sm:text-right">
              {tDisclaimer("disclaimer")}
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
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:shadow-lg">
      <CardContent className="pt-6">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          {icon}
        </div>
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  step,
  title,
  description,
  icon,
}: {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl font-bold text-emerald-500/20">{step}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
          {icon}
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

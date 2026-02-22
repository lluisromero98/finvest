import { setRequestLocale } from "next-intl/server";
import { TrendingUp } from "lucide-react";

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center gap-2">
        <TrendingUp className="h-8 w-8 text-emerald-500" />
        <span className="text-2xl font-bold tracking-tight">FINVEST</span>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

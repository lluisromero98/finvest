import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FINVEST — Smart Money Trading Platform",
    template: "%s | FINVEST",
  },
  description:
    "Plataforma de trading con Smart Money Concepts (ICT/SMC). Aprende, practica con simulador y analiza mercados con IA.",
  keywords: [
    "trading",
    "smart money",
    "ICT",
    "SMC",
    "forex",
    "simulador",
    "order blocks",
    "fair value gap",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Nexo 21 — Jornada cristiana para mujeres casadas", template: "%s | Nexo 21" },
  description: "Una jornada cristiana individual de 21 días para mujeres casadas que desean recuperar claridad, voz, presencia y límites en su relación.",
  keywords: ["matrimonio", "comunicación", "jornada cristiana", "relación", "devocional"],
  openGraph: {
    title: "Nexo 21",
    description: "21 días para volver a escucharte, cuidar tu voz y habitar tu relación sin perderte.",
    type: "website",
    locale: "es_419",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nexo 21" }],
  },
  twitter: { card: "summary_large_image", title: "Nexo 21", description: "Una jornada cristiana individual de 21 días para mujeres casadas." },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F5F1E8", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}

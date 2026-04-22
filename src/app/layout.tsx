import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Islamic JK & SK in Ottawa · Arabic Immersion · QAF",
    template: "%s · QAF",
  },
  description:
    "QAF is Ottawa's Islamic Junior & Senior Kindergarten — Montessori-inspired learning, daily Arabic, and Islamic values. Ages 4-5. Submit your inquiry today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-[var(--font-inter)] antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

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

const SITE_URL = "https://qafschool.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Quran & Arabic Programs for Kids in Ottawa · Sunday Camp & Tuesday Evenings · QAF School",
    template: "%s · QAF School",
  },
  description:
    "QAF School in Ottawa offers weekend and evening Islamic programs for school-age children: Sunday Camp (Quran, Arabic, math & STEM, soccer, ages 8–15) and a Tuesday evening program (Quran, Tajweed, Sira, ages 9–13). Sunday Camp seats available.",
  keywords: [
    "Quran classes for kids Ottawa",
    "Sunday Islamic school Ottawa",
    "weekend Islamic school Ottawa",
    "Arabic classes for kids Ottawa",
    "Tajweed classes Ottawa",
    "Sira classes for kids",
    "after school Quran program Ottawa",
    "Islamic school Ottawa",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "QAF School",
    title: "Quran & Arabic Programs for Kids in Ottawa · QAF School",
    description:
      "Sunday Camp (Quran, Arabic, STEM, soccer · ages 8–15) and a Tuesday evening Quran, Tajweed & Sira program (ages 9–13) at 900 Dynes Rd, Ottawa.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "QAF School classroom in Ottawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quran & Arabic Programs for Kids in Ottawa · QAF School",
    description:
      "Sunday Camp (Quran, Arabic, STEM, soccer · ages 8–15) and a Tuesday evening Quran, Tajweed & Sira program (ages 9–13) at 900 Dynes Rd, Ottawa.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": ["School", "EducationalOrganization"],
  "@id": `${SITE_URL}/#school`,
  name: "QAF School",
  alternateName: ["QAF Islamic School", "Qabas Academic Foundation"],
  description:
    "QAF School in Ottawa offers weekend and evening Islamic programs for school-age children: Sunday Camp (Quran, Arabic, math & STEM, soccer, ages 8–15) and a Tuesday evening program (Quran, Tajweed, Sira, ages 9–13).",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: `${SITE_URL}/og.jpg`,
  telephone: "+1-613-581-8685",
  email: "admin@qafschool.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "900 Dynes Rd",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    postalCode: "K2C 3L6",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.3694474,
    longitude: -75.7043661,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "18:00",
      closes: "20:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "15:00",
    },
  ],
  sameAs: [
    "https://instagram.com/qafottawa",
    "https://maps.google.com/?cid=13733511260584689931",
  ],
  hasMap: "https://maps.google.com/?cid=13733511260584689931",
  areaServed: {
    "@type": "City",
    name: "Ottawa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-[var(--font-inter)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

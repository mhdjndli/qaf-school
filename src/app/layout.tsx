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
    default: "Islamic School in Ottawa · JK & SK Kindergarten · QAF School",
    template: "%s · QAF School",
  },
  description:
    "QAF School is an Islamic school in Ottawa offering Junior & Senior Kindergarten (ages 4–5) with Montessori-inspired learning, daily Arabic immersion, Quran, and Islamic values. Book a tour today.",
  keywords: [
    "Islamic school Ottawa",
    "Islamic kindergarten Ottawa",
    "Muslim school Ottawa",
    "Arabic immersion school Ottawa",
    "Montessori Islamic school",
    "JK SK Ottawa",
    "Islamic preschool Ottawa",
    "Quran school for kids Ottawa",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "QAF School",
    title: "Islamic School in Ottawa · JK & SK Kindergarten · QAF School",
    description:
      "Ottawa's Islamic Junior & Senior Kindergarten — Montessori-inspired learning, daily Arabic, Quran, and Islamic values for ages 4–5.",
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
    title: "Islamic School in Ottawa · JK & SK Kindergarten · QAF School",
    description:
      "Ottawa's Islamic Junior & Senior Kindergarten — Montessori-inspired learning, daily Arabic, Quran, and Islamic values for ages 4–5.",
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
  "@type": ["School", "Preschool"],
  "@id": `${SITE_URL}/#school`,
  name: "QAF School",
  alternateName: "Qabas Academic Foundation",
  description:
    "Islamic school in Ottawa offering Junior and Senior Kindergarten (ages 4–5) with Montessori-inspired learning, daily Arabic immersion, Quran, and Islamic values.",
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
    latitude: 45.37,
    longitude: -75.7,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:45",
      closes: "15:15",
    },
  ],
  sameAs: [
    "https://instagram.com/qafottawa",
    "https://www.google.com/searchviewer/10?svid=CAwSHRIbCgNwdnESFENnMHZaeTh4TVd0d1h6RnpOR1JvGAo",
  ],
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

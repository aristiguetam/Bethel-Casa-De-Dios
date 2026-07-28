import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { CHURCH_INFO, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./data/site";

const notoSerif = Noto_Serif({
  variable: "--font-display-base",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-base",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base para resolver URLs relativas de canonical y Open Graph.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

// Datos estructurados (JSON-LD) para SEO local y rich results.
// Schema Church con dirección y horarios de servicio.
const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: CHURCH_INFO.streetAddress,
    addressLocality: CHURCH_INFO.addressLocality,
    addressRegion: CHURCH_INFO.addressRegion,
    postalCode: CHURCH_INFO.postalCode,
    addressCountry: CHURCH_INFO.addressCountry,
  },
  openingHoursSpecification: CHURCH_INFO.services.map((s) => ({
    "@type": "OpeningHoursSpecification",
    name: s.name,
    dayOfWeek: `https://schema.org/${s.day}`,
    opens: s.opens,
  })),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${notoSerif.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

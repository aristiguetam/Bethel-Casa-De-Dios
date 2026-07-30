import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  alternateOgLocales,
  buildAlternates,
  ogLocale,
} from "@/i18n/metadata";
import { routing, toLocale } from "@/i18n/routing";
import "../globals.css";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { CHURCH_INFO, SITE_NAME, SITE_URL } from "../data/site";

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

// Pre-genera /es y /en en el build en vez de resolverlos por petición.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Site" });
  const description = t("description");

  return {
    // Base para resolver URLs relativas de canonical y Open Graph.
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s · ${SITE_NAME}`,
    },
    description,
    alternates: buildAlternates("/", locale),
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      alternateLocale: alternateOgLocales(locale),
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  // El segmento [locale] acepta cualquier cadena, así que se valida a mano.
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale = rawLocale;

  // Fija el locale para el renderizado estático de este árbol. Sin esto,
  // next-intl no puede resolver las traducciones en build y la página pasa a
  // renderizarse por petición.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Site" });
  const messages = await getMessages();

  // Datos estructurados (JSON-LD) para SEO local y rich results.
  // Schema Church con dirección y horarios de servicio.
  const churchJsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: SITE_NAME,
    description: t("description"),
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
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

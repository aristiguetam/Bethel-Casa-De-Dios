import type { Metadata } from "next";
import { SITE_URL } from "@/app/data/site";
import { getPathname } from "./navigation";
import { routing, type AppPathname, type Locale } from "./routing";

// Etiqueta de idioma+región para Open Graph. La congregación está en Florida,
// así que ambas variantes apuntan a Estados Unidos.
const OG_LOCALES: Record<Locale, string> = {
  es: "es_US",
  en: "en_US",
};

export function absoluteUrl(href: AppPathname, locale: Locale): string {
  return `${SITE_URL}${getPathname({ href, locale })}`;
}

/**
 * Construye canonical + hreflang para una página.
 *
 * El canonical apunta a la URL del idioma que se está renderizando, y
 * `languages` declara la equivalente en el otro idioma. Esto es lo que le dice
 * a Google que /es/eventos y /en/events son la misma página en dos idiomas y
 * no contenido duplicado, para que indexe ambas y le muestre a cada usuario
 * la que corresponde a su búsqueda.
 *
 * `x-default` es la que se sirve a quien no coincide con ningún idioma
 * declarado; usamos el idioma principal de la iglesia (español).
 */
export function buildAlternates(
  href: AppPathname,
  locale: Locale,
): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(href, locale),
    languages: {
      es: absoluteUrl(href, "es"),
      en: absoluteUrl(href, "en"),
      "x-default": absoluteUrl(href, routing.defaultLocale),
    },
  };
}

export function ogLocale(locale: Locale): string {
  return OG_LOCALES[locale];
}

/** El otro idioma disponible, para `openGraph.alternateLocale`. */
export function alternateOgLocales(locale: Locale): string[] {
  return routing.locales.filter((l) => l !== locale).map(ogLocale);
}

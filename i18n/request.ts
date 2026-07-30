import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// El idioma ya no sale de una cookie sino del segmento [locale] de la URL,
// que es lo que permite que Google indexe las dos versiones por separado.
// La detección por `accept-language` la hace ahora el proxy (next-intl) al
// entrar a "/", no este archivo.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  // `requestLocale` puede venir vacío o con basura: el segmento [locale] actúa
  // como catch-all para rutas desconocidas, así que se valida siempre.
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

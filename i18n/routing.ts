import { hasLocale } from "next-intl";
import { defineRouting } from "next-intl/routing";

// Configuración única de rutas bilingües.
//
// `localePrefix: "always"` => todas las URLs llevan prefijo (/es/…, /en/…).
// Se eligió sobre "as-needed" porque deja URLs simétricas: cada página tiene
// exactamente una URL por idioma, sin una versión "sin prefijo" que compita
// con /es/ por el mismo contenido (contenido duplicado a ojos de Google).
// La raíz "/" la redirige el proxy al idioma que corresponda.
//
// `pathnames` traduce también el slug: /es/eventos y /en/events apuntan a la
// misma carpeta app/[locale]/events. Las carpetas conservan el nombre interno
// en inglés; el proxy reescribe la URL pública a la interna.
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about": { es: "/nosotros", en: "/about" },
    "/events": { es: "/eventos", en: "/events" },
    "/give": { es: "/donar", en: "/give" },
    "/prayer": { es: "/oracion", en: "/prayer" },
    "/contact": { es: "/contacto", en: "/contact" },
    "/visit": { es: "/visitanos", en: "/visit" },
    "/ministries": { es: "/ministerios", en: "/ministries" },
  },
});

export type Locale = (typeof routing.locales)[number];

/**
 * Estrecha el segmento [locale] crudo a un idioma soportado.
 *
 * Next tipa los params de ruta como `string` porque el segmento acepta
 * cualquier cosa. Las URLs inválidas ya las filtra el proxy y el layout
 * responde 404, así que aquí basta con caer al idioma por defecto.
 */
export function toLocale(value: string): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}

// Rutas internas válidas ("/", "/about", …). Sirve para tipar helpers que
// reciben una ruta y devuelven su versión localizada.
export type AppPathname = keyof typeof routing.pathnames;

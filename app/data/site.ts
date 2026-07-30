// Configuración central del sitio para SEO / metadata / structured data.
//
// 👉 CUANDO TENGAS EL DOMINIO REAL, defínelo en UN SOLO lugar: la variable
//    NEXT_PUBLIC_SITE_URL en Vercel → Settings → Environment Variables, p.ej.
//      NEXT_PUBLIC_SITE_URL=https://www.tudominio.com
//    Todo lo demás (robots, sitemap, canonical, Open Graph, JSON-LD) sale de aquí.
//
// MIENTRAS esa variable no exista, el sitio se considera NO indexable: se sirve
// con normalidad, pero robots.txt lo cierra a los buscadores y cada página lleva
// noindex. Es a propósito, y es lo que permite pushear sin miedo: el repo está
// conectado a Vercel y cada push publica un deploy. Sin este candado, Google
// puede indexar la URL .vercel.app con las canónicas apuntando a un dominio que
// todavía no existe — y eso después se limpia a mano, pidiendo la retirada de
// cada URL en Search Console.
//
// Aquí no se pone el dominio a mano justamente para que nadie active el SEO sin
// darse cuenta: hace falta definir la variable, y eso ya es una decisión.

/** El dominio propio, si ya está configurado. */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

// Sin dominio propio se usa la URL que Vercel le da al deploy, para que los
// enlaces absolutos apunten al menos a algo que responde.
// `VERCEL_PROJECT_PRODUCTION_URL` es la .vercel.app fija del proyecto;
// `VERCEL_URL` es la URL única e irrepetible de cada deploy de preview.
const vercelUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const SITE_URL = (
  configuredUrl ||
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, ""); // sin barra final, para construir URLs de forma consistente

/**
 * Si los buscadores pueden indexar el sitio: solo con dominio propio definido.
 *
 * Lo leen `app/robots.ts` y la metadata de `app/[locale]/layout.tsx`. Ambos,
 * no uno solo: robots.txt pide no rastrear, pero una URL que ya conoce por otra
 * vía (un enlace, el sitemap de un deploy viejo) Google la puede indexar igual.
 * La etiqueta noindex es la que lo impide de verdad.
 */
export const SITE_IS_INDEXABLE = Boolean(configuredUrl);

export const SITE_NAME = "Bethel Casa De Dios";

// La descripción del sitio vive traducida en messages/{es,en}.json bajo
// "Site.description", porque cada idioma necesita la suya para SEO.

// Datos NAP (Name-Address-Phone) para SEO local / schema Church.
export const CHURCH_INFO = {
  streetAddress: "1000 Foster Rd",
  addressLocality: "Hallandale Beach",
  addressRegion: "FL",
  postalCode: "33009",
  addressCountry: "US",
  // Horarios de servicio (para openingHours / potential rich results).
  services: [
    { name: "Servicio en Español", day: "Sunday", opens: "09:00" },
    { name: "Servicio Bilingüe", day: "Sunday", opens: "11:30" },
  ],
} as const;

// Configuración central del sitio para SEO / metadata / structured data.
//
// 👉 CUANDO TENGAS EL DOMINIO REAL, cámbialo en UN SOLO lugar:
//    - o defines la variable de entorno NEXT_PUBLIC_SITE_URL (recomendado), p.ej.
//      NEXT_PUBLIC_SITE_URL=https://www.tudominio.org
//    - o editas el valor de reemplazo de abajo.
// Todo lo demás (robots, sitemap, canonical, Open Graph, JSON-LD) lo toma de aquí.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bethelcasadedios.org"
).replace(/\/$/, ""); // sin barra final, para construir URLs de forma consistente

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

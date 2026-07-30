import type { MetadataRoute } from "next";
import { SITE_IS_INDEXABLE, SITE_URL } from "./data/site";

export default function robots(): MetadataRoute.Robots {
  // Sin dominio propio configurado, el deploy se cierra por completo y no se
  // anuncia el sitemap. Ver la explicación en app/data/site.ts.
  if (!SITE_IS_INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // /ministries está oculto (redirige a la portada), no queremos que se
        // rastree. Hay que listar el slug de cada idioma.
        "/es/ministerios",
        "/en/ministries",
        "/ministries",
        // El panel de contenido de la iglesia no es contenido público.
        "/keystatic",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

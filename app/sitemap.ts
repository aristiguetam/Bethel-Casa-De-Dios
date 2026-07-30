import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/i18n/metadata";
import { routing, type AppPathname } from "@/i18n/routing";

// Páginas públicas indexables. /ministries queda fuera a propósito
// (está oculta y redirige a la portada).
const routes: {
  path: AppPathname;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/events", priority: 0.9, changeFrequency: "weekly" },
  { path: "/visit", priority: 0.8, changeFrequency: "monthly" },
  { path: "/give", priority: 0.7, changeFrequency: "monthly" },
  { path: "/prayer", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Cada página se lista una vez por idioma, y cada entrada declara sus
  // equivalentes en el resto de idiomas. Esto le confirma a Google el
  // emparejamiento entre /es/eventos y /en/events.
  return routes.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, absoluteUrl(path, l)]),
          ),
          // Mismo x-default que declaran las etiquetas <link> de cada página:
          // si no coinciden entre sí, Google ignora el emparejamiento.
          "x-default": absoluteUrl(path, routing.defaultLocale),
        },
      },
    })),
  );
}

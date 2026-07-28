import type { MetadataRoute } from "next";
import { SITE_URL } from "./data/site";

// Páginas públicas indexables. /ministries queda fuera a propósito
// (está oculta y redirige a /).
const routes: {
  path: string;
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
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

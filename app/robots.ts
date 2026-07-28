import type { MetadataRoute } from "next";
import { SITE_URL } from "./data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /ministries está oculto (redirige a /), no queremos que se rastree.
      disallow: "/ministries",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// OJO: en Next.js 16 el antiguo `middleware.ts` se llama `proxy.ts`.
// La funcionalidad es la misma; solo cambió el nombre del archivo y de la función.
//
// Este proxy se encarga de:
//  - redirigir "/" al idioma del navegador (/es o /en);
//  - traducir la URL pública a la interna (/es/eventos -> app/[locale]/events);
//  - emitir la cabecera Link con los alternates para los buscadores.
export default createMiddleware(routing);

export const config = {
  // Excluye rutas de API, el panel de contenido, internos de Next/Vercel y
  // cualquier archivo con extensión (favicon.ico, robots.txt, sitemap.xml,
  // imágenes…), que no deben llevar prefijo de idioma.
  //
  // `keystatic` va aquí porque el panel no es contenido traducible: sin esta
  // exclusión, /keystatic acabaría redirigido a /es/keystatic, que no existe.
  matcher: "/((?!api|keystatic|_next|_vercel|.*\\..*).*)",
};

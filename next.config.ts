import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

// En desarrollo, Next.js/React usan eval() para Fast Refresh y debugging.
// Solo ahí permitimos 'unsafe-eval'; en producción la CSP queda estricta.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

// Cabeceras de seguridad comunes a todo el sitio, incluido el panel.
// La CSP va aparte porque el panel necesita uno más permisivo.
const baseSecurityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

// CSP del panel de contenido (/keystatic).
//
// Es más laxa que la del sitio público, y a propósito solo se aplica a esa
// ruta. Motivos de cada permiso extra:
//  - 'unsafe-eval': el editor del panel lo necesita para compilar contenido.
//  - blob: en img-src: la vista previa de la foto que se está subiendo, antes
//    de guardarla, se genera como blob en el navegador.
//  - api.github.com y api.keystatic.cloud: a donde habla el panel al pasar a
//    modo cloud para leer y escribir el contenido en el repositorio.
//  - fonts.googleapis.com / fonts.gstatic.com: el panel usa la tipografía Inter
//    servida por Google Fonts. Sin esto la hoja de estilos queda bloqueada y la
//    interfaz se ve con la fuente del sistema.
const keystaticCsp = [
  "default-src 'self'",
  "img-src 'self' data: blob:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://api.github.com https://api.keystatic.cloud",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  // Cabeceras de seguridad aplicadas a todas las respuestas.
  async headers() {
    return [
      {
        // Todo menos el panel y su API: aquí la CSP se queda estricta.
        source: "/((?!keystatic|api/keystatic).*)",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src 'self' https://lh3.googleusercontent.com data:",
              scriptSrc,
              // Google Fonts (Material Symbols) sirve la hoja de estilos desde googleapis.
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // ...y los archivos de fuente desde gstatic.
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self'",
              // Video: iframe embebido de YouTube.
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      // El panel de contenido y su API, con la CSP relajada de arriba.
      // Van como rutas separadas porque el emparejador de Next no admite dos
      // parámetros pegados en un mismo patrón.
      ...["/keystatic", "/keystatic/:path*", "/api/keystatic/:path*"].map(
        (source) => ({
          source,
          headers: [
            ...baseSecurityHeaders,
            { key: "Content-Security-Policy", value: keystaticCsp },
            // Refuerzo por si alguna vez queda accesible en producción: que
            // ningún buscador lo indexe, aunque robots.txt ya lo excluya.
            { key: "X-Robots-Tag", value: "noindex, nofollow" },
          ],
        }),
      ),
    ];
  },
  // Ministerios oculto temporalmente: redirect del lado del servidor.
  // Corre antes de renderizar, así no se sirve el HTML ni el payload RSC.
  // permanent: false (307) para que el navegador no lo cachee y sea fácil revertir.
  //
  // Con las rutas bilingües hay que cubrir el slug de cada idioma. Los
  // redirects de next.config corren antes que el proxy de i18n, así que las
  // URLs ya llevan prefijo de idioma cuando llegan aquí. La pareja sin prefijo
  // queda por las URLs viejas que puedan seguir circulando.
  async redirects() {
    return [
      { source: "/es/ministerios", destination: "/es", permanent: false },
      { source: "/es/ministerios/:path*", destination: "/es", permanent: false },
      { source: "/en/ministries", destination: "/en", permanent: false },
      { source: "/en/ministries/:path*", destination: "/en", permanent: false },
      { source: "/ministries", destination: "/", permanent: false },
      { source: "/ministries/:path*", destination: "/", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

// En desarrollo, Next.js/React usan eval() para Fast Refresh y debugging.
// Solo ahí permitimos 'unsafe-eval'; en producción la CSP queda estricta.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

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
        source: "/:path*",
        headers: [
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
    ];
  },
  // Ministerios oculto temporalmente: redirect del lado del servidor.
  // Corre antes de renderizar, así no se sirve el HTML ni el payload RSC.
  // permanent: false (307) para que el navegador no lo cachee y sea fácil revertir.
  async redirects() {
    return [
      {
        source: "/ministries",
        destination: "/",
        permanent: false,
      },
      {
        source: "/ministries/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

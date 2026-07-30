import type { Metadata } from "next";

// Layout raíz del panel de administración, separado del sitio público.
//
// Next permite varios layouts raíz cuando cada uno vive en su propio grupo de
// rutas — (admin) aquí, y el sitio bajo app/[locale]. Hacía falta porque el
// panel no puede colgar del layout del sitio: ese lleva cabecera, pie de
// página, fuentes y traducciones que aquí estorban. Keystatic trae sus propios
// estilos, así que este layout es deliberadamente mínimo y no carga
// globals.css, para que Tailwind no pise la interfaz del panel.
export const metadata: Metadata = {
  title: "Panel de contenido · Bethel Casa De Dios",
  // El panel no es contenido público: fuera de los buscadores.
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

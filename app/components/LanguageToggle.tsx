"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "./cn";

// Antes esto era un botón que guardaba una cookie vía Server Action, porque
// ambos idiomas vivían en la misma URL. Ahora cada idioma tiene su propia URL,
// así que cambiar de idioma es simplemente navegar: un <a> real, que además los
// buscadores pueden seguir hasta la otra versión de la página.
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Nav");
  // Ruta interna de la página actual (p. ej. "/about"), sin prefijo de idioma.
  const pathname = usePathname();

  const next: Locale = locale === "en" ? "es" : "en";
  // La etiqueta nombra el idioma DESTINO, no el actual: siendo un enlace con
  // hrefLang="en", poner "ES" contradiría a dónde lleva y confundiría tanto al
  // visitante como a un lector de pantalla.
  const label = next.toUpperCase();

  return (
    <Link
      href={pathname}
      locale={next}
      hrefLang={next}
      replace
      aria-label={t("switchLanguage")}
      className={cn(
        "font-label-sm uppercase tracking-widest text-xs text-on-surface-variant hover:text-primary transition-opacity duration-300",
        className,
      )}
    >
      {label}
    </Link>
  );
}

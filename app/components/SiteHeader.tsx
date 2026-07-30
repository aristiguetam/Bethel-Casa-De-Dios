"use client";

// Link y usePathname vienen de la navegación localizada: los href se escriben
// con la ruta interna ("/about") y se traducen solos a /es/nosotros o /en/about.
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "./cn";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  // { href: "/ministries", key: "ministries" }, // oculto temporalmente
  { href: "/events", key: "events" },
  { href: "/give", key: "give" },
  { href: "/prayer", key: "prayer" },
] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cierra el menú al cambiar de página. El header vive en el layout y no se
  // desmonta al navegar, así que `open` sobreviviría a la navegación.
  //
  // Se ajusta durante el render y no en un useEffect: un efecto corre DESPUÉS
  // de que React pinte, así que el navegador alcanzaría a mostrar un fotograma
  // con la página nueva y el menú todavía abierto. Al hacerlo aquí, React
  // descarta este render y rehace el componente antes de tocar el DOM.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (menuRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-outline-variant/40 shadow-sm sticky top-0 z-50">
      <nav className="flex justify-between items-center px-6 md:px-8 py-5 max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="text-xl font-bold text-primary font-display italic tracking-tight"
        >
          Bethel Casa De Dios
        </Link>

        <div className="hidden md:flex items-center gap-10 text-label-sm uppercase tracking-widest text-xs">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors duration-200 pb-1",
                isActive(item.href)
                  ? "text-primary border-b-2 border-secondary-container"
                  : "text-on-surface-variant hover:text-primary",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/contact"
            className="inline-flex bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-sm hover:opacity-90 transition-all shadow-md"
          >
            {t("visitUs")}
          </Link>
          <LanguageToggle />
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-primary hover:bg-surface-container-low transition-colors"
        >
          <Icon name={open ? "close" : "menu"} className="text-3xl" />
        </button>
      </nav>

      {/* Mobile menu — absolute inside the sticky header so it floats below the bar without affecting page flow */}
      <div
        ref={menuRef}
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "md:hidden absolute left-0 right-0 top-full bg-white border-t border-outline-variant/40 shadow-xl transition-[opacity,transform] duration-300 ease-out",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        <ul className="px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block px-4 py-3.5 rounded-lg font-label-sm uppercase tracking-widest text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-secondary-container/30 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary",
                )}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/contact"
              className="block w-full text-center bg-primary text-on-primary px-6 py-3.5 rounded-full font-label-sm shadow-md hover:opacity-90 transition-all"
            >
              {t("visitUs")}
            </Link>
          </li>
          <li className="pt-3 flex justify-center">
            <LanguageToggle />
          </li>
        </ul>
      </div>
    </header>

    {/* Backdrop — fades in behind the menu, dismisses on tap */}
    <div
      onClick={() => setOpen(false)}
      aria-hidden
      className={cn(
        "md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    />
    </>
  );
}

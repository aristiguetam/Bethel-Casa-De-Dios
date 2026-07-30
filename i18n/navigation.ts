import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Envoltorios de las APIs de navegación de Next que entienden el locale y los
// slugs traducidos. Siempre importar `Link` / `usePathname` / `useRouter` desde
// aquí y NO desde "next/link" o "next/navigation": estos escriben la ruta
// interna (p. ej. "/events") y resuelven solos la URL pública del idioma actual
// ("/es/eventos" o "/en/events"). `usePathname` hace el camino inverso: devuelve
// la ruta interna, así la lógica de "enlace activo" no depende del idioma.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

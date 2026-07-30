import { notFound } from "next/navigation";
import { isPanelHidden } from "../panel-guard";
import { KeystaticPanel } from "./panel";

// El panel de administración vive fuera de app/[locale]: no es contenido del
// sitio, no se traduce con next-intl (su idioma lo fija `locale` en la config)
// y no debe llevar prefijo de idioma en la URL.
//
// Esta página es un Server Component a propósito, para poder cerrar el acceso
// antes de enviar nada al navegador; la interfaz en sí es el componente de
// cliente `KeystaticPanel`.
export default function KeystaticPage() {
  if (isPanelHidden) notFound();
  return <KeystaticPanel />;
}

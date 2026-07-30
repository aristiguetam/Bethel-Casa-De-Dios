import { makeRouteHandler } from "@keystatic/next/route-handler";
import { isPanelHidden } from "@/app/(admin)/keystatic/panel-guard";
import keystaticConfig from "@/keystatic.config";

// Endpoint que usa el panel para leer y guardar el contenido.
// En modo "local" escribe en el disco del proyecto; en modo "cloud" hablará con
// Keystatic Cloud y GitHub.
const handlers = makeRouteHandler({ config: keystaticConfig });

// Cerrar solo la página no bastaría: esta API es la que de verdad lee y escribe
// el contenido, y en modo local atiende a cualquiera. Se cierra con el mismo
// candado, si no quedaría accesible por su cuenta.
const notFound = async () => new Response("Not Found", { status: 404 });

export const GET = isPanelHidden ? notFound : handlers.GET;
export const POST = isPanelHidden ? notFound : handlers.POST;

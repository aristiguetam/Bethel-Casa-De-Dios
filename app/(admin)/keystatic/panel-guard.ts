import keystaticConfig from "@/keystatic.config";

/**
 * ¿Hay que esconder el panel en esta ejecución?
 *
 * El modo `local` de Keystatic **no tiene ningún tipo de autenticación**: su
 * manejador de API atiende cualquier petición sin comprobar quién la hace. Eso
 * es correcto mientras solo existe en `localhost` durante el desarrollo, pero
 * sería un agujero grave en el sitio publicado, donde la dirección la puede
 * escribir cualquiera.
 *
 * Así que mientras el almacenamiento sea local, en producción el panel y su
 * API responden 404, como si la ruta no existiera.
 *
 * El candado se levanta solo: al pasar la configuración a `storage: { kind:
 * "cloud" }`, esta condición deja de cumplirse y entra a gobernar el login de
 * Keystatic Cloud, que sí pide identificarse.
 */
export const isPanelHidden =
  process.env.NODE_ENV === "production" &&
  keystaticConfig.storage.kind === "local";

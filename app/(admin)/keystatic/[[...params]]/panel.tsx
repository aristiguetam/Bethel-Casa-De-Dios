"use client";

import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "@/keystatic.config";

// "use client" NO es opcional: @keystatic/core/ui publica dos versiones, y la
// que se carga en el entorno de servidor de React es un stub cuyo componente
// hace `return null`. Sin esta directiva el panel responde 200 sin errores…
// y pinta una página en blanco.
export const KeystaticPanel = makePage(keystaticConfig);

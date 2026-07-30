// Traduce los eventos del CMS al idioma que falte, usando la API de Claude.
//
// Lo ejecuta la GitHub Action .github/workflows/translate-events.yml cada vez
// que cambia un archivo de content/events/. El panel de Keystatic solo escribe
// archivos en el repositorio: no ejecuta lógica propia al guardar, así que la
// traducción tiene que engancharse después del commit.
//
// Qué hace con cada evento:
//   1. Detecta en qué idioma está escrito el título/descripción.
//   2. Pide a Claude las dos versiones (español e inglés).
//   3. Normaliza: `title`/`description` quedan SIEMPRE en español y
//      `titleEn`/`descriptionEn` SIEMPRE en inglés, escriba la encargada en el
//      idioma que escriba. El sitio ya lee exactamente esos campos.
//
// Es deliberadamente tolerante a fallos: el evento ya está publicado cuando
// esto corre, así que un error de traducción nunca debe tumbar nada. Se marca
// el evento como fallido, se sigue con los demás y el sitio muestra el español
// en ambos idiomas hasta que se resuelva.
//
// Se escribe en JavaScript plano (.mjs) a propósito: corre en CI sin pasar por
// el compilador de TypeScript ni la configuración de Next.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { parseDocument } from "yaml";

const EVENTS_DIR = "content/events";

// Contrato de salida. Al fijar el esquema, la respuesta viene siempre como
// JSON válido con estas claves y no hace falta rescatar texto a mano.
const TRANSLATION_SCHEMA = {
  type: "object",
  properties: {
    sourceLanguage: {
      type: "string",
      enum: ["es", "en"],
      description: "Idioma en el que estaba escrito el texto original.",
    },
    es: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
      },
      required: ["title", "description"],
      additionalProperties: false,
    },
    en: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
      },
      required: ["title", "description"],
      additionalProperties: false,
    },
  },
  required: ["sourceLanguage", "es", "en"],
  additionalProperties: false,
};

const SYSTEM_PROMPT = `Traduces eventos de una iglesia hispanohablante en Hallandale Beach, Florida, para su sitio web bilingüe.

Recibes el título y la descripción de un evento escritos en español O en inglés. Debes:
1. Detectar en qué idioma están.
2. Devolver las dos versiones: la original tal cual y la traducción al otro idioma.

Reglas:
- Devuelve el texto del idioma original SIN modificar. No lo corrijas, no lo reescribas, no le cambies el tono.
- Traduce con naturalidad, no palabra por palabra. Debe sonar a como lo escribiría la iglesia, no a traducción automática.
- Es contexto cristiano evangélico. Usa el vocabulario habitual de iglesia en cada idioma ("alabanza"/"worship", "ministerio"/"ministry", "célula"/"small group").
- Conserva nombres propios, lugares, horas y números exactamente igual.
- Mantén una longitud parecida al original: es texto para tarjetas de una página web.
- No añadas información que no esté en el original ni comentarios tuyos.`;

/** Huella del texto ya traducido, para no repetir la llamada sin necesidad. */
function hashSource(title, description) {
  return createHash("sha256")
    .update([title, description].join(" "))
    .digest("hex")
    .slice(0, 16);
}

function readString(doc, key) {
  const value = doc.get(key);
  return typeof value === "string" ? value : "";
}

async function translate(client, title, description) {
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    // Traducir un par de frases no necesita razonamiento profundo; con
    // esfuerzo bajo la respuesta llega antes y cuesta menos.
    output_config: {
      effort: "low",
      format: { type: "json_schema", schema: TRANSLATION_SCHEMA },
    },
    messages: [
      {
        role: "user",
        content: `Título: ${title}\n\nDescripción: ${description}`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("la API rechazó el contenido");
  }

  const text = response.content.find((block) => block.type === "text")?.text;
  if (!text) throw new Error("la respuesta no traía texto");

  return JSON.parse(text);
}

async function processFile(client, filePath) {
  const raw = await readFile(filePath, "utf8");
  // parseDocument (en vez de parse) conserva el formato y los comentarios del
  // archivo: solo se tocan los campos que cambian.
  const doc = parseDocument(raw);

  const title = readString(doc, "title");
  const description = readString(doc, "description");
  if (!title || !description) {
    return { status: "skipped", reason: "sin título o descripción" };
  }

  const hash = hashSource(title, description);
  const alreadyDone =
    doc.get("translationStatus") === "ok" &&
    doc.get("translationHash") === hash &&
    readString(doc, "titleEn") &&
    readString(doc, "descriptionEn");

  if (alreadyDone) return { status: "unchanged" };

  try {
    const result = await translate(client, title, description);

    // Normalización: el español manda en title/description y el inglés en los
    // campos *En, sin importar en qué idioma se escribió el original.
    doc.set("title", result.es.title);
    doc.set("description", result.es.description);
    doc.set("titleEn", result.en.title);
    doc.set("descriptionEn", result.en.description);
    doc.set("translationStatus", "ok");
    // La huella se calcula sobre el español final, que es lo que se comparará
    // la próxima vez.
    doc.set(
      "translationHash",
      hashSource(result.es.title, result.es.description),
    );

    await writeFile(filePath, doc.toString(), "utf8");
    return { status: "translated", from: result.sourceLanguage };
  } catch (error) {
    // No se toca el contenido: el evento sigue publicado en su idioma y el
    // sitio muestra el español en ambas versiones hasta que esto se arregle.
    doc.set("translationStatus", "failed");
    await writeFile(filePath, doc.toString(), "utf8");
    return { status: "failed", error: error.message };
  }
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      "Falta ANTHROPIC_API_KEY. Añádela en GitHub → Settings → Secrets and variables → Actions.",
    );
    // Sin clave no hay nada que hacer, pero tampoco se rompe la publicación.
    process.exit(0);
  }

  const client = new Anthropic();

  let entries;
  try {
    entries = await readdir(EVENTS_DIR);
  } catch {
    console.log(`No existe ${EVENTS_DIR}; nada que traducir.`);
    return;
  }

  const files = entries
    .filter((name) => name.endsWith(".yaml") || name.endsWith(".yml"))
    .map((name) => path.join(EVENTS_DIR, name));

  const failures = [];
  for (const file of files) {
    const result = await processFile(client, file);
    switch (result.status) {
      case "translated":
        console.log(`✅ ${file} — traducido (original en ${result.from})`);
        break;
      case "unchanged":
        console.log(`⏭️  ${file} — ya estaba traducido`);
        break;
      case "skipped":
        console.log(`⏭️  ${file} — ${result.reason}`);
        break;
      case "failed":
        console.warn(`⚠️  ${file} — falló: ${result.error}`);
        failures.push(`${file}: ${result.error}`);
        break;
    }
  }

  if (failures.length > 0) {
    const summary = [
      "### ⚠️ Traducciones fallidas",
      "",
      "Los eventos siguen publicados y se muestran en español en ambos idiomas.",
      "",
      ...failures.map((f) => `- ${f}`),
    ].join("\n");
    console.warn(`\n${summary}`);
    // Se deja constancia visible en GitHub sin marcar el workflow como
    // fallido: un fallo de traducción no es un fallo de publicación.
    if (process.env.GITHUB_STEP_SUMMARY) {
      await writeFile(process.env.GITHUB_STEP_SUMMARY, summary, {
        flag: "a",
      });
    }
  }
}

await main();

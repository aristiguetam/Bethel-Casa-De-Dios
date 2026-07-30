import "server-only";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import type { Locale } from "@/i18n/routing";

// Los eventos ya no viven en este archivo ni repartidos por messages/{es,en}.json:
// son archivos en content/events/, que la iglesia edita desde /keystatic.
// Aquí solo se leen, se traducen al idioma pedido y se separan en próximos y
// pasados.
const reader = createReader(process.cwd(), keystaticConfig);

// La congregación está en Florida. Para decidir si un evento "ya pasó" hay que
// usar su día, no el del servidor: con UTC, un evento dejaría de ser próximo a
// las 8 de la noche del día anterior, hora local.
const CHURCH_TIMEZONE = "America/New_York";

export type Event = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Fecha ISO (YYYY-MM-DD). */
  startDate: string;
  /** Fecha ISO de fin, si el evento dura varios días. */
  endDate: string | null;
  time: string | null;
  location: string | null;
  link: string | null;
  featured: boolean;
};

/** Hoy en formato YYYY-MM-DD, comparable como texto con las fechas ISO. */
function today(): string {
  // "en-CA" es el atajo estándar para obtener YYYY-MM-DD de Intl.
  return new Intl.DateTimeFormat("en-CA", { timeZone: CHURCH_TIMEZONE }).format(
    new Date(),
  );
}

/** Último día del evento: el de fin si dura varios, si no el de inicio. */
function lastDay(event: Pick<Event, "startDate" | "endDate">): string {
  return event.endDate ?? event.startDate;
}

/**
 * Las fechas se guardan como YYYY-MM-DD (un día, sin hora). Se interpretan en
 * UTC a propósito y luego se formatean también en UTC: si se dejara la zona
 * local, "2026-05-10" se convertiría en las 20:00 del día 9 en Florida y las
 * tarjetas mostrarían un día menos.
 */
function parseDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export type EventDateBadge = { day: string; month: string };

/** Día y mes abreviado para el recuadro de fecha de las tarjetas. */
export function eventDateBadge(event: Event, locale: Locale): EventDateBadge {
  const date = parseDate(event.startDate);
  const month = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  })
    .format(date)
    // Español abrevia con punto ("sept.") y en minúscula; el diseño los pide
    // en mayúsculas y sin punto.
    .replace(".", "")
    .toUpperCase();

  return {
    day: new Intl.DateTimeFormat(locale, {
      day: "numeric",
      timeZone: "UTC",
    }).format(date),
    month,
  };
}

/**
 * Texto completo de la fecha, en el formato natural de cada idioma:
 *   es → "10 de mayo de 2026 · 7:00 PM"
 *   en → "May 10, 2026 · 7:00 PM"
 *
 * Para los eventos de varios días se usa `formatRange`, que colapsa lo que se
 * repite ("15 de julio – 15 de agosto de 2026") en vez de repetir el año.
 */
export function formatEventSchedule(event: Event, locale: Locale): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const start = parseDate(event.startDate);
  let label = event.endDate
    ? formatter.formatRange(start, parseDate(event.endDate))
    : formatter.format(start);

  if (event.time) label += ` · ${event.time}`;
  return label;
}

type EventEntry = Awaited<
  ReturnType<typeof reader.collections.events.all>
>[number];

/**
 * Los campos que rellena la traducción automática están declarados como
 * `fields.ignored()` en el CMS —invisibles en el formulario, pero conservados
 * en el archivo—, así que el lector los entrega sin tipar.
 */
function asText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toEvent(entry: EventEntry, locale: Locale): Event {
  const e = entry.entry;
  const isSpanish = locale === "es";
  return {
    slug: entry.slug,
    // La traducción tarda un par de minutos en llegar, y puede fallar. Hasta
    // que exista, la versión en inglés muestra el texto en español en vez de
    // dejar la tarjeta vacía.
    title: isSpanish ? e.title : asText(e.titleEn) || e.title,
    description: isSpanish
      ? e.description
      : asText(e.descriptionEn) || e.description,
    // La foto es obligatoria en el panel, pero el tipo la deja opcional.
    image: e.image ?? "",
    startDate: e.startDate,
    endDate: e.endDate,
    // El panel guarda los campos de texto vacíos como "", que aquí conviene
    // tratar como "no hay dato".
    time: e.time || null,
    location: e.location || null,
    link: e.link || null,
    featured: e.featured,
  };
}

export type SplitEvents = {
  /** Aún no han terminado. Del más próximo al más lejano. */
  upcoming: Event[];
  /** Ya terminaron. Del más reciente al más antiguo. */
  past: Event[];
};

export async function getEvents(locale: Locale): Promise<SplitEvents> {
  const entries = await reader.collections.events.all();
  const now = today();

  const events = entries
    // Los que están sin publicar quedan guardados pero no salen en el sitio.
    .filter((entry) => entry.entry.published)
    .map((entry) => toEvent(entry, locale));

  const upcoming = events
    .filter((event) => lastDay(event) >= now)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const past = events
    .filter((event) => lastDay(event) < now)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  return { upcoming, past };
}

export type HomepageEventSelection = {
  featured: Event | null;
  rest: Event[];
};

/** Selección para la portada: el destacado grande y hasta dos más al lado. */
export function pickHomepageEvents(upcoming: Event[]): HomepageEventSelection {
  if (upcoming.length === 0) return { featured: null, rest: [] };
  const featured = upcoming.find((event) => event.featured) ?? upcoming[0];
  const rest = upcoming.filter((event) => event !== featured).slice(0, 2);
  return { featured, rest };
}

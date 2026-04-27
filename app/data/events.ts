import { useTranslations } from "next-intl";

export const eventIds = ["couplesWorkshop", "summerKidsCamp"] as const;

export type EventId = (typeof eventIds)[number];

export type EventMeta = {
  id: EventId;
  image: string;
  featured: boolean;
  ministry?: string;
  link?: string;
};

export type Event = EventMeta & {
  title: string;
  description: string;
  day: string;
  month: string;
  endDay?: string;
  endMonth?: string;
  year?: string;
  endYear?: string;
  time?: string;
  location?: string;
};

export const events: EventMeta[] = [
  {
    id: "couplesWorkshop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjT6qg99WtwYapSoLcGWog-czVAMgcYRCtP-_ILCENr2Gfffm3Od-FdOVTkzKtNso5VGBTA9CEzxfaIJ_oolapxazCKvnfGaN_Z4xvvI5rVkjRLKokxdpUmf8_5mnUfiaYcvne-Ml8p1KEy_e9jKs0V7OfmlT6crA_kVE4H4_Ne3YeIrztVFl4VChPbY5dvVxY8SA1IwzgI2Gzo8NPKQTOEbU8JJguJaOoxCQHDAmFbZlXGn_BotMQVqr-9D_0QAZy3rgbtbzdpdY7",
    featured: true,
    ministry: "marriage",
  },
  {
    id: "summerKidsCamp",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD226TOhTR9VG9yT7-Y6p7GEUPLeH3q09OROy7uMPGonkXG_6_mHghgJscsdt35bA_9o0Z6EQxHDt70xBtmpUrRiUDLcRZxHnWmBbJ-V1sq8NfyF20MnyL-QurI6fUl7_YX6Jhcr-RYS93qk1QCtPSLIFcOEtPzQouIwi18rdXy0tmThzVMcTdbq4VGco5daBpU3UrGHjIIrSCV-KWVSZv6lqCk50eRUWt539U7MnlJB7NS0uKsvA0OpFDfCXVNYcUipWHW58mHCIid",
    featured: false,
    ministry: "kids",
  },
];

const optionalKeys = [
  "endDay",
  "endMonth",
  "year",
  "endYear",
  "time",
  "location",
] as const;

export function useEvents(): Event[] {
  const t = useTranslations("Events.list");
  return events.map((event) => {
    const base: Event = {
      ...event,
      title: t(`${event.id}.title`),
      description: t(`${event.id}.description`),
      day: t(`${event.id}.day`),
      month: t(`${event.id}.month`),
    };
    for (const key of optionalKeys) {
      const path = `${event.id}.${key}` as const;
      if (t.has(path)) base[key] = t(path);
    }
    return base;
  });
}

export function formatEventSchedule(event: Event): string {
  const startMonth = event.month;
  const endMonth = event.endMonth ?? startMonth;
  const hasRange = Boolean(
    event.endDay || (event.endMonth && event.endMonth !== event.month),
  );

  let label = `${startMonth} ${event.day}`;
  if (hasRange) {
    const endDay = event.endDay ?? event.day;
    label = `${startMonth} ${event.day} – ${endMonth} ${endDay}`;
  }
  const year = event.endYear ?? event.year;
  if (year) label += `, ${year}`;
  if (event.time) label += ` · ${event.time}`;
  return label;
}

export type HomepageEventSelection = {
  featured: Event | null;
  rest: Event[];
};

export function pickHomepageEvents(events: Event[]): HomepageEventSelection {
  if (events.length === 0) return { featured: null, rest: [] };
  const featured = events.find((event) => event.featured) ?? events[0];
  const rest = events
    .filter((event) => event !== featured && !event.featured)
    .slice(0, 2);
  return { featured, rest };
}

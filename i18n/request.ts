import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export const locales = ["es", "en"] as const;
export const defaultLocale = "es";
export const cookieName = "NEXT_LOCALE";

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

function detectFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const preferred = header
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .find((tag) => tag && tag.length > 0);
  if (preferred && preferred.startsWith("en")) return "en";
  return defaultLocale;
}

export async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get(cookieName)?.value;
  if (isLocale(stored)) return stored;

  const headerStore = await headers();
  return detectFromAcceptLanguage(headerStore.get("accept-language"));
}

export default getRequestConfig(async () => {
  const locale = await resolveLocale();
  const messages = (await import(`../messages/${locale}.json`)).default;
  return {
    locale,
    messages,
  };
});

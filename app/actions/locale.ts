"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { cookieName, isLocale } from "@/i18n/request";

export async function setLocale(locale: string) {
  if (!isLocale(locale)) return;
  const cookieStore = await cookies();
  cookieStore.set(cookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "../actions/locale";
import { cn } from "./cn";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Nav");
  const [isPending, startTransition] = useTransition();

  const next = locale === "en" ? "es" : "en";
  const label = locale === "en" ? "EN" : "ES";

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(() => {
          void setLocale(next);
        })
      }
      aria-label={t("switchLanguage")}
      aria-busy={isPending}
      className={cn(
        "font-label-sm uppercase tracking-widest text-xs text-on-surface-variant hover:text-primary transition-opacity duration-300",
        isPending && "opacity-60",
        className,
      )}
    >
      {label}
    </button>
  );
}

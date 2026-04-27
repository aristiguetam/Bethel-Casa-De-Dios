import type { HTMLAttributes } from "react";
import { cn } from "./cn";

type Tone = "gold" | "neutral" | "blue";

const toneStyles: Record<Tone, string> = {
  gold: "bg-secondary-container/50 text-on-secondary-container",
  neutral: "bg-surface-container-high text-on-surface-variant",
  blue: "bg-primary-fixed text-on-primary-fixed-variant",
};

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Chip({
  tone = "gold",
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1",
        "text-label-sm uppercase",
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

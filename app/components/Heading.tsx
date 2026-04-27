import type { HTMLAttributes } from "react";
import { cn } from "./cn";

type Level = "display" | "h1" | "h2" | "h3";

const levelToTag: Record<Level, "h1" | "h2" | "h3"> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
};

const levelToClass: Record<Level, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  as?: "h1" | "h2" | "h3" | "h4";
}

export function Heading({
  level = "h2",
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as ?? levelToTag[level];
  return (
    <Tag
      className={cn(
        "font-display text-on-surface tracking-tight",
        levelToClass[level],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-label-sm uppercase text-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

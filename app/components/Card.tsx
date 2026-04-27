import type { HTMLAttributes } from "react";
import { cn } from "./cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  featured?: boolean;
  interactive?: boolean;
}

export function Card({
  featured = false,
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-surface-container-lowest text-on-surface rounded-xl",
        "shadow-ambient overflow-hidden",
        featured &&
          "before:absolute before:inset-x-0 before:top-0 before:h-1 " +
            "before:bg-secondary-container before:content-['']",
        interactive &&
          "transition-shadow duration-200 hover:shadow-ambient-lg cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 flex flex-col gap-3", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-h3 text-on-surface", className)}
      {...props}
    />
  );
}

export function CardMeta({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-label-sm uppercase text-on-surface-variant", className)}
      {...props}
    />
  );
}

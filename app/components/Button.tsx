import type { ButtonHTMLAttributes } from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold " +
  "transition-colors transition-shadow duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-primary focus-visible:ring-offset-surface " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-ambient hover:bg-primary-container " +
    "active:bg-on-primary-fixed-variant",
  secondary:
    "border border-secondary-container text-primary bg-transparent " +
    "hover:bg-secondary-container/40 active:bg-secondary-container/60",
  ghost:
    "text-primary bg-transparent hover:bg-surface-container-high " +
    "active:bg-surface-container-highest",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-label-sm",
  md: "h-11 px-5 text-body-md",
  lg: "h-12 px-6 text-body-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  );
}

import type { HTMLAttributes } from "react";
import { cn } from "./cn";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  filled?: boolean;
}

export function Icon({ name, filled, className, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "material-symbols-outlined select-none",
        filled && "filled",
        className,
      )}
      {...props}
    >
      {name}
    </span>
  );
}

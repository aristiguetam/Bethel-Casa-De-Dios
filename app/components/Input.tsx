import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "./cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  id,
  className,
  ...props
}: InputProps) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-label-sm uppercase text-on-surface-variant"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-11 w-full rounded-md bg-surface-container-low px-3 text-body-md",
          "text-on-surface placeholder:text-on-surface-variant/60",
          "border border-outline-variant transition-colors",
          "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
          error && "border-error focus:border-error focus:ring-error/20",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-label-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${inputId}-hint`}
          className="text-label-sm text-on-surface-variant normal-case tracking-normal"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

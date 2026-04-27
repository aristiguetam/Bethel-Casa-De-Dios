import { Icon } from "./Icon";
import { cn } from "./cn";

export type ScheduleCardProps = {
  icon: string;
  day: string;
  title: string;
  time: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function ScheduleCard({
  icon,
  day,
  title,
  time,
  disabled = false,
  className,
  style,
}: ScheduleCardProps) {
  return (
    <div
      aria-disabled={disabled || undefined}
      style={style}
      className={cn(
        "p-8 rounded-3xl border flex flex-col items-center text-center transition-all duration-300",
        disabled
          ? "bg-surface-container-low border-outline-variant/20 opacity-55 cursor-default saturate-0"
          : "bg-white border-outline-variant/40 shadow-sm hover:shadow-xl hover:scale-[1.03]",
        className,
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-5",
          disabled ? "bg-surface-container-high" : "bg-primary-fixed",
        )}
      >
        <Icon
          name={icon}
          className={cn(
            "text-3xl",
            disabled ? "text-on-surface-variant blur-[1px]" : "text-primary",
          )}
        />
      </div>
      <span
        className={cn(
          "font-label-sm uppercase tracking-widest text-xs mb-2",
          disabled ? "text-on-surface-variant/70" : "text-secondary",
        )}
      >
        {day}
      </span>
      <h3
        className={cn(
          "font-display text-h3 mb-2",
          disabled ? "text-on-surface-variant" : "text-primary",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm",
          disabled ? "text-on-surface-variant/60" : "text-on-surface-variant",
        )}
      >
        {time}
      </p>
    </div>
  );
}

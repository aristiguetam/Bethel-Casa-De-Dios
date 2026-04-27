import { cn } from "./cn";

interface DonationProgressProps {
  raised: number;
  goal: number;
  label?: string;
  className?: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function DonationProgress({
  raised,
  goal,
  label,
  className,
}: DonationProgressProps) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-label-sm uppercase text-on-surface-variant">
          {label ?? "Toward our goal"}
        </span>
        <span className="text-body-md text-on-surface">
          <span className="font-semibold">{formatCurrency(raised)}</span>
          <span className="text-on-surface-variant"> / {formatCurrency(goal)}</span>
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="h-2 w-full rounded-full bg-surface-container-high overflow-hidden"
      >
        <div
          className="h-full bg-secondary-container-dim rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%`, backgroundColor: "var(--color-secondary-fixed-dim)" }}
        />
      </div>
    </div>
  );
}

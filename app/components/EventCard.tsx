import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import {
  eventDateBadge,
  formatEventSchedule,
  type Event,
} from "../data/events";
import { Icon } from "./Icon";
import { cn } from "./cn";

type EventCardVariant = "upcoming" | "past";

type EventCardProps = {
  event: Event;
  locale: Locale;
  /**
   * "past" apaga la tarjeta —más chica, en escala de grises— para que la vista
   * se vaya sola a los eventos próximos sin tener que esconder los pasados.
   */
  variant?: EventCardVariant;
};

export function EventCard({
  event,
  locale,
  variant = "upcoming",
}: EventCardProps) {
  const isPast = variant === "past";
  const { day, month } = eventDateBadge(event, locale);

  return (
    <article
      className={cn(
        "bg-white rounded-xl shadow-sm border border-surface-variant overflow-hidden flex flex-col group",
        isPast && "opacity-75 hover:opacity-100 transition-opacity",
      )}
    >
      <div className={cn("relative overflow-hidden", isPast ? "h-36" : "h-48")}>
        <Image
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-110",
            isPast && "grayscale group-hover:grayscale-0",
          )}
          src={event.image}
          alt={event.title}
          fill
          sizes={
            isPast
              ? "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          }
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-center">
          <span className="block font-bold text-primary leading-none">
            {day}
          </span>
          <span className="text-[10px] uppercase font-bold text-on-surface-variant">
            {month}
          </span>
        </div>
      </div>

      <div className={cn("flex-1", isPast ? "p-5" : "p-6")}>
        <h3
          className={cn(
            "font-display text-primary mb-2",
            isPast ? "text-lg" : "text-h3 text-xl",
          )}
        >
          {event.title}
        </h3>
        <p
          className={cn(
            "font-sans text-on-surface-variant",
            isPast
              ? "text-body-sm line-clamp-2 mb-4"
              : "text-body-md line-clamp-3 mb-6",
          )}
        >
          {event.description}
        </p>
        <div className="flex flex-wrap items-center text-on-surface-variant font-label-sm gap-x-4 gap-y-1 border-t border-surface-variant pt-4">
          <div className="flex items-center gap-1">
            <Icon name="calendar_today" className="text-[16px]" />
            <span>{formatEventSchedule(event, locale)}</span>
          </div>
          {event.location ? (
            <div className="flex items-center gap-1">
              <Icon name="location_on" className="text-[16px]" />
              <span>{event.location}</span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

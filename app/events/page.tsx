import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Icon } from "../components";
import { formatEventSchedule, useEvents } from "../data/events";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Events");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function EventsPage() {
  const t = useTranslations("Events");
  const events = useEvents();

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[450px] flex items-center justify-center text-center px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 38, 63, 0.8), rgba(0, 38, 63, 0.4)), url('https://images.unsplash.com/photo-1548625361-125ee297493b?q=80&w=2600&auto=format&fit=crop') center/cover",
        }}
      >
        <div className="max-w-3xl">
          <h1 className="font-display text-h1 text-white mb-4">
            {t("heroHeading")}
          </h1>
          <p className="font-sans text-body-lg text-white/90 mb-8 max-w-xl mx-auto">
            {t("heroBody")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-label-sm shadow-md hover:opacity-90 transition-opacity">
              {t("viewCalendar")}
            </button>
            <button className="px-8 py-3 border border-white text-white rounded-lg font-label-sm backdrop-blur-sm hover:bg-white/10 transition-colors">
              {t("joinMinistry")}
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Calendar */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-display text-h2 text-primary">
                {t("calendarHeading")}
              </h2>
              <p className="font-sans text-body-md text-on-surface-variant mt-2">
                {t("calendarBody")}
              </p>
            </div>
          </div>

          {events.length === 0 ? (
            <p className="text-center text-on-surface-variant text-body-lg italic py-12">
              {t("noEvents")}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-surface-variant overflow-hidden flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-center">
                      <span className="block font-bold text-primary leading-none">
                        {event.day}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                        {event.month}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <h4 className="font-display text-h3 text-xl mb-2 text-primary">
                      {event.title}
                    </h4>
                    <p className="font-sans text-body-md text-on-surface-variant line-clamp-3 mb-6">
                      {event.description}
                    </p>
                    <div className="flex items-center text-on-surface-variant font-label-sm gap-4 border-t border-surface-variant pt-4">
                      <div className="flex items-center gap-1">
                        <Icon name="calendar_today" className="text-[16px]" />
                        <span>{formatEventSchedule(event)}</span>
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-primary rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="relative z-10 md:w-1/2 text-center md:text-left">
            <h2 className="font-display text-h2 text-white mb-4">
              {t("newsletterHeading")}
            </h2>
            <p className="font-sans text-body-md text-white/80">
              {t("newsletterBody")}
            </p>
          </div>
          <form className="relative z-10 md:w-1/2 w-full flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-container"
              placeholder={t("newsletterPlaceholder")}
              type="email"
              aria-label={t("newsletterEmailLabel")}
            />
            <button
              type="submit"
              className="bg-secondary-container text-on-secondary-container font-label-sm px-8 py-3 rounded-lg hover:brightness-110 transition-all"
            >
              {t("newsletterSubmit")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

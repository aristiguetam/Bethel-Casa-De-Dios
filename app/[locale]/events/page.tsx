import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/i18n/metadata";
import { toLocale, type Locale } from "@/i18n/routing";
import { EventCard, Icon } from "../../components";
import { getEvents, type Event } from "../../data/events";

// La página es estática, así que "hoy" quedaría congelado en el momento del
// build: sin esto, un evento que venció seguiría apareciendo en "Próximos"
// hasta el siguiente despliegue. Regenerándola cada hora, se muda solo.
export const revalidate = 3600;

// Cuántos eventos pasados se ven de entrada; el resto queda tras "ver más",
// para que la sección no crezca sin límite con los años.
const PAST_EVENTS_VISIBLE = 8;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/events">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Events" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/events", locale),
  };
}

export default async function EventsPage({
  params,
}: PageProps<"/[locale]/events">) {
  const locale = toLocale((await params).locale);
  // Fija el locale para que la página siga generándose estáticamente.
  setRequestLocale(locale);

  // Los eventos se leen aquí, en el componente async, y bajan por props: así el
  // cuerpo de la página sigue siendo síncrono y puede usar useTranslations.
  const { upcoming, past } = await getEvents(locale);

  return <EventsPageContent locale={locale} upcoming={upcoming} past={past} />;
}

function EventsPageContent({
  locale,
  upcoming,
  past,
}: {
  locale: Locale;
  upcoming: Event[];
  past: Event[];
}) {
  const t = useTranslations("Events");
  const recentPast = past.slice(0, PAST_EVENTS_VISIBLE);
  const olderPast = past.slice(PAST_EVENTS_VISIBLE);

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

          {upcoming.length === 0 ? (
            <p className="text-center text-on-surface-variant text-body-lg italic py-12">
              {t("noEvents")}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard key={event.slug} event={event} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Eventos pasados — nadie los mueve aquí a mano: entran solos cuando su
          última fecha queda atrás. Se ocultan por completo si no hay ninguno. */}
      {past.length > 0 ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="font-display text-h2 text-primary">
                {t("pastHeading")}
              </h2>
              <p className="font-sans text-body-md text-on-surface-variant mt-2">
                {t("pastBody")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPast.map((event) => (
                <EventCard
                  key={event.slug}
                  event={event}
                  locale={locale}
                  variant="past"
                />
              ))}
            </div>

            {/* El resto va detrás de un <details>: es HTML nativo, así que
                funciona sin JavaScript y sin convertir la página en cliente. */}
            {olderPast.length > 0 ? (
              <details className="group mt-8">
                <summary className="cursor-pointer list-none inline-flex items-center gap-2 text-primary font-label-sm hover:opacity-80 transition-opacity">
                  {t("showMorePast")}
                  <Icon
                    name="expand_more"
                    className="text-[18px] transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                  {olderPast.map((event) => (
                    <EventCard
                      key={event.slug}
                      event={event}
                      locale={locale}
                      variant="past"
                    />
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        </section>
      ) : null}

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

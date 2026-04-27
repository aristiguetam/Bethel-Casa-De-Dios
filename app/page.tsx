import Link from "next/link";
import { useTranslations } from "next-intl";
import { Icon, LatestMessage, ScheduleCard } from "./components";
import { formatEventSchedule, pickHomepageEvents, useEvents } from "./data/events";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDUnxdyOqvXYQIvDNPmhlIzUYSV6LAS7wG_3VSt9D1-ovrXpI43Kjhr2lFnZ5mgQRQVXNzeurLJ3yxjIXj6-_efkER7Gdg95ev0wROuWDhl8N1JhmbYPwAkkETA7_KhN63pgk-fY5jHPJ7qoSaUioKcleQimMZengysJ9ANAkG2bk9FbNy7PHkl8miPX9PMeK61RXJP-KbLegHST_YCaooeRwQvUBGredccgD6sI0JhEaAbve3iP5V8DkfSOkIJbfqPW_QfKwjwbWOt";

export default function Home() {
  const t = useTranslations("Home");
  const allEvents = useEvents();
  const { featured: featuredEvent, rest: restEvents } =
    pickHomepageEvents(allEvents);

  const pillars = [
    {
      icon: "temple_buddhist",
      title: t("pillarWorshipTitle"),
      body: t("pillarWorshipBody"),
    },
    {
      icon: "groups",
      title: t("pillarCommunityTitle"),
      body: t("pillarCommunityBody"),
    },
    {
      icon: "trending_up",
      title: t("pillarGrowthTitle"),
      body: t("pillarGrowthBody"),
    },
  ];

  const weeklySchedule = [
    {
      icon: "self_improvement",
      day: t("schedulePrayerDay"),
      title: t("schedulePrayerTitle"),
      time: t("schedulePrayerTime"),
    },
    {
      icon: "menu_book",
      day: t("scheduleBibleDay"),
      title: t("scheduleBibleTitle"),
      time: t("scheduleBibleTime"),
    },
    {
      icon: "groups",
      day: t("scheduleYouthDay"),
      title: t("scheduleYouthTitle"),
      time: t("scheduleYouthTime"),
    },
    {
      icon: "event_busy",
      day: t("scheduleSaturdayDay"),
      title: t("scheduleStatus"),
      time: t("scheduleClosed"),
      disabled: true,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover scale-105"
            src={HERO_IMG}
            alt={t("heroAlt")}
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="mx-auto max-w-[340px] text-center md:mx-0 md:max-w-3xl md:text-left">
            <span className="inline-block text-secondary-fixed mb-4 font-label-sm uppercase tracking-[0.3em]">
              {t("heroEyebrow")}
            </span>
            <h1 className="font-display text-[2.25rem] md:text-h1 text-white font-normal leading-tight mb-5 md:mb-6">
              {t("heroHeadlineLine1")}
              <br />
              <span className="italic">{t("heroHeadlineLine2")}</span>
            </h1>
            <p className="font-sans text-body-md md:text-body-lg text-white/80 mb-8 md:mb-10 md:max-w-xl">
              {t("heroBody")}
            </p>
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
              <Link
                href="/contact"
                className="inline-flex justify-center w-full max-w-[280px] md:w-auto md:max-w-none bg-secondary-container text-on-secondary-container px-7 py-3 rounded-lg font-label-sm shadow-xl hover:brightness-110 hover:-translate-y-0.5 transition-all"
              >
                {t("heroCtaPrimary")}
              </Link>
              <a
                href="#latest-message"
                className="inline-flex justify-center w-full max-w-[280px] md:w-auto md:max-w-none border border-white text-white px-7 py-3 rounded-lg font-label-sm hover:bg-white/10 transition-colors"
              >
                {t("heroCtaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Join Us card */}
      <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 border-b-8 border-secondary-container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-block bg-secondary/5 text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              {t("weeklyEyebrow")}
            </div>
            <h2 className="font-display text-h2 text-primary mb-6">
              {t("joinSundayHeading")}
            </h2>
            <p className="text-on-surface-variant text-body-lg leading-relaxed">
              {t("joinSundayBody")}
            </p>
          </div>

          <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-2xl space-y-8">
            <div className="flex items-start gap-5">
              <div className="bg-primary text-white p-3 rounded-xl shadow-lg shrink-0">
                <Icon name="schedule" />
              </div>
              <div>
                <p className="font-bold text-primary text-lg">{t("serviceTimesLabel")}</p>
                <p className="text-on-surface-variant">{t("serviceSpanish")}</p>
                <p className="text-on-surface-variant">{t("serviceBilingual")}</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="bg-secondary text-white p-3 rounded-xl shadow-lg shrink-0">
                <Icon name="location_on" />
              </div>
              <div>
                <p className="font-bold text-primary text-lg">{t("locationLabel")}</p>
                <p className="text-on-surface-variant">
                  {t("locationAddress")}
                </p>
              </div>
            </div>
            <Link
              href="/visit"
              className="block w-full text-center bg-primary text-on-primary py-5 rounded-xl font-label-sm hover:bg-primary-container transition-all shadow-lg hover:shadow-xl"
            >
              {t("planVisit")}
            </Link>
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="max-w-7xl mx-auto px-8 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-label-sm uppercase tracking-[0.4em]">
            {t("rhythmEyebrow")}
          </span>
          <h2 className="font-display text-h2 text-primary mt-4">
            {t("rhythmHeading")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeklySchedule.map((item, i) => (
            <ScheduleCard
              key={item.title}
              {...item}
              className="fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </section>

      {/* Mission / Core Pillar */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-label-sm uppercase tracking-[0.4em]">
            {t("pillarsEyebrow")}
          </span>
          <h2 className="font-display text-h2 text-primary mt-4 mb-6 italic">
            {t("pillarsHeading")}
          </h2>
          <p className="text-on-surface-variant text-body-lg italic">
            {t("pillarsQuote")}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group bg-white p-10 rounded-3xl border border-outline-variant/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-surface-container-low group-hover:bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-colors">
                <Icon name={p.icon} className="text-primary text-4xl" />
              </div>
              <h3 className="font-display text-h3 text-primary mb-4">
                {p.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Message */}
      <LatestMessage />

      {/* Upcoming Events */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-16 gap-6 flex-wrap">
          <div>
            <span className="text-secondary font-label-sm uppercase tracking-widest">
              {t("communityEyebrow")}
            </span>
            <h2 className="font-display text-h2 text-primary mt-2">
              {t("upcomingEvents")}
            </h2>
          </div>
          <Link
            href="/events"
            className="text-primary font-label-sm flex items-center gap-2 group"
          >
            {t("viewAllEvents")}
            <Icon
              name="arrow_forward"
              className="text-sm group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
        {featuredEvent ? (
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden shadow-xl min-h-[400px]">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={featuredEvent.image}
                alt={featuredEvent.title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block tracking-wider">
                  {t("featuredBadge")}
                </span>
                <h3 className="text-white font-display text-3xl mb-3">
                  {featuredEvent.title}
                </h3>
                <p className="text-white/80 mb-6 flex items-center gap-2">
                  <Icon name="calendar_today" className="text-sm" />
                  {formatEventSchedule(featuredEvent)}
                </p>
                <Link
                  href={featuredEvent.link ?? "/events"}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/40 px-8 py-3 rounded-full font-label-sm hover:bg-white hover:text-primary transition-all"
                >
                  {t("learnMore")}
                </Link>
              </div>
            </div>
            {restEvents.map((event) => (
              <div
                key={event.id}
                className="md:col-span-2 bg-white p-8 rounded-3xl border border-outline-variant/40 flex gap-8 items-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-primary/5 rounded-2xl p-5 text-center min-w-[100px] border border-primary/10">
                  <span className="block text-primary font-bold text-3xl leading-none mb-1">
                    {event.day}
                  </span>
                  <span className="text-on-surface-variant text-xs uppercase font-bold tracking-widest">
                    {event.month}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-xl mb-2">
                    {event.title}
                  </h4>
                  <p className="text-on-surface-variant flex items-center gap-2 text-sm italic">
                    <Icon name="calendar_today" className="text-sm" />{" "}
                    {formatEventSchedule(event)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-on-surface-variant text-body-lg italic py-12">
            {t("noUpcomingEvents")}
          </p>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-surface-container-low py-24 px-8 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 opacity-5 pointer-events-none">
          <Icon name="all_inclusive" className="text-[20rem] font-thin" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 shadow-2xl text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-secondary-container" />
            <div className="mb-10">
              <h2 className="font-display text-4xl mb-4 italic">
                {t("newsletterHeading")}
              </h2>
              <p className="text-white/70 max-w-lg mx-auto leading-relaxed">
                {t("newsletterBody")}
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-full px-8 py-5 focus:ring-2 focus:ring-secondary-container focus:border-transparent transition-all outline-none backdrop-blur-sm"
                placeholder={t("newsletterPlaceholder")}
                type="email"
                aria-label={t("newsletterEmailLabel")}
              />
              <button
                className="bg-secondary-container text-on-secondary-container px-12 py-5 rounded-full font-label-sm font-bold hover:brightness-110 transition-all shadow-lg"
                type="submit"
              >
                {t("newsletterSubmit")}
              </button>
            </form>
            <p className="mt-8 text-white/40 text-xs uppercase tracking-widest">
              {t("newsletterDisclaimer")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

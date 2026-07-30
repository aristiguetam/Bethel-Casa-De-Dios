import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/i18n/metadata";
import { toLocale } from "@/i18n/routing";
import { Icon } from "../../components";

const DIRECTIONS_URL =
  "https://maps.google.com/?q=1000+Foster+Rd,+Hallandale+Beach,+FL+33009";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/visit">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Visit" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/visit", locale),
  };
}

export default async function VisitPage({ params }: PageProps<"/[locale]/visit">) {
  const locale = toLocale((await params).locale);
  // Fija el locale para que la página siga generándose estáticamente.
  setRequestLocale(locale);
  return <VisitPageContent />;
}

function VisitPageContent() {
  const t = useTranslations("Visit");

  const infoCards = [
    { icon: "waving_hand", title: t("expectTitle"), body: t("expectBody") },
    { icon: "schedule", title: t("durationTitle"), body: t("durationBody") },
    { icon: "checkroom", title: t("dressTitle"), body: t("dressBody") },
    { icon: "child_care", title: t("kidsTitle"), body: t("kidsBody") },
    { icon: "translate", title: t("languageTitle"), body: t("languageBody") },
    { icon: "local_parking", title: t("parkingTitle"), body: t("parkingBody") },
  ];

  const checklist = [
    { title: t("checklistItem1Title"), body: t("checklistItem1Body") },
    { title: t("checklistItem2Title"), body: t("checklistItem2Body") },
    { title: t("checklistItem3Title"), body: t("checklistItem3Body") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32 text-center">
          <span className="text-secondary-fixed font-label-sm uppercase tracking-widest block mb-4">
            {t("heroEyebrow")}
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl italic leading-tight mb-6">
            {t("heroHeading")}
          </h1>
          <p className="font-sans text-body-lg text-white/80 max-w-2xl mx-auto">
            {t("heroBody")}
          </p>
        </div>
      </section>

      {/* What to Know */}
      <section className="py-20 md:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-secondary font-label-sm uppercase tracking-widest">
              {t("infoEyebrow")}
            </span>
            <h2 className="font-display text-h2 text-primary mt-3">
              {t("infoHeading")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infoCards.map((card) => (
              <article
                key={card.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/40 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="bg-secondary-container text-on-secondary-container w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Icon name={card.icon} className="text-2xl" />
                </div>
                <h3 className="font-display text-h3 text-primary mb-3">
                  {card.title}
                </h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* First Time Checklist */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-secondary font-label-sm uppercase tracking-widest">
              {t("checklistEyebrow")}
            </span>
            <h2 className="font-display text-h2 text-primary mt-3">
              {t("checklistHeading")}
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {checklist.map((step, i) => (
              <li
                key={step.title}
                className="bg-surface-container-low rounded-2xl p-8 border-t-4 border-secondary-container relative"
              >
                <span
                  aria-hidden
                  className="absolute -top-5 left-8 bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center font-display text-lg shadow-lg"
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-h3 text-primary mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="bg-primary rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-secondary-container" />
            <h2 className="font-display text-h2 mb-4">{t("ctaHeading")}</h2>
            <p className="font-sans text-body-lg text-white/80 max-w-2xl mx-auto mb-4">
              {t("ctaBody")}
            </p>
            <p className="font-sans text-body-md text-white/70 mb-10 flex items-center justify-center gap-2">
              <Icon name="location_on" className="text-base" />
              <span>{t("address")}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center gap-2 bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-label-sm hover:brightness-110 transition-all font-bold"
              >
                <Icon name="directions" className="text-base" />
                {t("ctaDirections")}
              </a>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-label-sm hover:bg-white/10 transition-all"
              >
                <Icon name="mail" className="text-base" />
                {t("ctaContact")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

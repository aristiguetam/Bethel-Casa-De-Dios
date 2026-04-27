import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Icon } from "../components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Prayer");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const PRAYER_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCHZPzLzHO-YodXg3WN-JoRg97yNfH7lWMw4A9SqJl3Z6bw7iNUICTTXuqNpHdyAx5u0wW8HKaVpOItc0y98QnTwlYBKSswp4HbVpb7T0rbGK7bwvyqUa6qcJqfsu6lmAqo8hchIKyRjkedjxkuJeiJLZSoCYYGItnPhy0s5vWx_DR3jb_rwLt9kLtIB2_UqWTRTyVODXojfBBEheyUJ_fineuvuBPegbqGqVzRwcmBC1wszQtqqYkMcuxst25kRpKyJq8bSYbl8iVv";

export default function PrayerPage() {
  const t = useTranslations("Prayer");

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section
        className="relative pt-24 pb-16 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(206, 229, 255, 0.2) 0%, rgba(255, 224, 136, 0.1) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm">
            {t("badge")}
          </span>
          <h1 className="font-display text-h1 text-primary mb-6">
            {t("heading")}
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-secondary-fixed opacity-10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Form + bento */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-xl shadow-[0_4px_20px_rgb(0_38_63_/0.05)] border border-surface-container">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
                <Icon name="favorite" filled className="text-primary" />
              </div>
              <div>
                <h2 className="font-display text-h3 text-primary">
                  {t("submitHeading")}
                </h2>
                <p className="text-on-surface-variant font-sans text-body-md">
                  {t("submitBody")}
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="prayer-name"
                    className="block font-label-sm text-label-sm text-on-surface-variant"
                  >
                    {t("fullName")}
                  </label>
                  <input
                    id="prayer-name"
                    type="text"
                    placeholder={t("fullNamePlaceholder")}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="prayer-email"
                    className="block font-label-sm text-label-sm text-on-surface-variant"
                  >
                    {t("email")}
                  </label>
                  <input
                    id="prayer-email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="prayer-message"
                  className="block font-label-sm text-label-sm text-on-surface-variant"
                >
                  {t("message")}
                </label>
                <textarea
                  id="prayer-message"
                  rows={5}
                  placeholder={t("messagePlaceholder")}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
                <input
                  className="mt-1 rounded border-outline-variant text-primary focus:ring-primary"
                  id="confidential"
                  type="checkbox"
                />
                <label
                  className="text-sm text-on-surface-variant leading-relaxed"
                  htmlFor="confidential"
                >
                  {t("confidential")}
                </label>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-primary text-white px-20 py-4 rounded-full font-label-sm text-label-sm shadow-md hover:bg-primary-container transition-all active:scale-95"
              >
                {t("submit")}
              </button>
            </form>
          </div>

          {/* Bento */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="relative rounded-xl overflow-hidden aspect-video shadow-lg">
              <img
                className="w-full h-full object-cover"
                src={PRAYER_IMG}
                alt={t("imageAlt")}
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-display text-h3 mb-2">
                  {t("powerHeading")}
                </h3>
                <p className="text-primary-fixed text-sm">
                  {t("powerBody")}
                </p>
              </div>
            </div>

            <div className="bg-secondary-fixed/20 p-8 rounded-xl border-l-4 border-secondary">
              <Icon
                name="format_quote"
                filled
                className="text-secondary mb-4"
              />
              <p className="italic font-display text-h3 text-primary leading-snug mb-4">
                {t("quote")}
              </p>
              <cite className="font-label-sm text-label-sm text-secondary not-italic">
                {t("quoteAuthor")}
              </cite>
            </div>

            <div className="bg-white p-6 rounded-xl border border-surface-container-high shadow-sm flex items-center gap-6">
              <div className="flex-1">
                <h4 className="font-display text-h3 text-primary">{t("statValue")}</h4>
                <p className="text-on-surface-variant text-sm">
                  {t("statBody")}
                </p>
              </div>
              <div className="w-16 h-1 bg-secondary-container rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-secondary w-3/4" />
              </div>
            </div>

            <div className="bg-surface-container-highest p-8 rounded-xl">
              <h4 className="font-label-sm text-label-sm text-primary mb-4 flex items-center gap-2">
                <Icon name="verified" className="text-sm" />
                {t("promiseHeading")}
              </h4>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                {t("promiseBody")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

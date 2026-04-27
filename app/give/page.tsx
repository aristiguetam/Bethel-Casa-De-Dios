import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Icon } from "../components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Give");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const VOLUNTEERS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBMyPlSt8hk4a6v4y7HlJ92rvL7UEvIt3DEwRZe51ZwoJ1w4dWECpjmIRtMqMYe7Dputvt1oCqB2BdbLyxNvSIsnTwk7IIc8ogeNfKHVSFAOux7ax0bwpjCMnhWKfPOBQhS_e9nkfOsIolb2zKeo5OqgDCVngOQNmwlS1nFBnpyH2Oef4U6yJpzOtGPnaarr3Y79Sqfm0J1kRHsl_sC-SaU9qQn8clSs3OVvIgxK_n_lCTyW31E__lwVJaJGaITPKahbRW29U07FsyV";

export default function GivePage() {
  const t = useTranslations("Give");

  const servingAreas = [
    { icon: "restaurant", label: t("areaHospitality") },
    { icon: "child_care", label: t("areaKids") },
    { icon: "computer", label: t("areaTech") },
    { icon: "music_note", label: t("areaWorship") },
  ];

  const trustItems = [
    {
      icon: "verified",
      title: t("trustTaxTitle"),
      body: t("trustTaxBody"),
    },
    {
      icon: "visibility",
      title: t("trustTransparencyTitle"),
      body: t("trustTransparencyBody"),
    },
    {
      icon: "public",
      title: t("trustImpactTitle"),
      body: t("trustImpactBody"),
    },
  ];

  const zelleSteps = [t("zelleStep1"), t("zelleStep2"), t("zelleStep3")];

  return (
    <main>
      {/* Hero */}
      <section
        className="h-[400px] flex items-center justify-center text-center px-6 mb-20"
        style={{
          background:
            "linear-gradient(rgba(0, 38, 63, 0.8), rgba(0, 38, 63, 0.4)), url('https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover",
        }}
      >
        <div className="max-w-3xl">
          <h1 className="font-display text-h1 text-white mb-2">{t("heroHeading")}</h1>
          <p className="font-sans text-body-lg text-white/90 italic">
            {t("heroQuote")}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Online giving */}
          <div className="col-span-12 lg:col-span-7 bg-white p-12 rounded-xl shadow-sm border-t-4 border-secondary-container">
            <div className="flex items-center gap-2 mb-6">
              <Icon name="credit_card" className="text-primary" />
              <h3 className="font-display text-h3 text-primary">{t("onlineHeading")}</h3>
            </div>
            <p className="font-sans text-body-md text-on-surface-variant mb-12">
              {t("onlineBody")}
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                    {t("selectAmount")}
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      className="border border-outline-variant py-3 rounded-lg hover:bg-surface-container transition-colors"
                    >
                      $25
                    </button>
                    <button
                      type="button"
                      className="border border-outline-variant py-3 rounded-lg hover:bg-surface-container transition-colors"
                    >
                      $50
                    </button>
                    <button
                      type="button"
                      className="border border-primary bg-primary-fixed-dim/20 py-3 rounded-lg"
                    >
                      $100
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="custom-amount"
                    className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                  >
                    {t("customAmount")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      $
                    </span>
                    <input
                      id="custom-amount"
                      className="w-full pl-12 pr-6 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      placeholder="0.00"
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="ministry-fund"
                  className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                >
                  {t("ministryFund")}
                </label>
                <select
                  id="ministry-fund"
                  className="w-full px-6 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                  <option>{t("fundGeneral")}</option>
                  <option>{t("fundMissions")}</option>
                  <option>{t("fundBuilding")}</option>
                  <option>{t("fundYouth")}</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-6 rounded-lg font-label-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                {t("submitOnline")}
              </button>
            </form>
            <div className="mt-6 flex justify-center items-center gap-3 opacity-50">
              <Icon name="lock" className="text-[16px]" />
              <span className="text-[12px] uppercase tracking-tighter">
                {t("secureNote")}
              </span>
            </div>
          </div>

          {/* Zelle */}
          <div className="col-span-12 lg:col-span-5 bg-primary-container text-white p-12 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Icon name="account_balance" className="text-secondary-container" />
                <h3 className="font-display text-h3 text-secondary-container">
                  {t("zelleHeading")}
                </h3>
              </div>
              <p className="font-sans text-body-md opacity-90 mb-12 leading-relaxed">
                {t("zelleBody")}
              </p>
              <div className="bg-white/10 p-6 rounded-lg mb-12 border border-white/20">
                <span className="block font-label-sm text-xs opacity-70 mb-1 uppercase">
                  {t("recipientEmail")}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[20px] select-all">
                    give@bethelcasa.org
                  </span>
                  <Icon
                    name="content_copy"
                    className="cursor-pointer hover:text-secondary-container"
                  />
                </div>
              </div>
              <ol className="space-y-3">
                {zelleSteps.map((step, i) => (
                  <li key={step} className="flex gap-6">
                    <span className="font-bold text-secondary-container">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="flex items-center gap-3">
                <Icon name="info" filled className="text-secondary-container" />
                <p className="text-xs italic opacity-80">
                  {t("zelleNote")}
                </p>
              </div>
            </div>
          </div>

          {/* Serving */}
          <div className="col-span-12 bg-surface-container-high p-12 rounded-xl shadow-sm border border-outline-variant flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3 h-64 w-full rounded-lg overflow-hidden">
              <img
                alt={t("volunteersAlt")}
                className="w-full h-full object-cover"
                src={VOLUNTEERS_IMG}
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-[12px] mb-3">
                {t("servingBadge")}
              </div>
              <h3 className="font-display text-h3 text-primary mb-2">
                {t("servingHeading")}
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant mb-6">
                {t("servingBody")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-12">
                {servingAreas.map((area) => (
                  <div
                    key={area.label}
                    className="flex flex-col items-center p-2 bg-white rounded-lg border border-outline-variant/30"
                  >
                    <Icon name={area.icon} className="text-primary mb-1" />
                    <span className="text-[12px] font-semibold">
                      {area.label}
                    </span>
                  </div>
                ))}
              </div>
              <button className="bg-[#25D366] text-white px-12 py-3 rounded-lg font-label-sm tracking-wide uppercase hover:opacity-90 transition-opacity flex items-center gap-2">
                {t("contactWhatsApp")}
                <Icon name="chat" className="text-sm" />
              </button>
            </div>
          </div>

          {/* Trust badges */}
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-start gap-6"
            >
              <Icon
                name={item.icon}
                className="text-primary p-2 bg-white rounded-full"
              />
              <div>
                <h4 className="font-semibold text-primary mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-on-surface-variant">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-surface-container-highest py-20 text-center px-6">
        <h2 className="font-display text-h2 text-primary mb-2">
          {t("ctaHeading")}
        </h2>
        <p className="max-w-2xl mx-auto font-sans text-body-md text-on-surface-variant mb-12">
          {t("ctaBody")}
        </p>
        <a
          className="inline-flex items-center gap-3 text-primary font-bold border-b-2 border-secondary hover:border-primary transition-all"
          href="mailto:finance@bethelcasa.org"
        >
          {t("ctaContact")}
          <Icon name="mail" />
        </a>
      </section>
    </main>
  );
}

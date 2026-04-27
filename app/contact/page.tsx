import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Icon } from "../components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const MAP_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCjX3Tk5Cw7kWIUXCaP6frq3dQevk5vLwvWq6sPyC3ZhrSvYPSMm3Z-ZWPsPakZiVHGLXDu0kGdwYkJIRdvp3KMVtaAc63ebMx9-JRFtoKvaar_VF7cG29ZEGx9irVcU3BGCLY3pt3mkqy0rY_cEwUuUDWPZBaxznDKh3rbH_C2CEigXtRJu9cgREGP1bMwaIL8gbK0T4EFiFwhQQwiDzxsZKECZmow--kolyTuUkjlC4Dm3Bb28FSi5FA_vxq0F-5dAUPGyF9udGc0";

export default function ContactPage() {
  const t = useTranslations("Contact");

  const services = [
    { label: t("serviceSundayLabel"), time: t("serviceSundayTime") },
    { label: t("serviceWednesdayLabel"), time: t("serviceWednesdayTime") },
    { label: t("serviceYouthLabel"), time: t("serviceYouthTime") },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <section className="mb-20">
        <h1 className="font-display text-h1 text-primary mb-6">{t("heading")}</h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mb-12">
          {t("intro")}
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Map + info column */}
        <div className="lg:col-span-7 space-y-12">
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-surface-container shadow-sm border border-outline-variant relative">
            <img
              className="w-full h-full object-cover"
              src={MAP_IMG}
              alt={t("mapAlt")}
            />
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border-l-4 border-secondary flex items-center gap-3">
              <Icon name="location_on" className="text-primary" />
              <div>
                <p className="font-label-sm text-label-sm text-primary">
                  {t("mapBadgeArea")}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {t("mapBadgeName")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address */}
            <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgb(0_38_63_/0.05)] border-t-2 border-secondary h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Icon name="home" />
                <h3 className="font-display text-h3 !text-lg">
                  {t("addressTitle")}
                </h3>
              </div>
              <p className="font-sans text-body-md text-on-surface-variant">
                {t("addressLine1")}
                <br />
                {t("addressLine2")}
                <br />
                {t("addressLine3")}
              </p>
              <div className="mt-auto pt-6">
                <a
                  className="text-primary font-label-sm text-label-sm inline-flex items-center gap-1 hover:underline"
                  href="#"
                >
                  {t("getDirections")}
                  <Icon name="open_in_new" className="text-sm" />
                </a>
              </div>
            </div>

            {/* Service Times */}
            <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgb(0_38_63_/0.05)] border-t-2 border-secondary h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Icon name="schedule" />
                <h3 className="font-display text-h3 !text-lg">{t("serviceTimesTitle")}</h3>
              </div>
              <ul className="space-y-2 font-sans text-body-md text-on-surface-variant">
                {services.map((s) => (
                  <li key={s.label} className="flex justify-between">
                    <span className="font-semibold">{s.label}</span>
                    <span>{s.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact form column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-12 rounded-xl shadow-[0_4px_20px_rgb(0_38_63_/0.05)] h-full">
            <h2 className="font-display text-h3 text-primary mb-6">
              {t("messageHeading")}
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                >
                  {t("fullName")}
                </label>
                <input
                  id="contact-name"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline"
                  placeholder={t("fullNamePlaceholder")}
                  type="text"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                >
                  {t("emailLabel")}
                </label>
                <input
                  id="contact-email"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline"
                  placeholder={t("emailPlaceholder")}
                  type="email"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                >
                  {t("messageLabel")}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline"
                  placeholder={t("messagePlaceholder")}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-sm text-label-sm hover:bg-primary-container transition-colors shadow-lg shadow-primary/10"
              >
                {t("submit")}
              </button>
            </form>

            <div className="mt-12 pt-12 border-t border-surface-variant">
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                    <Icon name="phone" />
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {t("phoneLabel")}
                    </p>
                    <p className="font-sans text-body-md text-primary font-semibold">
                      {t("phoneValue")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                    <Icon name="mail" />
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {t("generalLabel")}
                    </p>
                    <p className="font-sans text-body-md text-primary font-semibold">
                      {t("generalValue")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

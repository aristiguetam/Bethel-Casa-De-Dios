import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Icon } from "../components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbaz9IiFPCzI1hqn7NnYxlKCVwDi5n5u0LBQehq18wsynofhgRJ9qODMaUE7XHaPffRQ5uFc_9gk5FaaamgBAlQKCjhaVYuTXq_ShwbtoXuglPru7UULAyFTNDw7Pk5CSO-esuORkjstT4ser6ljbdWNPBwbVAyrAelWulRSQ05QyoEPaX-bIZlnzXi3RConwTywFgYoeCFFgIuTEz4QP65Fdt1DbIGteScHhcTiVNR6ZFQe0iok4CRhjDMILDs7bEHFXHCbWE5FT6";

const STORY_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBe-B8qsmFvvWG3mxej3rKUTB9VNv2_QvuCwiTf_PJRxqVJWL6LF1xsr5MR2yXk_O2ONP-WCX-Ih5N_Q9r-_1NtGBtflB_tarUU85N0FjHKwJK316_ukEL_FSPEKhYUlfrKqd2QfPRnWZViQu3vQzgB3KuH8Q4GuNM3hWI2dVlkZpstDlbuQEeUGmPaC2R7Fqnakin8eb6N0RGhNM7r-hWprkjYnAQl6DqsjCJAc97Ho3PZmbJ85V5zc2D_i49VRRvGuFIXkD8aJ6iw";

const LEAD_PASTORS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAvPUlViEy7iQ7LlGqZf_dWhnos2vIV4Gc3pGpM_MqyZMjmf1GCuRaqoAZHLkq4U4qqsDfXIZWG38dqL_C3KFL4jx27GXoCDD983ofJQZCVjs44BZwShrezSOvmIsJRXKdmOpnypC3xTDYq5yYhx-1Y272v9CpMEldrn_64rO5BdOOpSYNSvL3mvudmPJQZGvFBkRlXwS2ROJiJ2w8US0ONaC-xk3TwQW1E8Te5a_fmTHvW9Ae7DgpBM4FcWmXwVbsIzIRqr-phkHcl";

const otherLeadersImgs = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC4B87bBfnh63xFycX9X1KWOlHx1j3BIYQ-N_J-SNG8QwvGd983HCq2kDN_blfumrtVj4FiARskFKzvGHxWmnOhqGf-NVx9oFbGJaKHIFobGX6as_UFXYi572Io_2wwhpX7xLgTV9uH6q4QWuGtkrBxMjL8k3hfD9ZWpMc1Q8AP5yboAAF73dTfXJFm0viLHWyDNJnfGu8QzW-bUVXQckg_N6RX8nbBSSp2M-gwjWJ6Hi1Kzxqyp0nCWaEFrqKYvZalG55Rv8FsIb-I",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAwNfh38xQmNdwSEORRNbvmtpS3z8hIAVgIfxZ_tSC_dAHSV0vpdJGc74eB5pHDoasQNzCzLY7g0dx22OqZMDOYWwXfZMru2-LauBifuUGYyBfFdCp8B2iEOD96XdpAbnSkbdaK-4visq9FANAe9WdyfS-UWiOoOjF32bYr7-FJyXhgeP9R_Pf4Kk0mjnVATq_mRrPSd7sgqW4Cua01A9iYjalLW-_Y_P1jASblTJ8DGGqTmttMPi1KEI2jjYRzw7DUNR187wBDZ23w",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwVQFhYTUQnS-DmvqbHKQgrumAH0i9HKG-KFqy0b-aQTAD6-yv7KI6PkqGhuFCxR7289EJmGM2JZheIkRiGN-_p2HHGByESfocuG0FHUiEXm6s--bxP34S_qMK25SR9KpVnr7Z4Qen6NlO2GlovbZ-wwzHr6Bq9EmZuQnQm4SrsdWY1MdV9Lim8ohBV-2Ewc3QaFvMLMnqU6NOTH0LQQtkFw4mz9NXaoQznBg6gr8TlfWnJzIGI8o9n0E0YCNBGq0uAedhGhDYqURp",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDr4PnYDW9ef9riU5tFCUe9Pzp0izxTFYZTqoFlTGfuQi2ZqdVcfcSECHWHiNaSNRXZEnKR8sDcFhCqYEocXg9Wl3TZ5KHzAx2vn8_AGT7oIpu3P-qwe4U_v6Tj27BNBTMFZCBAcWRymH_vxDIDq97AET6QFmellD8-ub3jueJ8k54IBU9cx9DjVB_SPpCz9ilQq6jcuQ_IgXwZ0RS93J103cn4k5ytfryo9fe9um2yJVA3hwJSE_7bHnENNcVrTkBHnjFTnvYq6J9V",
];

export default function AboutPage() {
  const t = useTranslations("About");

  const values = [
    {
      icon: "menu_book",
      title: t("valueBiblicalTitle"),
      body: t("valueBiblicalBody"),
    },
    {
      icon: "groups",
      title: t("valueCommunityTitle"),
      body: t("valueCommunityBody"),
    },
    {
      icon: "volunteer_activism",
      title: t("valueGenerosityTitle"),
      body: t("valueGenerosityBody"),
    },
    {
      icon: "celebration",
      title: t("valueWorshipTitle"),
      body: t("valueWorshipBody"),
    },
    {
      icon: "home",
      title: t("valueHospitalityTitle"),
      body: t("valueHospitalityBody"),
    },
  ];

  const otherLeaders = [
    {
      name: t("leaderDanielName"),
      role: t("leaderDanielRole"),
      img: otherLeadersImgs[0],
    },
    {
      name: t("leaderMaribelName"),
      role: t("leaderMaribelRole"),
      img: otherLeadersImgs[1],
    },
    {
      name: t("leaderDaveName"),
      role: t("leaderDaveRole"),
      img: otherLeadersImgs[2],
    },
    {
      name: t("leaderJeffreyName"),
      role: t("leaderJeffreyRole"),
      img: otherLeadersImgs[3],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[614px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-[0.4]"
            src={HERO_IMG}
            alt={t("heroAlt")}
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-display text-white text-5xl md:text-7xl mb-6">
            {t("heroHeading")}
          </h1>
          <p className="font-sans text-body-lg text-white/90 max-w-2xl mx-auto">
            {t("heroBody")}
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-secondary font-label-sm uppercase tracking-widest">
              {t("storyEyebrow")}
            </span>
            <h2 className="font-display text-primary text-4xl leading-tight">
              {t("storyHeading")}
            </h2>
            <div className="font-sans text-body-lg text-on-surface-variant space-y-4">
              <p>{t("storyP1")}</p>
              <p>
                {t.rich("storyP2", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <p>{t("storyP3")}</p>
              <p>{t("storyP4")}</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img
                className="w-full h-full object-cover"
                src={STORY_IMG}
                alt={t("storyImageAlt")}
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-secondary-container p-8 rounded-xl max-w-xs hidden md:block shadow-lg">
              <p className="font-display text-h3 text-on-secondary-container">
                {t("storyQuote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values bento */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-primary text-4xl mb-4">
              {t("valuesHeading")}
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant max-w-xl mx-auto">
              {t("valuesBody")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.slice(0, 3).map((v, i) => (
              <div
                key={v.title}
                className={`bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center text-center ${
                  i === 0 ? "border-t-4 border-secondary-container" : ""
                }`}
              >
                <Icon
                  name={v.icon}
                  className="text-secondary text-4xl mb-4"
                />
                <h3 className="font-display text-h3 text-xl mb-3 text-primary">
                  {v.title}
                </h3>
                <p className="font-sans text-body-md text-on-surface-variant">
                  {v.body}
                </p>
              </div>
            ))}
            <div className="md:col-span-3 flex flex-col md:flex-row md:justify-center gap-6">
              {values.slice(3).map((v) => (
                <div
                  key={v.title}
                  className="bg-white p-8 rounded-2xl shadow-sm flex flex-col items-center text-center md:w-[calc(33%-12px)]"
                >
                  <Icon
                    name={v.icon}
                    className="text-secondary text-4xl mb-4"
                  />
                  <h3 className="font-display text-h3 text-xl mb-3 text-primary">
                    {v.title}
                  </h3>
                  <p className="font-sans text-body-md text-on-surface-variant">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-primary text-4xl mb-4">
            {t("leadershipHeading")}
          </h2>
          <p className="font-sans text-body-md text-on-surface-variant max-w-xl mx-auto">
            {t("leadershipBody")}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-[400px]">
              <img
                className="w-full h-full object-cover"
                src={LEAD_PASTORS_IMG}
                alt={t("leadPastorsImageAlt")}
              />
            </div>
            <div className="p-12 flex flex-col justify-center bg-primary text-on-primary">
              <span className="text-secondary-container font-label-sm uppercase tracking-widest mb-4">
                {t("leadPastorsLabel")}
              </span>
              <h3 className="font-display text-3xl mb-4">
                {t("leadPastorsName")}
              </h3>
              <p className="font-sans text-body-md mb-6 leading-relaxed opacity-90">
                {t("leadPastorsBody")}
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  aria-label={t("emailAria")}
                  className="hover:text-secondary-container transition-colors"
                >
                  <Icon name="mail" />
                </button>
                <button
                  type="button"
                  aria-label={t("shareAria")}
                  className="hover:text-secondary-container transition-colors"
                >
                  <Icon name="share" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {otherLeaders.map((leader) => (
            <div key={leader.name} className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-4 shadow-sm mx-auto w-32 md:w-40 border-4 border-white">
                <img
                  className="w-full h-full object-cover"
                  src={leader.img}
                  alt={t("leaderPortraitAlt", { name: leader.name })}
                />
              </div>
              <h4 className="font-display text-h3 text-lg text-primary">
                {leader.name}
              </h4>
              <p className="text-secondary font-label-sm">{leader.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-on-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            {t("ctaHeading")}
          </h2>
          <p className="font-sans text-body-lg mb-8 opacity-80">
            {t("ctaBody")}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-lg font-label-sm hover:opacity-90 transition-opacity inline-block"
            >
              {t("ctaDirections")}
            </Link>
            <Link
              href="/contact"
              className="border border-on-primary text-on-primary px-8 py-3 rounded-lg font-label-sm hover:bg-on-primary hover:text-primary transition-all inline-block"
            >
              {t("ctaContact")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

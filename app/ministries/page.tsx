import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Icon } from "../components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Ministries");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const FEATURED_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAykjth3gvh8-YjiLa6aPTy4Q4fXNBuDYo6EamI8HdokU6RShB0JEUOoAsI9aIEU2PXPg8gRRC4wxXo9vy5ZjvDRnq7V7k5PE_P0c9F0j-CfjI7NmjFu6qTfw34Tp-sgkEtj3vEWYtrrqvAi0xy9tioPhe-yi4ZZdgy_85SGXGFF93xd3zhguN0guEk7odR22UePoNtiw09ll8qDY9V6dWa6a-Erc0zAfb_1yOTfiHlJ7zbTMlsBdl4itVJQQzKvW3VZVD3Jh1y2hou";

const ministryImgs = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCeaoedv0MUdqLfrdjDirs-uy85zOiGXuY5EofTFh0fSNSx3NmX69xFFtpVqF24NqaJDy3eYeG4hNOA1TgWoxrQMwGCVlQy83fT--3QcxrILf3Bcsqct6D8kzY8WRHjRLZZvCLPYpcM_QzzdCbwhAn5E-k3GRKpjm26QHB1MMu5CFrq-5OP0EEv5KXMCVxRUGNNyevx8-QzX7R7WkHZqATSgOTf0wUef0oIgd9Sv9BPIgYwvpMSz0GUPn03kochL5qtIN7Yyr3fUyAB",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCf4Dkic8r5oOLr1M-_Svuae4JZX0gILNUw3NQv4OVPId145jbTbWEzaCxjfb6zdt-MB859JTH4JfxhbihQCo_DyiRqRLYdhzHSWWgRXf7bx68pypAEV2rak0kV-SNa9ZSf6WcRhy3w_bcYBq1dkxEbGiaU9ypcoreOII2h9eetCTibQUvgLeQtS7EkojlN4Kz2D8n86Y3YUqfYWnuIv8wtu9zEfgyMHCLERPujRhwLupJrDIY41j_j4ZocCshESEiS_dGscwM5voZB",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDl9yHYl4Btk5ZbJdo2m2zziEQTyoy9PN1YMaDxl-ykKXthKUSSPX8FEfQf2h1JXwqswGlkoGIuDBTs5eeM5VLyI3CER5RVZBK9EeCypQYi5Df_g-H9Apn2QpbMvSI9yHDXWA9ctM-22RsmOWZsx96Dwt03YoVZs8jqL6JLMgbJyY7kCRt0n1JMbMwDSnhQjobreaV4r-64fTkNBqXKGSXav1NVZUtNEMBsF7QqVDSG2whQsmm7RFmVJ910lZyjilo7zMqTnXgJsqxM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAsHp4Ha270qvcEJgWKzVNmCXxC5Pxb9IBqQZuvk0fOSLbymrGR91kYSiE8aaSNm7UikVHO0Ql7yEE2jyVeBAGYAyvkFXafv1EbQ24BqbM5Cw6i7kXrszcdWCLMQVCD8gfsO5PUVctWXJm7iYDQcrI9N6eqxJrVhRMdfW6wWsslOUf7SlFyb1j9ZNSEnxVm-XbnBXpzdmKW3cbLR-jpEDl2on1w9UKvI97p_LEL_7SvtZm5FYmEbPIuZ-DsYOADZYZcPhTS_V9fD0zR",
];

export default function MinistriesPage() {
  const t = useTranslations("Ministries");

  const otherMinistries = [
    {
      title: t("youthTitle"),
      description: t("youthBody"),
      img: ministryImgs[0],
      badge: t("youthBadge"),
      cta: t("learnMore"),
      primaryButton: true,
    },
    {
      title: t("worshipTitle"),
      description: t("worshipBody"),
      img: ministryImgs[1],
      cta: t("learnMore"),
    },
    {
      title: t("smallGroupsTitle"),
      description: t("smallGroupsBody"),
      img: ministryImgs[2],
      cta: t("smallGroupsCta"),
    },
    {
      title: t("outreachTitle"),
      description: t("outreachBody"),
      img: ministryImgs[3],
      cta: t("learnMore"),
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-8 py-20">
      <header className="mb-12 text-center max-w-3xl mx-auto">
        <span className="text-secondary font-label-sm uppercase tracking-widest mb-3 block">
          {t("eyebrow")}
        </span>
        <h1 className="font-display text-h1 text-primary mb-6">
          {t("heading")}
        </h1>
        <p className="font-sans text-body-lg text-on-surface-variant">
          {t("intro")}
        </p>
      </header>

      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Featured: Bethel Kids */}
        <div className="col-span-12 md:col-span-8 group relative overflow-hidden rounded-xl bg-white shadow-sm border border-outline-variant/40 hover:shadow-lg transition-all duration-300">
          <div className="h-80 md:h-[450px] overflow-hidden">
            <img
              alt={t("kidsImageAlt")}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              src={FEATURED_IMG}
            />
          </div>
          <div className="p-6 absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent text-white">
            <div className="inline-flex bg-secondary-container/20 backdrop-blur-md px-3 py-1 rounded-full mb-3">
              <span className="text-secondary-fixed text-label-sm">
                {t("kidsBadge")}
              </span>
            </div>
            <h3 className="font-display text-h3 mb-2">{t("kidsTitle")}</h3>
            <p className="font-sans text-body-md text-gray-200 max-w-xl mb-6">
              {t("kidsBody")}
            </p>
            <button className="flex items-center space-x-2 text-secondary-fixed hover:text-secondary-fixed-dim font-label-sm transition-colors">
              <span>{t("learnMore")}</span>
              <Icon name="arrow_forward" />
            </button>
          </div>
        </div>

        {/* Youth */}
        <div className="col-span-12 md:col-span-4 group flex flex-col rounded-xl bg-white shadow-sm border border-outline-variant/40 overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="h-64 overflow-hidden relative">
            <img
              alt={otherMinistries[0].title}
              className="w-full h-full object-cover"
              src={otherMinistries[0].img}
            />
            <div className="absolute top-4 right-4">
              <span className="bg-primary-container text-white text-[10px] px-2 py-1 rounded uppercase tracking-tighter">
                {otherMinistries[0].badge}
              </span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-h3 text-primary mb-2">
                {otherMinistries[0].title}
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant mb-6">
                {otherMinistries[0].description}
              </p>
            </div>
            <button className="text-primary border border-primary/20 hover:bg-primary/5 px-4 py-2 rounded-lg font-label-sm transition-all w-full text-center">
              {otherMinistries[0].cta}
            </button>
          </div>
        </div>

        {/* Three secondary ministries */}
        {otherMinistries.slice(1).map((m) => (
          <div
            key={m.title}
            className="col-span-12 md:col-span-4 group flex flex-col rounded-xl bg-white shadow-sm border border-outline-variant/40 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="h-64 overflow-hidden">
              <img
                alt={m.title}
                className="w-full h-full object-cover"
                src={m.img}
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-h3 text-primary mb-2">
                {m.title}
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant mb-6">
                {m.description}
              </p>
              <button className="text-primary font-label-sm flex items-center group/btn">
                <span className="border-b-2 border-transparent group-hover/btn:border-secondary transition-all">
                  {m.cta}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-20 bg-primary-container rounded-2xl p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-secondary-container rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="text-center md:text-left">
            <h2 className="font-display text-h2 mb-3 text-white">
              {t("ctaHeading")}
            </h2>
            <p className="font-sans text-body-lg text-on-primary-container max-w-lg">
              {t("ctaBody")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-full font-label-sm hover:brightness-105 transition-all shadow-lg flex items-center justify-center gap-2">
              <span>{t("ctaVolunteer")}</span>
              <Icon name="volunteer_activism" />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-label-sm hover:bg-white/20 transition-all">
              {t("ctaOpportunities")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

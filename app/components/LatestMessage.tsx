"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const VIDEO_BASE =
  "https://www.youtube.com/embed/atkEZMph8dM?enablejsapi=1";

export function LatestMessage() {
  const t = useTranslations("Home");
  const [playing, setPlaying] = useState(false);
  const src = playing ? `${VIDEO_BASE}&autoplay=1` : VIDEO_BASE;

  return (
    <section
      id="latest-message"
      className="scroll-mt-24 bg-primary text-white py-20 md:py-24 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <div
          data-target-glow
          className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 mx-auto w-full max-w-[340px] lg:max-w-none"
        >
          <iframe
            className="block w-full aspect-video"
            src={src}
            title={t("messageHeading")}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="pointer-events-none absolute bottom-4 left-4 lg:bottom-6 lg:left-6 bg-secondary-container px-4 py-1.5 rounded-full text-on-secondary-container text-xs font-bold uppercase tracking-widest">
            {t("featuredMessage")}
          </div>
        </div>
        <div className="mx-auto max-w-[340px] text-center lg:mx-0 lg:max-w-none lg:text-left">
          <span className="text-secondary-fixed font-label-sm uppercase tracking-widest block mb-4">
            {t("currentSeries")}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2 mb-6 lg:mb-8 italic leading-tight">
            {t("messageHeading")}
          </h2>
          <p className="text-white/80 text-body-md lg:text-body-lg mb-8 lg:mb-10 leading-relaxed">
            {t("messageBody")}
          </p>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:gap-6">
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="inline-flex justify-center w-full max-w-[280px] lg:w-auto lg:max-w-none bg-white text-primary px-10 py-4 rounded-full font-label-sm hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all font-bold"
            >
              {t("messageWatch")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Icon } from "./Icon";

export function SiteFooter() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-white border-t border-outline-variant/40 mt-auto">
      <div className="px-6 md:px-8 py-14 md:py-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 max-w-[320px] md:max-w-none mx-auto md:mx-0">
        <div className="md:col-span-1 space-y-8">
          <div className="text-2xl font-bold text-primary font-display italic">
            Bethel Casa De Dios
          </div>
          <p className="text-on-surface-variant leading-relaxed">
           {t("address")}
            <br />
            {t("county")}
          </p>
          <div className="flex gap-6">
            <a
              className="text-primary/60 hover:text-secondary transition-colors"
              href="#"
              aria-label={t("social")}
            >
              <Icon name="social_leaderboard" />
            </a>
            <a
              className="text-primary/60 hover:text-secondary transition-colors"
              href="#"
              aria-label={t("rss")}
            >
              <Icon name="rss_feed" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <p className="font-bold text-primary uppercase tracking-[0.2em] text-xs">
            {t("exploreHeading")}
          </p>
          <ul className="space-y-4 text-on-surface-variant font-label-sm">
            <li>
              <Link
                className="hover:text-secondary transition-colors"
                href="/about"
              >
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-secondary transition-colors"
                href="/ministries"
              >
                {t("ministries")}
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-secondary transition-colors"
                href="/events"
              >
                {t("communityEvents")}
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-secondary transition-colors"
                href="/prayer"
              >
                {t("prayerRequests")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <p className="font-bold text-primary uppercase tracking-[0.2em] text-xs">
            {t("connectHeading")}
          </p>
          <ul className="space-y-4 text-on-surface-variant font-label-sm">
            <li>
              <a className="hover:text-secondary transition-colors" href="#">
                {t("facebook")}
              </a>
            </li>
            <li>
              <a className="hover:text-secondary transition-colors" href="#">
                {t("instagram")}
              </a>
            </li>
            <li>
              <a className="hover:text-secondary transition-colors" href="#">
                {t("youtube")}
              </a>
            </li>
            <li>
              <Link
                className="hover:text-secondary transition-colors"
                href="/contact"
              >
                {t("contactUs")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <p className="font-bold text-primary uppercase tracking-[0.2em] text-xs">
            {t("visionHeading")}
          </p>
          <p className="text-on-surface-variant italic leading-relaxed text-sm">
            {t("visionQuote")}
          </p>
          <div className="pt-8 text-[10px] uppercase tracking-widest text-on-surface-variant/50 border-t border-outline-variant/40">
            {t("copyright", { year: new Date().getFullYear() })}
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}

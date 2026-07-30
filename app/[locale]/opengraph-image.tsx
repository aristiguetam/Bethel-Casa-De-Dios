import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing, toLocale } from "@/i18n/routing";
import { SITE_NAME } from "../data/site";

// Imagen de vista previa al compartir el enlace (WhatsApp, Facebook, X…).
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Una imagen por idioma, generada en el build: quien comparte /en/… ve la
// descripción en inglés, y no se paga el render en cada petición.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Site" });

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#00263f",
          padding: "80px",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "8px",
            backgroundColor: "#fed65b",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: "88px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: "34px",
            color: "#cee5ff",
            marginTop: "28px",
            maxWidth: "900px",
            lineHeight: 1.35,
          }}
        >
          {t("description")}
        </div>
      </div>
    ),
    size,
  );
}

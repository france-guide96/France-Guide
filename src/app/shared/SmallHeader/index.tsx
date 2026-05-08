"use client";

import { MapPin, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SmallHeader() {
  const t = useTranslations("About");

  return (
    <>
      <div className="inline-flex items-center-safe gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full">
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span className="text-sm font-medium text-amber-100">
          {t("Professional")}
        </span>
      </div>

      <div>
        <h1 className="text-2xl md:text-7xl font-bold leading-tight">{t("Name")}</h1>
        <div className="flex items-center gap-2 text-amber-300">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">{t("Paris")}</span>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import ReactCountryFlag from "react-country-flag";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [locked, setLocked] = useState<boolean>(false);

  const nextLocale = locale === "en" ? "ru" : "en";

  const handleSwitch = () => {
    if (locked || isPending) return;
    setLocked(true);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
      setTimeout(() => setLocked(false), 700);
    });
  };

  return (
    <button
      onClick={handleSwitch}
      disabled={locked || isPending}
      className="flex items-center gap-2 cursor-pointer disabled:opacity-50 text-secondary"
    >
      {locale === "en" ? (
        <>
          <ReactCountryFlag
            alt="RU"
            countryCode="RU"
            svg
            style={{ width: "20px", height: "20px" }}
            aria-label="Русский язык"
          />
          RU
        </>
      ) : (
        <>
          <ReactCountryFlag
            alt="GB"
            countryCode="GB"
            svg
            style={{ width: "20px", height: "20px" }}
            aria-label="English language"
          />
          EN
        </>
      )}
    </button>
  );
}

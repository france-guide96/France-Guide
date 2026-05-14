"use client";

import { useTranslations } from "next-intl";
import Button from "../Button";
import { useModals } from "@/context/ModalContext";

export default function ContactButtons({ isAbout }: { isAbout?: boolean }) {
  const t = useTranslations("About");
  const { openContact } = useModals();

  const handleContactClick = () => {
    const el = document.getElementById("getInTouch");
    if (!el) return;

    const isMobile = window.innerWidth < 768;
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      (isMobile ? 100 : 0);

    window.scrollTo({ top, behavior: "smooth" });
  };

  const buttons = [
    {
      key: "book",
      text: t("BookATransfer"),
      onClick: handleContactClick,
      aboutStyles:
        "px-4 py-2 md:px-8 md:py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 shadow-2xl font-semibold hover:scale-105 text-[14px] md:text-[16px]",
      defaultStyles:
        "px-6 py-3 rounded-lg font-[600] group inline-flex items-center gap-2",
      designType: "gold" as const,
    },
    {
      key: "contact",
      text: t("Contact"),
      onClick: openContact,
      aboutStyles:
        "px-4 py-2 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full hover:bg-white/20 font-semibold text-[14px] md:text-[16px]",
      defaultStyles:
        "group inline-flex items-center px-6 py-3 ml-[10px] font-[600] rounded-lg shadow-md hover:shadow-lg",
      designType: "white" as const,
    },
  ];

  return (
    <>
      {buttons.map((btn) => (
        <Button
          key={btn.key}
          onClick={btn.onClick}
          styles={
            isAbout
              ? `${btn.aboutStyles} transition-all`
              : `${btn.defaultStyles}`
          }
          designType={!isAbout ? btn.designType : undefined}
        >
          {btn.text}
        </Button>
      ))}
    </>
  );
}

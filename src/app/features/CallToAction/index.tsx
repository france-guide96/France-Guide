"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/app/shared/Button";
import {
  MessagesSquare,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { getContactMethods } from "@/constants/contactMethods";

export default function CallToAction() {
  const t = useTranslations("ContactModal");
  const [showCTA, setShowCTA] = useState<boolean>(false);

  const CONTACT_METHODS = getContactMethods(t);

  return (
    <div>
      <AnimatePresence>
        <div
          onMouseEnter={() => setShowCTA(true)}
          onMouseLeave={() => setShowCTA(false)}
          className={`fixed lg:bottom-10 lg:right-10 bottom-[10px] right-[10px] py-[40px] px-[20px] md:p-[20px] z-[9999] font-body flex flex-col items-center gap-[50px] bg-gradient-to-br from-gray-900 to-gray-800 border border-secondary/30 rounded-[14px] transition-all duration-300 ease-out transform ${showCTA ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}
        >
          <Button
            styles="absolute top-2 right-2 cursor-pointer text-xl text-secondary md:hidden"
            onClick={() => setShowCTA(false)}
          >
            ✕
          </Button>
          <h3 className="max-w-[300px] text-secondary">{t("ContactOffer")}</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {CONTACT_METHODS.map((method) => (
                <ContactLink key={method.id} {...method} />
              ))}
            </div>
          </div>
          <p className="max-w-[300px] italic text-[14px] text-secondary/50">
            {t("PlanYourTour")}
          </p>
        </div>
      </AnimatePresence>
      {!showCTA && (
        <div
          className="fixed bg-primary border border-secondary bottom-[10px] right-[10px] lg:bottom-10 lg:right-10 w-[50px] h-[50px] md:w-[60px] md:h-[60px] p-[10px] rounded-full z-[158] flex items-center justify-center transition-all duration-300"
          onMouseEnter={() => setShowCTA(true)}
        >
          <MessagesSquare className="text-secondary w-6 h-6" />
        </div>
      )}
    </div>
  );
}

function ContactLink({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3 group cursor-pointer text-secondary"
    >
      <div className="w-6 h-6 md:w-12 md:h-12 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 group-hover:border-accent transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-[14px] md:text-[16px] font-bold group-hover:text-accent transition-colors">
          {label}
        </div>
        <div className="text-secondary/50 text-[12px] md:text-[14px]">
          {sub}
        </div>
      </div>
    </Link>
  );
}

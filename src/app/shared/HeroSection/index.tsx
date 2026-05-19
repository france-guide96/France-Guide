"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useModals } from "@/context/ModalContext";
import Image from "next/image";
import { HeroProps } from "./type";
import Button from "@/app/shared/Button";
import Container from "@/app/shared/Container";
import phoneIcon from "@/assets/elements/phone.png";
import scrollAnimation from "@/assets/elements/scroll.gif";

export default function HeroSection({
  generalStyles,
  heading,
  headingStyles,
  subHeading,
  subHeadingStyles,
}: HeroProps) {
  const t = useTranslations("HeroSection");
  const { openContact } = useModals();

  const [hideScrollIcon, setHideScrollIcon] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideScrollIcon(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/final.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30 z-[1]" />
      <Container>
        <div
          className={`relative z-[2] flex flex-col items-center justify-start min-h-screen gap-[48px] px-[10px] pt-[150px] pb-[50px] ${generalStyles}`}
        >
          <div className={"flex flex-col items-center justify-center text-center gap-[24px]"}>
            <h1
              className={`text-[30px] sm:text-[48px] lg:text-[96px] font-[500] leading-[110%] text-secondary ${headingStyles}`}
              style={{ fontFamily: "Oswald" }}
            >
              {heading}
            </h1>
            <h2
              className={`max-w-[700px] lg:text-[22px] text-[18px] font-[400] leading-[150%] text-secondary ${subHeadingStyles}`}
            >
              {subHeading}
            </h2>
          </div>
          <div className="flex lg:flex-row flex-col justify-center items-center gap-[16px]">
            <Button
              text={t("BookATour")}
              styles="min-w-[255px] px-[40px] py-[18px] text-[16px] leading-[150%] font-[600] border-[2px] rounded-[6px]"
              designType="gold"
              onClick={handleContactClick}
            />
            <Button
              onClick={openContact}
              styles="min-w-[255px] flex justify-center items-center gap-[8px] px-[40px] py-[18px] text-[16px] leading-[150%] font-[600] border-[2px] rounded-[6px]"
              designType="transparent"
            >
              <Image src={phoneIcon} alt="Phone icon" width={20} height={20} />
              <p>{t("ContactUs")}</p>
            </Button>
          </div>
          <Image
            src={scrollAnimation}
            alt="Scrolling animation gif"
            width={50}
            className={`absolute bottom-[5px] left-1/2 -translate-x-1/2 transition-opacity duration-700 ${hideScrollIcon ? "opacity-0" : "opacity-100"}`}
          />
        </div>
      </Container>
    </section>
  );
}

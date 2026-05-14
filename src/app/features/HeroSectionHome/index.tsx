"use client";

import Header from "@/app/shared/Header";
import HeroSection from "@/app/shared/HeroSection";

export default function HeroSectionHome({
  isHero = false,
  heroTitle,
  heroDescription,
  title,
  description,
}: {
  isHero?: boolean;
  heroTitle?: string;
  heroDescription?: string;
  title?: string;
  description?: string;
}) {
  return (
    <>
      {isHero ? (
        <HeroSection
          heading={heroTitle}
          subHeading={heroDescription}
        />
      ) : (
        <Header
          blockStyles="text-center items-center mb-[50px]"
          heading={title}
          subHeading={description}
          isDark
          as="h2"
          subAs="h3"
        />
      )}
    </>
  );
}

"use client";

import { HeaderType } from "./type";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

export default function Header({
  blockStyles = "",
  heading,
  headingStyles = "",
  subHeading,
  subHeadingStyles = "",
  isDark,
  as: Heading = "h2",
  subAs: SubHeading = "h3",
}: HeaderType & { as?: HeadingLevel; subAs?: HeadingLevel }) {
  return (
    <div
      className={`${isDark ? "text-primary" : "text-secondary"} flex flex-col justify-center gap-[24px] px-[10px] ${blockStyles}`}
    >
      <Heading
        className={`text-[28px] sm:text-[44px] lg:text-[72px] font-[500] leading-[110%] ${headingStyles}`}
        style={{ fontFamily: "Oswald" }}
      >
        {heading}
      </Heading>
      <div className="w-[96px] h-[4px] bg-accent"></div>
      <SubHeading
        className={`max-w-[700px] text-[16px] lg:text-[18px] font-[400] leading-[150%] ${subHeadingStyles}`}
      >
        {subHeading}
      </SubHeading>
    </div>
  );
}

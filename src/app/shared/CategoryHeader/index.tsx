"use client";

import { useTranslations } from "next-intl";
import Header from "../Header";

export default function CategoryHeader({ category }: { category: string }) {
  const t = useTranslations("TourCard");

  return (
    <Header
      blockStyles="flex flex-col items-center text-center"
      heading={category}
      subHeading={t("SubTitle")}
      as="h2"
      subAs="h3"
    />
  );
}

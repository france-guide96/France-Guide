"use client";

export const runtime = 'edge';

import { useTranslations } from "next-intl";
import Header from "@/app/shared/Header";
import Container from "@/app/shared/Container";
import BackButton from "@/app/shared/BackButton";
import { termsAndConditionsData } from "@/constants/termsAndConditionsData";

export default function TermsAndConditions() {
  const t = useTranslations("TermsAndConditions");

  return (
    <Container>
      <div className="py-[100px] px-[20px] text-primary">
        <BackButton styles="text-primary/50 hover:text-secondary" />
        <Header
          isDark
          heading={t("Heading")}
          subHeading={t("SubHeading")}
          blockStyles="flex items-center"
          as="h3"
          subAs="h4"
        />

        <div className="mt-16 space-y-12">
          {termsAndConditionsData.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-[22px] sm:text-[26px] lg:text-[36px]">
                {t(section.title)}
              </h2>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <p
                    key={item}
                    className="text-muted-foreground leading-relaxed text-[14px] sm:text-[18px] lg:text-[24px]"
                  >
                    {t(item)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}

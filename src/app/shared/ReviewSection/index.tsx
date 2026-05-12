"use client";

import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { ReviewSectionType } from "./type";
import ReviewComponent from "@/app/shared/ReviewComponent";
import Button from "@/app/shared/Button";
import Header from "@/app/shared/Header";
import { ReviewItem } from "lib/utils/review";

type Props = ReviewSectionType & {
  reviews: ReviewItem[];
};

export default function ReviewSection({
  variant,
  title,
  limit = 3,
  designType,
  isDarkReview,
  isDark,
  borderTop,
  reviews,
}: Props) {
  const router = useRouter();
  const t = useTranslations("Review");
  const displayReviews = reviews.slice(0, limit);

  const wrapperStyles =
    variant === "list"
      ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-dark-gray/50 rounded-2xl p-8 transition-all"
      : "";

  return (
    <section
      className={`px-[20px] flex flex-col items-center gap-[50px] ${borderTop && "border-t border-dark-gray"} ${wrapperStyles}`}
    >
      {title && (
        <Header
          heading={t("Reviews")}
          blockStyles="flex flex-col items-center mt-[50px] md:mt-[100px]"
          isDark={isDark}
        />
      )}
      <ReviewComponent
        reviews={displayReviews}
        variant={variant}
        isDark={isDarkReview}
      />
      <Button
        onClick={() => router.push("/review")}
        styles="px-6 py-3 rounded-lg font-semibold group inline-flex items-center gap-2"
        designType={(designType || "transparent") as "transparent"}
      >
        {t("ShowReviews")}
      </Button>
    </section>
  );
}

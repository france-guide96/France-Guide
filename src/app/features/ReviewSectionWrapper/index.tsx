"use client";

import { useTranslations } from "next-intl";
import BackButton from "@/app/shared/BackButton";
import { useRouter } from "@/navigation";
import Container from "@/app/shared/Container";
import ReviewComponent from "@/app/shared/ReviewComponent";
import { ReviewForm } from "../ReviewForm";
import Button from "@/app/shared/Button";
import Header from "@/app/shared/Header";
import { ReviewItem } from "lib/utils/review";

export default function ReviewSectionWrapper({
  reviews,
  currentPage,
  pageCount,
}: {
  reviews: ReviewItem[];
  currentPage: number;
  pageCount: number;
}) {
  const router = useRouter();
  const t = useTranslations("Review");

  const handlePageChange = (page: number) => {
    router.push(`/review?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-primary px-[20px] py-[100px]">
      <Container>
        <BackButton styles="text-secondary/50 hover:text-secondary xl:pl-[20px]" />
        <div className="flex flex-col gap-[50px] items-center">
          <Header
            heading={t("Reviews")}
            subHeading={t("RealExperience")}
            blockStyles="flex flex-col items-center text-center"
            as="h2"
            subAs="h3"
          />
          <ReviewComponent reviews={reviews} isDark />
          {pageCount > 1 && (
            <div className="flex items-center justify-center sm:gap-2 mt-12">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                styles="px-2 sm:px-4 py-2 rounded-xl text-sm font-medium text-secondary/50 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                ← {t("Prev")}
              </Button>

              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    styles={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${currentPage === page
                      ? "bg-accent text-secondary scale-110"
                      : "text-secondary/50 hover:text-secondary hover:bg-secondary/30"
                      }`}
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
                styles="px-2 sm:px-4 py-2 rounded-xl text-sm font-medium text-secondary/50 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                {t("Next")} →
              </Button>
            </div>
          )}

          <ReviewForm />
        </div>
      </Container>
    </div>
  );
}

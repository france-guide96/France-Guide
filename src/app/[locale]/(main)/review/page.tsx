"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import BackButton from "@/app/shared/BackButton";
import Container from "@/app/shared/Container";
import ReviewComponent from "@/app/shared/ReviewComponent";
import { reviewsData } from "@/constants/reviewsData";

const REVIEWS_PER_PAGE = 9;

export default function Review() {
  const t = useTranslations("Review")
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviewsData.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviewsData.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const handleBack = () => {
    router.back();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-primary px-[20px] py-[100px] md:py-[150px]">
      <Container>
        <div className="px-[20px]">
          <BackButton
            styles="text-secondary/50 hover:text-secondary"
            onClick={handleBack}
          />
          <ReviewComponent reviews={paginatedReviews} />

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl text-sm font-medium text-secondary/50 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                ← {t("Prev")}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${currentPage === page
                    ? "bg-accent text-secondary scale-110"
                    : "text-secondary/50 hover:text-secondary hover:bg-secondary/30"
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl text-sm font-medium text-secondary/50 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                {t("Next")} →
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
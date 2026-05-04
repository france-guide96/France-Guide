"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import BackButton from "@/app/shared/BackButton";
import Container from "@/app/shared/Container";
import ReviewComponent from "@/app/shared/ReviewComponent";
import { reviewsData } from "@/constants/reviewsData";
import Button from "@/app/shared/Button";

const REVIEWS_PER_PAGE = 9;

export default function Review() {
  const t = useTranslations("Review");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviewsData.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviewsData.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-primary px-[20px] py-[100px] md:py-[150px]">
      <Container>
        <div className="px-[20px]">
          <BackButton styles="text-secondary/50 hover:text-secondary" />
          <ReviewComponent reviews={paginatedReviews} />

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                styles="px-4 py-2 rounded-xl text-sm font-medium text-secondary/50 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                ← {t("Prev")}
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    styles={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      currentPage === page
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
                disabled={currentPage === totalPages}
                styles="px-4 py-2 rounded-xl text-sm font-medium text-secondary/50 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                {t("Next")} →
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

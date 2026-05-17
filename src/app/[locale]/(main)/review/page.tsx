// export const runtime = 'edge';

import ReviewSectionWrapper from "@/app/features/ReviewSectionWrapper";
import { fetchReviews, mapStrapiReview } from "lib/api/strapi/review/review";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { reviews: strapiReviews, pageCount } = await fetchReviews(currentPage);
  const reviews = strapiReviews.map(mapStrapiReview);

  return (
    <ReviewSectionWrapper
      reviews={reviews}
      currentPage={currentPage}
      pageCount={pageCount}
    />
  );
}

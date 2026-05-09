import { fetchReviews, mapStrapiReview } from "lib/api/strapi/review/review";
import ReviewSection from "../shared/ReviewSection";
import { ReviewSectionType } from "../shared/ReviewSection/type";

export default async function ReviewSectionServer(props: ReviewSectionType) {
  const { reviews: strapiReviews } = await fetchReviews(1, 3);
  const reviews = strapiReviews.map(mapStrapiReview);

  return <ReviewSection {...props} reviews={reviews} />;
}

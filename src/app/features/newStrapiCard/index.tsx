import { fetchTourCards } from "lib/api/strapi/tour/toursCard";
import { TourCardNew } from "../TourCardNew";
import { TourCard } from "lib/utils/tourCardType";
import CategoryHeader from "@/app/shared/CategoryHeader";
import ReviewSection from "@/app/shared/ReviewSection";

export default async function NewStrapiCard({
  locale,
  category,
}: {
  locale: string;
  category: string;
  categorySlug?: string;
}) {
  const tours = await fetchTourCards(locale, category);

  const sortedTours = [...(tours?.data || [])].sort(
    (a, b) => a.order - b.order,
  );

  if (!tours) return <div>Туры временно недоступны</div>;

  return (
    <>
      <CategoryHeader category={sortedTours?.[0].category} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTours ? (
          sortedTours.map((tour: TourCard) => (
            <TourCardNew key={tour?.id} tour={tour} locale={locale} />
          ))
        ) : (
          <div>No Data</div>
        )}
      </div>
      <ReviewSection variant="grid" isDarkReview title designType="gold" borderTop />
    </>
  );
}

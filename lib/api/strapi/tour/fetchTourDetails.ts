import { categoryMap } from "@/constants/categoryEnum";
import { TourCard } from "../../../utils/tourCardType";
import { fetchWithRetry } from "../fetchWithRetry";

const TOUR_DETAILS_POPULATE = [
  "bgImg",
  "included",
  "gallery",
  "pricing",
  "contentSections",
]
  .map((field) => `populate[${field}][populate]=*`)
  .join("&");

export async function fetchTourDetails(
  locale: string,
  category: string,
  slug: string,
): Promise<TourCard | null> {
  const dbCategory = categoryMap[category as keyof typeof categoryMap];

  if (!dbCategory) {
    console.error(`[FetchTourDetails] Invalid category: ${category}`);
    return null;
  }

  const queryParams = new URLSearchParams({
    locale,
    "filters[slug][$eq]": slug,
    "filters[filterCategory][$eq]": dbCategory,
  });

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/tour-cards?${queryParams.toString()}&${TOUR_DETAILS_POPULATE}`;

  try {
    const res = await fetchWithRetry(url, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      console.error(`[Strapi Error ${res.status}]:`, error);
      return null;
    }

    const { data } = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    return data[0] as TourCard;
  } catch (error) {
    console.error("[fetchTourDetails] Critical Failure:", error);
    return null;
  }
}

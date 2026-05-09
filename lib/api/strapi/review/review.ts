import { fetchWithRetry } from "../fetchWithRetry";

export type Review = {
  id: number;
  name: string;
  review: string;
  rating: number;
  tourSlug: string;
};

export type StrapiReview = {
  id: number;
  name: string;
  review: string;
  rating: number;
  tourSlug: string;
  createdAt: string;
  date?: string;
};

export type ReviewItem = {
  id: number;
  authorName: string;
  rating: number;
  content: string;
  date: string;
  avatar: string;
};

export function mapStrapiReview(r: StrapiReview): ReviewItem {
  const dateObj = r.date
    ? new Date(`${r.date}T12:00:00`)
    : new Date(r.createdAt);

  return {
    id: r.id,
    authorName: r.name,
    rating: r.rating,
    content: r.review,
    date: dateObj.toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    }),
    avatar: "👤",
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
const AUTH_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
};

export async function fetchReviews(
  page = 1,
  pageSize = 9,
): Promise<{
  reviews: StrapiReview[];
  total: number;
  pageCount: number;
}> {
  const params = new URLSearchParams();
  params.set("sort[1]", "createdAt:desc");
  params.set("sort[0]", "date:desc");
  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", String(pageSize));

  try {
    const res = await fetchWithRetry(
      `${STRAPI_URL}/api/reviews?${params.toString()}`,
      { next: { revalidate: 60 }, headers: AUTH_HEADERS },
    );

    if (!res.ok) return { reviews: [], total: 0, pageCount: 0 };

    const json = await res.json();

    console.log(json);

    return {
      reviews: json.data ?? [],
      total: json.meta?.pagination?.total ?? 0,
      pageCount: json.meta?.pagination?.pageCount ?? 0,
    };
  } catch {
    return { reviews: [], total: 0, pageCount: 0 };
  }
}

export async function submitReview(data: {
  name: string;
  review: string;
  rating: number;
}): Promise<boolean> {
  try {
    const today = new Date().toISOString().split("T")[0];
    console.log("Sending date:", today);
    const res = await fetch(`${STRAPI_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          ...data,
          date: today,
        },
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}

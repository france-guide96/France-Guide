import { fetchWithRetry } from "../fetchWithRetry";

export type HomePage = {
  heroTitle: string;
  heroDesc: string;
  categoryTitle: string;
  categoryDescription: string;
  heroColorPart: string;
};

export async function fetchHomePage(locale: string): Promise<HomePage | null> {
  const params = new URLSearchParams();
  params.set("locale", locale);

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?${params.toString()}`;

  try {
    const res = await fetchWithRetry(url, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error("❌ Home page fetch error:", res.status);
      return null;
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("❌ Home page network error:", error);
    return null;
  }
}

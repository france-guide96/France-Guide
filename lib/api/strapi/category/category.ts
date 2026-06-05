import { fetchWithRetry } from "../fetchWithRetry";
import { CategoriesTypes } from "lib/utils/categories";

export async function fetchCategories(
  locale: string,
): Promise<CategoriesTypes[] | null> {
  const params = new URLSearchParams();
  params.set("locale", locale);
  params.append("populate", "image");

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?${params.toString()}`;

  try {
    const res = await fetchWithRetry(url, {
      next: { revalidate: 60 },
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    if (!res.ok) {
      console.error("fetchCategoriesData error:", res.status);
      return null;
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("fetchCategoriesData failed:", error);
    return null;
  }
}

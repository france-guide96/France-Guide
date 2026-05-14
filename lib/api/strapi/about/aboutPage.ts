import { AboutPageData } from "lib/utils/aboutPageType";
import { fetchWithRetry } from "../fetchWithRetry";

export async function fetchAboutPageData(
  locale: string,
): Promise<AboutPageData | null> {
  const params = new URLSearchParams();
  params.set("locale", locale);

  const fields = [
    "stats",
    "aboutPageImage",
    "carousel",
    "educationItems",
    "principles",
  ];
  fields.forEach((field, index) => {
    params.append(`populate[${index}]`, field);
  });

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-page?${params.toString()}`;

  try {
    const res = await fetchWithRetry(url, {
      next: { revalidate: 60 },
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    if (!res.ok) {
      console.error("❌ About Page Error:", res.status);
      return null;
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("❌ Network Error:", error);
    return null;
  }
}

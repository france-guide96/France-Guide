import { MetadataRoute } from "next";
import { fetchTourCards } from "lib/api/strapi/tour/toursCard";
import { categoryMap } from "@/constants/categoryEnum";

const BASE_URL = "https://france-gid.vercel.app";

function urls(path: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    alternates: {
      languages: {
        ru: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      ...urls("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      ...urls("/transfer"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      ...urls("/review"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      ...urls("/privacy-policy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      ...urls("/terms-and-conditions"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = Object.keys(categoryMap).map(
    (categorySlug) => ({
      ...urls(`/${categorySlug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }),
  );

  const tourPages: MetadataRoute.Sitemap = [];

  for (const [categorySlug, dbCategory] of Object.entries(categoryMap)) {
    const tours = await fetchTourCards("ru", dbCategory);
    if (!tours?.data) continue;

    for (const tour of tours.data) {
      const slug = tour?.slug;
      if (!slug) continue;

      tourPages.push({
        ...urls(`/${categorySlug}/${slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return [...staticPages, ...categoryPages, ...tourPages];
}

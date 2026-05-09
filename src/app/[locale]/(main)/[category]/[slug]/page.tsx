import { fetchTourDetails } from "lib/api/strapi/tour/fetchTourDetails";
import { fetchTourCards } from "lib/api/strapi/tour/toursCard";
import { categoryMap } from "@/constants/categoryEnum";
import { TourDetail } from "@/app/features/tourDetails";
import { Metadata } from "next";
import ReviewSectionServer from "@/app/features/ReviewSectionServer";
import Container from "@/app/shared/Container";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const data = await fetchTourDetails(locale, category, slug);

  if (!data) return { title: " France Guide" };

  const title = `${data.primaryText} | France Guide`;
  const description =
    data?.primaryText ||
    (locale === "ru"
      ? "Экскурсия с русскоговорящим гидом по Франции"
      : "Guided tour in France with a Russian-speaking guide");

  const imageUrl = data.bgImg?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.bgImg.url}`
    : "/og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://france-gid.vercel.app/${locale}/${category}/${slug}`,
      images: [
        { url: imageUrl, width: 1200, height: 630, alt: data.primaryText },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const locales = ["ru", "en"];
  const paths: { locale: string; category: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const [categorySlug, dbCategory] of Object.entries(categoryMap)) {
      const tours = await fetchTourCards(locale, dbCategory);
      if (!tours?.data) continue;

      for (const tour of tours.data) {
        if (tour.slug) {
          paths.push({ locale, category: categorySlug, slug: tour.slug });
        }
      }
    }
  }

  return paths;
}

export default async function Page({ params }: Props) {
  const { locale, category, slug } = await params;
  const data = await fetchTourDetails(locale, category, slug);

  if (!data) {
    return (
      <div style={{ padding: "150px", textAlign: "center" }}>
        <p>Страница временно недоступна. Попробуйте позже.</p>
      </div>
    );
  }

  return (
    <div className="bg-primary">
      <TourDetail tour={data} />
      <div className="py-[100px]">
        <Container>
          <ReviewSectionServer
            title
            variant="grid"
            limit={3}
            isDarkReview
            designType="gold"
            borderTop
          />
        </Container>
      </div>
    </div>
  );
}

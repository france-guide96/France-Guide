import NewStrapiCard from "@/app/features/newStrapiCard";
import { categoryMap, CategoryPageProps } from "@/constants/categoryEnum";
import Container from "@/app/shared/Container";
import { notFound } from "next/navigation";
import BackButton from "@/app/shared/BackButton";
import { Metadata } from "next";

const categoryTitles: Record<
  string,
  { ru: string; en: string; descRu: string; descEn: string }
> = {
  "excursions-in-paris": {
    ru: "Экскурсии в Париже",
    en: "Excursions in Paris",
    descRu:
      "Лучшие экскурсии по Парижу с русскоговорящим гидом. Лувр, Эйфелева башня, Монмартр и многое другое.",
    descEn:
      "Best Paris tours with a Russian-speaking guide. Louvre, Eiffel Tower, Montmartre and more.",
  },
  "excursions-to-the-suburbs-of-paris": {
    ru: "Экскурсии по предместьям Парижа",
    en: "Excursions to the suburbs of Paris",
    descRu:
      "Версаль, Фонтенбло, Шантийи и другие замки предместий Парижа с русскоговорящим гидом.",
    descEn:
      "Versailles, Fontainebleau, Chantilly and other castles near Paris with a Russian-speaking guide.",
  },
  "excursions-to-the-regions-of-france": {
    ru: "Экскурсии по регионам Франции",
    en: "Excursions to the regions of France",
    descRu:
      "Нормандия, Шампань, замки Луары, Мон Сен-Мишель — путешествия по Франции с гидом.",
    descEn:
      "Normandy, Champagne, Loire castles, Mont Saint-Michel — guided trips across France.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const isRu = locale === "ru";
  const info = categoryTitles[category];

  const title = info
    ? `${isRu ? info.ru : info.en} |  France Guide`
    : " France Guide";
  const description = info ? (isRu ? info.descRu : info.descEn) : "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://france-gid.vercel.app/${locale}/${category}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const locales = ["ru", "en"];
  const categories = Object.keys(categoryMap);

  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category })),
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = await params;

  const selectedCategory = categoryMap[category as keyof typeof categoryMap];

  if (!selectedCategory) return notFound();

  return (
    <div className="bg-primary">
      <Container>
        <div className="px-[20px] py-[100px] md:py-[150px]">
          <BackButton styles="text-secondary/50 hover:text-secondary" />
          <div className="flex flex-col items-center gap-[50px]">
            <NewStrapiCard
              locale={locale}
              category={selectedCategory}
              categorySlug={category}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

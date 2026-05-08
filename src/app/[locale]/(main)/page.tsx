import { Metadata } from "next";
import Container from "@/app/shared/Container";
import CategoryCards from "@/app/shared/category";
import HeroSectionHome from "@/app/features/HeroSectionHome";
import AboutSectionWrapper from "@/app/shared/AboutSectionWrapper";
import TransferSectionWrapper from "@/app/shared/TransferSectionWrapper";
import ReviewSection from "@/app/shared/ReviewSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return {
    title: isRu
      ? "Экскурсии в Париже с русскоговорящим гидом | France Guide"
      : "France Tours with Russian-Speaking Guide | France Guide",
    description: isRu
      ? "Эксклюзивные экскурсии по Парижу, предместьям и регионам Франции. Индивидуальный подход, незабываемые впечатления. Забронируйте тур сегодня!"
      : "Exclusive guided tours of Paris, its suburbs and regions of France. Personal approach, unforgettable experiences. Book your tour today!",
    keywords: isRu
      ? [
        "экскурсии в Париже",
        "русскоговорящий гид",
        "туры во Францию",
        "Версаль",
        "Лувр",
      ]
      : [
        "France tours",
        "Russian speaking guide",
        "France excursions",
        "Versailles",
        "Louvre",
      ],
    openGraph: {
      title: isRu
        ? "Экскурсии в Париже | France Guide"
        : "France Tours | France Guide",
      description: isRu
        ? "Эксклюзивные экскурсии по Парижу и Франции с русскоговорящим гидом"
        : "Exclusive tours of Paris and France with a Russian-speaking guide",
      url: `https://france-gid.vercel.app/${locale}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div>
      <HeroSectionHome isHero />
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex flex-col items-center">
            <HeroSectionHome />
            <CategoryCards />
            <AboutSectionWrapper locale={locale} />
          </div>
        </Container>
        <TransferSectionWrapper locale={locale} />
        <Container>
          <ReviewSection
            title={true}
            variant="grid"
            limit={3}
            designType="gold"
            isDark
            borderTop
          /></Container>
      </section>
    </div>
  );
}

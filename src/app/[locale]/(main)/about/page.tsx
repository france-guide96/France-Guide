import AboutMe from "@/app/features/AboutMe";
import { fetchAboutPageData } from "lib/api/strapi/about/aboutPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return {
    title: isRu
      ? "О гиде | France Guide — Русскоговорящий гид в Париже"
      : "About the Guide | France Guide — Russian-Speaking Guide in Paris",
    description: isRu
      ? "Профессиональный русскоговорящий гид в Париже. Более 12 лет опыта. Индивидуальные и групповые экскурсии по Парижу и Франции."
      : "Professional Russian-speaking guide in Paris. Over 12 years of experience. Individual and group tours of Paris and France.",
    openGraph: {
      title: isRu ? "О гиде | France Guide" : "About | France Guide",
      description: isRu
        ? "Профессиональный русскоговорящий гид в Париже"
        : "Professional Russian-speaking guide in Paris",
      url: `https://france-gid.vercel.app/${locale}/about`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await fetchAboutPageData(locale);

  if (!data) {
    return (
      <div style={{ padding: "150px", textAlign: "center" }}>
        <p>Страница временно недоступна. Попробуйте позже.</p>
      </div>
    );
  }

  return <AboutMe aboutData={data} />;
}

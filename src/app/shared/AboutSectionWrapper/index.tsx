import { fetchAboutPageData } from "lib/api/strapi/about/aboutPage";
import AboutMe from "@/app/features/AboutMe";

export default async function AboutSectionWrapper({ locale }: { locale: string }) {
  const data = await fetchAboutPageData(locale);

  if (!data) return <div>Страница временно недоступна. Попробуйте позже.</div>;

  return <AboutMe aboutData={data} />;
}
import { fetchHomePage } from "lib/api/strapi/homePage/homePage";
import GetInTouch from "../getInTouch";

export default async function GetInTouchWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeData = await fetchHomePage(locale);

  if (!homeData) return null;

  return (
    <GetInTouch
      title={homeData?.getInTouchTitle || ""}
      description={homeData?.getInTouchDescription || ""}
    />
  );
}

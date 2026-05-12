import ReviewSectionServer from "@/app/features/ReviewSectionServer";
import TransferPage from "@/app/features/TransferComponent";
import Container from "@/app/shared/Container";
import { fetchTransferPageData } from "lib/api/strapi/transfer/transferPage";
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
      ? "Трансфер из аэропорта Парижа | France Guide"
      : "Paris Airport Transfer | France Guide",
    description: isRu
      ? "Комфортный трансфер из аэропортов Парижа (CDG, Orly). Встреча с табличкой, помощь с багажом. Бронируйте заранее!"
      : "Comfortable transfer from Paris airports (CDG, Orly). Meet & greet, luggage assistance. Book in advance!",
    openGraph: {
      title: isRu ? "Трансфер | France Guide" : "Transfer | France Guide",
      description: isRu
        ? "Комфортный трансфер из аэропортов Парижа"
        : "Comfortable transfer from Paris airports",
      url: `https://france-gid.vercel.app/${locale}/transfer`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export default async function Transfer({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await fetchTransferPageData(locale);

  if (!data) {
    return (
      <div style={{ padding: "150px", textAlign: "center" }}>
        <p>Страница временно недоступна. Попробуйте позже.</p>
      </div>
    );
  }

  return (
    <div className="bg-primary py-[100px]">
      <TransferPage data={data} />
      <div className="py-[50px] md:py-[100px]">
        <Container>
          <ReviewSectionServer
            designType="gold"
            isDarkReview
            title
            variant="grid"
            borderTop
          />
        </Container>
      </div>
    </div>
  );
}

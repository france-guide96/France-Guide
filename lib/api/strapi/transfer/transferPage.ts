import { TransferPageData } from "lib/utils/transferType";
import { fetchWithRetry } from "../fetchWithRetry";

export async function fetchTransferPageData(
  locale: string,
): Promise<TransferPageData | null> {
  const query = new URLSearchParams();
  query.set("locale", locale);
  query.append("populate[0]", "carCarousel");
  query.append("populate[1]", "carSpecs");
  query.append("populate[2]", "priceTable");
  query.append("populate[3]", "features");

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/transfer?${query.toString()}`;

  try {
    const res = await fetchWithRetry(url, {
      next: { revalidate: 60 },
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    if (!res.ok) {
      console.error(`Transfer Fetch Error: ${res.status}`);
      return null;
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Transfer Fetch Exception:", error);
    return null;
  }
}

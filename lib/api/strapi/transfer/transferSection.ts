import { TransferSectionData } from "lib/utils/transferType";
import { fetchWithRetry } from "../fetchWithRetry";

export async function fetchTransferData(
  locale: string,
): Promise<TransferSectionData | null> {
  const params = new URLSearchParams();
  params.set("locale", locale);
  params.append("populate", "features");
  params.append("populate", "sectionPopularRoute");
  params.append("populate", "carImage");

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/transfer?${params.toString()}`;

  try {
    const res = await fetchWithRetry(url, {
      next: { revalidate: 60 },
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    });

    if (!res.ok) {
      console.error("fetchTransferData error:", res.status);
      return null;
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("fetchTransferData failed:", error);
    return null;
  }
}

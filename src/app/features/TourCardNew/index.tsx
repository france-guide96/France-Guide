import { getTranslations } from "next-intl/server";
import { Star, Clock, Users } from "lucide-react";
import { TourCard as TourCardType } from "lib/utils/tourCardType";
import Link from "next/link";
import { reverseCategoryMap, CategoryEnum } from "@/constants/categoryEnum";
import { ImageLoader } from "@/app/shared/ImageLoader";

interface TourCardProps {
  tour: TourCardType;
  locale: string;
}

const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export async function TourCardNew({ tour, locale }: TourCardProps) {
  const t = await getTranslations("TourCard");

  const imagePath = tour.bgImg?.formats?.medium?.url || tour.bgImg?.url || "";

  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${strapiURL}${imagePath}`;

  const categoryUrl =
    reverseCategoryMap[tour.filterCategory as CategoryEnum] ||
    tour.filterCategory;

  const tourHref = `/${locale}/${categoryUrl}/${tour.slug}`;

  return (
    <Link
      href={tourHref}
      rel="noopener noreferrer"
      title={tour?.primaryText}
      aria-label={tour?.primaryText}
      className="group block h-full w-full"
    >
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 h-full w-full flex flex-col">
        <div className="relative h-72 overflow-hidden shrink-0 bg-[#0B1220]">
          <ImageLoader
            src={imageUrl}
            alt={tour?.primaryText}
            className="relative w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
            width={600}
            height={400}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

          <div className="absolute top-4 px-4 w-full flex flex-wrap items-start justify-between gap-2">
            {tour?.category && (
              <span className="px-[12px] py-[4px] bg-gray-transparent backdrop-blur-sm text-secondary text-[12px] font-[600] leading-[133%] rounded-full uppercase tracking-wider">
                {tour?.category}
              </span>
            )}
            <div className="flex items-center gap-1 bg-gray-transparent backdrop-blur-sm px-2.5 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-[12px] text-secondary font-[600] leading-[143%]">
                {tour?.rating || "5.0"}
              </span>
            </div>
          </div>

          <h3 className="absolute bottom-4 left-4 right-4 text-secondary text-[20px] font-[600] leading-[140%] line-clamp-2">
            {tour?.primaryText}
          </h3>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-4 mb-6 text-secondary/50 text-[14px] font-[600] leading-[143%]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent/80" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent/80" />
              <span>{t("Individual")}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-secondary/50 text-[14px] uppercase font-[600] tracking-widest">
                {t("From")}
              </span>
              <span className="text-accent text-[24px] font-[700] leading-[133%]">
                {tour.price ? `€ ${tour.price}` : "—"}
              </span>
            </div>
            <div className="px-5 py-2.5 bg-accent group-hover:bg-accent/80 text-secondary text-[14px] font-[600] leading-[143%] rounded-[10px] transition-all shadow-lg shadow-accent/20 uppercase tracking-wide">
              {t("ReadMore")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
import { useLocale } from "next-intl";
import { ExcursionProps } from "./type";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import { ImageWithFallback } from "../imageWithFallback/imageWithFallback";

const strapiURL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export default function ExcursionCard({
  image,
  title,
  description,
  duration,
  group,
  href,
  location,
}: ExcursionProps) {
  const locale = useLocale();

  const rawUrl = typeof image === "string" ? image : image?.url;

  const imageUrl = rawUrl
    ? rawUrl.startsWith("http")
      ? rawUrl
      : `${strapiURL}${rawUrl}`
    : "/fallback-image.jpg";

  return (
    <Link
      href={`/${locale}${href}`}
      rel="noopener noreferrer"
      title={title}
      aria-label={title}
    >
      <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            fill
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="pt-6 px-6 h-[250px] flex flex-col justify-between">
          <h2 className="text-xl xl:text-2xl font-serif text-gray-900 mb-3 group-hover:text-amber-500 transition-colors">
            {title}
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

          <div className="flex items-center gap-4 mb-6 text-[12px] md:text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{location}</span>
            </div>
            <span className="flex items-center gap-1.5 ">
              <Users className="w-4 h-4 text-amber-500" />
              {group}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

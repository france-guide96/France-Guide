import { useLocale, useTranslations } from "next-intl";
import { ExcursionProps } from "./type";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import { ImageWithFallback } from "../imageWithFallback/imageWithFallback";

export default function ExcursionCard({
  image,
  title,
  description,
  duration,
  group,
  href,
  location,
}: ExcursionProps) {
  const t = useTranslations("HeroSection");
  const locale = useLocale();

  return (
    <Link href={`/${locale}${href}`}>
      <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            fill
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-serif text-gray-900 mb-3 group-hover:text-amber-500 transition-colors">
            {title}
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">{t(description)}</p>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{duration + " " + t("Hours")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{location}</span>
            </div>
            <span className="flex items-center gap-1.5 ">
              <Users className="w-4 h-4 text-amber-500" />
              {group + " " + t("People")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

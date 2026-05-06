import { ImageWithFallback } from "@/app/shared/imageWithFallback/imageWithFallback";
import cuteSmile from "@/assets/about/cuteSmile.jpg";
import paris from "@/assets/about/paris.jpeg";
import { Star } from "lucide-react";
import { AboutHeroProps } from "./type";
import ContactButtons from "../ContactButton";
import SmallHeader from "../SmallHeader";
import Container from "../Container";

export default async function AboutHero({
  description,
  statistics,
  aboutPageImage,
  countExcursions,
}: AboutHeroProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const rawImageUrl = aboutPageImage?.[0]?.url;

  const imageURL = rawImageUrl
    ? rawImageUrl.startsWith("http")
      ? rawImageUrl
      : `${STRAPI_URL}${rawImageUrl}`
    : cuteSmile;

  return (
    <section className="relative min-h-screen pt-28">
      <div className="absolute inset-0">
        <ImageWithFallback
          width={1000}
          height={100}
          src={paris}
          alt="Paris"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <Container>
        <div className="relative px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="text-white space-y-4">
              <SmallHeader />
              <p className="text-base text-gray-200 leading-relaxed max-w-xl">
                {description}
              </p>
              <div className="flex gap-4">
                <ContactButtons isAbout/>
              </div>
            </div>

            <div className="hidden lg:flex flex-col justify-center items-center">
              <div className="relative w-full max-w-sm">
                <div className="backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      fill
                      src={imageURL}
                      alt="Гарик Саакян"
                      className="object-cover"
                      unoptimized
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-amber-500 text-white rounded-2xl p-4 shadow-2xl">
                  <div className="text-2xl font-bold">{countExcursions}+</div>
                  <div className="text-xs">экскурсий</div>
                </div>
              </div>
              <div className="w-full grid grid-cols-3 gap-6 pt-6">
                {statistics &&
                  statistics.map((stat, index) => {
                    const isRating =
                      index === 2 || stat.label.toLowerCase().includes("Рейтинг");

                    return (
                      <div
                        key={stat.id}
                        className={`text-center ${index === 1 ? "border-l border-r border-white/20" : ""}`}
                      >
                        {isRating ? (
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <span className="text-4xl font-bold text-amber-400">
                              {stat.value}
                            </span>
                            <Star
                              className="w-6 h-6 text-amber-400 mt-2"
                              fill="currentColor"
                            />
                          </div>
                        ) : (
                          <div className="text-4xl font-bold text-amber-400 mb-1">
                            {stat.value}
                          </div>
                        )}
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
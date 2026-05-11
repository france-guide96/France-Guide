import { ImageWithFallback } from "@/app/shared/imageWithFallback/imageWithFallback";
import { Star } from "lucide-react";
import { AboutHeroProps } from "./type";
import ContactButtons from "../ContactButton";
import SmallHeader from "../SmallHeader";
import Container from "../Container";
import cuteSmile from "@/assets/about/cuteSmile.jpg";
import heroBg from "@/assets/about/heroBg.jpg";

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
    <section className="relative min-h-screen overflow-hidden">
      <ImageWithFallback
        src={heroBg}
        alt="hero background"
        fill
        className="absolute inset-0 w-full h-full object-cover"
        unoptimized
        priority
      />
      <Container>
        <div className="relative sm:px-6 px-[10px]">
          <div className="min-h-screen flex gap-16 items-center justify-between pt-[120px]">
            <div className="flex-2 text-secondary flex flex-col items-start justify-center gap-[10px] md:gap-[20px]">
              <SmallHeader />
              <p className="max-w-[700px] text-[12px] md:text-base text-secondary bg-secondary/20 md:bg-transparent font-bold md:font-normal p-[10px] md:p-0 rounded-2xl">
                {description}
              </p>
              <div className="flex gap-2 md:gap-4">
                <ContactButtons isAbout />
              </div>
            </div>

            <div className="flex-1 hidden lg:flex flex-col justify-center items-center">
              <div className="relative w-full">
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
                <div className="absolute -top-4 -right-4 bg-amber-500 text-secondary rounded-2xl p-4 shadow-2xl">
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
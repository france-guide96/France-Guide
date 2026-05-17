import { ImageWithFallback } from "@/app/shared/imageWithFallback/imageWithFallback";
import { AboutHeroProps } from "./type";
import Container from "../Container";
import cuteSmile from "@/assets/about/cuteSmile.jpg";
import heroBg from "@/assets/about/paris.jpg";

export default async function AboutHero({
  description,
  statistics,
  aboutPageImage,
  countExcursions,
  subTitle,
  title,
}: AboutHeroProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const rawImageUrl = aboutPageImage?.url;
  const imageURL = rawImageUrl
    ? rawImageUrl.startsWith("http")
      ? rawImageUrl
      : `${STRAPI_URL}${rawImageUrl}`
    : cuteSmile;

  return (
    <section className="relative w-full min-h-[110vh] bg-[#fdfdfd] flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[60vh] md:h-[80vh] lg:h-[130vh] z-0">
        <ImageWithFallback
          src={heroBg}
          alt="Paris"
          fill
          className="object-cover grayscale-[0.3] brightness-90"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fdfdfd]" />
      </div>

      <Container>
        <div className="w-full relative z-10 pt-[25vh] pb-[50px] px-[20px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-[100px] items-start justify-between">
            <div className="lg:col-span-6 flex flex-col pt-12">
              <div className="mb-8">
                <span className="inline-block text-black font-semibold text-[16px] tracking-[0.2em] uppercase text-xs mb-4">
                  {subTitle}
                </span>
                <h1 className="text-6xl md:text-[100px] font-serif text-[#1a1a1a] -ml-1">
                  {title}
                </h1>
              </div>

              <div className="border-l-2 border-amber-500 rounded-[30px] p-6 mt-4 bg-white/10 backdrop-blur-md shadow-lg rounded-r-lg">
                <p className="text-lg text-gray-700 font-light leading-relaxed italic">
                  {description}
                </p>

                <div className="flex gap-10 mt-7 mb-5">
                  {statistics?.map((stat) => (
                    <div key={stat.id}>
                      <div className="text-3xl font-bold text-[#1a1a1a]">
                        {stat.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-text-[#1a1a1a] mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] group">
                <div className="absolute -top-10 -left-10 w-full h-full border-[1px] border-gray-200 z-0 hidden md:block" />

                <div className="relative aspect-[3/4] overflow-hidden transition-all duration-500 z-10">
                  <ImageWithFallback
                    fill
                    src={imageURL}
                    alt="Garik"
                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                    unoptimized
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-8 z-20 min-w-[180px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-secondary">
                      {countExcursions} +
                    </span>
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
                    Проведенных <br /> экскурсий
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-10 right-[-5%] hidden lg:block">
        <span className="text-[15vw] font-black text-black/[0.03] select-none uppercase pointer-events-none">
          Tour Paris
        </span>
      </div>
    </section>
  );
}

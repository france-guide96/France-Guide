"use client";

import { useRouter } from "@/navigation";
import { ArrowRight, LucideIcon, Clock, Users, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { ImageWithFallback } from "../imageWithFallback/imageWithFallback";
import { useModals } from "@/context/ModalContext";
import Container from "../Container";
import Header from "../Header";
import Button from "../Button";
import cuteSmile from "@/assets/about/cuteSmile.jpg";
import smile from "@/assets/about/smile.jpg";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const icons = [Clock, Users, Star];

type Props = {
  value: number | string;
  label: string;
  icon: LucideIcon;
};
export default function AboutGuideSection({ aboutData }: AboutDataProps) {
  const router = useRouter();
  const t = useTranslations("About");
  const { openContact } = useModals();

  if (!aboutData)
    return (
      <div className="text-center py-10 text-gray-400 italic">
        Настройте контент в Strapi...
      </div>
    );

  const getImageUrl = (index: number) => {
    const url = aboutData?.gallery?.[index]?.url;
    if (!url) return null;
    return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
  };

  const AboutCard = ({ value, label, icon: Icon }: Props) => {
    return (
      <div className="flex-1 flex flex-col items-center bg-secondary/10 rounded-xl p-2 md:p-4 md:w-[160px] text-center shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-14 h-14 md:mx-auto bg-accent/10 flex items-center justify-center rounded-xl">
          <Icon className="w-6 h-6 text-yellow-600" />
        </div>
        <div className="text-[22px] font-bold text-dark-gray mb-1">{value}</div>
        <div className="text-[14px] text-gray-transparent">{label}</div>
      </div>
    );
  };

  return (
    <Container>
      <section className="w-full py-[100px] grid md:grid-cols-7 gap-12 items-start">
        <div className="flex flex-col gap-[30px] items-start md:col-span-4">
          <Header
            heading={aboutData?.title}
            subHeading={aboutData?.subTitle}
            isDark={true}
          />
          <div className="flex flex-col gap-[20px] px-[10px] text-gray-transparent text-[16px] leading-[170%]">
            {aboutData &&
              aboutData?.description
                ?.split("\n")
                .map((paragraph: string, index: number) =>
                  paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
                )}
          </div>

          {/* <div className="flex flex-row justify-between gap-2 md:gap-6 px-[10px]">
            {aboutData &&
              aboutData?.stats?.map((item, index) => {
                return (
                  <AboutCard
                    key={index}
                    value={item.value}
                    label={item.label}
                    icon={icons[index] || Star}
                  />
                );
              })}
          </div> */}

          {/* axpers es 2ic meky yntri, indz takiny aveli a dur gali, myus karanq jnjenq eta */}

          <div className="w-full grid grid-cols-3 gap-6 pt-6">
            {aboutData &&
              aboutData.stats.map((stat, index) => {
                const isRating =
                  index === 2 || stat.label.toLowerCase().includes("Рейтинг");

                return (
                  <div
                    key={stat.id}
                    className={`text-center ${index === 1 ? "border-l border-r border-primary" : ""}`}
                  >
                    {isRating ? (
                      <div className="flex items-start justify-center gap-1 mb-1">
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
                    <div className="text-sm text-dark-gray">{stat.label}</div>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center justify-center gap-2 px-[10px]">
            <Button
              styles="px-6 py-3 rounded-lg font-semibold group inline-flex items-center gap-2"
              onClick={() => router.push("about")}
              designType="gold"
            >
              <span className="group inline-flex items-center gap-2">
                {t("FindOutMore")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button
              onClick={openContact}
              styles="group inline-flex items-center px-6 py-3 ml-[10px] font-semibold rounded-lg shadow-md hover:shadow-lg"
              designType="white"
            >
              <p>{t("ContactMe")}</p>
            </Button>
          </div>
        </div>

        <div className="hidden md:block space-y-8 pr-[10px] md:col-span-3">
          <div className="relative rounded-2xl overflow-hidden border-4 border-secondary shadow-xl">
            <ImageWithFallback
              src={getImageUrl(0) || cuteSmile}
              alt="guide"
              width={10000}
              height={100}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              unoptimized
            />

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-4 left-4 text-secondary text-xl font-semibold">
              {t("Name")}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map((idx) => (
              <div
                key={idx}
                className="relative h-[250px] rounded-2xl overflow-hidden border-4 border-secondary shadow-lg"
              >
                <ImageWithFallback
                  src={getImageUrl(idx) || smile}
                  alt="paris life"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}

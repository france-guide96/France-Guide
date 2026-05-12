"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Users,
  Car,
  Star,
  LucideIcon,
} from "lucide-react";
import Container from "@/app/shared/Container";
import { ImageWithFallback } from "@/app/shared/imageWithFallback/imageWithFallback";
import Header from "@/app/shared/Header";
import BackButton from "@/app/shared/BackButton";
import ImageExpander from "@/app/shared/ImageExpander";
import { TransferPageData } from "lib/utils/transferType";
import ContactButtons from "@/app/shared/ContactButton";
import TransferFeatures from "@/app/shared/TransferFeatures";

const specIconMap: Record<number, LucideIcon> = {
  0: Users,
  1: Car,
  2: ShieldCheck,
};

export default function TransferPage({ data }: { data: TransferPageData }) {
  const getImageUrlSafe = (url?: string): string => {
    if (!url) return "";

    return url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };

  const firstImage = getImageUrlSafe(data.carCarousel?.[0]?.url);

  return (
    <main className="px-[20px] text-secondary overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -z-10" />
      <Container>
        <BackButton styles="text-secondary/50 hover:text-secondary px-[20px]" />

        <div className="flex flex-col justify-center items-center gap-[60px] px-[20px]">
          <motion.h1
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Header
              heading={data.titlePage}
              subHeading={data.subTitlePage}
              blockStyles="flex text-center items-center"
            />
          </motion.h1>
          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-[60px]">
            <div className="flex-1">
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent rounded-[40px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative rounded-[32px] overflow-hidden border border-secondary/5 bg-dark-gray">
                  <ImageWithFallback
                    src={firstImage}
                    width={1000}
                    height={1000}
                    alt="Mercedes V Class"
                    className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex gap-8">
                      {data &&
                        data.carSpecs?.map((spec, index) => {
                          const Icon = specIconMap[index] || Star;
                          return (
                            <div
                              key={spec.id}
                              className="flex flex-col md:flex-row items-start md:items-center gap-2"
                            >
                              <Icon className="w-5 h-5 text-accent" />
                              <span>{spec.text}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="w-full px-[10px] mt-6">
                <ImageExpander
                  images={
                    data?.carCarousel &&
                    data?.carCarousel.map((img, idx: number) => ({
                      src: getImageUrlSafe(img?.url),
                      alt: `Car gallery image ${idx + 1}`,
                      width: img.width,
                      height: img.height,
                    }))
                  }
                  isGrid
                />
              </div>
            </div>
            <div className="flex-[0.7] flex flex-col items-start gap-[60px]">
              <div className="flex flex-col items-start gap-[20px]">
                <h2 className="text-3xl font-[500] underline decoration-accent decoration-2 underline-offset-8">
                  {data?.carTitle}
                </h2>
                {data &&
                  data?.carDescription
                    ?.split("\n")
                    .map((paragraph: string, index: number) =>
                      paragraph.trim() ? (
                        <p
                          className="text-secondary leading-relaxed text-md"
                          key={index}
                        >
                          {paragraph}
                        </p>
                      ) : null,
                    )}

                <div className="flex items-center justify-center gap-2">
                  <ContactButtons />
                </div>
              </div>
              <TransferFeatures
                data={data}
                headingStyles="text-secondary"
                subHeadingStyles="text-secondary/50"
              />
            </div>
          </div>
        </div>

        <div className="relative group mt-[50px] md:my-[100px] md:px-[20px]">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-accent/30 to-transparent rounded-[10px] blur opacity-20" />
          <div className="relative bg-dark-gray/10 backdrop-blur-2xl rounded-[10px] border border-secondary/5 overflow-hidden">
            <div className="grid grid-cols-12 p-2 md:p-8 border-b border-secondary/5 bg-secondary/5 items-center gap-[10px]">
              <div className="col-span-6 text-[10px] md:text-[14px] uppercase tracking-[1px] md:tracking-[3px] font-[500] text-secondary/50">
                Направление
              </div>
              <div className="col-span-2 text-center text-[10px] md:text-[14px] uppercase font-[500] text-secondary/50">
                1-3 чел с группы
              </div>
              <div className="col-span-2 text-center text-[10px] md:text-[14px] uppercase font-[500] text-secondary/50">
                4-5 чел с группы
              </div>
              <div className="col-span-2 text-center text-[10px] md:text-[14px] uppercase font-[500] text-secondary/50">
                6-7 чел с группы
              </div>
            </div>

            <div className="divide-y divide-secondary/5">
              {data &&
                data.priceTable?.map((item) => (
                  <motion.div
                    viewport={{ once: true }}
                    key={item?.id}
                    whileHover={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                    }}
                    className="grid grid-cols-12 p-2 md:p-4 items-center transition-all group/row"
                  >
                    <div className="col-span-6">
                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-5 h-5 md:w-10 md:h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover/row:border-accent transition-colors">
                          <MapPin className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <div className="text-[10px] text-accent font-[900] uppercase md:tracking-widest leading-none mb-1">
                            {item?.title}
                          </div>
                          <div className="text-[14px] md:text-xl font-[500] flex items-center text-secondary">
                            {item?.subTitle}
                          </div>
                        </div>
                      </div>
                    </div>

                    <PriceCell price={item?.priceStandard} />
                    <PriceCell price={item?.priceBusiness} />
                    <PriceCell price={item?.priceVip} highlight />
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

function PriceCell({
  price,
  highlight,
}: {
  price: number;
  highlight?: boolean;
}) {
  return (
    <div className="col-span-2 text-center">
      <div
        className={`md:text-2xl  ${highlight ? "text-accent drop-shadow-[0_0_10px_rgba(202,138,4,0.3)]" : "text-secondary/80"}`}
      >
        €{price}
      </div>
    </div>
  );
}

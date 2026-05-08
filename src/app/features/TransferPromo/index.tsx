"use client";

import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/app/shared/Container";
import Header from "@/app/shared/Header";
import Button from "@/app/shared/Button";
import { TransferSectionData } from "lib/utils/transferType";
import { ImageWithFallback } from "@/app/shared/imageWithFallback/imageWithFallback";
import TransferFeatures from "@/app/shared/TransferFeatures";

export default function TransferPromo({ data }: { data: TransferSectionData }) {
  const t = useTranslations("Transfer");
  const router = useRouter();

  const carImageUrl = data?.carImage[0]?.url
    ? data.carImage[0].url.startsWith("http")
      ? data.carImage[0].url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.carImage[0].url}`
    : null;

  return (
    <section className="relative py-12 bg-white overflow-hidden px-[20px]">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary/50 blur-[150px] rounded-full pointer-events-none" />
      <Container>
        <Header
          heading={data?.sectionTitle}
          subHeading={data?.sectionSubTitle}
          blockStyles="text-center items-center mb-[50px]"
          isDark={true}
        />

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 lg:order-2 relative">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, scale: 1.1, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImageWithFallback
                src={carImageUrl || ""}
                alt="Mercedes V-Class Luxe"
                width={1000}
                height={100}
                className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-105"
                priority
                unoptimized
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black/10 blur-[60px] rounded-full -z-10" />
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:order-1 flex flex-col gap-12">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-[20px] px-[10px] text-gray-transparent text-[16px] leading-[170%]">
                {data &&
                  data?.sectionDescription
                    ?.split("\n")
                    .map((paragraph: string, index: number) =>
                      paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
                    )}
              </div>
              <TransferFeatures
                data={data}
                headingStyles="text-primary"
                subHeadingStyles="text-gray-transparent/60"
              />
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-50 border border-slate-100 p-8 rounded-[40px] flex items-center justify-between group hover:bg-slate-900 transition-all duration-500"
            >
              <div>
                <p className="text-[10px] uppercase font-[900] text-accent tracking-[3px] mb-2">
                  {t("PopularRoute")}
                </p>
                <h3 className="text-2xl font-[900] text-primary group-hover:text-white transition-colors">
                  {data?.sectionPopularRoute?.[0].from || "CDG"}{" "}
                  <span className="text-accent">→</span>{" "}
                  {data?.sectionPopularRoute?.[0].to || "Paris"}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-3xl font-[900] text-primary group-hover:text-accent transition-colors tracking-tighter">
                  € {data?.sectionPopularRoute?.[0].price || 90}
                </p>
                <p className="text-[9px] uppercase font-bold text-gray-transparent/60 group-hover:text-accent">
                  {t("FixedRate")}
                </p>
              </div>
            </motion.div>

            <div className="flex">
              <Button
                styles="px-6 py-3 rounded-lg font-semibold group inline-flex items-center gap-2"
                onClick={() => router.push("transfer")}
                designType="gold"
              >
                <span className="group inline-flex items-center gap-2">
                  {t("ViewAllRates")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

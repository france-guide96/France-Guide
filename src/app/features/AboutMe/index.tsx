import Container from "@/app/shared/Container";
import Education from "@/app/shared/Education";
import AboutHimself from "@/app/shared/AboutHimself";
import Principles from "@/app/shared/Principles";
import MyStory from "@/app/shared/MyStory";
import AboutHero from "@/app/shared/AboutHero";
import ReviewSection from "@/app/shared/ReviewSection";
import ImageExpander from "@/app/shared/ImageExpander";
import { AboutPageData } from "lib/utils/aboutPageType";

export default function AboutMe({ aboutData }: { aboutData: AboutPageData }) {
  return (
    <>
      <AboutHero
        countExcursions={aboutData?.countExcursions || 500}
        aboutPageImage={aboutData?.aboutPageImage || []}
        description={aboutData?.aboutPageDescription || ""}
        statistics={aboutData?.stats || []}
      />
      <main className="bg-secondary">
        <Container>
            <AboutHimself
              data={aboutData?.myself || []}
              myselfTitle={aboutData?.myselfTitle || ""}
            />
            <div className="py-20">
              <ImageExpander
              isAbout
              images={(aboutData?.carousel[0]?.image || []).map((img) => {
                const rawUrl = img.formats?.large?.url || img.url || "";
                const src = rawUrl.startsWith("http")
                  ? rawUrl
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`;
                return {
                  src,
                  alt: aboutData?.carousel[0]?.alt || "Gallery image",
                  width: img.width,
                  height: img.height,
                };
              })}
              styles="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] py-10"
              imgStyles="relative w-full h-full rounded-[16px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] shadow-md border-none first:row-span-2"
            />
            </div>
            <Education
              title={aboutData?.educationTitle || ""}
              subTitle={aboutData?.educationSubTitle || ""}
              items={aboutData?.educationItems || []}
            />

            <Principles
              title={aboutData?.principleTitle || ""}
              subTitle={aboutData?.principleSubTitle || ""}
              items={aboutData?.principles || []}
            />
            <MyStory
              title={aboutData.timelineEventTitle || ""}
              subTitle={aboutData.timelineEventSubTitle || ""}
              events={aboutData.timelineEventItem || []}
            />
            <ReviewSection
              title={true}
              variant="grid"
              limit={3}
              designType="gold"
              isDark
            />
        </Container>
      </main>
    </>
  );
}

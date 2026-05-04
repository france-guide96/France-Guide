import Container from "@/app/shared/Container";
import Carousel from "@/app/shared/Carousel";
import Education from "@/app/shared/Education";
import AboutHimself from "@/app/shared/AboutHimself";
import Principles from "@/app/shared/Principles";
import MyStory from "@/app/shared/MyStory";
import AboutHero from "@/app/shared/AboutHero";
import { AboutPageData } from "lib/utils/aboutPageType";
import ReviewSection from "@/app/shared/ReviewSection";
import ImageExpander from "@/app/shared/ImageExpander";

export default function AboutMe({ aboutData }: { aboutData: AboutPageData }) {
  return (
    <>
      <AboutHero
        countExcursions={aboutData?.countExcursions || 500}
        aboutPageImage={aboutData?.aboutPageImage || []}
        description={aboutData?.aboutPageDescription || ""}
        statistics={aboutData?.stats || []}
      />
      <main className="bg-secondary py-[50px] md:py-[100px]">
        <Container>
          <div className="py-[50px]">
            <AboutHimself
              data={aboutData?.myself || []}
              myselfTitle={aboutData?.myselfTitle || ""}
            />
            <Carousel data={aboutData?.carousel[0] || []} />
            {/* <ImageExpander /> */}
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
            />
          </div>
        </Container>
      </main>
    </>
  );
}

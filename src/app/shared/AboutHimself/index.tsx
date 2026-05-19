import Header from "@/app/shared/Header";
import { AboutHimselfProps } from "./types";

export default function AboutHimself({
  aboutMyself,
  myselfTitle,
}: AboutHimselfProps) {
  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          heading={myselfTitle}
          headingStyles="font-[500]"
          isDark={true}
          blockStyles="flex items-center"
          as="h2"
          subAs="h3"
        />
        <div className="grid md:grid-cols-1 items-center gap-10 mt-[20px]">
           <div className="bg-gradient-to-br from-secondary-transparent to-secondary rounded-3xl p-4 sm:p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500">
            <p className="text-gray-700 leading-relaxed text-lg italic" style={{ whiteSpace: "pre-wrap" }}>
              {aboutMyself}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

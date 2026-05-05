import { Quote } from "lucide-react";
import Header from "@/app/shared/Header";
import { AboutHimselfProps } from "./types";

export default function AboutHimself({ data, myselfTitle }: AboutHimselfProps) {
  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          heading={myselfTitle}
          headingStyles="font-[500]"
          isDark={true}
          blockStyles="flex items-center"
        />
        <div className="grid md:grid-cols-2 items-start gap-10 mt-[20px]">
          {data?.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-secondary-transparent to-secondary rounded-3xl p-10 shadow-lg border border-gray-100"
            >
              <Quote className="w-12 h-12 text-accent mb-6 opacity-40" />
              <p className="text-gray-700 leading-relaxed text-lg italic">
                {item.aboutMyself}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

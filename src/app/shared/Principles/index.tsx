import {
  Heart,
  Users,
  Award,
  Globe,
  Star,
  type LucideIcon,
} from "lucide-react";
import Header from "@/app/shared/Header";
import { PrinciplesProps } from "./type";

const principleIconMap: Record<number, LucideIcon> = {
  0: Heart,
  1: Users,
  2: Award,
  3: Globe,
};

export default function Principles({
  title,
  subTitle,
  items,
}: PrinciplesProps) {
  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          heading={title}
          headingStyles="font-[500]"
          subHeading={subTitle}
          isDark={true}
          blockStyles="flex items-center mb-12"
          as="h2" subAs="h3"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items?.map((principle, index) => {
            const Icon = principleIconMap[index] || Star;

            return (
              <div
                key={principle.id}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

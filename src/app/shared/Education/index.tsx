import {
  Award,
  GraduationCap,
  CheckCircle,
  Star,
  type LucideIcon,
} from "lucide-react";
import Header from "@/app/shared/Header";
import { EducationProps } from "./type";

const iconMap: Record<number, LucideIcon> = {
  0: Award,
  1: GraduationCap,
  2: CheckCircle,
};

export default function Education({ title, subTitle, items }: EducationProps) {
  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          heading={title}
          headingStyles="font-[500]"
          subHeading={subTitle}
          isDark={true}
          blockStyles="flex items-center mb-12 text-center"
          as="h2"
          subAs="h3"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items &&
            items?.map((item, index: number) => {
              const Icon = iconMap[index] || Star;

              return (
                <div
                  key={item?.id}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item?.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item?.description}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

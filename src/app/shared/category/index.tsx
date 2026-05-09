"use client";

import { useTranslations } from "next-intl";
import { CategoriesData } from "@/constants/categoriesData";
import ExcursionCard from "../ExcursionCard";

export default function CategoryCards() {
  const t = useTranslations("HeroSection");

  return (
    <div className="from-amber-50 via-white to-rose-50 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CategoriesData.map((category) => (
            <ExcursionCard
              key={category.id}
              {...category}
              title={t(category.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

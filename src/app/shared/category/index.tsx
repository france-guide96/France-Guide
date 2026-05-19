"use client";

import { CategoriesTypes } from "lib/utils/categories";
import ExcursionCard from "../ExcursionCard";

export default function CategoryCards({
  categoriesData,
}: {
  categoriesData: CategoriesTypes[];
}) {

  return (
   <div className="from-amber-50 via-white to-rose-50 pb-16 md:py-16 px-[20px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categoriesData.map((category) => (
            <ExcursionCard
              key={category.id}
              {...category}
              title={category.title}
            />
          ))}
      </div>
    </div>
  );
}

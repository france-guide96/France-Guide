"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  authorName: string;
  rating: number;
  content: string;
  date: string;
  avatar: string;
}

interface Props {
  reviews: Review[];
  variant?: "grid" | "list";
  isDark?: boolean;
}

export default function ReviewComponent({
  reviews,
  variant = "grid",
  isDark,
}: Props) {
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 break-inside-avoid px-[20px]">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.01 }}
            className={`min-h-[300px] flex flex-col justify-between gap-[16px] border border-transparent p-6 rounded-[24px] backdrop-blur-sm  hover:scale-101 transition-all duration-500 group ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 hover:border-accent" : "bg-white shadow-lg"}`}
          >
            <div className="flex justify-between items-start ">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-gray-700"}`}
                  />
                ))}
              </div>
              <Quote className="text-accent" />
            </div>
            <p
              className={`h-[140px] text-sm leading-relaxed overflow-hidden ${isDark ? "text-gray-300 italic" : "text-dark-gray"}`}
            >
              {review.content}
            </p>
            <div className="w-full flex items-center gap-[10px] pt-[10px] border-t border-gray-200/50">
              <div className="text-4xl">{review?.avatar}</div>
              <div className="w-full">
                <div className="flex justify-between items-center gap-1.5">
                  <span
                    className={`font-bold text-[14px] ${isDark ? "text-secondary" : "text-black"}`}
                  >
                    {review.authorName}
                  </span>
                  <span
                    className={`${isDark ? "text-white" : "text-black"} text-[12px]`}
                  >
                    {review.date}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-dark-gray pb-6 last:border-0 last:pb-0"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{review?.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-secondary font-semibold">
                    {review.authorName}
                  </div>
                  <div className="text-sm text-gray-400">{review.date}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-transparent"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300">{review.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

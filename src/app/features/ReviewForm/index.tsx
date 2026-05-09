"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { submitReview } from "lib/api/strapi/review/review";
import Button from "@/app/shared/Button";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit() {
    if (!name || !review || !rating) return;
    setStatus("loading");
    const ok = await submitReview({ name, review, rating });
    setStatus(ok ? "success" : "error");
    if (ok) {
      setName("");
      setReview("");
      setRating(0);
    }
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 border border-transparent hover:border-accent rounded-[24px] p-6 flex flex-col gap-4 transition-all duration-500">
      <h3 className="text-secondary text-xl font-semibold">Оставить отзыв</h3>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            <Star
              className={`w-7 h-7 transition-colors cursor-pointer ${
                star <= (hovered || rating)
                  ? "fill-accent text-accent"
                  : "text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-800 text-secondary placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent border border-transparent"
      />

      <textarea
        placeholder="Ваш отзыв"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={4}
        className="bg-gray-800 text-secondary placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent border border-transparent resize-none"
      />

      <Button
        onClick={handleSubmit}
        disabled={status === "loading" || !name || !review || !rating}
        styles="bg-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed text-secondary font-bold py-3 rounded-xl uppercase text-sm transition-all duration-300"
      >
        {status === "loading" ? "Отправка..." : "Отправить"}
      </Button>

      {status === "success" && (
        <p className="text-green-400 text-sm text-center">
          Спасибо! Ваш отзыв отправлен.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Ошибка. Попробуйте снова.
        </p>
      )}
    </div>
  );
}

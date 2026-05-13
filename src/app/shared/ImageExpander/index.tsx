"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GalleryType } from "./type";
import Header from "../Header";
import dynamic from "next/dynamic";
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

import "yet-another-react-lightbox/styles.css";

export default function ImageExpander({
  images,
  styles,
  imgStyles,
  isGrid = false,
  showHeader = false,
}: GalleryType) {
  const [index, setIndex] = useState(-1);
  const t = useTranslations("About");

  if (!images || images.length === 0) return null;

  return (
    <>
      {showHeader && (
        <div className="flex justify-center">
          <Header
            heading={t("Gallery")}
            subHeading={t("ExploreMoments")}
            isDark
            blockStyles="flex items-center"
          />
        </div>
      )}

      <div
        className={
          styles ??
          "grid sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] [grid-auto-flow:dense]"
        }
      >
        {images.map((img, idx) => {
          const isPortrait = img.height > img.width || img.height === img.width;
          const span = isGrid && isPortrait ? "row-span-2" : "row-span-1";

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setIndex(idx)}
              className={`${imgStyles ?? "relative block w-full min-h-[200px] rounded-[16px] overflow-hidden cursor-pointer shadow-md"} ${span}`}
            >
              <div className="relative h-full w-full overflow-hidden bg-[#0B1220] flex items-center justify-center">
                <Image
                  src={img.src}
                  alt={img.alt || ""}
                  fill
                  className="object-cover blur-lg opacity-40 scale-110"
                  unoptimized
                />
                <div className="relative w-full h-full p-1">
                  <Image
                    src={img.src}
                    alt={img.alt || ""}
                    fill
                    unoptimized
                    className={`${isGrid ? "object-cover" : "object-contain z-10"} transition-transform duration-500 hover:scale-[1.02]`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full">
              <Image
                fill
                src={slide.src}
                alt={slide.alt || ""}
                unoptimized
                className="object-contain"
              />
            </div>
          ),
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
}

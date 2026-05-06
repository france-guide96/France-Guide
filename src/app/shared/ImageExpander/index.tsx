"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryType } from "./type";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Header from "../Header";

import "yet-another-react-lightbox/styles.css";
import { useTranslations } from "next-intl";

export default function ImageExpander({
  images,
  styles,
  imgStyles,
  isAbout = false,
}: GalleryType) {
  const [index, setIndex] = useState(-1);
  const t = useTranslations("About")
  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="flex justify-center">
        {isAbout &&
          <Header heading={t("Gallery")} subHeading={t("ExploreMoments")} isDark blockStyles="flex items-center" />
        }
      </div>
      <div
        className={
          styles ??
          "grid grid-cols-3 gap-4 auto-rows-[128px] [grid-auto-flow:dense]"
        }
      >
        {images.map((img, index) => {
          const isPortrait = img.height > img.width || img.height === img.width;
          const span = isPortrait ? "row-span-2" : "row-span-1";

          return (
            <button
              key={index}
              type="button"
              onClick={() => setIndex(index)}
              className={`${imgStyles ?? "relative block w-full rounded-[16px] overflow-hidden cursor-pointer shadow-md border-none"} ${isAbout && span}`}
            >
              <Image
                src={img.src}
                alt={img.alt || ""}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 ease-out hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </button>
          );
        })}
      </div>
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({
          src: img.src,
          alt: img.alt,
        }))}
        plugins={[Zoom]}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        }}
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

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


function TileSkeleton() {
  return (
    <>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.08) 50%, transparent 100%)",
              animation: "goldSweep 1.8s ease-in-out infinite",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, #8B7322, #D4AF37, #8B7322)",
            boxShadow: "0 0 8px #D4AF37",
            opacity: 0.6,
          }}
        />

        <svg width="28" height="36" viewBox="0 0 100 120">
          <path
            d="M50 5 L68 115 M50 5 L32 115 M20 115 H80 M32 85 H68 M42 45 H58"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: 400,
              animation: "drawTower 2s ease-in-out forwards",
            }}
          />
        </svg>

        <div style={{ display: "flex", gap: 5 }}>
          {[0, 0.45, 0.9].map((delay, i) => (
            <span
              key={i}
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#D4AF37",
                display: "block",
                animation: `twinkleDot 2s ${delay}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function ImageExpander({
  images,
  styles,
  imgStyles,
  isGrid = false,
  showHeader = false,
}: GalleryType) {
  const [index, setIndex] = useState(-1);
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({});
  const t = useTranslations("About");

  if (!images || images.length === 0) return null;

  const markLoaded = (idx: number) =>
    setLoadedMap((prev) => ({ ...prev, [idx]: true }));

  return (
    <>
      {showHeader && (
        <div className="flex justify-center">
          <Header
            heading={t("Gallery")}
            subHeading={t("ExploreMoments")}
            isDark
            blockStyles="flex items-center"
            as="h2"
            subAs="h3"
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
          const isLoaded = !!loadedMap[idx];

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setIndex(idx)}
              className={`${imgStyles ?? "relative block w-full min-h-[200px] rounded-[16px] overflow-hidden cursor-pointer shadow-md"} ${span}`}
            >
              <div className="relative h-full w-full overflow-hidden bg-[#0B1220] flex items-center justify-center">
                {/* ── Skeleton: shown until image loads ── */}
                {!isLoaded && <TileSkeleton />}

                {/* ── Blurred background layer ── */}
                <Image
                  src={img.src}
                  alt={img.alt || "france guide"}
                  fill
                  className="object-cover blur-lg opacity-40 scale-110"
                  unoptimized
                  aria-hidden
                />

                <div className="relative w-full h-full p-1">
                  <Image
                    src={img.src}
                    alt={img.alt || "france guide"}
                    fill
                    unoptimized
                    onLoad={() => markLoaded(idx)}
                    className={`
                      ${isGrid ? "object-cover" : "object-contain z-10"}
                      transition-all duration-500 hover:scale-[1.02]
                      ${isLoaded ? "opacity-100" : "opacity-0"}
                    `}
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
                alt={slide.alt || "france guide"}
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
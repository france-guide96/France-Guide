"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryType } from "./type";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

export default function ImageExpander({ images, styles, imgStyles }: GalleryType) {
    const [index, setIndex] = useState(-1);

    if (!images || images.length === 0) return null;

    return (
        <>
            <div className={styles ?? "grid grid-cols-3 gap-4"}>
                {images.map((img, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setIndex(index)}
                        className={imgStyles ?? "relative block h-32 w-full rounded-[16px] overflow-hidden cursor-pointer hover:scale-102 transition-transform duration-300 shadow-md border-none"}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt || ""}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </button>
                ))}
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

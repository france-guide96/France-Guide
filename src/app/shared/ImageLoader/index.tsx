"use client";

import { useState } from "react";
import { ImageWithFallback } from "@/app/shared/imageWithFallback/imageWithFallback";

type Props = React.ComponentProps<typeof ImageWithFallback> & {
  variant?: "dark" | "light";
};

const VARIANTS = {
  dark: {
    bg: "#0a0a0a",
    tower: "#D4AF37",
    sweep: "rgba(212,175,55,0.08)",
    line: "linear-gradient(90deg, #8B7322, #D4AF37, #8B7322)",
    lineShadow: "0 0 8px #D4AF37",
    dot: "#D4AF37",
  },
  light: {
    bg: "#f5f5f0",
    tower: "#8B7322",
    sweep: "rgba(139,115,34,0.08)",
    line: "linear-gradient(90deg, #D4AF37, #8B7322, #D4AF37)",
    lineShadow: "0 0 8px rgba(139,115,34,0.4)",
    dot: "#8B7322",
  },
};

export function ImageLoader({ className, variant = "dark", ...props }: Props) {
  const [loaded, setLoaded] = useState(false);
  const v = VARIANTS[variant];

  return (
    <div className="relative w-full h-full" onLoad={() => setLoaded(true)}>
      {!loaded && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 overflow-hidden"
          style={{ background: v.bg }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, transparent 0%, ${v.sweep} 50%, transparent 100%)`,
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
              background: v.line,
              boxShadow: v.lineShadow,
              opacity: 0.6,
            }}
          />

          <svg width="28" height="36" viewBox="0 0 100 120">
            <path
              d="M50 5 L68 115 M50 5 L32 115 M20 115 H80 M32 85 H68 M42 45 H58"
              stroke={v.tower}
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
                  background: v.dot,
                  display: "block",
                  animation: `twinkleDot 2s ${delay}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <ImageWithFallback
        {...props}
        className={`w-full h-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className ?? ""}`}
      />
    </div>
  );
}
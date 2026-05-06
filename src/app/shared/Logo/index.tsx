export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="url(#ring-gradient)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle cx="24" cy="24" r="19" fill="url(#bg-gradient)" />

          <circle cx="24" cy="4" r="1" fill="#FCD34D" />
          <circle cx="24" cy="44" r="1" fill="#FCD34D" />
          <circle cx="4" cy="24" r="1" fill="#FCD34D" />
          <circle cx="44" cy="24" r="1" fill="#FCD34D" />

          <g transform="translate(24, 35)">
            <line
              x1="-7"
              y1="0"
              x2="7"
              y2="0"
              stroke="#D4AF37"
              strokeWidth="1"
            />

            <path
              d="M -6.5 0 L -3.5 -10 L -2.5 -18 L -1.5 -23"
              stroke="url(#tower-gradient)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 6.5 0 L 3.5 -10 L 2.5 -18 L 1.5 -23"
              stroke="url(#tower-gradient)"
              strokeWidth="1.2"
              fill="none"
            />

            <line
              x1="-6"
              y1="-2"
              x2="6"
              y2="-2"
              stroke="#D4AF37"
              strokeWidth="0.4"
              opacity="0.6"
            />
            <line
              x1="-5"
              y1="-6"
              x2="5"
              y2="-6"
              stroke="#D4AF37"
              strokeWidth="0.4"
              opacity="0.6"
            />

            <line
              x1="-4"
              y1="-10"
              x2="4"
              y2="-10"
              stroke="#D4AF37"
              strokeWidth="0.8"
            />
            <rect
              x="-4"
              y="-11"
              width="8"
              height="2"
              fill="url(#tower-gradient)"
              opacity="0.3"
            />

            <line
              x1="-3.5"
              y1="-12"
              x2="3.5"
              y2="-12"
              stroke="#D4AF37"
              strokeWidth="0.3"
              opacity="0.5"
            />
            <line
              x1="-3"
              y1="-15"
              x2="3"
              y2="-15"
              stroke="#D4AF37"
              strokeWidth="0.3"
              opacity="0.5"
            />

            <line
              x1="-2.5"
              y1="-18"
              x2="2.5"
              y2="-18"
              stroke="#D4AF37"
              strokeWidth="0.7"
            />
            <rect
              x="-2.5"
              y="-19"
              width="5"
              height="1.5"
              fill="url(#tower-gradient)"
              opacity="0.3"
            />

            <path
              d="M -1.5 -23 L -0.5 -26 L 0.5 -26 L 1.5 -23"
              fill="url(#tower-gradient)"
            />

            <line
              x1="0"
              y1="-26"
              x2="0"
              y2="-29"
              stroke="#FCD34D"
              strokeWidth="0.6"
            />

            <circle cx="0" cy="-29.5" r="0.8" fill="#FCD34D">
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            <path
              d="M -6.5 0 Q -6 -3, -4 -5 Q -2 -6.5, 0 -6.5 Q 2 -6.5, 4 -5 Q 6 -3, 6.5 0"
              stroke="#D4AF37"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />
          </g>

          <defs>
            <linearGradient
              id="ring-gradient"
              x1="0"
              y1="0"
              x2="48"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
            <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1F2937" />
            </radialGradient>
            <linearGradient
              id="tower-gradient"
              x1="0"
              y1="-30"
              x2="0"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8960E" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-light text-gray-300">France</span>
        </div>
        <div className="flex items-center gap-1.5 -mt-0.5">
          <div className="h-px w-6 bg-gradient-to-r from-yellow-600 to-transparent"></div>
          <span className="text-[10px] tracking-[0.2em] text-yellow-600/80 uppercase font-semibold">
            Guide
          </span>
        </div>
      </div>
    </div>
  );
}

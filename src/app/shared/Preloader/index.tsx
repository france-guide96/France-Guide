export default function Preloader() {
  return (
    <div className="preloader-root">
      <style>{`
        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 1s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .exit-active {
          transform: translateY(-100%);
        }

        .content-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
        }

        /* Анимация Башни */
        .tower-svg path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: draw-tower 2.5s ease-in-out forwards;
        }

        @keyframes draw-tower {
          to { stroke-dashoffset: 0; }
        }

        /* Анимация букв PARIS */
        .letters-row {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .letter {
          font-family: Georgia, serif;
          font-size: clamp(4rem, 10vw, 8rem);
          color: #D4AF37;
          opacity: 0;
          transform: translateY(30px);
          animation: reveal-letter 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
        }

        @keyframes reveal-letter {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Задержки для каждой буквы */
        .letter:nth-child(1) { animation-delay: 0.4s; }
        .letter:nth-child(2) { animation-delay: 0.5s; }
        .letter:nth-child(3) { animation-delay: 0.6s; }
        .letter:nth-child(4) { animation-delay: 0.7s; }
        .letter:nth-child(5) { animation-delay: 0.8s; }

        /* Золотая линия внизу */
        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #8B7322, #D4AF37, #8B7322);
          box-shadow: 0 0 15px #D4AF37;
          width: 0;
          animation: fill-progress 1s linear forwards;
        }

        @keyframes fill-progress {
          to { width: 100%; }
        }

        /* Мерцающие звезды */
        .star {
          position: absolute;
          width: 5px;
          height: 5px;
          background: #D4AF37;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle 2s infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>

      <div
        className="star"
        style={{ top: "20%", left: "15%", animationDelay: "0.2s" }}
      ></div>
      <div
        className="star"
        style={{ top: "40%", left: "80%", animationDelay: "0.8s" }}
      ></div>
      <div
        className="star"
        style={{ top: "70%", left: "25%", animationDelay: "1.2s" }}
      ></div>
      <div
        className="star"
        style={{ top: "15%", left: "70%", animationDelay: "0.5s" }}
      ></div>

      <div className="content-wrap">
        <svg width="70" height="90" viewBox="0 0 100 120" className="tower-svg">
          <path
            d="M50 5 L68 115 M50 5 L32 115 M20 115 H80 M32 85 H68 M42 45 H58"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="letters-row">
          <span className="letter">P</span>
          <span className="letter">A</span>
          <span className="letter">R</span>
          <span className="letter">I</span>
          <span className="letter">S</span>
        </div>

        <p
          style={{
            marginTop: "24px",
            color: "rgba(212, 175, 55, 0.4)",
            letterSpacing: "0.8em",
            fontSize: "10px",
            textTransform: "uppercase",
          }}
        >
          France Guide
        </p>
      </div>

      <div className="progress-bar"></div>
    </div>
  );
}

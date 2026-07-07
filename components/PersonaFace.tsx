/* Animated persona face: blinks, glances, and cycles happy -> neutral -> grin.
   Pure CSS animation (see globals.css). Falls back to a static happy face when the
   user prefers reduced motion. */

function seedDelay(seed?: string) {
  if (!seed) return 0;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return -(h % 5800); // ms, staggered within the ~6s expression loop
}

export default function PersonaFace({
  bg,
  fg,
  size = 38,
  radius = 11,
  seed,
  float = false,
}: {
  bg: string;
  fg: string;
  size?: number;
  radius?: number;
  seed?: string;
  float?: boolean;
}) {
  const d = seedDelay(seed);
  const delay = `${d}ms`;
  const exprA = { animation: "faceExprA 6s ease-in-out infinite", animationDelay: delay, opacity: 1 };
  const exprB = { animation: "faceExprB 6s ease-in-out infinite", animationDelay: delay, opacity: 0 };
  const exprC = { animation: "faceExprC 6s ease-in-out infinite", animationDelay: delay, opacity: 0 };

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden ${float ? "transition-transform duration-300 hover:scale-[1.05]" : ""}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        borderRadius: radius,
        ...(float ? { animation: "personaFloat 4.5s ease-in-out infinite" } : null),
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {/* Eyes — blink squashes the whole band vertically */}
        <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "faceBlink 4.6s ease-in-out infinite", animationDelay: delay }}>
          {/* A: happy arc eyes */}
          <g style={exprA} fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round">
            <path d="M7 11 Q8.5 9 10 11" />
            <path d="M14 11 Q15.5 9 17 11" />
          </g>
          {/* B: round eyes that glance side to side */}
          <g style={{ ...exprB, transformBox: "fill-box", transformOrigin: "center" }}>
            <g style={{ animation: "faceLook 6s ease-in-out infinite", animationDelay: delay }}>
              <circle cx="8.5" cy="10.5" r="1.5" fill={fg} />
              <circle cx="15.5" cy="10.5" r="1.5" fill={fg} />
            </g>
          </g>
          {/* C: arc eyes (grin) */}
          <g style={exprC} fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round">
            <path d="M7 11 Q8.5 9 10 11" />
            <path d="M14 11 Q15.5 9 17 11" />
          </g>
        </g>

        {/* Mouths — cross-fade in sync with the eyes above */}
        <path style={exprA} d="M8 14.3 Q12 17.6 16 14.3" fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round" />
        <path style={exprB} d="M9.6 14.8 Q12 16 14.4 14.8" fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round" />
        <path style={exprC} d="M7.6 14 Q12 19 16.4 14 Z" fill={fg} stroke="none" />
      </svg>
    </div>
  );
}

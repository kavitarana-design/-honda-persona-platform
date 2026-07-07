/* Filled concentric semicircles that rise from the bottom of the chat while a reply
   generates — Honda red at 10% / 20% / 30% opacity, nested so intensity builds toward the
   bottom-centre. Each gently undulates (gwUndulate) on its own phase. Sits behind the
   chatbox + prompts, confined to a band at the bottom. */

const RED = "#CC0000";

// Bottom-anchored ellipses (cy = bottom); largest+faintest first, smallest+strongest on top.
const RINGS = [
  { rx: 720, ry: 96, opacity: 0.1, dur: "2.8s", delay: "0s" },
  { rx: 480, ry: 66, opacity: 0.2, dur: "3.1s", delay: "0.3s" },
  { rx: 280, ry: 40, opacity: 0.3, dur: "3.4s", delay: "0.6s" },
];

export default function GeneratingWaves() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[100px] overflow-hidden" aria-hidden>
      <svg width="100%" height="100%" viewBox="0 0 1200 100" preserveAspectRatio="none" fill="none">
        {RINGS.map((r, i) => (
          <ellipse
            key={i}
            className="gw-wave"
            cx="600"
            cy="100"
            rx={r.rx}
            ry={r.ry}
            fill={RED}
            style={{ opacity: r.opacity, animationDuration: r.dur, animationDelay: r.delay }}
          />
        ))}
      </svg>
    </div>
  );
}

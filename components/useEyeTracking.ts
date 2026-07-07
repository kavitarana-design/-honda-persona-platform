"use client";

import { useEffect, type RefObject } from "react";

/* Drives a character's eyes: the shared eye <g> (eyesRef) is translated toward the
   cursor when the mouse moves, and drifts in a gentle sine "look-around" when the mouse
   is still. One rAF loop, eased. Honors prefers-reduced-motion (does nothing). Blinking is
   handled separately via CSS so it doesn't collide with this JS-driven transform. */

const IDLE_MS = 1500; // stillness before the idle look-around kicks in

type Options = {
  trackX?: number; // max eye travel toward the cursor (viewBox units)
  trackY?: number;
  idleX?: number; // idle drift amplitude
  idleY?: number;
  idleBiasY?: number; // constant Y offset while idle (negative = look up / pondering)
};

export default function useEyeTracking(
  svgRef: RefObject<SVGSVGElement | null>,
  eyesRef: RefObject<SVGGElement | null>,
  { trackX = 9, trackY = 6, idleX = 5, idleY = 1.5, idleBiasY = 0 }: Options = {}
) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0; // latest pointer position (viewport px)
    let lastMove = -Infinity;
    const cur = { x: 0, y: 0 }; // current eased offset

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      lastMove = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      const now = performance.now();
      const eyes = eyesRef.current;
      const svg = svgRef.current;
      let tx = 0;
      let ty = 0;

      if (svg && now - lastMove < IDLE_MS) {
        // Track: unit vector from the character's on-screen center to the cursor.
        const r = svg.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        tx = (dx / d) * trackX;
        ty = (dy / d) * trackY;
      } else {
        // Idle look-around: slow sine drift (biased up when idleBiasY < 0).
        const t = now / 1000;
        tx = Math.sin(t * 0.9) * idleX;
        ty = idleBiasY + Math.sin(t * 0.6) * idleY;
      }

      cur.x += (tx - cur.x) * 0.15;
      cur.y += (ty - cur.y) * 0.15;
      if (eyes) eyes.style.transform = `translate(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [svgRef, eyesRef, trackX, trackY, idleX, idleY, idleBiasY]);
}

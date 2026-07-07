"use client";

import { useEffect } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

/* The Nebius "dot" mascot (Rive). State machine "main" plays its reveal/unfold intro then
   the hovering idle; we replay it on a loop so it never freezes. The dot's body is purple with
   white detail. hue-rotate + saturate rotate ONLY chromatic pixels, so they turn the purple
   body Honda-red (#CC0000) while leaving white (and black) exactly untouched — verified the
   rotation maps a mid purple to rgb(206,2,0) with white staying (255,255,255). If the red is
   off, nudge the degrees: lower (~68) if the purple is magenta-leaning, higher (~95) if bluer.
   Bottom-aligned so it hugs the greeting. */

const BRAND_TINT = "saturate(1.1) hue-rotate(87deg)";
const LOOP_MS = 4500; // replay the intro→idle sequence on this cadence

export default function RiveDot({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const { rive, RiveComponent } = useRive({
    src: "/dot-intro.riv",
    stateMachines: "main", // single artboard → use the default; drive its state machine
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
  });

  // Keep it looping — restart the state machine so the animation never settles/freezes.
  useEffect(() => {
    if (!rive) return;
    const id = setInterval(() => {
      try {
        rive.reset({ stateMachines: "main", autoplay: true });
      } catch {
        /* no-op if reset isn't applicable */
      }
    }, LOOP_MS);
    return () => clearInterval(id);
  }, [rive]);

  return (
    <div
      className={className}
      style={{ width: size, height: size, filter: BRAND_TINT }}
      aria-hidden
    >
      <RiveComponent />
    </div>
  );
}

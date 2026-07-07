"use client";

import { useRive } from "@rive-app/react-canvas";

/* The bunny character (Rive). Artboard "Login", state machine "State Machine 1".
   The state machine drives idle look-around and eye-tracking of the pointer on its
   own — @rive-app/react-canvas forwards pointer events to the canvas automatically. */
export default function RiveBunny({
  size = 160,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const { RiveComponent } = useRive({
    src: "/bunny.riv",
    artboard: "Login",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return (
    <div style={{ width: size, height: size }} className={className} aria-hidden>
      <RiveComponent />
    </div>
  );
}

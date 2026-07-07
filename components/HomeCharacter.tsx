"use client";

import { useEffect, useState } from "react";
import PersonaCharacter from "@/components/PersonaCharacter";
import ThinkingCharacter from "@/components/ThinkingCharacter";

/* Home hero mascot that actively cycles between the two Persona characters (77.svg and
   88.svg) on the same cadence as the rotating greeting, fading + scaling in on each swap.
   Each character keeps its own cursor-tracking / blink behavior. */

const CHARACTERS = [PersonaCharacter, ThinkingCharacter];
const SWAP_MS = 3800; // matches HomeGreeting's rotation cadence

export default function HomeCharacter({ size = 110 }: { size?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % CHARACTERS.length), SWAP_MS);
    return () => clearInterval(id);
  }, []);

  const Character = CHARACTERS[i];

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <Character
        key={i}
        size={size}
        className="[animation:pcSwapIn_0.6s_ease_both]"
      />
    </div>
  );
}

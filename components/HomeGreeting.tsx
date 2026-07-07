"use client";

import { useEffect, useState } from "react";
import Sparkle from "@/components/Sparkle";

const GREETINGS = [
  "Good morning, Sam",
  "Welcome back, Sam",
  "What are we exploring today?",
  "Ready when you are, Sam",
  "Let's meet your audience",
];

/* Rotating home greeting — cycles through messages, replaying the reveal wipe on each change. */
export default function HomeGreeting() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % GREETINGS.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <Sparkle size={26} animated />
      <h1
        key={i}
        className="text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-[#18181B]"
        style={{ animation: "greetReveal 0.7s ease both" }}
      >
        {GREETINGS[i]}
      </h1>
    </div>
  );
}

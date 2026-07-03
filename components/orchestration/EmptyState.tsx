"use client";

import { useState } from "react";
import Link from "next/link";
import { EXAMPLES } from "@/lib/orchestration";

const StarIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" className="shrink-0">
    <path d="M12 3 L13.4 9.2 L19.5 10.6 L13.4 12 L12 18.5 L10.6 12 L4.5 10.6 L10.6 9.2 Z" fill="#7C3AED" />
  </svg>
);

export default function EmptyState({ onSubmit }: { onSubmit: () => void }) {
  const [draft, setDraft] = useState("");
  const active = draft.trim().length > 0;

  return (
    <div className="mx-auto flex h-full w-full max-w-[900px] flex-col px-8 pb-6 pt-7">
      {/* Intro + examples (top) */}
      <div className="flex flex-col gap-[22px]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-[7px]">
            <h1 className="text-[23px] font-extrabold leading-7 tracking-[-0.01em] text-[#0E0E10]">
              What do you want to learn?
            </h1>
            <p className="text-[15px] leading-[18px] text-[#6E6E73]">
              Tell me in plain language. I&apos;ll interview your personas and write up what they said.
            </p>
          </div>
          <Link href="/saved" className="mt-1 flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-[#52525B] transition-colors hover:text-[#CC0000]">
            Saved briefs
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-semibold leading-4 text-[#6E6E73]">Try one of these</span>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setDraft(ex)}
                className="flex items-center gap-[7px] rounded-full border border-[#E4E4E7] bg-white px-3.5 py-2 text-[13px] leading-4 text-[#0E0E10] transition-colors hover:border-[#7C3AED]"
              >
                {StarIcon}
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Composer (pinned to the bottom, 24px margin) */}
      <div className="mt-auto flex min-h-[84px] flex-col gap-3 rounded-2xl border border-[#E8E8EA] bg-white p-[18px] shadow-[0_1px_2px_#18181B0D]">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Describe what you want to learn… e.g. how Metro vs Tier-2 buyers weigh a City hybrid against the Creta."
          rows={1}
          className="flex-1 resize-none bg-transparent text-[18px] leading-[150%] text-[#0E0E10] placeholder:text-[#B6B6BC] focus:outline-none"
        />
        <div className="flex items-center gap-2.5 border-t border-[#F0F0F1] pt-3.5">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M12.5 5.5 L6.8 11.2 a2.2 2.2 0 0 0 3.1 3.1 L15 9.2 a3.7 3.7 0 0 0 -5.2 -5.2 L4.6 9.1" stroke="#C4C4C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[13px] leading-4 text-[#C4C4C8]">Plain language</span>
          <span className="flex-1" />
          <button
            onClick={() => active && onSubmit()}
            disabled={!active}
            className={`flex items-center gap-[7px] rounded-[10px] px-5 py-[11px] text-[14px] font-semibold leading-[18px] transition-colors ${
              active ? "bg-[#CC0000] text-white" : "bg-[#F1F1F2] text-[#BDBDC2]"
            }`}
          >
            Run Research
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8 H12 M9 5 L12.5 8 L9 11" stroke={active ? "#FFFFFF" : "#BDBDC2"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

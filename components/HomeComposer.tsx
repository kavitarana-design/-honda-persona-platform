"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* Compact home composer: pick Single vs Multi persona, type a request, and it opens the
   matching entry point (recommend-a-persona chat, or a multi-persona compare). */
export default function HomeComposer({ defaultMode = "single" }: { defaultMode?: "single" | "multi" }) {
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [mode, setMode] = useState<"single" | "multi">(defaultMode);
  const active = draft.trim().length > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = draft.trim();
    router.push(`/ask?mode=${mode}${q ? `&q=${encodeURIComponent(q)}` : ""}`);
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto flex w-full max-w-[720px] shrink-0 items-center gap-2 rounded-[26px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 shadow-[0_2px_12px_#18181B0D] transition-all duration-150 focus-within:border-[#CC000080] focus-within:shadow-[0_0_0_3px_#FDECEE,0_8px_22px_#18181B14]"
    >
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Ask your personas anything…"
        className="min-w-0 flex-1 bg-transparent pl-1.5 text-[14px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none"
      />

      {/* Single / Multi persona toggle */}
      <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-[#F4F4F5] p-[3px]">
        {(["single", "multi"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[12px] font-medium transition-colors ${
              mode === m ? "bg-white text-[#18181B] shadow-[0_1px_2px_#18181B14]" : "text-[#71717A] hover:text-[#52525B]"
            }`}
          >
            {mode === m && <span className="h-[6px] w-[6px] rounded-full bg-[#CC0000]" />}
            {m === "single" ? "Single" : "Multi"}
          </button>
        ))}
      </div>

      <button
        type="submit"
        aria-label="Send"
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${active ? "bg-[#CC0000]" : "bg-[#EAEAEA]"}`}
      >
        <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
          <path d="M9 14.5v-11M4.5 8L9 3.5 13.5 8" stroke={active ? "#FFFFFF" : "#71717A"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

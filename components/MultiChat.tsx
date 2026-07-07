"use client";

import { useState } from "react";
import Link from "next/link";
import PersonaAvatar from "@/components/PersonaAvatar";
import Sparkle from "@/components/Sparkle";
import { PERSONA_LIST, evidenceLevel, type Persona } from "@/lib/personas";

const first = (name: string) => name.split(" ").slice(-1)[0];

function Pill({ p }: { p: Persona }) {
  const strong = evidenceLevel(p.confidence) === "Strong";
  const fg = strong ? "#16A34A" : "#B45309";
  const bg = strong ? "#ECFDF3" : "#FEF3C7";
  return (
    <span className="flex items-center gap-1.5 rounded-full px-[9px] py-[3px] text-[11px] font-semibold" style={{ backgroundColor: bg, color: fg }}>
      <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: fg }} />
      {p.confidence}%
    </span>
  );
}

type Turn = { q: string; answers: { p: Persona; text: string }[] };

export default function MultiChat({ seed }: { seed: string }) {
  const personas = PERSONA_LIST;
  const answersFor = (q: string) =>
    personas.map((p) => ({ p, text: p.responses[q]?.text.join(" ") ?? p.fallback.text[0] }));

  const [turns, setTurns] = useState<Turn[]>(seed ? [{ q: seed, answers: answersFor(seed) }] : []);
  const [draft, setDraft] = useState("");
  const active = draft.trim().length > 0;

  function send(e: React.FormEvent) {
    e.preventDefault();
    const q = draft.trim();
    if (!q) return;
    setTurns((t) => [...t, { q, answers: answersFor(q) }]);
    setDraft("");
  }

  return (
    <>
      {/* Thread */}
      <div className="flex-1 overflow-y-auto bg-white px-8 pb-6 pt-7">
        <div className="mx-auto flex w-full max-w-[880px] flex-col">
          {/* Panel header — which personas are in the room */}
          <div className="flex items-center gap-3 rounded-[14px] border border-[#E4E4E7] bg-white px-4 py-3 shadow-[0_1px_2px_#18181B0A]">
            <div className="flex -space-x-2">
              {personas.map((p) => (
                <span key={p.slug} className="rounded-full ring-2 ring-white">
                  <PersonaAvatar slug={p.slug} size={28} />
                </span>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#18181B]">{personas.length} personas</span>
              <span className="text-[12px] font-medium text-[#71717A]">Everyone answers each question · grounded in evidence</span>
            </div>
          </div>

          {turns.map((turn, i) => (
            <div key={i} className="flex flex-col">
              {/* Your question */}
              <div className="mt-[18px] flex flex-row-reverse items-start gap-3">
                <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[15px] bg-[#CC0000] text-[11px] font-bold text-white">AL</span>
                <div className="max-w-[600px] rounded-[14px] bg-[#FDECEC] px-4 py-3">
                  <p className="text-[13.5px] leading-5 text-[#353535]">{turn.q}</p>
                </div>
              </div>

              {/* Answers from each persona */}
              <div className="mt-3 flex items-center gap-2 pl-0.5">
                <Sparkle size={13} />
                <span className="text-[12px] font-medium text-[#A1A1AA]">{turn.answers.length} personas answered</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {turn.answers.map((a) => (
                  <div key={a.p.slug} className="flex flex-col gap-2.5 rounded-[12px] border border-[#E4E4E7] bg-white p-3.5">
                    <div className="flex items-center gap-2.5">
                      <PersonaAvatar slug={a.p.slug} size={30} />
                      <span className="flex-1 truncate text-[13px] font-bold text-[#18181B]">{a.p.name}</span>
                      <Pill p={a.p} />
                    </div>
                    <p className="text-[12.5px] leading-[19px] text-[#3F3F46]">{a.text}</p>
                    <Link href={`/chat/${a.p.slug}`} className="flex items-center gap-1 self-start text-[12px] font-semibold text-[#CC0000]">
                      Chat 1:1 with {first(a.p.name)}
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Composer — asks all personas at once */}
      <div className="shrink-0 border-t border-[#ECECEC] bg-white px-8 py-3.5">
        <form
          onSubmit={send}
          className="mx-auto flex w-full max-w-[880px] items-center gap-2 rounded-[26px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 shadow-[0_2px_12px_#18181B0D] transition-all duration-150 focus-within:border-[#CC000080] focus-within:shadow-[0_0_0_3px_#FDECEE,0_8px_22px_#18181B14]"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask all personas a question…"
            className="min-w-0 flex-1 bg-transparent pl-1.5 text-[14px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none"
          />
          <span className="flex shrink-0 items-center gap-[6px] rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[12.5px] font-medium text-[#52525B]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#CC0000]" />
            {personas.length} personas
          </span>
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
      </div>
    </>
  );
}

"use client";

import { useEffect } from "react";
import { BRIEF, RUN_STEPS } from "@/lib/orchestration";

export default function RunningState({ onEdit, onDone }: { onEdit: () => void; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-8 py-7">
      {/* Compact brief */}
      <div className="flex items-start gap-3 rounded-xl border border-[#E4E4E7] bg-white px-5 py-4">
        <span className="mt-0.5 shrink-0 text-[11px] font-bold uppercase tracking-[0.06em] text-[#A1A1AA]">Brief</span>
        <p className="flex-1 text-[13px] leading-5 text-[#52525B]">{BRIEF}</p>
        <button onClick={onEdit} className="shrink-0 text-[13px] font-semibold text-[#52525B] transition-colors hover:text-[#CC0000]">Edit</button>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-spin [animation-duration:1.1s]">
              <circle cx="12" cy="12" r="9" stroke="#EDEDED" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="#CC0000" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold text-[#18181B]">Interviewing your personas…</span>
          <span className="flex-1" />
          <span className="text-[12.5px] font-medium text-[#71717A]">12 of 25 interviews · about 1 min left</span>
        </div>
        <span className="h-1.5 overflow-hidden rounded-full bg-[#EDEDED]">
          <span className="block h-full w-[48%] rounded-full bg-[#CC0000]" />
        </span>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-1 rounded-xl border border-[#E4E4E7] bg-white p-5">
        {RUN_STEPS.map((s) => (
          <div key={s.label} className="flex items-center gap-3 py-2.5">
            {s.state === "done" ? (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15803D]">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 8.2 L6.6 10.8 L12 5.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            ) : s.state === "active" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 animate-spin [animation-duration:1.1s]">
                <circle cx="12" cy="12" r="9" stroke="#EDEDED" strokeWidth="3" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="#CC0000" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="h-5 w-5 shrink-0 rounded-full border-2 border-[#E4E4E7]" />
            )}
            <span className={`text-[13.5px] ${s.state === "pending" ? "text-[#A1A1AA]" : "font-medium text-[#18181B]"}`}>{s.label}</span>
            {s.note && <span className="text-[12px] text-[#71717A]">· {s.note}</span>}
            <span className="flex-1" />
            {s.state === "done" && <span className="text-[12px] font-semibold text-[#15803D]">Done</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

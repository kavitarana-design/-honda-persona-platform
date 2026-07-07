"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import Topbar from "@/components/Topbar";
import PersonaAvatar from "@/components/PersonaAvatar";
import Sparkle from "@/components/Sparkle";
import HomeComposer from "@/components/HomeComposer";
import MultiChat from "@/components/MultiChat";
import { recommendPersonas, evidenceLevel, type Persona } from "@/lib/personas";

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

function SingleRecommend({ q }: { q: string }) {
  const ranked = recommendPersonas(q);
  const best = ranked[0];
  const others = ranked.slice(1);

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-white px-8 pb-6 pt-7">
        <div className="mx-auto flex w-full max-w-[880px] flex-col">
          {q ? (
            <div className="mt-[18px] flex flex-row-reverse items-start gap-3">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[15px] bg-[#CC0000] text-[11px] font-bold text-white">AL</span>
              <div className="max-w-[600px] rounded-[14px] bg-[#FDECEC] px-4 py-3">
                <p className="text-[13.5px] leading-5 text-[#353535]">{q}</p>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-2 text-center">
              <Sparkle size={26} />
              <h2 className="text-[19px] font-bold tracking-[-0.01em] text-[#18181B]">Who do you want to hear from?</h2>
              <p className="max-w-[440px] text-[13px] leading-[19px] text-[#71717A]">
                Describe what you want to learn below and I&apos;ll match you to the right persona.
              </p>
            </div>
          )}

          {/* Assistant recommendation */}
          <div className="mt-[18px] flex items-start gap-3">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[15px] bg-[#FFF1F1]">
              <Sparkle size={15} />
            </span>
            <div className="flex max-w-[640px] flex-col gap-3 rounded-[14px] border border-[#E4E4E7] bg-white px-4 py-[13px] shadow-[0_1px_2px_#18181B0A]">
              <p className="text-[13.5px] leading-5 text-[#27272A]">
                {q ? <>Based on that, I&apos;d start with <b>{best.name}</b> — {best.tagline.toLowerCase()}.</> : <>Here&apos;s the persona I&apos;d suggest first. You can pick another below.</>}
              </p>
              <Link href={`/chat/${best.slug}`} className="group flex items-center gap-3.5 rounded-[12px] border border-[#E4E4E7] bg-white p-3 transition-colors hover:border-[#CC000080]">
                <PersonaAvatar slug={best.slug} size={44} />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-[14px] font-bold text-[#18181B]">{best.name}</span>
                  <span className="truncate text-[12px] font-medium text-[#71717A]">{best.tagline}</span>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Pill p={best} />
                  <span className="flex items-center gap-1.5 rounded-full bg-[#CC0000] px-3.5 py-2 text-[12.5px] font-semibold text-white">
                    Chat with {first(best.name)}
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4 L10 8 L6 12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Other personas */}
          <div className="mt-4 flex flex-col gap-2 pl-[42px]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Or pick another</span>
            {others.map((p) => (
              <Link key={p.slug} href={`/chat/${p.slug}`} className="group flex items-center gap-3 rounded-[10px] border border-[#ECECEC] bg-white px-3 py-2.5 transition-colors hover:border-[#E4E4E7] hover:bg-[#FAFAFA]">
                <PersonaAvatar slug={p.slug} size={30} />
                <span className="text-[13px] font-semibold text-[#18181B]">{p.name}</span>
                <span className="truncate text-[12px] text-[#A1A1AA]">{p.tagline}</span>
                <span className="flex-1" />
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#A1A1AA] transition-colors group-hover:text-[#CC0000]"><path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[#ECECEC] bg-white px-8 py-3.5">
        <HomeComposer defaultMode="single" />
      </div>
    </>
  );
}

function AskInner() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const mode = sp.get("mode") === "multi" ? "multi" : "single";

  return (
    <AppShell active="home">
      <Topbar title="New conversation" sub={mode === "multi" ? "Multi-persona" : "Single persona"} />
      {mode === "multi" ? <MultiChat seed={q} /> : <SingleRecommend q={q} />}
    </AppShell>
  );
}

export default function AskPage() {
  return (
    <Suspense fallback={null}>
      <AskInner />
    </Suspense>
  );
}

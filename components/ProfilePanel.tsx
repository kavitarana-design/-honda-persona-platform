"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PersonaAvatar from "@/components/PersonaAvatar";
import type { Persona } from "@/lib/personas";
import { evidenceLevel } from "@/lib/personas";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.08em] text-[#A1A1AA]">
      {children}
    </span>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-[1px] bg-[#CC0000]" />
      <span className="text-[13px] leading-[21px] text-[#27272A]">{children}</span>
    </div>
  );
}

function DetailCard({ slug, title, children }: { slug: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col rounded-xl border border-[#E4E4E7]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-xl p-3.5 text-left transition-colors hover:bg-[#FAFAFA]"
      >
        <PersonaAvatar slug={slug} size={26} />
        <span className="text-[14px] font-semibold leading-[18px] text-[#0E0E10]">{title}</span>
        <span className="flex-1" />
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}>
          <path d="M6 4 L10 8 L6 12" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <p className="-mt-1 px-3.5 pb-3.5 text-[13px] leading-[155%] text-[#3F3F46]">{children}</p>}
    </div>
  );
}

export default function ProfilePanel({ persona, onClose }: { persona: Persona; onClose: () => void }) {
  const [shown, setShown] = useState(false);
  const level = evidenceLevel(persona.confidence);
  const accent = level === "Strong" ? "#15803D" : "#B45309";
  const p = persona.profile;

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${shown ? "opacity-100" : "opacity-0"}`}
      />
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[520px] max-w-[92vw] flex-col border-l border-[#ECECEC] bg-white shadow-[-8px_0_30px_#18181B14] transition-transform duration-200 ${
          shown ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-2.5 border-b border-[#ECECEC] px-5 py-[18px]">
          <span className="text-[16px] font-bold leading-5 text-[#0E0E10]">Profile</span>
          <span className="flex-1" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#E4E4E7] transition-colors hover:bg-[#FAFAFA]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 4 L12 12 M12 4 L4 12" stroke="#6E6E73" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
          {/* Character */}
          <div className="flex flex-col items-center gap-4 pt-1">
            <div className="flex items-center justify-center">
              <Image
                src={`/personas/${persona.slug}-2.jpg`}
                alt={persona.name}
                width={128}
                height={128}
                priority
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2.5">
                <span className="text-[19px] font-bold leading-6 tracking-[-0.01em] text-[#18181B]">{persona.name}</span>
                <span className="flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-[9px] py-[3px] text-[11px] font-semibold" style={{ color: accent }}>
                  <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: accent }} />
                  {persona.confidence}%
                </span>
              </div>
              <span className="text-[12.5px] font-medium text-[#71717A]">{persona.meta}</span>
            </div>
          </div>

          {/* Confidence */}
          <div className="flex flex-col gap-2">
            <SectionLabel>Confidence</SectionLabel>
            <div className="flex items-baseline gap-2">
              <span className="text-[22px] font-bold leading-6 tracking-[-0.01em]" style={{ color: accent }}>{persona.confidence}%</span>
              <span className="text-[13px] font-semibold leading-[18px]" style={{ color: accent }}>{level}</span>
              <span className="text-[13px] leading-[18px] text-[#6E6E73]">grounded in evidence</span>
            </div>
            <span className="h-1.5 overflow-hidden rounded-full bg-[#EDEDEF]">
              <span className="block h-full rounded-full" style={{ width: `${persona.confidence}%`, backgroundColor: accent }} />
            </span>
            <span className="text-[12px] leading-4 text-[#6E6E73]">
              Grounded in {persona.records.replace(" records", "")} public posts · refreshed monthly
            </span>
          </div>

          {/* About */}
          <div className="flex flex-col gap-2">
            <SectionLabel>About</SectionLabel>
            <p className="text-[13px] leading-[21px] text-[#27272A]">{persona.description}</p>
          </div>

          {/* Goals */}
          <div className="flex flex-col gap-2.5">
            <SectionLabel>Goals</SectionLabel>
            {p.goals.map((g) => <Bullet key={g}>{g}</Bullet>)}
          </div>

          {/* Objections */}
          <div className="flex flex-col gap-2.5">
            <SectionLabel>Objections</SectionLabel>
            {p.objections.map((o) => <Bullet key={o}>{o}</Bullet>)}
          </div>

          {/* In their words */}
          <div className="flex flex-col gap-2">
            <SectionLabel>In their words</SectionLabel>
            <div className="flex gap-3">
              <span className="w-[3px] shrink-0 rounded-full bg-[#CC0000]" />
              <p className="text-[13px] leading-[21px] text-[#3F3F46]">“{p.quote}”</p>
            </div>
          </div>

          {/* Collapsible detail cards */}
          <DetailCard slug={persona.slug} title="Scenario">{p.scenario}</DetailCard>
          <DetailCard slug={persona.slug} title="Key needs">{p.keyNeeds}</DetailCard>
          <DetailCard slug={persona.slug} title="What moves them">{p.whatMoves}</DetailCard>
          <DetailCard slug={persona.slug} title="Sources & data foundation">{p.sources}</DetailCard>
        </div>
      </aside>
    </>
  );
}

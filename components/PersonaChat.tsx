"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import Topbar from "@/components/Topbar";
import ProfilePanel from "@/components/ProfilePanel";
import EvidenceDrawer from "@/components/EvidenceDrawer";
import PersonaAvatar from "@/components/PersonaAvatar";
import Sparkle from "@/components/Sparkle";
import { evidenceLevel, type Persona, type PMessage } from "@/lib/personas";

const CHIPS = ["Emotional messaging angles", "Top objections to address", "Build a campaign brief"];

const StarIcon = <Sparkle size={13} />;

export default function PersonaChat({ persona }: { persona: Persona }) {
  const [messages, setMessages] = useState<PMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [openEvidence, setOpenEvidence] = useState<Set<number>>(new Set());
  const started = messages.length > 0;

  function toggleEvidence(i: number) {
    setOpenEvidence((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const level = evidenceLevel(persona.confidence);
  const pill =
    level === "Strong"
      ? { bg: "#ECFDF3", fg: "#16A34A" }
      : { bg: "#FEF3C7", fg: "#B45309" };

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const response = persona.responses[q] ?? persona.fallback;
    setMessages((prev) => [...prev, { role: "user", text: [q] }, response]);
    setDraft("");
  }

  return (
    <AppShell active="home" activePersona={persona.slug}>
      <Topbar
        title="Home"
        sub="New conversation"
        right={
          <>
            <span className="flex items-center gap-2 rounded-full border border-[#E4E4E7] px-3 py-1.5 text-[13px] font-medium text-[#3F3F46]">
              <span className="h-[7px] w-[7px] rounded-sm bg-[#CC0000]" />
              Marketing
            </span>
            <button className="flex items-center gap-[7px] rounded-[9px] border border-[#E4E4E7] bg-white px-3 py-[7px] text-[12.5px] font-semibold text-[#52525B]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10l5 5 5-5M12 15V3" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export
            </button>
          </>
        }
      />

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto bg-white px-8 pb-6 pt-7">
        <div className="mx-auto flex w-full max-w-[880px] flex-col">
          {/* Persona header (v3) */}
          <div className="flex items-center gap-4 rounded-[18px] border border-[#FFFFFFD9] bg-[#FDF8F9] px-5 py-[18px] shadow-[0_12px_30px_#18181B1A,0_2px_6px_#18181B0D]">
            <span className="relative shrink-0">
              <PersonaAvatar slug={persona.slug} size={48} />
              <Sparkle size={14} className="absolute -right-0.5 -top-0.5" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-[17px] font-bold leading-[22px] tracking-[-0.01em] text-[#18181B]">{persona.name}</span>
                <span className="flex items-center gap-1.5 rounded-full px-[11px] py-[5px] text-[11.5px] font-semibold" style={{ backgroundColor: pill.bg, color: pill.fg }}>
                  <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: pill.fg }} />
                  Confidence {persona.confidence}%
                </span>
              </div>
              <span className="text-[12.5px] font-medium leading-4 text-[#71717A]">{persona.meta}</span>
            </div>
            <button
              onClick={() => setProfileOpen(true)}
              className="flex shrink-0 items-center gap-[3px] text-[13px] font-medium text-[#6E6E73] transition-colors hover:text-[#CC0000]"
            >
              View profile
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {started ? (
            <>
              <div className="mb-0.5 mt-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#ECECEC]" />
                <span className="text-[11.5px] font-medium text-[#A1A1AA]">Today</span>
                <span className="h-px flex-1 bg-[#ECECEC]" />
              </div>

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="mt-[18px] flex flex-row-reverse items-start gap-3">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[15px] bg-[#CC0000] text-[11px] font-bold text-white">AL</span>
                    <div className="max-w-[600px] rounded-[14px] bg-[#FDECEC] px-4 py-3">
                      <p className="text-[13.5px] leading-5 text-[#353535]">{m.text[0]}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="mt-[18px] flex items-start gap-3">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[15px] bg-[#27272A] text-[11px] font-bold text-white">{persona.initials}</span>
                    <div className="flex max-w-[640px] flex-col gap-[9px] rounded-[14px] border border-[#E4E4E7] bg-white px-4 py-[13px] shadow-[0_1px_2px_#18181B0A]">
                      {m.text.map((t, j) => (
                        <p key={j} className="text-[13.5px] leading-5 text-[#27272A]">{t}</p>
                      ))}
                      {m.evidence && (
                        <div className="pt-[10px]">
                          <div className="flex items-center gap-2">
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0">
                              <circle cx="8" cy="8" r="7.5" fill={m.evidence.strength === "Strong" ? "#15803D" : "#B45309"} />
                              <path d="M4.8 8.2 L7 10.3 L11.2 5.9" fill="none" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[13px] font-semibold leading-4" style={{ color: m.evidence.strength === "Strong" ? "#15803D" : "#B45309" }}>
                              {m.evidence.strength}
                            </span>
                            <span className="text-[13px] leading-4 text-[#6E6E73]">
                              grounded in {persona.evidence.sourceCount} of {persona.records.replace(" records", "")} posts
                            </span>
                            <span className="min-w-4 flex-1" />
                            <button
                              onClick={() => toggleEvidence(i)}
                              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3 py-1.5 text-[13px] font-medium text-[#0E0E10] transition-colors hover:border-[#CC0000]"
                            >
                              {openEvidence.has(i) ? "Hide evidence" : "Show evidence"}
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path d={openEvidence.has(i) ? "M4 10 L8 6 L12 10" : "M6 4 L10 8 L6 12"} stroke="#6E6E73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                          {openEvidence.has(i) && <EvidenceDrawer persona={persona} strength={m.evidence.strength} />}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-5 text-center">
              <Sparkle size={30} />
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[19px] font-bold tracking-[-0.01em] text-[#18181B]">Start a conversation with {persona.name.split(" ").slice(-1)[0]}</h2>
                <p className="max-w-[420px] text-[13px] leading-[19px] text-[#71717A]">
                  Ask a question below to begin. Every answer is grounded in evidence.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="flex flex-col items-center border-t border-[#ECECEC] bg-white px-8 pb-4 pt-3.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex w-full max-w-[680px] flex-col gap-[11px]"
        >
          <div className="flex justify-center gap-2">
            {CHIPS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => send(c)}
                className="flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] font-medium text-[#52525B] transition-colors hover:border-[#CC0000] hover:text-[#CC0000]"
              >
                {StarIcon}
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[#E4E4E7] bg-white px-2.5 py-1.5 shadow-[0_1px_2px_#18181B0D] focus-within:border-[#CC0000]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M21 11l-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" stroke="#71717A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Ask ${persona.name} anything…`}
              className="flex-1 bg-transparent text-[14px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] transition-colors ${draft.trim() ? "bg-[#CC0000]" : "bg-[#EAEAEA]"}`}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M9 14.5v-11M4.5 8L9 3.5 13.5 8" stroke={draft.trim() ? "#FFFFFF" : "#71717A"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {profileOpen && <ProfilePanel persona={persona} onClose={() => setProfileOpen(false)} />}
    </AppShell>
  );
}

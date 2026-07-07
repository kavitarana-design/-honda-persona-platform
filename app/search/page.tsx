"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspaceCard } from "@/components/Topbar";
import PersonaFace from "@/components/PersonaFace";
import PersonaAvatar from "@/components/PersonaAvatar";
import { LIBRARY_PERSONAS } from "@/lib/library";
import { SAVED_BRIEFS } from "@/lib/orchestration";

const CHAT_SLUGS: Record<string, string> = {
  "Aspirational Arjun": "aspirational-arjun",
  "Practical Meera": "practical-meera",
  "EV-curious Rohan": "ev-curious-rohan",
  "Value Seeker Sunita": "value-seeker-sunita",
};

const SCOPES = ["All", "Personas", "Briefs"] as const;

// Recently viewed personas (the chat-capable ones) shown as history in the empty state.
const RECENT_PERSONAS = LIBRARY_PERSONAS.filter((p) => CHAT_SLUGS[p.name]);

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<(typeof SCOPES)[number]>("All");
  const q = query.trim().toLowerCase();

  const showPersonas = scope !== "Briefs";
  const showBriefs = scope !== "Personas";
  const personas = !showPersonas ? [] : q
    ? LIBRARY_PERSONAS.filter((p) => `${p.name} ${p.role} ${p.meta} ${p.description}`.toLowerCase().includes(q))
    : RECENT_PERSONAS;
  const briefs = !showBriefs ? [] : q
    ? SAVED_BRIEFS.filter((b) => `${b.title} ${b.meta}`.toLowerCase().includes(q))
    : SAVED_BRIEFS;
  const total = personas.length + briefs.length;

  return (
    <AppShell active="search">
      <Topbar title="Search" right={<WorkspaceCard />} />

      <div className="bg-app flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[820px] flex-col gap-5 px-8 py-7">
          {/* Search field */}
          <div className="flex items-center gap-3 rounded-[14px] border border-[#E4E4E7] bg-white px-4 py-3.5 shadow-[0_1px_2px_#18181B0D] focus-within:border-[#CC0000]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#A1A1AA" strokeWidth="1.8" /><path d="M21 21l-4-4" stroke="#A1A1AA" strokeWidth="1.8" strokeLinecap="round" /></svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search personas, briefs and reports…"
              className="flex-1 bg-transparent text-[16px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="flex h-6 w-6 items-center justify-center rounded-full text-[#A1A1AA] hover:bg-[#F4F4F5]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4 L12 12 M12 4 L4 12" stroke="#6E6E73" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            )}
          </div>

          {/* Scope chips */}
          <div className="flex gap-2">
            {SCOPES.map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  scope === s ? "border-[#CC0000] bg-[#FDECEC] text-[#CC0000]" : "border-[#E4E4E7] bg-white text-[#52525B] hover:border-[#D4D4D8]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {total === 0 ? (
            <div className="rounded-xl border border-dashed border-[#DEDEE1] bg-white py-16 text-center text-[13px] text-[#A1A1AA]">
              {q ? <>No results for “{query}”.</> : "Nothing here yet."}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {personas.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">
                    {q ? `Personas · ${personas.length}` : "Recent personas"}
                  </span>
                  <div className="flex flex-col gap-2">
                    {personas.map((p) => {
                      const slug = CHAT_SLUGS[p.name];
                      const dot = p.confidence === "Strong" ? "#16A34A" : "#D97706";
                      return (
                        <Link key={p.name} href={slug ? `/chat/${slug}` : "/library"} className="flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white p-3 transition-colors hover:border-[#CC0000]">
                          {slug ? (
                            <PersonaAvatar slug={slug} size={36} />
                          ) : (
                            <PersonaFace bg={p.face.bg} fg={p.face.fg} size={36} radius={18} />
                          )}
                          <div className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-[13.5px] font-semibold text-[#18181B]">{p.name}</span>
                            <span className="truncate text-[12px] text-[#71717A]">{p.role} · {p.meta}</span>
                          </div>
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: dot }} />
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M5 3l4 4-4 4" stroke="#C4C4CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
              {briefs.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">
                    {q ? `Saved briefs · ${briefs.length}` : "Recent briefs"}
                  </span>
                  <div className="flex flex-col gap-2">
                    {briefs.map((b) => (
                      <Link key={b.title} href="/saved" className="flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white p-3 transition-colors hover:border-[#CC0000]">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5]">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="3.5" width="14" height="13" rx="2.5" stroke="#71717A" strokeWidth="1.4" /><path d="M6.5 8H13.5M6.5 11H11" stroke="#71717A" strokeWidth="1.4" strokeLinecap="round" /></svg>
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-[13.5px] font-semibold text-[#18181B]">{b.title}</span>
                          <span className="truncate text-[12px] text-[#71717A]">{b.meta}</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><path d="M5 3l4 4-4 4" stroke="#C4C4CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

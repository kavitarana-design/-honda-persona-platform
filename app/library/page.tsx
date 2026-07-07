"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspaceCard } from "@/components/Topbar";
import PersonaFace from "@/components/PersonaFace";
import FilterDropdown, { RadioRow, CheckRow } from "@/components/library/FilterDropdown";
import { LIBRARY_PERSONAS, LIBRARY_TABS, TAB_SUBTITLE, DEPARTMENTS, SORTS, type LibraryPersona } from "@/lib/library";

const CONFIDENCE_OPTS = [
  { label: "Strong", dot: "#16A34A" },
  { label: "Mixed", dot: "#D97706" },
  { label: "Thin data", dot: "#A1A1AA" },
];

function Card({ p }: { p: LibraryPersona }) {
  const c = p.confidence === "Strong" ? { bg: "#ECFDF3", fg: "#16A34A" } : { bg: "#FEF3C7", fg: "#B45309" };
  return (
    <Link href="/builder" className="flex flex-col gap-[11px] rounded-xl border border-[#E4E4E7] bg-white p-4 transition-all hover:border-[#D4D4D8] hover:shadow-[0_2px_8px_#18181B0F]">
      <div className="flex items-start gap-[11px]">
        <PersonaFace bg={p.face.bg} fg={p.face.fg} size={40} radius={20} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[14px] font-semibold leading-[18px] text-[#18181B]">{p.name}</span>
          <span className="truncate text-[12px] font-medium leading-4 text-[#A1A1AA]">{p.role}</span>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0"><circle cx="12" cy="5" r="1.6" fill="#C4C4CC" /><circle cx="12" cy="12" r="1.6" fill="#C4C4CC" /><circle cx="12" cy="19" r="1.6" fill="#C4C4CC" /></svg>
      </div>
      <span className="text-[12.5px] font-medium leading-4 text-[#71717A]">{p.meta}</span>
      <span className="text-[12.5px] leading-[18px] text-[#A1A1AA]">{p.description}</span>
      <span className="mt-0.5 h-px bg-[#F0F0F2]" />
      <div className="flex items-center gap-[9px]">
        <span className="flex items-center gap-1.5 rounded-full px-[9px] py-[3px] text-[11px] font-semibold" style={{ backgroundColor: c.bg, color: c.fg }}>
          <span className="h-[5px] w-[5px] rounded-sm" style={{ backgroundColor: c.fg }} />
          {p.confidence}
        </span>
        <span className="text-[11.5px] font-semibold text-[#71717A]">{p.records}</span>
        {p.owner && (
          <span className="ml-auto flex items-center gap-1.5">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[9px] text-[8px] font-bold text-white" style={{ backgroundColor: p.owner.color }}>{p.owner.initials}</span>
            <span className="text-[11.5px] font-semibold text-[#52525B]">{p.owner.name}</span>
          </span>
        )}
      </div>
    </Link>
  );
}

function ListRow({ p }: { p: LibraryPersona }) {
  const c = p.confidence === "Strong" ? { bg: "#ECFDF3", fg: "#16A34A" } : { bg: "#FEF3C7", fg: "#B45309" };
  return (
    <Link href="/builder" className="flex items-center gap-4 rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 transition-all hover:border-[#D4D4D8] hover:shadow-[0_2px_8px_#18181B0F]">
      <PersonaFace bg={p.face.bg} fg={p.face.fg} size={40} radius={20} />
      <div className="flex w-[190px] shrink-0 flex-col gap-0.5">
        <span className="truncate text-[14px] font-semibold leading-[18px] text-[#18181B]">{p.name}</span>
        <span className="truncate text-[12px] font-medium leading-4 text-[#A1A1AA]">{p.role}</span>
      </div>
      <span className="hidden w-[150px] shrink-0 truncate text-[12.5px] font-medium text-[#71717A] lg:block">{p.meta}</span>
      <span className="hidden min-w-0 flex-1 truncate text-[12.5px] leading-[18px] text-[#A1A1AA] md:block">{p.description}</span>
      <span className="flex shrink-0 items-center gap-1.5 rounded-full px-[9px] py-[3px] text-[11px] font-semibold" style={{ backgroundColor: c.bg, color: c.fg }}>
        <span className="h-[5px] w-[5px] rounded-sm" style={{ backgroundColor: c.fg }} />
        {p.confidence}
      </span>
      <span className="hidden w-[52px] shrink-0 text-right text-[11.5px] font-semibold text-[#71717A] sm:block">{p.records}</span>
      {p.owner && (
        <span className="hidden shrink-0 items-center gap-1.5 xl:flex">
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[9px] text-[8px] font-bold text-white" style={{ backgroundColor: p.owner.color }}>{p.owner.initials}</span>
          <span className="text-[11.5px] font-semibold text-[#52525B]">{p.owner.name}</span>
        </span>
      )}
      <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0"><circle cx="12" cy="5" r="1.6" fill="#C4C4CC" /><circle cx="12" cy="12" r="1.6" fill="#C4C4CC" /><circle cx="12" cy="19" r="1.6" fill="#C4C4CC" /></svg>
    </Link>
  );
}

export default function PersonaLibraryPage() {
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All departments");
  const [conf, setConf] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState(SORTS[0]);
  const [view, setView] = useState<"grid" | "list">("grid");

  const toggleConf = (c: string) => {
    const next = new Set(conf);
    if (next.has(c)) next.delete(c); else next.add(c);
    setConf(next);
  };

  const count = (key: string) => (key === "all" ? LIBRARY_PERSONAS.length : LIBRARY_PERSONAS.filter((p) => p.group === (key === "templates" ? "template" : key)).length);

  const visible = LIBRARY_PERSONAS.filter((p) => {
    const inTab = tab === "all" || p.group === (tab === "templates" ? "template" : tab);
    const q = query.trim().toLowerCase();
    const inSearch = !q || `${p.name} ${p.role} ${p.meta}`.toLowerCase().includes(q);
    const inDept = dept === "All departments" || p.department === dept;
    const inConf = conf.size === 0 || conf.has(p.confidence);
    return inTab && inSearch && inDept && inConf;
  }).sort((a, b) => {
    if (sort === "Name: A to Z") return a.name.localeCompare(b.name);
    if (sort === "Confidence: high to low") return (b.confidence === "Strong" ? 1 : 0) - (a.confidence === "Strong" ? 1 : 0);
    if (sort === "Data volume: high to low") return b.recordsK - a.recordsK;
    return 0;
  });

  return (
    <AppShell active="library">
      <Topbar title="Persona Library" right={<WorkspaceCard />} />

      <div className="bg-app flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5 px-8 py-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-medium text-[#A1A1AA]">Marketing workspace</span>
              <h1 className="text-[24px] font-bold leading-8 tracking-[-0.02em] text-[#18181B]">Persona Library</h1>
              <p className="text-[13px] font-medium text-[#71717A]">{TAB_SUBTITLE[tab]}</p>
            </div>
            <Link href="/builder" className="flex shrink-0 items-center gap-[7px] rounded-[9px] bg-[#CC0000] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#B8041A]">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3 V13 M3 8 H13" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" /></svg>
              New persona
            </Link>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2.5">
            <div className="flex flex-1 items-center gap-2.5 rounded-[9px] border border-[#E4E4E7] bg-white px-3 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#A1A1AA" strokeWidth="1.8" /><path d="M21 21l-4-4" stroke="#A1A1AA" strokeWidth="1.8" strokeLinecap="round" /></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search personas by name, trait, or segment"
                className="flex-1 bg-transparent text-[13px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none"
              />
            </div>
            <FilterDropdown label={dept === "All departments" ? "Department" : dept} active={dept !== "All departments"} panelClass="w-[240px]">
              {(close) => DEPARTMENTS.map((d) => (
                <RadioRow key={d} label={d} selected={dept === d} onClick={() => { setDept(d); close(); }} />
              ))}
            </FilterDropdown>

            <FilterDropdown label={conf.size ? `Confidence · ${conf.size}` : "Confidence"} active={conf.size > 0} panelClass="w-[220px]">
              {(close) => (
                <>
                  {CONFIDENCE_OPTS.map((c) => (
                    <CheckRow key={c.label} label={c.label} dot={c.dot} checked={conf.has(c.label)} onClick={() => toggleConf(c.label)} />
                  ))}
                  <div className="mt-1 flex items-center justify-between border-t border-[#F0F0F1] px-3 py-2">
                    <button onClick={() => setConf(new Set())} className="text-[12.5px] font-medium text-[#71717A] hover:text-[#CC0000]">Clear</button>
                    <button onClick={close} className="rounded-md bg-[#18181B] px-3 py-1.5 text-[12px] font-semibold text-white">Apply</button>
                  </div>
                </>
              )}
            </FilterDropdown>

            <FilterDropdown label={`Sort: ${sort}`} active={sort !== SORTS[0]} panelClass="w-[220px]">
              {(close) => SORTS.map((s) => (
                <RadioRow key={s} label={s} selected={sort === s} onClick={() => { setSort(s); close(); }} />
              ))}
            </FilterDropdown>
          </div>

          {/* Tabs + view toggle */}
          <div className="flex items-end justify-between">
            <div className="flex flex-1 gap-6 border-b border-[#ECECEC]">
              {LIBRARY_TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`-mb-px flex items-center gap-1.5 border-b-2 pb-2.5 text-[13.5px] font-medium ${
                    tab === t.key ? "border-[#CC0000] text-[#18181B]" : "border-transparent text-[#A1A1AA]"
                  }`}
                >
                  {t.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${tab === t.key ? "bg-[#FDECEC] text-[#CC0000]" : "bg-[#F4F4F5] text-[#A1A1AA]"}`}>{count(t.key)}</span>
                </button>
              ))}
            </div>
            <div className="mb-1.5 ml-4 flex shrink-0 items-center gap-0.5 rounded-lg border border-[#E4E4E7] bg-white p-0.5">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${view === "grid" ? "bg-[#F4F4F5] text-[#18181B]" : "text-[#A1A1AA] hover:text-[#52525B]"}`}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1.2" fill="currentColor" />
                  <rect x="9" y="2" width="5" height="5" rx="1.2" fill="currentColor" />
                  <rect x="2" y="9" width="5" height="5" rx="1.2" fill="currentColor" />
                  <rect x="9" y="9" width="5" height="5" rx="1.2" fill="currentColor" />
                </svg>
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${view === "list" ? "bg-[#F4F4F5] text-[#18181B]" : "text-[#A1A1AA] hover:text-[#52525B]"}`}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="12" height="2" rx="1" fill="currentColor" />
                  <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
                  <rect x="2" y="11" width="12" height="2" rx="1" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          {/* Personas — grid or list */}
          {visible.length ? (
            view === "grid" ? (
              <div className="grid grid-cols-3 gap-3.5">
                {visible.map((p) => <Card key={p.name} p={p} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {visible.map((p) => <ListRow key={p.name} p={p} />)}
              </div>
            )
          ) : (
            <div className="rounded-xl border border-dashed border-[#DEDEE1] bg-white py-16 text-center text-[13px] text-[#A1A1AA]">
              No personas match “{query}”.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import Topbar from "@/components/Topbar";
import PersonaFace from "@/components/PersonaFace";

const TABS = ["Profile", "Data & sources", "Behaviour", "Visibility"];

const AGE_OPTIONS = ["18 – 24", "25 – 34", "35 – 44", "45 – 54", "55+"];
const CITY_OPTIONS = ["Bengaluru", "Nagpur", "Pune", "Jaipur", "Delhi", "Chennai"];
const VEHICLE_OPTIONS = ["Hatchback", "Hatchback → compact SUV", "Compact SUV", "Sedan", "Mid-size SUV"];
const INCOME_OPTIONS = ["₹5 – 8L / year", "₹8 – 15L / year", "₹15 – 25L / year", "₹25L+ / year"];

const SOURCES = [
  { name: "Reddit", count: "540K", value: 540, color: "#FB923C" },
  { name: "YouTube", count: "360K", value: 360, color: "#F43F5E" },
  { name: "TeamBHP", count: "210K", value: 210, color: "#2DD4BF" },
  { name: "CarDekho", count: "120K", value: 120, color: "#818CF8" },
  { name: "Instagram", count: "38K", value: 38, color: "#C084FC" },
];

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[12.5px] font-semibold text-[#3F3F46]">{children}</span>;
}

function Select({ value, onChange, placeholder, options }: { value: string; onChange: (v: string) => void; placeholder: string; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-[9px] border border-[#E4E4E7] bg-white px-3 py-2.5 text-[13px] font-medium focus:border-[#CC0000] focus:outline-none ${value ? "text-[#27272A]" : "text-[#A1A1AA]"}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o} className="text-[#27272A]">{o}</option>)}
      </select>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <path d="M4 6l3 3 3-3" stroke="#A1A1AA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-0.5 rounded-[9px] bg-[#F4F4F5] p-[3px]">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(value === o ? "" : o)}
          className={`flex-1 rounded-md px-3 py-1.5 text-center text-[13px] font-medium transition-colors ${
            o === value ? "bg-[#18181B] text-white shadow-[0_1px_2px_#18181B1A]" : "text-[#71717A] hover:text-[#18181B]"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function BuilderPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [tier, setTier] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [income, setIncome] = useState("");
  const [stage, setStage] = useState("");
  const [powertrain, setPowertrain] = useState<Set<string>>(new Set());
  const [sources, setSources] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, setFn: (s: Set<string>) => void, v: string) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v); else next.add(v);
    setFn(next);
  };

  // Derived preview values
  const attrCount = [age, tier, city, gender, vehicle, income, stage].filter(Boolean).length + (powertrain.size ? 1 : 0);
  const score = Math.min(100, Math.round((attrCount / 8) * 55 + Math.min(sources.size, 4) * 11));
  const started = attrCount > 0 || sources.size > 0 || name.trim().length > 0;
  const level = score >= 71 ? "Strong" : score >= 40 ? "Mixed" : "Thin";
  const levelColor = level === "Strong" ? { dot: "#16A34A", text: "#15803D" } : level === "Mixed" ? { dot: "#D97706", text: "#B45309" } : { dot: "#A1A1AA", text: "#71717A" };

  const selectedSources = SOURCES.filter((s) => sources.has(s.name));
  const totalRecords = selectedSources.reduce((a, s) => a + s.value, 0);
  const recordsLabel = totalRecords >= 1000 ? `${(totalRecords / 1000).toFixed(2)}M` : `${totalRecords}K`;

  const metaLine = [age, city, tier && `${tier} tier`, stage].filter(Boolean).join(" · ");
  const tags = [...powertrain].map((p) => `${p}-interested`).concat(tier ? [tier] : []).slice(0, 4);

  return (
    <AppShell active="library">
      <Topbar
        title="Persona Builder"
        sub="Untitled persona"
        right={
          <>
            <button className="text-[13px] font-medium text-[#71717A]">Discard</button>
            <button className="rounded-[9px] bg-[#CC0000] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#B8041A]">Save persona</button>
          </>
        }
      />

      <div className="bg-app flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1120px] gap-12 px-8 py-7">
          {/* Form */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex gap-6 border-b border-[#ECECEC]">
              {TABS.map((t, i) => (
                <span key={t} className={`-mb-px border-b-2 pb-2.5 text-[13.5px] font-medium ${i === 0 ? "border-[#CC0000] text-[#18181B]" : "border-transparent text-[#A1A1AA]"}`}>{t}</span>
              ))}
            </div>

            {/* Persona name */}
            <div className="mt-5 flex flex-col gap-1.5">
              <Label>Persona name</Label>
              <span className="text-[12px] text-[#A1A1AA]">Name your persona, or let AI suggest one from the attributes below.</span>
              <div className="mt-1 flex items-center gap-2 rounded-[10px] border border-[#E4E4E7] bg-white px-4 py-3 focus-within:border-[#CC0000]">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name your persona…"
                  className="flex-1 bg-transparent text-[15px] font-medium text-[#18181B] placeholder:font-normal placeholder:text-[#A1A1AA] focus:outline-none"
                />
                <button
                  onClick={() => setName(tier ? `${tier} ${["Arjun", "Meera", "Rohan", "Sunita"][Math.min(attrCount, 3)]}` : "New persona")}
                  title="Suggest a name"
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F4F4F5] hover:bg-[#EDEDEF]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M21 2v6h-6" stroke="#71717A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" stroke="#71717A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Attributes */}
            <div className="mt-6 flex flex-col gap-1">
              <span className="text-[15px] font-semibold text-[#18181B]">Attributes</span>
              <span className="text-[12.5px] text-[#A1A1AA]">Shape the profile — the preview and confidence update live as you change these.</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
              <div className="flex flex-col gap-1.5"><Label>Age range</Label><Select value={age} onChange={setAge} placeholder="Select age range" options={AGE_OPTIONS} /></div>
              <div className="flex flex-col gap-1.5"><Label>Location tier</Label><Segmented options={["Metro", "Tier-2", "Tier-3"]} value={tier} onChange={setTier} /></div>
              <div className="flex flex-col gap-1.5"><Label>City</Label><Select value={city} onChange={setCity} placeholder="Select city" options={CITY_OPTIONS} /></div>
              <div className="flex flex-col gap-1.5"><Label>Gender mix</Label><Segmented options={["All", "Balanced", "Skewed"]} value={gender} onChange={setGender} /></div>
              <div className="flex flex-col gap-1.5"><Label>Vehicle segment</Label><Select value={vehicle} onChange={setVehicle} placeholder="Select segment" options={VEHICLE_OPTIONS} /></div>
              <div className="flex flex-col gap-1.5"><Label>Annual income</Label><Select value={income} onChange={setIncome} placeholder="Select income" options={INCOME_OPTIONS} /></div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <Label>Buying stage</Label>
              <Segmented options={["Awareness", "Active consideration", "Post-purchase"]} value={stage} onChange={setStage} />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Label>Powertrain interest</Label>
              <div className="flex gap-2">
                {["Petrol", "Hybrid", "EV"].map((p) => {
                  const on = powertrain.has(p);
                  return (
                    <button key={p} onClick={() => toggle(powertrain, setPowertrain, p)} className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${on ? "border-[#18181B] text-[#18181B]" : "border-[#E4E4E7] text-[#71717A] hover:border-[#D4D4D8]"}`}>
                      {on && "✓ "}{p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Decision priorities placeholder */}
            <div className="mt-6 flex flex-col gap-2">
              <Label>Decision priorities</Label>
              <div className="flex items-center gap-2.5 rounded-[10px] border border-dashed border-[#DEDEE1] bg-white px-4 py-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M3 6h18M3 12h12M3 18h6" stroke="#C4C4C8" strokeWidth="1.8" strokeLinecap="round" /></svg>
                <span className="text-[12.5px] text-[#A1A1AA]">Priorities rank automatically once you add a segment and data sources.</span>
              </div>
            </div>

            {/* Data sources */}
            <div className="mt-6 flex flex-col gap-2">
              <Label>Data sources</Label>
              <span className="text-[12.5px] text-[#A1A1AA]">Pick the platforms this persona is grounded in.</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {SOURCES.map((s) => {
                  const on = sources.has(s.name);
                  const low = s.name === "Instagram";
                  return (
                    <button key={s.name} onClick={() => toggle(sources, setSources, s.name)} className={`flex items-center gap-2 rounded-[9px] border px-3 py-2 text-[13px] font-medium transition-colors ${on ? "border-[#18181B] text-[#27272A]" : "border-[#E4E4E7] text-[#52525B] hover:border-[#D4D4D8]"} ${!on && low ? "border-dashed" : ""}`}>
                      {on ? "✓ " : "+ "}{s.name} <span className="text-[#A1A1AA]">{s.count}</span>
                      {low && <span className="rounded bg-[#FEF3C7] px-1.5 py-0.5 text-[10px] font-semibold text-[#B45309]">low data</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1.5">
              {sources.size > 0 ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: levelColor.dot }} />
                  <span className="text-[12px] font-medium" style={{ color: levelColor.text }}>{level}</span>
                  <span className="text-[12px] text-[#A1A1AA]">· {recordsLabel} records · tied to the June data snapshot</span>
                </>
              ) : (
                <span className="text-[12px] text-[#A1A1AA]">No data yet · pick sources to ground this persona.</span>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="sticky top-0 flex h-fit w-[400px] shrink-0 flex-col gap-4 self-start">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#18181B]">Preview</span>
              <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#71717A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                Live · updating as you edit
              </span>
            </div>

            {/* Preview card */}
            <div className="flex min-h-[152px] flex-col gap-3.5 rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_#18181B0A]">
              <div className="flex items-center gap-3">
                {started ? <PersonaFace bg="#DBEAFE" fg="#2563EB" size={40} radius={12} /> : <span className="h-10 w-10 shrink-0 rounded-xl bg-[#F1F1F3]" />}
                <div className="flex flex-col">
                  <span className={`text-[15px] font-bold ${name.trim() ? "text-[#18181B]" : "text-[#A1A1AA]"}`}>{name.trim() || "Unnamed persona"}</span>
                  <span className="text-[12px] font-medium text-[#71717A]">{tier ? `${tier} buyer` : "Add attributes to shape this persona"}</span>
                </div>
              </div>
              {metaLine && <span className="text-[12px] font-medium text-[#52525B]">{metaLine}</span>}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => <span key={t} className="rounded-md bg-[#F4F4F5] px-2 py-1 text-[11.5px] font-medium text-[#52525B]">{t}</span>)}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: levelColor.dot }} />
                <span className="text-[12.5px] font-semibold" style={{ color: levelColor.text }}>{started ? `${level} · ${score}/100` : "— confidence"}</span>
                {started && <span className="text-[12.5px] text-[#A1A1AA]">confidence</span>}
              </div>
            </div>

            {/* Data sources card */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_#18181B0A]">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#18181B]">Data sources</span>
                {selectedSources.length > 0 && <span className="text-[12px] font-medium text-[#A1A1AA]">{recordsLabel}</span>}
              </div>
              {selectedSources.length > 0 ? (
                <div className="flex flex-col gap-2.5">
                  {selectedSources.map((s) => (
                    <div key={s.name} className="flex items-center gap-3">
                      <span className="w-16 text-[12px] font-medium text-[#52525B]">{s.name}</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F1F3]">
                        <span className="block h-full rounded-full" style={{ width: `${Math.min(100, (s.value / 540) * 100)}%`, backgroundColor: s.color }} />
                      </span>
                      <span className="w-10 text-right text-[12px] font-medium text-[#A1A1AA]">{s.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-[12.5px] text-[#A1A1AA]">No sources selected yet — pick platforms on the left.</span>
              )}
              {sources.has("Instagram") && (
                <div className="flex items-start gap-2 rounded-lg bg-[#FEF7E8] px-3 py-2.5">
                  <span className="text-[13px] text-[#B45309]">⚠</span>
                  <span className="text-[11.5px] leading-[15px] text-[#946200]">Instagram is below the reliable-volume threshold — use with caution.</span>
                </div>
              )}
            </div>

            {/* Ask box */}
            <div className="flex flex-col gap-2.5 rounded-xl border border-[#E4E4E7] bg-white p-3 shadow-[0_1px_2px_#18181B0A]">
              <span className="text-[13px] text-[#A1A1AA]">{started ? `Ask ${name.trim() || "this persona"} anything…` : "Ask this persona anything… (build it first)"}</span>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="rounded-md border border-[#E4E4E7] px-2.5 py-1 text-[12px] font-medium text-[#52525B]">+ Create</span>
                  <span className="rounded-md border border-[#E4E4E7] px-2.5 py-1 text-[12px] font-medium text-[#52525B]">≡ Sources</span>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAEAEA]">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 14.5v-11M4.5 8L9 3.5 13.5 8" stroke="#71717A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

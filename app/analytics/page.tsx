import AppShell from "@/components/AppShell";
import Topbar, { WorkspaceCard } from "@/components/Topbar";

const KPIS = [
  { label: "Research questions", value: "8,420", delta: "12% vs last period", up: true },
  { label: "Active researchers", value: "34", delta: "across 6 departments · +5", up: null },
  { label: "Evidence-backed rate", value: "94%", delta: "3 pts vs last period", up: true },
  { label: "Net sentiment · Honda", value: "+6 pts", delta: "improving vs rivals", up: true },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const HEAT = [
  { d: "D1 · Brand perception", v: [1, 1, 2, 1, 0, 1] },
  { d: "D2 · Price & value", v: [2, 2, 3, 2, 3, 2] },
  { d: "D3 · Design & styling", v: [0, 1, 0, 1, 2, 0] },
  { d: "D4 · Ownership cost", v: [3, 3, 4, 3, 4, 4], bold: true },
  { d: "D5 · Performance & drive", v: [0, 1, 0, 1, 0, 1] },
  { d: "D6 · Comfort & space", v: [2, 1, 2, 1, 0, 1] },
  { d: "D7 · Safety", v: [2, 1, 2, 3, 2, 2] },
  { d: "D8 · Service & dealer", v: [2, 3, 2, 2, 3, 1] },
  { d: "D9 · EV & charging", v: [0, 1, 2, 3, 4, 4], bold: true },
  { d: "D10 · Technology & features", v: [1, 2, 2, 1, 3, 1] },
  { d: "D11 · Resale value", v: [1, 0, 1, 0, 1, 0] },
  { d: "D12 · Fuel efficiency", v: [1, 1, 2, 1, 1, 2] },
];

const SCALE = ["#FCE4E7", "#F6C2C8", "#ED8E97", "#E15764", "#CF1B2B"];

const USAGE = [
  { name: "Aspirational Arjun", pct: 28, note: null },
  { name: "Practical Meera", pct: 22, note: null },
  { name: "EV-curious Rohan", pct: 18, note: null },
  { name: "Safety-Led Sneha", pct: 12, note: null },
  { name: "Value Seeker Sunita", pct: 6, note: "under-used" },
];

const COMPETITORS = [
  { name: "Creta", w: 62, delta: "+3", up: true },
  { name: "Nexon", w: 50, delta: "-2", up: false },
  { name: "Seltos", w: 46, delta: "+1", up: true },
  { name: "Sonet", w: 34, delta: "-4", up: false },
];

const INSIGHTS = [
  { text: "EV-curious buyers drop off at highway charging - flag for EV Strategy.", author: "Priya Nair", tag: "Product" },
  { text: "Tier-2 service reach beats styling in every interview this month.", author: "Rakesh Yadav", tag: "After-Sales" },
  { text: "Five-year cost framing lifts Metro intent more than discounts.", author: "Sam Lee", tag: "Marketing" },
];

const DATASOURCES = [
  { name: "Reddit", meta: "Connected · 4.2M records · deeper ingestion enabled", action: "Manage" },
  { name: "YouTube", meta: "Connected · 3.1M records · comments + reaction tracking", action: "Manage" },
  { name: "CarDekho - owner reviews", meta: "Connected · 1.0M records · post-purchase ownership signal", action: "Manage" },
  { name: "First-party dealer & service data", meta: "Restricted layer · authorisation required · kept out of the public index", action: "Connect" },
];

function Arrow({ up }: { up: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d={up ? "M7 17L17 7M9 7h8v8" : "M7 7l10 10M9 17h8V9"} stroke={up ? "#16A34A" : "#DC2626"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AnalyticsPage() {
  return (
    <AppShell active="analytics">
      <Topbar title="Analytics" right={<WorkspaceCard />} />

      <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 px-8 py-7">
          {/* Heading */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-[#A1A1AA]">Marketing workspace</span>
              <h1 className="text-[28px] font-bold leading-[34px] tracking-[-0.02em] text-[#18181B]">Analytics &amp; Insights</h1>
              <p className="text-[13px] font-medium text-[#71717A]">Longitudinal view of consumer intelligence, persona usage, and trust.</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button className="flex items-center gap-2 rounded-[9px] border border-[#E4E4E7] bg-white px-3 py-2 text-[13px] font-medium text-[#3F3F46]">Last 6 months <span className="text-[#A1A1AA]">▾</span></button>
              <button className="flex items-center gap-1.5 rounded-[9px] border border-[#E4E4E7] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#52525B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 10l5 5 5-5M12 15V3" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Export
              </button>
              <button className="rounded-[9px] bg-[#18181B] px-3.5 py-2 text-[13px] font-semibold text-white">+ Track KPI</button>
            </div>
          </div>

          {/* KPI cards */}
          <div className="flex gap-3.5">
            {KPIS.map((k) => (
              <div key={k.label} className="flex flex-1 flex-col gap-2 rounded-xl border border-[#ECECEC] bg-white px-4 py-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#A1A1AA]">{k.label}</span>
                <span className="text-[30px] font-bold leading-8 tracking-[-0.02em] text-[#18181B]">{k.value}</span>
                <span className="flex items-center gap-1 text-[11.5px] font-medium text-[#52525B]">
                  {k.up !== null && <Arrow up={k.up} />}
                  <span className={k.up ? "text-[#16A34A]" : "text-[#71717A]"}>{k.delta}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Concern + sentiment */}
          <div className="flex gap-3.5">
            <div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#ECECEC] bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#A1A1AA]">Top emerging concern</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[19px] font-bold text-[#18181B]">Charging &amp; range anxiety</span>
                <span className="rounded-full bg-[#FDECEC] px-2 py-0.5 text-[11px] font-semibold text-[#CC0000]">+34% MoM</span>
              </div>
              <p className="text-[13px] leading-[19px] text-[#71717A]">Driven by EV-interested personas in Tier-1 metros, concentrated in dimension D9 (EV &amp; charging).</p>
              <button className="mt-1 w-fit rounded-[9px] bg-[#CC0000] px-3.5 py-2 text-[13px] font-semibold text-white">View topic</button>
            </div>
            <div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#ECECEC] bg-white p-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#A1A1AA]">Sentiment shift</span>
              <div className="flex items-center gap-2.5">
                <span className="text-[19px] font-bold text-[#18181B]">Honda vs key competitors</span>
                <span className="rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[11px] font-semibold text-[#16A34A]">+6 pts</span>
              </div>
              <p className="text-[13px] leading-[19px] text-[#71717A]">Net sentiment toward Honda improved this month while rival brands stayed broadly flat.</p>
              <button className="mt-1 w-fit rounded-[9px] border border-[#E4E4E7] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#52525B]">Explore</button>
            </div>
          </div>

          {/* Taxonomy coverage */}
          <div className="flex items-center justify-between gap-6 rounded-xl border border-[#ECECEC] bg-white px-5 py-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-[#18181B]">Taxonomy coverage</span>
                <span className="rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[11px] font-bold text-[#71717A]">D1–D12</span>
              </div>
              <span className="text-[12.5px] text-[#71717A]">853 questions mapped to the 12-dimension consumer taxonomy this period.</span>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[15px] font-bold text-[#18181B]">86% <span className="text-[12px] font-medium text-[#A1A1AA]">/ 100% dimensions covered</span></span>
                <span className="h-1.5 w-64 overflow-hidden rounded-full bg-[#F1F1F3]"><span className="block h-full w-[86%] rounded-full bg-[#18181B]" /></span>
                <span className="text-[11.5px] font-medium text-[#B45309]">2 dimensions flagged thin-data this month</span>
              </div>
            </div>
            <button className="shrink-0 rounded-[9px] border border-[#E4E4E7] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#52525B]">Edit thresholds</button>
          </div>

          {/* Heatmap */}
          <div className="flex flex-col gap-4 rounded-xl border border-[#ECECEC] bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#18181B]"><b className="text-[22px] font-bold">853</b> <span className="text-[13px] text-[#71717A]">questions this period · by dimension</span></span>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#A1A1AA]">
                Fewer
                {SCALE.map((c) => <span key={c} className="h-3 w-5 rounded-[3px]" style={{ backgroundColor: c }} />)}
                More
              </div>
            </div>
            {/* month header */}
            <div className="flex items-center">
              <span className="w-[180px] shrink-0" />
              {MONTHS.map((m) => <span key={m} className="flex-1 text-center text-[11.5px] font-medium text-[#71717A]">{m}</span>)}
            </div>
            {/* rows */}
            <div className="flex flex-col gap-[5px]">
              {HEAT.map((row) => (
                <div key={row.d} className="flex items-center gap-[5px]">
                  <span className={`w-[180px] shrink-0 text-[12px] ${row.bold ? "font-bold text-[#18181B]" : "font-medium text-[#52525B]"}`}>{row.d}</span>
                  {row.v.map((lvl, i) => (
                    <span key={i} className="h-6 flex-1 rounded-[5px]" style={{ backgroundColor: SCALE[lvl] }} />
                  ))}
                </div>
              ))}
            </div>
            {/* footer stats */}
            <div className="mt-1 flex justify-between border-t border-[#F0F0F2] pt-3">
              {[
                { l: "Top dimension", v: "D4 · Ownership cost", red: false },
                { l: "Busiest week", v: "Wk 22 · May", red: false },
                { l: "Fastest riser", v: "D9 · EV & charging", red: true },
                { l: "Quietest", v: "D11 · Resale value", red: false },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-1">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#A1A1AA]">{s.l}</span>
                  <span className={`text-[13.5px] font-semibold ${s.red ? "text-[#CC0000]" : "text-[#18181B]"}`}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage + competitive */}
          <div className="flex gap-3.5">
            <div className="flex flex-1 flex-col gap-4 rounded-xl border border-[#ECECEC] bg-white p-5">
              <span className="text-[14px] font-semibold text-[#18181B]">Persona usage</span>
              <div className="flex flex-col gap-3">
                {USAGE.map((u) => (
                  <div key={u.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-medium text-[#27272A]">{u.name}</span>
                      <span className={`font-semibold ${u.note ? "text-[#B45309]" : "text-[#52525B]"}`}>{u.pct}%{u.note && <span className="ml-1 font-medium">{u.note}</span>}</span>
                    </div>
                    <span className="h-1.5 overflow-hidden rounded-full bg-[#F1F1F3]"><span className="block h-full rounded-full" style={{ width: `${u.pct * 3}%`, backgroundColor: u.note ? "#E9B872" : "#CC0000" }} /></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-xl border border-[#ECECEC] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#18181B]">Competitive intelligence</span>
                <span className="text-[12px] text-[#A1A1AA]">sentiment vs rivals</span>
              </div>
              <div className="flex flex-col gap-3.5">
                {COMPETITORS.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="w-16 text-[13px] font-medium text-[#27272A]">{c.name}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F1F3]"><span className="block h-full rounded-full bg-[#B4BAC4]" style={{ width: `${c.w}%` }} /></span>
                    <span className={`flex w-10 items-center justify-end gap-0.5 text-[12.5px] font-semibold ${c.up ? "text-[#16A34A]" : "text-[#DC2626]"}`}><Arrow up={c.up} />{c.delta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shared insights */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#18181B]">Shared insights</span>
              <span className="text-[12.5px] font-medium text-[#71717A]">Share +</span>
            </div>
            <div className="flex gap-3.5">
              {INSIGHTS.map((ins) => (
                <div key={ins.author} className="flex flex-1 flex-col gap-3 rounded-xl border border-[#ECECEC] bg-white p-4">
                  <p className="text-[13px] leading-[19px] text-[#27272A]">{ins.text}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-[#52525B]">{ins.author}</span>
                    <span className="rounded-md bg-[#FDECEC] px-2 py-0.5 text-[11px] font-medium text-[#CC0000]">{ins.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connected data sources */}
          <div className="flex flex-col gap-3 rounded-xl border border-[#ECECEC] bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#18181B]">Connected data sources</span>
              <span className="text-[12px] font-medium text-[#A1A1AA]">12.4M records indexed</span>
            </div>
            <div className="flex flex-col">
              {DATASOURCES.map((d, i) => (
                <div key={d.name} className={`flex items-center gap-3 py-3 ${i < DATASOURCES.length - 1 ? "border-b border-[#F0F0F2]" : ""}`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-[13px]">▦</span>
                  <div className="flex flex-1 flex-col">
                    <span className="text-[13px] font-semibold text-[#18181B]">{d.name}</span>
                    <span className="text-[11.5px] text-[#A1A1AA]">{d.meta}</span>
                  </div>
                  <button className={`rounded-[9px] border px-3.5 py-1.5 text-[12.5px] font-semibold ${d.action === "Connect" ? "border-[#CC0000] text-[#CC0000]" : "border-[#E4E4E7] text-[#52525B]"}`}>{d.action}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

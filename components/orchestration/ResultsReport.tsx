import PersonaAvatar from "@/components/PersonaAvatar";
import Sparkle from "@/components/Sparkle";
import { REPORT } from "@/lib/orchestration";

const THEMES = [
  { name: "Running cost", s: "Strong" },
  { name: "Resale value", s: "Strong" },
  { name: "Service reach", s: "Strong" },
  { name: "Styling", s: "Strong" },
  { name: "EV / charging", s: "Mixed" },
] as const;

const LEVELS = { High: { bg: "#FDECEC", fg: "#CC0000" }, Medium: { bg: "#FEF3C7", fg: "#B45309" } } as const;

const DownloadIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10l5 5 5-5M12 15V3" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-3.5 rounded-xl border border-[#E4E4E7] bg-white p-5 ${className}`}>
      {title && <span className="text-[14px] font-semibold text-[#18181B]">{title}</span>}
      {children}
    </div>
  );
}

export default function ResultsReport({ onReRun }: { onReRun: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-[1130px] flex-col gap-4 px-8 py-7">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#A1A1AA]">Research Report</span>
          <h1 className="text-[24px] font-bold leading-8 tracking-[-0.02em] text-[#18181B]">{REPORT.title}</h1>
          <span className="text-[12.5px] font-medium text-[#71717A]">{REPORT.meta}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-[7px] rounded-[9px] border border-[#E4E4E7] bg-white px-[13px] py-2 text-[12.5px] font-semibold text-[#52525B]">{DownloadIcon}PDF</button>
          <button className="flex items-center gap-[7px] rounded-[9px] border border-[#E4E4E7] bg-white px-[13px] py-2 text-[12.5px] font-semibold text-[#52525B]">{DownloadIcon}Excel</button>
          <button onClick={onReRun} className="flex items-center gap-[7px] rounded-[9px] bg-[#18181B] px-3.5 py-2 text-[12.5px] font-semibold text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 2v6h-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Re-run
          </button>
        </div>
      </div>

      {/* Metrics + takeaway */}
      <div className="flex gap-4">
        <div className="flex flex-1 items-stretch rounded-xl border border-[#E4E4E7] bg-white">
          {REPORT.metrics.map((m, i) => (
            <div key={m.label} className={`flex flex-1 flex-col gap-1 px-5 py-4 ${i > 0 ? "border-l border-[#F0F0F1]" : ""}`}>
              <span className="text-[22px] font-bold leading-6 tracking-[-0.01em]" style={{ color: m.tone === "green" ? "#15803D" : "#B45309" }}>{m.value}</span>
              <span className="text-[12px] text-[#71717A]">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-[1.3] items-start gap-3 rounded-xl border border-[#E4E4E7] border-l-[3px] border-l-[#CC0000] bg-white p-5">
          <Sparkle size={18} className="mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#CC0000]">Executive takeaway</span>
            <p className="text-[14px] leading-[21px] text-[#18181B]">{REPORT.takeaway}</p>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="flex gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {/* Drivers chart */}
          <Card title="What drives the decision">
            <div className="flex flex-col gap-2.5">
              {REPORT.drivers.map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-[12.5px] font-medium text-[#52525B]">{d.label}</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#F1F1F3]">
                    <span className="block h-full rounded-full bg-[#CC0000]" style={{ width: `${d.pct}%` }} />
                  </span>
                  <span className="w-8 shrink-0 text-right text-[12px] font-semibold text-[#18181B]">{d.pct}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Evidence & confidence */}
          <Card title="Evidence & confidence by theme">
            <div className="flex flex-col gap-2">
              {THEMES.map((t) => (
                <div key={t.name} className="flex items-center gap-2 border-b border-[#F5F5F6] pb-2 last:border-0 last:pb-0">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.s === "Strong" ? "#16A34A" : "#D97706" }} />
                  <span className="text-[13px] text-[#27272A]">{t.name}</span>
                  <span className="flex-1" />
                  <span className="text-[12px] font-semibold" style={{ color: t.s === "Strong" ? "#15803D" : "#B45309" }}>{t.s}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Persona quotes */}
          <div className="flex flex-col gap-3">
            <span className="text-[14px] font-semibold text-[#18181B]">Persona quotes</span>
            <div className="flex gap-3">
              {REPORT.quotes.map((q) => (
                <div key={q.name} className="flex flex-1 flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4">
                  <p className="text-[13px] leading-[19px] text-[#27272A]">“{q.quote}”</p>
                  <div className="flex items-center gap-2.5">
                    <PersonaAvatar slug={q.slug} size={28} />
                    <span className="flex flex-col">
                      <span className="text-[12px] font-semibold leading-4 text-[#18181B]">{q.name}</span>
                      <span className="text-[11px] font-medium leading-[14px] text-[#A1A1AA]">{q.tag}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic implications */}
          <Card title="Strategic implications">
            <div className="flex flex-col gap-3">
              {REPORT.implications.map((im, i) => {
                const lv = LEVELS[im.level];
                return (
                  <div key={i} className={`flex items-start gap-[11px] ${i < REPORT.implications.length - 1 ? "border-b border-[#F0F0F2] pb-3" : ""}`}>
                    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[11px] bg-[#18181B] text-[11px] font-bold text-white">{i + 1}</span>
                    <p className="flex-1 text-[13.5px] leading-5 text-[#27272A]">{im.text}</p>
                    <span className="shrink-0 rounded-full px-[9px] py-0.5 text-[11px] font-semibold" style={{ backgroundColor: lv.bg, color: lv.fg }}>{im.level}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right rail */}
        <div className="flex w-[300px] shrink-0 flex-col gap-4">
          <Card title="Research summary">
            <div className="flex flex-col gap-2.5">
              {REPORT.summary.map((s) => (
                <div key={s.k} className="flex items-center justify-between text-[13px]">
                  <span className="text-[#71717A]">{s.k}</span>
                  <span className="font-semibold text-[#18181B]">{s.v}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card title="What's next">
            <div className="flex flex-col gap-2">
              {REPORT.next.map((n) => (
                <button key={n} className="flex items-center gap-2 text-left text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#CC0000]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {n}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="#A1A1AA" strokeWidth="1.6" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" stroke="#A1A1AA" strokeWidth="1.6" /><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" stroke="#A1A1AA" strokeWidth="1.6" /></svg>
        <span className="text-[11.5px] font-medium text-[#A1A1AA]">Grounded in 1.42M records · Strong evidence on 4 of 5 themes · 1 theme flagged Mixed</span>
      </div>
    </div>
  );
}

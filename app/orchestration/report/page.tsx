import AppShell from "@/components/AppShell";
import Topbar, { WorkspacePill } from "@/components/Topbar";

const CONSENSUS = [
  "Resale value sits in everyone's top three considerations.",
  "Honda is trusted for reliability, but seen as visually conservative.",
  "Charging gaps still hold back anyone not already committed to an EV.",
];

const DIVERGENCES = [
  { title: "Running cost vs. styling as the deciding factor", tag: "life stage" },
  { title: "Willingness to pay a premium for the Honda badge", tag: "geography: Metro vs Tier-2" },
  { title: "Openness to a full EV over a hybrid", tag: "commute pattern" },
];

const QUOTES = [
  { quote: "Convince me on five-year cost and a cabin that feels modern, and I will pick the hybrid.", name: "Aspirational Arjun", tag: "Metro first-car", bg: "#DBEAFE", fg: "#2563EB" },
  { quote: "If the nearest service centre is reliable and cheap to run, that matters more than how it looks.", name: "Practical Meera", tag: "Tier-2 family", bg: "#EDE9FE", fg: "#7C3AED" },
  { quote: "I would go full EV tomorrow if highway charging was not a gamble.", name: "EV-curious Rohan", tag: "EV upgrader", bg: "#CCFBF1", fg: "#0F766E" },
];

const IMPLICATIONS = [
  { text: "Lead Metro messaging with a five-year total-cost story, not styling.", level: "High" },
  { text: "For Tier-2, foreground service reach and upkeep predictability.", level: "High" },
  { text: "Address charging anxiety head-on to keep EV-curious buyers in the Honda funnel.", level: "Medium" },
];

const LEVELS = {
  High: { bg: "#FDECEC", fg: "#CC0000" },
  Medium: { bg: "#FEF3C7", fg: "#B45309" },
} as const;

function QuoteFace({ bg, fg }: { bg: string; fg: string }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[14px]" style={{ backgroundColor: bg }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="10" r="1" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="15" cy="10" r="1" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8.5 14.5a4 4 0 0 0 7 0" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

const DownloadIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10l5 5 5-5M12 15V3" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ReportPage() {
  return (
    <AppShell variant="workspace" active="orchestration">
      <Topbar title="Orchestration Agent" right={<WorkspacePill label="Marketing" />} />

      <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
        <div className="mx-auto flex w-full max-w-[980px] flex-col gap-4 px-10 py-[26px]">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#A1A1AA]">Research Report</span>
              <h1 className="text-[26px] font-bold leading-8 tracking-[-0.02em] text-[#18181B]">
                City hybrid vs. Creta — Metro vs Tier-2
              </h1>
              <span className="text-[12.5px] font-medium text-[#71717A]">
                5 personas · 5 questions · Run 23 Jun 2026 · Marketing
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-[7px] rounded-[9px] border border-[#E4E4E7] bg-white px-[13px] py-2 text-[12.5px] font-semibold text-[#52525B]">
                {DownloadIcon}PDF
              </button>
              <button className="flex items-center gap-[7px] rounded-[9px] border border-[#E4E4E7] bg-white px-[13px] py-2 text-[12.5px] font-semibold text-[#52525B]">
                {DownloadIcon}Excel
              </button>
              <button className="flex items-center gap-[7px] rounded-[9px] bg-[#18181B] px-3.5 py-2 text-[12.5px] font-semibold text-white">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M21 2v6h-6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Re-run
              </button>
            </div>
          </div>

          {/* Executive insight */}
          <div className="flex flex-col rounded-xl border border-[#E4E4E7] border-l-[3px] border-l-[#CC0000] bg-white p-5">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#CC0000]">Executive Insight</span>
            <p className="mt-2.5 text-[17px] font-medium leading-[25px] text-[#18181B]">
              A credible five-year cost story is what converts Metro buyers; for Tier-2, it is service reach and
              predictable upkeep. Styling narrows the gap with the Creta but rarely closes the sale on its own.
            </p>
          </div>

          {/* Consensus + divergences */}
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col rounded-xl border border-[#E4E4E7] bg-white p-5">
              <span className="text-[14px] font-semibold leading-[18px] text-[#18181B]">Consensus</span>
              <div className="mt-3.5 flex flex-col gap-[11px]">
                {CONSENSUS.map((c) => (
                  <div key={c} className="flex items-start gap-[9px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                      <path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="flex-1 text-[13px] leading-[19px] text-[#27272A]">{c}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col rounded-xl border border-[#E4E4E7] bg-white p-5">
              <span className="text-[14px] font-semibold leading-[18px] text-[#18181B]">Key divergences</span>
              <div className="mt-3.5 flex flex-col gap-3">
                {DIVERGENCES.map((d, i) => (
                  <div key={d.title} className={`flex flex-col gap-[5px] ${i < DIVERGENCES.length - 1 ? "border-b border-[#F0F0F2] pb-3" : ""}`}>
                    <span className="text-[13px] font-medium leading-[19px] text-[#18181B]">{d.title}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-medium text-[#71717A]">Driven by</span>
                      <span className="rounded-full bg-[#FEF3C7] px-[9px] py-0.5 text-[11px] font-semibold text-[#B45309]">{d.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Persona quotes */}
          <div className="flex flex-col gap-3">
            <span className="text-[14px] font-semibold leading-[18px] text-[#18181B]">Persona quotes</span>
            <div className="flex gap-3.5">
              {QUOTES.map((q) => (
                <div key={q.name} className="flex flex-1 flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4">
                  <p className="text-[13.5px] leading-5 text-[#27272A]">“{q.quote}”</p>
                  <div className="flex items-center gap-[9px]">
                    <QuoteFace bg={q.bg} fg={q.fg} />
                    <div className="flex flex-col gap-px">
                      <span className="text-[12px] font-semibold leading-4 text-[#18181B]">{q.name}</span>
                      <span className="text-[11px] font-medium leading-[14px] text-[#A1A1AA]">{q.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic implications */}
          <div className="flex flex-col rounded-xl border border-[#E4E4E7] bg-white p-5">
            <span className="text-[14px] font-semibold leading-[18px] text-[#18181B]">Strategic implications</span>
            <div className="mt-3.5 flex flex-col gap-3">
              {IMPLICATIONS.map((im, i) => {
                const lv = LEVELS[im.level as keyof typeof LEVELS];
                return (
                  <div key={i} className={`flex items-start gap-[11px] ${i < IMPLICATIONS.length - 1 ? "border-b border-[#F0F0F2] pb-3" : ""}`}>
                    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[11px] bg-[#18181B] text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="flex-1 text-[13.5px] leading-5 text-[#27272A]">{im.text}</p>
                    <span className="shrink-0 rounded-full px-[9px] py-0.5 text-[11px] font-semibold" style={{ backgroundColor: lv.bg, color: lv.fg }}>
                      {im.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footnote */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#A1A1AA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" stroke="#A1A1AA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" stroke="#A1A1AA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11.5px] font-medium text-[#A1A1AA]">
              Grounded in 1.42M records · Strong evidence on 4 of 5 themes · 1 theme flagged Mixed
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

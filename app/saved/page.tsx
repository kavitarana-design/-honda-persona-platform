import Link from "next/link";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspaceCard } from "@/components/Topbar";
import { SAVED_BRIEFS, type SavedBrief } from "@/lib/orchestration";

const STATUS = {
  green: { bg: "#F0FDF4", border: "#DCFCE7", fg: "#15803D", dot: "#15803D" },
  neutral: { bg: "#F4F4F5", border: "#E4E4E7", fg: "#52525B", dot: "#A1A1AA" },
  draft: { bg: "#F4F4F5", border: "#E4E4E7", fg: "#71717A", dot: "#C4C4C8" },
} as const;

function BriefCard({ b }: { b: SavedBrief }) {
  const s = STATUS[b.status.tone];
  return (
    <div className="flex flex-col gap-3.5 rounded-[14px] border border-[#E8E8EA] bg-white p-[18px] shadow-[0_1px_2px_#18181B0D]">
      <div className="flex items-start gap-2.5">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="text-[16px] font-bold leading-5 text-[#0E0E10]">{b.title}</span>
          <span className="text-[13px] leading-4 text-[#6E6E73]">{b.meta}</span>
        </div>
        <span
          className="flex shrink-0 items-center gap-1.5 rounded-full border px-[11px] py-1 text-[12px] font-semibold"
          style={{ backgroundColor: s.bg, borderColor: s.border, color: s.fg }}
        >
          <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: s.dot }} />
          {b.status.label}
        </span>
      </div>
      <div className="flex items-center gap-2.5 border-t border-[#F0F0F1] pt-3.5">
        <span className="text-[13px] leading-4 text-[#A1A1A6]">{b.lastRun}</span>
        <span className="flex-1" />
        <Link href="/orchestration" className="flex items-center gap-[7px] rounded-[9px] border border-[#D4D4D8] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#0E0E10]">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8 a5 5 0 1 1 -1.5 -3.6 M13 3 V5 H11" stroke="#0E0E10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Run on latest data
        </Link>
        <Link href="/orchestration" className="rounded-[9px] border border-[#E4E4E7] px-3.5 py-2 text-[13px] font-medium text-[#0E0E10]">Open</Link>
        <button className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-[#E4E4E7]">
          <svg width="15" height="15" viewBox="0 0 16 16"><circle cx="4" cy="8" r="1.4" fill="#6E6E73" /><circle cx="8" cy="8" r="1.4" fill="#6E6E73" /><circle cx="12" cy="8" r="1.4" fill="#6E6E73" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function SavedBriefsPage() {
  return (
    <AppShell active="orchestration">
      <Topbar title="Saved briefs" right={<WorkspaceCard />} />

      <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
        <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-8 py-7">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <h1 className="text-[23px] font-extrabold leading-7 tracking-[-0.01em] text-[#0E0E10]">Saved briefs</h1>
              <p className="text-[15px] leading-[18px] text-[#6E6E73]">
                Reusable briefs you can re-run on the latest data or share with your team.
              </p>
            </div>
            <Link href="/orchestration" className="flex shrink-0 items-center gap-[7px] rounded-[10px] bg-[#CC0000] px-4 py-2.5 text-[14px] font-semibold text-white">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3 V13 M3 8 H13" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" /></svg>
              New brief
            </Link>
          </div>

          {SAVED_BRIEFS.map((b) => <BriefCard key={b.title} b={b} />)}
        </div>
      </div>
    </AppShell>
  );
}

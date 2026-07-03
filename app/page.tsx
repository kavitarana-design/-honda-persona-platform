import Link from "next/link";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspaceCard } from "@/components/Topbar";
import Sparkle from "@/components/Sparkle";

const STATS = [
  {
    title: "Pending approvals",
    sub: "3 across departments",
    icon: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" fill="none" stroke="#CC0000" strokeWidth="2" />
        <path d="M9 11l2 2 4-4" fill="none" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Cross-department brief",
    sub: "Compare all teams",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" fill="none" stroke="#CC0000" strokeWidth="2" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" fill="none" stroke="#CC0000" strokeWidth="2" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" fill="none" stroke="#CC0000" strokeWidth="2" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" fill="none" stroke="#CC0000" strokeWidth="2" />
      </>
    ),
  },
  {
    title: "Org usage",
    sub: "All workspaces this quarter",
    icon: (
      <>
        <path d="M3 3v18h18" fill="none" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 15l3-3 3 2 5-6" fill="none" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

const TILES = [
  {
    label: "Build a Persona",
    href: "/builder",
    icon: (
      <>
        <circle cx="10" cy="8" r="3.4" fill="none" stroke="#CC0000" strokeWidth="2" />
        <path d="M4 19c0-3.1 2.7-5.2 6-5.2" fill="none" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 13.5v6M21 16.5h-6" fill="none" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Run a study",
    href: "/orchestration",
    icon: (
      <>
        <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4V6z" fill="none" stroke="#18181B" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 9h6M9 12h4" fill="none" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Reaction Test",
    href: "/orchestration",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="none" stroke="#18181B" strokeWidth="2" strokeLinejoin="round" />,
  },
];

export default function HomePage() {
  return (
    <AppShell active="home">
      <Topbar title="Home" right={<WorkspaceCard />} />

      <div className="flex-1 overflow-hidden bg-[#F4F4F4]">
        <div className="mx-auto flex h-full max-w-[928px] flex-col px-8 pt-7 pb-6">
          {/* Top block */}
          <div className="flex flex-col gap-5">
            {/* Greeting + date */}
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium tracking-[0.01em] text-[#71717A]">
                  Marketing workspace
                </span>
                <h1 className="text-[27px] font-bold leading-[34px] tracking-[-0.02em] text-[#18181B]">
                  Good morning, Sam
                </h1>
              </div>
              <button className="flex items-center gap-2 rounded-[10px] border border-[#E4E4E7] bg-white px-3 py-2 text-[13px] font-medium text-[#3F3F46]">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="4" width="12" height="11" rx="2" stroke="#71717A" strokeWidth="1.4" />
                  <path d="M3 7.5h12M6.5 2.5v3M11.5 2.5v3" stroke="#71717A" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Last 30 days
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 6l3 3 3-3" stroke="#A1A1AA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Stat cards */}
            <div className="flex gap-3.5">
              {STATS.map((s) => (
                <div
                  key={s.title}
                  className="flex flex-1 items-center gap-3 rounded-xl border border-[#ECECEC] bg-white px-4 py-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#FBE3E1]">
                    <svg width="18" height="18" viewBox="0 0 24 24">{s.icon}</svg>
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[13px] font-semibold leading-4 text-[#18181B]">{s.title}</span>
                    <span className="text-[11.5px] font-medium leading-[14px] text-[#A1A1AA]">{s.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions — centered vertically & horizontally */}
          <div className="flex flex-1 items-center justify-center">
            <div className="flex w-[503px] max-w-full gap-8">
              {TILES.map((t) => (
                <Link key={t.label} href={t.href} className="group flex flex-1 flex-col items-center gap-3">
                  <div className="flex h-[66px] w-full items-center justify-center rounded-2xl bg-white transition-all group-hover:shadow-[0_2px_8px_#18181B0F]">
                    <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-[#F4F4F5] shadow-[0_1px_2px_#18181B0F] transition-colors group-hover:bg-[#EDEDEF]">
                      <svg width="22" height="22" viewBox="0 0 24 24">{t.icon}</svg>
                    </span>
                  </div>
                  <span className="text-[14px] font-medium leading-[18px] text-[#27272A]">{t.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Composer — pinned to the bottom with a 24px margin */}
          <div className="flex shrink-0 flex-col gap-5 rounded-2xl bg-white px-6 py-5">
            <div className="flex items-center gap-3">
              <Sparkle size={20} className="shrink-0" />
              <p className="text-[19px] leading-7 tracking-[-0.01em] text-[#A1A1AA]">
                Ask your personas a question, or describe a research brief…
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-0.5 rounded-[10px] bg-[#F4F4F5] p-[3px]">
                <span className="flex items-center gap-[7px] rounded-lg bg-white px-3 py-[7px] text-[13px] font-semibold text-[#18181B] shadow-[0_1px_2px_#18181B12]">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#CC0000]" />
                  One persona
                </span>
                <span className="rounded-lg px-3 py-[7px] text-[13px] font-medium text-[#71717A]">
                  Multi-persona brief
                </span>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EAEAEA]">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 14.5v-11M4.5 8L9 3.5 13.5 8" stroke="#71717A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

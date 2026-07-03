import Link from "next/link";
import AppShell from "@/components/AppShell";
import Topbar from "@/components/Topbar";
import PersonaFace from "@/components/PersonaFace";

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

const PERSONAS = [
  { name: "Priya Nair", role: "Value-First Commuter", bg: "#CDEBEA", fg: "#2C7A7B", evidence: "Strong" },
  { name: "Arjun Mehta", role: "EV-Curious Upgrader", bg: "#F7E2B0", fg: "#9A5B12", evidence: "Mixed" },
  { name: "Rakesh Yadav", role: "Tier-2 Family Buyer", bg: "#CDE7D2", fg: "#2F7A43", evidence: "Strong" },
  { name: "Sneha Iyer", role: "Safety-Led Researcher", bg: "#D7DDF6", fg: "#3A4D9F", evidence: "Strong" },
];

const EVIDENCE = {
  Strong: { dot: "#16A34A", text: "#15803D" },
  Mixed: { dot: "#D97706", text: "#B45309" },
} as const;

export default function HomePage() {
  return (
    <AppShell variant="admin" active="home">
      <Topbar
        title="Home"
        leftIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="#A1A1AA" strokeWidth="2" />
            <path d="M9 4v16" stroke="#A1A1AA" strokeWidth="2" />
          </svg>
        }
        right={
          <span className="flex items-center gap-[7px] rounded-full border border-[#E4E4E7] px-3 py-[5px] text-[12.5px] font-semibold text-[#52525B]">
            <span className="h-[7px] w-[7px] rounded-sm bg-[#2563EB]" />
            Researcher
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto bg-[#F4F4F4]">
        <div className="mx-auto flex min-h-full max-w-[928px] flex-col justify-between gap-[22px] px-8 py-6">
          {/* Top block */}
          <div className="flex flex-col gap-[22px]">
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

            {/* Quick action tiles */}
            <div className="flex w-[503px] max-w-full gap-8">
              {TILES.map((t) => (
                <Link key={t.label} href={t.href} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex h-24 w-full items-center justify-center rounded-2xl bg-white">
                    <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-[#F4F4F5] shadow-[0_1px_2px_#18181B0F]">
                      <svg width="22" height="22" viewBox="0 0 24 24">{t.icon}</svg>
                    </span>
                  </div>
                  <span className="text-[14px] font-medium leading-[18px] text-[#27272A]">{t.label}</span>
                </Link>
              ))}
            </div>

            {/* Your personas */}
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] font-semibold leading-[18px] text-[#18181B]">Your personas</h2>
                <Link href="/builder" className="flex items-center gap-[5px] text-[12.5px] font-medium text-[#71717A]">
                  View all
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="#A1A1AA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
              <div className="flex gap-3">
                {PERSONAS.map((p) => {
                  const e = EVIDENCE[p.evidence as keyof typeof EVIDENCE];
                  return (
                    <div key={p.name} className="flex flex-1 flex-col gap-[11px] rounded-xl border border-[#ECECEC] bg-white p-3.5">
                      <div className="flex items-center gap-2.5">
                        <PersonaFace bg={p.bg} fg={p.fg} />
                        <div className="flex min-w-0 flex-col gap-px">
                          <span className="text-[13.5px] font-semibold leading-[18px] text-[#18181B]">{p.name}</span>
                          <span className="text-[11.5px] font-medium leading-[14px] text-[#71717A]">{p.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: e.dot }} />
                        <span className="text-[12px] font-medium leading-4" style={{ color: e.text }}>{p.evidence}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="flex flex-col gap-[18px] rounded-2xl border border-[#E4E4E7] bg-white px-6 py-[22px] shadow-[0_1px_2px_#18181B0D]">
            <div className="flex min-h-16 items-start gap-3">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-[#FFF1F1]">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2.2l1.7 4.4 4.6.3-3.6 2.9 1.2 4.5L9 12.2 5.1 14.8l1.2-4.5L2.7 7.4l4.6-.3L9 2.2z" stroke="#CC0000" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="pt-1 text-[19px] leading-7 tracking-[-0.01em] text-[#A1A1AA]">
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

      {/* Footer bar */}
      <footer className="flex h-14 shrink-0 items-center justify-between border-t border-[#ECECEC] bg-white px-8">
        <div className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
            <path d="M3.5 9.5l3.5 3.5 7.5-8.5" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[12.5px] font-medium text-[#52525B]">
            92% of answers backed by strong or mixed evidence
          </span>
        </div>
        <div className="flex items-center gap-[5px] text-[12.5px] font-medium">
          <span className="text-[#52525B]">Data foundation ·</span>
          <span className="text-[#A1A1AA]">1.42M records, growing</span>
        </div>
      </footer>
    </AppShell>
  );
}

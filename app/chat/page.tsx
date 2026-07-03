import Link from "next/link";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspaceCard } from "@/components/Topbar";
import PersonaAvatar from "@/components/PersonaAvatar";
import Sparkle from "@/components/Sparkle";
import { PERSONA_LIST, evidenceLevel } from "@/lib/personas";

const EVIDENCE = {
  Strong: { dot: "#16A34A", text: "#15803D" },
  Mixed: { dot: "#D97706", text: "#B45309" },
} as const;

export default function NewConversationPage() {
  return (
    <AppShell active="home">
      <Topbar title="Home" sub="New conversation" right={<WorkspaceCard />} />

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="mx-auto flex min-h-full max-w-[760px] flex-col items-center justify-center gap-8 px-8 py-7">
          <div className="flex flex-col items-center gap-2.5 text-center">
            <Sparkle size={32} />
            <h1 className="text-[22px] font-bold tracking-[-0.01em] text-[#18181B]">
              Who would you like to chat with?
            </h1>
            <p className="max-w-[440px] text-[13.5px] leading-5 text-[#71717A]">
              Pick a persona to start a new conversation. Every answer is grounded in public consumer data.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            {PERSONA_LIST.map((p) => {
              const level = evidenceLevel(p.confidence);
              const e = EVIDENCE[level];
              return (
                <Link
                  key={p.slug}
                  href={`/chat/${p.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4 transition-all hover:border-[#CC0000] hover:shadow-[0_2px_8px_#18181B0F]"
                >
                  <PersonaAvatar slug={p.slug} size={42} />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate text-[14px] font-semibold text-[#18181B]">{p.name}</span>
                    <span className="truncate text-[12px] font-medium text-[#71717A]">{p.tagline}</span>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: e.dot }} />
                      <span className="text-[11.5px] font-medium" style={{ color: e.text }}>{level}</span>
                      <span className="text-[11.5px] text-[#A1A1AA]">· {p.records}</span>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="shrink-0 text-[#C4C4CC] transition-colors group-hover:text-[#CC0000]">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              );
            })}
          </div>

          <Link
            href="/library"
            className="flex items-center gap-1.5 rounded-[9px] border border-[#E4E4E7] bg-white px-4 py-2 text-[13px] font-semibold text-[#52525B] transition-colors hover:border-[#CC0000] hover:text-[#CC0000]"
          >
            View all personas
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

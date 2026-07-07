import Link from "next/link";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspaceCard } from "@/components/Topbar";
import HomeComposer from "@/components/HomeComposer";
import HomeGreeting from "@/components/HomeGreeting";
import RiveDot from "@/components/RiveDot";

const SPARKLE = "M0 -5 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5z";

const TILES = [
  {
    label: "Build a Persona",
    subtitle: "Shape a new audience",
    href: "/builder",
    tint: "#FDECEE",
    art: (
      <svg width="134" height="106" viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="59" cy="52" rx="35" ry="30" fill="#FAD5DB" />
        <g transform="rotate(-7 59 50)">
          <rect x="38" y="22" width="42" height="52" rx="9" fill="#FFFFFF" stroke="#F3C6CD" strokeWidth="1.5" />
          <circle cx="59" cy="42" r="8" fill="#18181B" />
          <path d="M46 67 Q59 53 72 67 Z" fill="#18181B" />
        </g>
        <circle cx="86" cy="27" r="11" fill="#CC0000" />
        <path d="M86 22.4v9.2M81.4 27h9.2" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
        <path transform="translate(28 30)" d={SPARKLE} fill="#CC0000" />
      </svg>
    ),
  },
  {
    label: "Run a study",
    subtitle: "Interview your personas",
    href: "/orchestration",
    tint: "#EEF0F6",
    art: (
      <svg width="134" height="106" viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="57" cy="52" rx="35" ry="30" fill="#DFE4F1" />
        <rect x="33" y="19" width="44" height="55" rx="8" fill="#FFFFFF" stroke="#D4DAEB" strokeWidth="1.5" />
        <rect x="41" y="52" width="7" height="15" rx="2" fill="#27272A" />
        <rect x="52" y="44" width="7" height="23" rx="2" fill="#27272A" />
        <rect x="63" y="35" width="7" height="32" rx="2" fill="#CC0000" />
        <circle cx="80" cy="62" r="12.5" fill="#FFFFFF" stroke="#CC0000" strokeWidth="3.6" />
        <path d="M89.5 71.5 l7 7" stroke="#CC0000" strokeWidth="4.2" strokeLinecap="round" />
        <path transform="translate(29 25)" d={SPARKLE} fill="#CC0000" />
      </svg>
    ),
  },
  {
    label: "Reaction Test",
    subtitle: "Gut-check a message fast",
    href: "/orchestration",
    tint: "#FBF2E4",
    art: (
      <svg width="134" height="106" viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="54" rx="35" ry="30" fill="#F6E5C6" />
        <path d="M33 66 A27 27 0 0 1 87 66" fill="none" stroke="#27272A" strokeWidth="5" strokeLinecap="round" />
        <path d="M40 52 l-4 -4 M60 43 v-6 M80 52 l4 -4" stroke="#C9BFA6" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 66 L73 47" stroke="#CC0000" strokeWidth="4.2" strokeLinecap="round" />
        <circle cx="60" cy="66" r="5.5" fill="#18181B" />
        <path d="M85 22 l-8 12 h5.5 l-3.5 11 10 -14 h-5.5 z" fill="#CC0000" />
        <path transform="translate(29 32)" d={SPARKLE} fill="#CC0000" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <AppShell active="home">
      <Topbar title="Home" right={<WorkspaceCard />} />

      <div className="bg-app flex-1 overflow-hidden">
        <div className="mx-auto flex h-full max-w-[928px] flex-col px-8 pt-7 pb-6">
          {/* Greeting + illustrated cards, centered together */}
          <div className="flex flex-1 -translate-y-6 flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-center gap-0">
              <RiveDot size={120} />
              <HomeGreeting />
            </div>
            <div className="grid w-full max-w-[520px] grid-cols-3 gap-7">
              {TILES.map((t) => (
                <Link key={t.label} href={t.href} className="group flex flex-col items-center gap-3 text-center">
                  <div
                    className="flex h-[100px] w-full items-center justify-center overflow-hidden rounded-xl border border-black/[0.06] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-black/10 group-hover:shadow-[0_16px_32px_#18181B1A]"
                    style={{ backgroundColor: t.tint }}
                  >
                    <span className="scale-[0.8] transition-transform duration-300 ease-out group-hover:scale-[0.88]">{t.art}</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[15px] font-semibold leading-5 text-[#18181B] transition-colors group-hover:text-[#CC0000]">{t.label}</span>
                    <span className="text-[12px] font-medium leading-4 text-[#A1A1AA]">{t.subtitle}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Composer — compact, focusable, pinned to the bottom */}
          <HomeComposer />
        </div>
      </div>
    </AppShell>
  );
}

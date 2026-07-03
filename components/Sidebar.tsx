import Link from "next/link";
import { Plus } from "lucide-react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  OrchestrationIcon,
  AnalyticsIcon,
  ModulesIcon,
} from "./icons";
import { type NavKey } from "@/lib/data";
import { PERSONA_LIST } from "@/lib/personas";

type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  Icon: (p: { size?: number }) => React.ReactElement;
  badge?: string;
};

const NAV: NavItem[] = [
  { key: "home", label: "Home", href: "/", Icon: HomeIcon },
  { key: "search", label: "Search", href: "#", Icon: SearchIcon },
  { key: "library", label: "Persona Library", href: "/builder", Icon: LibraryIcon },
  {
    key: "orchestration",
    label: "Orchestration Agent",
    href: "/orchestration",
    Icon: OrchestrationIcon,
    badge: "New",
  },
  { key: "analytics", label: "Analytics", href: "/analytics", Icon: AnalyticsIcon },
  { key: "modules", label: "Research Modules", href: "#", Icon: ModulesIcon },
];

export default function Sidebar({
  variant = "workspace",
  active,
  activePersona,
}: {
  variant?: "admin" | "workspace";
  active: NavKey;
  activePersona?: string;
}) {
  return (
    <aside className="flex w-[248px] shrink-0 flex-col gap-3 border-r border-[#ECECEC] bg-white px-3 py-3.5">
      {/* Brand */}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5 px-2 pb-3.5 pt-1.5">
            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-[#CC0000] text-[15px] font-extrabold leading-[18px] text-white">
              H
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold leading-[18px] text-[#18181B]">
                Persona Intelligence
              </span>
              <span className="text-[11px] font-medium leading-[14px] text-[#A1A1AA]">
                Honda · Phase 2
              </span>
            </div>
          </div>

          {variant === "admin" ? (
            <div className="mb-2.5 flex items-center gap-2.5 rounded-[10px] border border-[#E4E4E7] bg-white px-2.5 py-[9px]">
              <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#18181B] text-[10px] font-bold leading-[10px] text-white">
                MK
              </div>
              <div className="flex flex-col gap-px">
                <span className="text-[13px] font-semibold leading-4 text-[#18181B]">
                  Marketing
                </span>
                <span className="text-[11px] font-medium leading-3 text-[#71717A]">
                  Department workspace
                </span>
              </div>
            </div>
          ) : (
            <button className="mb-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-[#18181B] py-[9px] text-[13px] font-semibold text-white transition-colors hover:bg-black">
              <Plus size={16} strokeWidth={2.2} />
              New conversation
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[13px] leading-4 transition-colors ${
                  isActive
                    ? "bg-[#FDECEC] font-semibold text-[#CC0000]"
                    : "font-medium text-[#52525B] hover:bg-[#F4F4F5]"
                }`}
              >
                <span className="flex w-5 shrink-0 items-center justify-center">
                  <item.Icon size={17} />
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && variant === "workspace" && (
                  <span className="rounded-[5px] bg-[#F4F4F5] px-1.5 py-0.5 text-[10px] font-semibold text-[#71717A]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* History / Saved personas */}
      <div className="flex flex-col">
        <div className="px-2.5 pb-1.5 pt-4">
          <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.06em] text-[#A1A1AA]">
            {variant === "admin" ? "History" : "Saved personas"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          {PERSONA_LIST.map((p) => {
            const isActive = p.slug === activePersona;
            return (
              <Link
                key={p.slug}
                href={`/chat/${p.slug}`}
                className={`flex items-center gap-[9px] rounded-[9px] px-2.5 py-[7px] transition-colors ${
                  isActive ? "bg-[#F4F4F5]" : "hover:bg-[#F7F7F8]"
                }`}
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-3 text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.initials}
                </div>
                <span className={`text-[12.5px] leading-4 ${isActive ? "font-semibold text-[#18181B]" : "font-medium text-[#52525B]"}`}>
                  {p.sidebarLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User */}
      <div className="mt-auto border-t border-[#ECECEC] pt-2.5">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#27272A] text-[12px] font-bold text-white">
            AL
          </div>
          <div className="flex flex-col">
            <span className="text-[12.5px] font-semibold leading-4 text-[#18181B]">
              Alex Mehta
            </span>
            <span className="text-[11px] font-medium leading-[14px] text-[#A1A1AA]">
              {variant === "admin" ? "Researcher · Marketing" : "Researcher"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

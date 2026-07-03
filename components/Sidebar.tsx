"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NewConversationButton from "./NewConversationButton";
import PersonaAvatar from "./PersonaAvatar";
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
  { key: "search", label: "Search", href: "/search", Icon: SearchIcon },
  { key: "library", label: "Persona Library", href: "/library", Icon: LibraryIcon },
  { key: "orchestration", label: "Orchestration Agent", href: "/orchestration", Icon: OrchestrationIcon },
  { key: "analytics", label: "Analytics", href: "/analytics", Icon: AnalyticsIcon },
  { key: "modules", label: "Research Modules", href: "#", Icon: ModulesIcon },
];

export default function Sidebar({
  active,
  activePersona,
}: {
  active: NavKey;
  activePersona?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sb-collapsed") === "1") setCollapsed(true);
    const h = () => setCollapsed((c) => !c);
    window.addEventListener("toggle-sidebar", h);
    return () => window.removeEventListener("toggle-sidebar", h);
  }, []);
  useEffect(() => {
    localStorage.setItem("sb-collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    <aside
      className={`flex h-full shrink-0 flex-col gap-2 overflow-hidden border-r border-[#ECECEC] bg-white py-3 transition-[width,padding] duration-200 ${
        collapsed ? "w-[64px] px-2" : "w-[248px] px-3"
      }`}
    >
      {/* Brand + collapse toggle */}
      <div className="flex shrink-0 flex-col">
        <div className={`flex items-center px-1 pb-2.5 pt-1 ${collapsed ? "justify-center" : "gap-2.5"}`}>
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-[#CC0000] text-[15px] font-extrabold leading-[18px] text-white">H</div>
          {!collapsed && (
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-[14px] font-bold leading-[18px] text-[#18181B]">Persona Intelligence</span>
              <span className="text-[11px] font-medium leading-[14px] text-[#A1A1AA]">Honda · Phase 2</span>
            </div>
          )}
        </div>

        <NewConversationButton collapsed={collapsed} />

        {/* Nav */}
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center rounded-[9px] py-1.5 text-[13px] leading-4 transition-colors ${collapsed ? "justify-center px-0" : "gap-2.5 px-2.5"} ${
                  isActive ? "bg-[#FDECEC] font-semibold text-[#CC0000]" : "font-medium text-[#52525B] hover:bg-[#F4F4F5]"
                }`}
              >
                <span className="flex w-5 shrink-0 items-center justify-center"><item.Icon size={17} /></span>
                {!collapsed && <span className="flex-1 whitespace-nowrap">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="rounded-[5px] bg-[#F4F4F5] px-1.5 py-0.5 text-[10px] font-semibold text-[#71717A]">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Saved personas */}
      <div className="flex min-h-0 flex-1 flex-col">
        {!collapsed && (
          <div className="shrink-0 px-2.5 pb-1 pt-2.5">
            <span className="text-[11px] font-semibold uppercase leading-[14px] tracking-[0.06em] text-[#A1A1AA]">Saved personas</span>
          </div>
        )}
        {collapsed && <div className="shrink-0 pb-1 pt-2.5"><span className="mx-auto block h-px w-6 bg-[#ECECEC]" /></div>}
        <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto">
          {PERSONA_LIST.map((p) => {
            const isActive = p.slug === activePersona;
            return (
              <Link
                key={p.slug}
                href={`/chat/${p.slug}`}
                title={collapsed ? p.sidebarLabel : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center rounded-[9px] py-1.5 transition-colors ${collapsed ? "justify-center px-0" : "gap-[9px] px-2.5"} ${
                  isActive ? "bg-[#ECECEF]" : "hover:bg-[#F7F7F8]"
                }`}
              >
                {isActive && !collapsed && (
                  <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-[#18181B]" />
                )}
                <PersonaAvatar slug={p.slug} size={24} />
                {!collapsed && (
                  <span className={`text-[12.5px] leading-4 ${isActive ? "font-semibold text-[#18181B]" : "font-medium text-[#52525B]"}`}>{p.sidebarLabel}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* User */}
      <div className="shrink-0 border-t border-[#ECECEC] pt-2.5">
        <div className={`flex items-center py-1.5 ${collapsed ? "justify-center px-0" : "gap-2.5 px-2"}`}>
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#27272A] text-[12px] font-bold text-white">AL</div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-[12.5px] font-semibold leading-4 text-[#18181B]">Alex Mehta</span>
              <span className="text-[11px] font-medium leading-[14px] text-[#A1A1AA]">Researcher · Marketing</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

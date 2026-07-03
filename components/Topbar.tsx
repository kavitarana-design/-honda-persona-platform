import type { ReactNode } from "react";
import SidebarToggle from "./SidebarToggle";

export default function Topbar({
  title,
  sub,
  leftIcon,
  right,
}: {
  title: string;
  sub?: string;
  leftIcon?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#ECECEC] bg-white px-8">
      <div className="flex items-center gap-2.5 text-[#71717A]">
        <SidebarToggle />
        {leftIcon}
        <span className="text-[15px] font-semibold text-[#18181B]">{title}</span>
        {sub && <span className="text-[15px] font-normal text-[#A1A1AA]">· {sub}</span>}
      </div>
      {right && <div className="flex items-center gap-2.5">{right}</div>}
    </header>
  );
}

/* Workspace switcher card, shown at the top-right of the top bar on every page. */
export function WorkspaceCard() {
  return (
    <button className="flex items-center gap-2.5 rounded-[10px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-left transition-colors hover:bg-[#FAFAFA]">
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#18181B] text-[10px] font-bold leading-[10px] text-white">
        MK
      </span>
      <span className="flex flex-col">
        <span className="text-[12.5px] font-semibold leading-4 text-[#18181B]">Marketing</span>
        <span className="text-[10.5px] font-medium leading-3 text-[#71717A]">Department workspace</span>
      </span>
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="ml-0.5">
        <path d="M4 6l3 3 3-3" stroke="#A1A1AA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

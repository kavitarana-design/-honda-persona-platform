"use client";

import { useEffect, useRef, useState } from "react";

export default function FilterDropdown({
  label,
  active,
  panelClass = "w-[240px]",
  children,
}: {
  label: string;
  active?: boolean;
  panelClass?: string;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-[9px] border px-3 py-2 text-[13px] font-medium transition-colors ${
          active || open ? "border-[#CC0000] text-[#18181B]" : "border-[#E4E4E7] text-[#3F3F46] hover:border-[#D4D4D8]"
        }`}
      >
        {label}
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M4 6l3 3 3-3" stroke="#A1A1AA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className={`absolute right-0 top-[calc(100%+6px)] z-20 ${panelClass} overflow-hidden rounded-[12px] border border-[#E4E4E7] bg-white py-1 shadow-[0_8px_24px_#18181B1A]`}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

const CheckIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M4 8.2 L6.6 10.8 L12 5.4" stroke="#CC0000" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function RadioRow({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-[#F7F7F8]">
      <span className={`text-[13px] ${selected ? "font-semibold text-[#18181B]" : "text-[#52525B]"}`}>{label}</span>
      {selected && CheckIcon}
    </button>
  );
}

export function CheckRow({ label, dot, checked, onClick }: { label: string; dot: string; checked: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors hover:bg-[#F7F7F8]">
      <span className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${checked ? "border-[#CC0000] bg-[#CC0000]" : "border-[#C4C4C8] bg-white"}`}>
        {checked && <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 8.2 L6.6 10.8 L12 5.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: dot }} />
      <span className="text-[13px] text-[#27272A]">{label}</span>
    </button>
  );
}

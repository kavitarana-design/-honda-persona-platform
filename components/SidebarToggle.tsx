"use client";

import { useEffect, useState } from "react";

export default function SidebarToggle() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem("sb-collapsed") === "1");
    const h = () => setCollapsed((c) => !c);
    window.addEventListener("toggle-sidebar", h);
    return () => window.removeEventListener("toggle-sidebar", h);
  }, []);

  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className="-ml-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent text-[#52525B] transition-colors hover:border-[#E4E4E7] hover:bg-[#F4F4F5] active:bg-[#ECECEC]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.9" />
        <path d="M9 4v16" stroke="currentColor" strokeWidth="1.9" />
        <path
          d={collapsed ? "M13.5 9l3 3-3 3" : "M16.5 9l-3 3 3 3"}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

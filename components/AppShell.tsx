import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import type { NavKey } from "@/lib/data";

export default function AppShell({
  active,
  activePersona,
  children,
}: {
  active: NavKey;
  activePersona?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar active={active} activePersona={activePersona} />
      <main className="flex min-w-0 flex-1 flex-col">{children}</main>
    </div>
  );
}

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import type { NavKey } from "@/lib/data";

export default function AppShell({
  variant = "workspace",
  active,
  children,
}: {
  variant?: "admin" | "workspace";
  active: NavKey;
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar variant={variant} active={active} />
      <main className="flex min-w-0 flex-1 flex-col">{children}</main>
    </div>
  );
}

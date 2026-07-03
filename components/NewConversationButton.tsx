"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function NewConversationButton({ collapsed = false }: { collapsed?: boolean }) {
  const router = useRouter();

  function handleClick() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("new-conversation"));
    }
    router.push("/chat");
  }

  return (
    <button
      onClick={handleClick}
      title={collapsed ? "New conversation" : undefined}
      className={`mb-2.5 flex items-center justify-center gap-2 rounded-[10px] bg-[#18181B] text-[13px] font-semibold text-white transition-colors hover:bg-black ${
        collapsed ? "mx-auto h-9 w-9" : "py-[9px]"
      }`}
    >
      <Plus size={16} strokeWidth={2.2} />
      {!collapsed && "New conversation"}
    </button>
  );
}

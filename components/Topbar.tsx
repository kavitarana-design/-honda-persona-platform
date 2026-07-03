import type { ReactNode } from "react";

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
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#ECECEC] bg-white px-6">
      <div className="flex items-center gap-2.5 text-[#71717A]">
        {leftIcon}
        <span className="text-[15px] font-semibold text-[#18181B]">{title}</span>
        {sub && <span className="text-[15px] font-normal text-[#A1A1AA]">· {sub}</span>}
      </div>
      {right && <div className="flex items-center gap-2.5">{right}</div>}
    </header>
  );
}

/* Small workspace pill used on the right of the top bar, e.g. "Marketing". */
export function WorkspacePill({
  label,
  dotColor = "#CC0000",
}: {
  label: string;
  dotColor?: string;
}) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-[#E4E4E7] px-3 py-1.5 text-[13px] font-medium text-[#3F3F46]">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      {label}
    </span>
  );
}

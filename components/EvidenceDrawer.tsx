import type { Persona } from "@/lib/personas";

export default function EvidenceDrawer({
  persona,
  strength,
}: {
  persona: Persona;
  strength: "Strong" | "Mixed";
}) {
  const e = persona.evidence;
  const accent = strength === "Strong" ? "#15803D" : "#B45309";

  return (
    <div className="mt-2.5 flex flex-col gap-4 rounded-[14px] border border-[#E4E4E7] bg-[#FCFCFC] p-[18px]">
      {/* Confidence band */}
      <div className="flex gap-2.5">
        <span className="w-[3px] shrink-0 rounded-[2px]" style={{ backgroundColor: accent }} />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold leading-[18px]" style={{ color: accent }}>{strength} evidence</span>
            <span className="text-[12px] leading-4 text-[#6E6E73]">{e.agree}</span>
          </div>
          <p className="text-[13px] leading-[150%] text-[#6E6E73]">{e.summary}</p>
        </div>
      </div>

      {/* Sources */}
      <div className="flex flex-col gap-2">
        {e.sources.map((s, i) => (
          <div key={i} className="flex flex-col gap-[9px] rounded-[10px] border border-[#ECECEC] bg-white p-3">
            <p className="text-[13px] leading-[150%] text-[#52525B]">“{s.quote}”</p>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#F4F4F5] px-2 py-0.5 text-[11px] font-semibold text-[#3F3F46]">{s.platform}</span>
              <span className="text-[12px] leading-4 text-[#A1A1AA]">{s.meta}</span>
              <span className="flex-1" />
              <span
                className="rounded-md px-2 py-0.5 text-[11px]"
                style={s.tone === "green" ? { backgroundColor: "#F0FDF4", color: "#15803D" } : { backgroundColor: "#FFFBEB", color: "#B45309" }}
              >
                matches: {s.match}
              </span>
            </div>
          </div>
        ))}
        <span className="cursor-pointer text-[13px] font-medium leading-4 text-[#6E6E73] hover:text-[#CC0000]">
          See {e.moreCount} more sources
        </span>
      </div>

      {/* Counter view */}
      <div className="flex flex-col gap-[7px] rounded-[10px] border border-[#FDE9C8] bg-[#FFFBEB] p-3">
        <div className="flex items-center gap-[7px]">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#B45309" strokeWidth="1.4" />
            <path d="M8 4.6 V8.6" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11.2" r="0.9" fill="#B45309" />
          </svg>
          <span className="text-[13px] font-semibold leading-4 text-[#B45309]">{e.counter.label}</span>
        </div>
        <p className="text-[13px] leading-[150%] text-[#6E6E73]">“{e.counter.quote}”</p>
      </div>

      {/* Grounding */}
      <div className="flex flex-col gap-[7px]">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium leading-4 text-[#6E6E73]">Grounding</span>
          <span className="flex-1" />
          <span className="text-[12px] font-semibold leading-4" style={{ color: accent }}>{e.groundingPct}% grounded in evidence</span>
        </div>
        <span className="h-1.5 overflow-hidden rounded-full bg-[#EDEDED]">
          <span className="block h-full rounded-full" style={{ width: `${e.groundingPct}%`, backgroundColor: accent }} />
        </span>
      </div>

      {/* Open reasoning map */}
      <button className="flex items-center gap-[7px] pt-0.5 text-left">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <circle cx="3.5" cy="8" r="1.6" fill="#0E0E10" />
          <circle cx="12.5" cy="4" r="1.6" fill="#0E0E10" />
          <circle cx="12.5" cy="12" r="1.6" fill="#0E0E10" />
          <path d="M5 7.3 L11 4.6 M5 8.7 L11 11.4" stroke="#0E0E10" strokeWidth="1.2" />
        </svg>
        <span className="text-[13px] font-medium leading-4 text-[#52525B]">Open reasoning map</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M6 4 L10 8 L6 12" stroke="#6E6E73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

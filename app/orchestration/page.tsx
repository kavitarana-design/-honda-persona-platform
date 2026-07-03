import Link from "next/link";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspacePill } from "@/components/Topbar";

const MATRIX = [
  { name: "Aspirational Arjun", tag: "Metro", bg: "#DBEAFE", fg: "#2563EB" },
  { name: "Practical Meera", tag: "Tier-2", bg: "#EDE9FE", fg: "#7C3AED" },
  { name: "EV-curious Rohan", tag: "EV intent", bg: "#CCFBF1", fg: "#0F766E" },
  { name: "Safety-Led Sneha", tag: "Safety", bg: "#DCFCE7", fg: "#16A34A" },
  { name: "Skeptical Imran", tag: "Switcher", bg: "#FFE4E6", fg: "#BE123C" },
];

const CONSTRAINTS = ["Metro vs Tier-2", "≥1 EV-interested buyer", "≥2 female personas"];

const QUESTIONS = [
  "Running cost over five years, or the way the car looks and feels — which one actually decides it?",
  "What single change would make you choose a Honda hybrid over the Creta?",
  "Does charging access change how you weigh an EV against a hybrid?",
  "Where does Honda feel a step behind rivals, and how much does that matter to you?",
  "At the dealership, what would make you walk away?",
];

function MatrixFace({ bg, fg }: { bg: string; fg: string }) {
  return (
    <span
      className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: bg }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="10" r="1" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="15" cy="10" r="1" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8.5 14.5a4 4 0 0 0 7 0" stroke={fg} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl border border-[#E4E4E7] bg-white p-5">{children}</div>
  );
}

export default function OrchestrationPage() {
  return (
    <AppShell variant="workspace" active="orchestration">
      <Topbar title="Orchestration Agent" right={<WorkspacePill label="Marketing" />} />

      <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
        <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-10 py-[26px]">
          {/* Heading */}
          <div className="flex flex-col gap-[5px]">
            <span className="text-[12.5px] font-medium text-[#A1A1AA]">Marketing workspace</span>
            <h1 className="text-[28px] font-bold leading-[34px] tracking-[-0.02em] text-[#18181B]">
              Orchestration Agent
            </h1>
            <p className="text-[13px] font-medium text-[#71717A]">
              Turn a plain-language brief into a multi-persona research report. No manual chat sessions.
            </p>
          </div>

          {/* Research brief */}
          <Card>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold leading-[18px] text-[#18181B]">Research brief</span>
              <span className="text-[11.5px] font-medium text-[#A1A1AA]">Plain language</span>
            </div>
            <div className="mt-3 rounded-[10px] border border-[#E4E4E7] bg-[#FAFAFA] p-3.5">
              <p className="text-[13.5px] leading-[21px] text-[#27272A]">
                Compare how Metro and Tier-2 buyers react to a City hybrid priced around ₹14L, and what would
                make each switch from a Creta. Surface the running-cost vs styling trade-off and any EV hesitation.
              </p>
            </div>
            <span className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#A1A1AA]">
              Constraints
            </span>
            <div className="mt-[9px] flex flex-wrap gap-2">
              {CONSTRAINTS.map((c) => (
                <span key={c} className="flex items-center gap-[7px] rounded-full bg-[#F1F1F3] py-[5px] pl-[11px] pr-2 text-[12px] font-medium text-[#3F3F46]">
                  {c}
                  <span className="text-[13px] text-[#A1A1AA]">×</span>
                </span>
              ))}
              <span className="flex items-center rounded-full border border-dashed border-[#D4D4D8] px-[11px] py-[5px] text-[12px] font-medium text-[#71717A]">
                + Add constraint
              </span>
            </div>
          </Card>

          {/* Persona matrix */}
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold leading-[18px] text-[#18181B]">Proposed persona matrix</span>
                <span className="rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[11px] font-bold text-[#71717A]">5 personas</span>
              </div>
              <button className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#52525B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 2v6h-6" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 22v-6h6" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Regenerate
              </button>
            </div>
            <p className="mt-1.5 text-[12.5px] font-medium text-[#71717A]">
              Auto-selected for diversity across geography, age, and EV intent. Reviewable before you run.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2.5">
              {MATRIX.map((p) => (
                <span key={p.name} className="flex items-center gap-[9px] rounded-[10px] border border-[#E4E4E7] bg-white py-2 pl-[11px] pr-3">
                  <MatrixFace bg={p.bg} fg={p.fg} />
                  <span className="flex flex-col gap-px">
                    <span className="text-[12.5px] font-semibold leading-4 text-[#18181B]">{p.name}</span>
                    <span className="text-[11px] font-medium leading-[14px] text-[#A1A1AA]">{p.tag}</span>
                  </span>
                  <span className="ml-1 text-[14px] text-[#C4C4CC]">×</span>
                </span>
              ))}
            </div>
          </Card>

          {/* Interview questions */}
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold leading-[18px] text-[#18181B]">Interview questions</span>
                <span className="rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[11px] font-bold text-[#71717A]">5</span>
              </div>
              <button className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#52525B]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 20h9" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Edit
              </button>
            </div>
            <div className="mt-3.5 flex flex-col gap-3">
              {QUESTIONS.map((q, i) => (
                <div key={i} className="flex items-start gap-[11px]">
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[11px] bg-[#F4F4F5] text-[11px] font-bold text-[#52525B]">
                    {i + 1}
                  </span>
                  <p className="flex-1 text-[13.5px] leading-5 text-[#27272A]">{q}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action bar */}
          <div className="flex items-center justify-between rounded-xl border border-[#E4E4E7] bg-white px-[18px] py-3.5">
            <span className="text-[12.5px] font-medium text-[#71717A]">
              5 personas · 5 questions · ~25 parallel interviews · about 2 minutes
            </span>
            <div className="flex items-center gap-2.5">
              <button className="rounded-[9px] border border-[#E4E4E7] bg-white px-4 py-[9px] text-[13px] font-semibold text-[#52525B]">
                Save brief
              </button>
              <Link href="/orchestration/report" className="flex items-center gap-[7px] rounded-[9px] bg-[#CC0000] px-4 py-[9px] text-[13px] font-semibold text-white">
                Run research
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

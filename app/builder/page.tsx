import AppShell from "@/components/AppShell";
import Topbar from "@/components/Topbar";
import PersonaFace from "@/components/PersonaFace";

const TABS = ["Profile", "Data & sources", "Behaviour", "Visibility"];

const PRIORITIES = ["Running & ownership cost", "Resale value", "Service reach nearby", "EV & charging"];

const SOURCES = [
  { name: "Reddit", count: "540K", value: 100, color: "#FB923C" },
  { name: "YouTube", count: "360K", value: 67, color: "#F43F5E" },
  { name: "TeamBHP", count: "210K", value: 39, color: "#2DD4BF" },
  { name: "CarDekho", count: "120K", value: 22, color: "#818CF8" },
];

const TAGS = ["Cost-sensitive", "Resale-focused", "Review-driven", "EV-curious"];

const ChevronDown = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
    <path d="M4 6l3 3 3-3" stroke="#A1A1AA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[12.5px] font-semibold text-[#3F3F46]">{children}</span>;
}

function SelectBox({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[9px] border border-[#E4E4E7] bg-white px-3 py-2.5 text-[13px] font-medium text-[#27272A]">
      {value}
      {ChevronDown}
    </div>
  );
}

function Segmented({ options, active }: { options: string[]; active: string }) {
  return (
    <div className="flex items-center gap-0.5 rounded-[9px] bg-[#F4F4F5] p-[3px]">
      {options.map((o) => (
        <span
          key={o}
          className={`flex-1 rounded-md px-3 py-1.5 text-center text-[13px] font-medium ${
            o === active ? "bg-[#18181B] text-white shadow-[0_1px_2px_#18181B1A]" : "text-[#71717A]"
          }`}
        >
          {o}
        </span>
      ))}
    </div>
  );
}

export default function BuilderPage() {
  return (
    <AppShell variant="workspace" active="library">
      <Topbar
        title="Persona Builder"
        sub="Untitled persona"
        right={
          <>
            <button className="text-[13px] font-medium text-[#71717A]">Discard</button>
            <button className="rounded-[9px] bg-[#CC0000] px-4 py-2 text-[13px] font-semibold text-white">
              Save persona
            </button>
          </>
        }
      />

      <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
        <div className="mx-auto flex w-full max-w-[1120px] gap-12 px-10 py-6">
          {/* Form */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex gap-6 border-b border-[#ECECEC]">
              {TABS.map((t, i) => (
                <span
                  key={t}
                  className={`-mb-px border-b-2 pb-2.5 text-[13.5px] font-medium ${
                    i === 0 ? "border-[#CC0000] text-[#18181B]" : "border-transparent text-[#A1A1AA]"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Persona name */}
            <div className="mt-5 flex flex-col gap-1.5">
              <Label>Persona name</Label>
              <span className="text-[12px] text-[#A1A1AA]">AI-suggested from the attributes below — edit freely.</span>
              <div className="mt-1 flex items-center justify-between rounded-[10px] border border-[#E4E4E7] bg-white px-4 py-3">
                <span className="text-[15px] font-medium text-[#18181B]">Aspirational Arjun</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F4F4F5]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M21 2v6h-6" stroke="#71717A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" stroke="#71717A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Attributes */}
            <div className="mt-6 flex flex-col gap-1">
              <span className="text-[15px] font-semibold text-[#18181B]">Attributes</span>
              <span className="text-[12.5px] text-[#A1A1AA]">
                Shape the profile — the preview and confidence update live as you change these.
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
              <div className="flex flex-col gap-1.5"><Label>Age range</Label><SelectBox value="25 – 34" /></div>
              <div className="flex flex-col gap-1.5"><Label>Location tier</Label><Segmented options={["Metro", "Tier-2", "Tier-3"]} active="Metro" /></div>
              <div className="flex flex-col gap-1.5"><Label>City</Label><SelectBox value="Bengaluru" /></div>
              <div className="flex flex-col gap-1.5"><Label>Gender mix</Label><Segmented options={["All", "Balanced", "Skewed"]} active="Balanced" /></div>
              <div className="flex flex-col gap-1.5"><Label>Vehicle segment</Label><SelectBox value="Hatchback → compact SUV" /></div>
              <div className="flex flex-col gap-1.5"><Label>Annual income</Label><SelectBox value="₹8 – 15L / year" /></div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <Label>Buying stage</Label>
              <Segmented options={["Awareness", "Active consideration", "Post-purchase"]} active="Active consideration" />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Label>Powertrain interest</Label>
              <div className="flex gap-2">
                <span className="rounded-full border border-[#E4E4E7] px-3.5 py-1.5 text-[13px] font-medium text-[#71717A]">Petrol</span>
                <span className="flex items-center gap-1.5 rounded-full border border-[#18181B] px-3.5 py-1.5 text-[13px] font-medium text-[#18181B]">✓ Hybrid</span>
                <span className="flex items-center gap-1.5 rounded-full border border-[#18181B] px-3.5 py-1.5 text-[13px] font-medium text-[#18181B]">✓ EV</span>
              </div>
            </div>

            {/* Decision priorities */}
            <div className="mt-6 flex flex-col gap-2">
              <Label>Decision priorities</Label>
              <span className="text-[12.5px] text-[#A1A1AA]">Ranked from the data.</span>
              <div className="mt-1 flex flex-col gap-2">
                {PRIORITIES.map((p, i) => (
                  <div key={p} className="flex items-center gap-3 rounded-[10px] border border-[#E4E4E7] bg-white px-3.5 py-3">
                    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#18181B] text-[11px] font-bold text-white">{i + 1}</span>
                    <span className="flex-1 text-[13.5px] font-medium text-[#27272A]">{p}</span>
                    <span className="flex flex-col gap-[3px] text-[#C4C4CC]">
                      <span className="flex gap-[3px]"><span className="h-[3px] w-[3px] rounded-full bg-current" /><span className="h-[3px] w-[3px] rounded-full bg-current" /></span>
                      <span className="flex gap-[3px]"><span className="h-[3px] w-[3px] rounded-full bg-current" /><span className="h-[3px] w-[3px] rounded-full bg-current" /></span>
                      <span className="flex gap-[3px]"><span className="h-[3px] w-[3px] rounded-full bg-current" /><span className="h-[3px] w-[3px] rounded-full bg-current" /></span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data sources */}
            <div className="mt-6 flex flex-col gap-2">
              <Label>Data sources</Label>
              <span className="text-[12.5px] text-[#A1A1AA]">Pick the platforms this persona is grounded in.</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {SOURCES.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 rounded-[9px] border border-[#E4E4E7] bg-white px-3 py-2 text-[13px] font-medium text-[#27272A]">
                    ✓ {s.name} <span className="text-[#A1A1AA]">{s.count}</span>
                  </span>
                ))}
                <span className="flex items-center gap-2 rounded-[9px] border border-dashed border-[#D4D4D8] px-3 py-2 text-[13px] font-medium text-[#71717A]">
                  + Instagram <span className="text-[#A1A1AA]">38K</span>
                  <span className="rounded bg-[#FEF3C7] px-1.5 py-0.5 text-[10px] font-semibold text-[#B45309]">low data</span>
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
              <span className="text-[12px] font-medium text-[#15803D]">Strong</span>
              <span className="text-[12px] text-[#A1A1AA]">· 1.12M records · tied to the June data snapshot</span>
            </div>
          </div>

          {/* Preview */}
          <div className="flex w-[400px] shrink-0 flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#18181B]">Preview</span>
              <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#71717A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                Live · updating as you edit
              </span>
            </div>

            {/* Preview card */}
            <div className="flex flex-col gap-3.5 rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_#18181B0A]">
              <div className="flex items-center gap-3">
                <PersonaFace bg="#DBEAFE" fg="#2563EB" size={40} radius={12} />
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#18181B]">Aspirational Arjun</span>
                  <span className="text-[12px] font-medium text-[#71717A]">Metro first-car buyer</span>
                </div>
              </div>
              <span className="text-[12px] font-medium text-[#52525B]">28 · Bengaluru · Tier-1 metro · First-car buyer</span>
              <p className="text-[12.5px] leading-[19px] text-[#71717A]">
                Researches obsessively on YouTube and TeamBHP, weighs resale value heavily, and is quietly drawn to EVs
                but anxious about charging.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TAGS.map((t) => (
                  <span key={t} className="rounded-md bg-[#F4F4F5] px-2 py-1 text-[11.5px] font-medium text-[#52525B]">{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                <span className="text-[12.5px] font-semibold text-[#15803D]">Strong · 84/100</span>
                <span className="text-[12.5px] text-[#A1A1AA]">confidence</span>
              </div>
            </div>

            {/* Data sources card */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_#18181B0A]">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-[#18181B]">Data sources</span>
                <span className="text-[12px] font-medium text-[#A1A1AA]">1.12M</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {SOURCES.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="w-16 text-[12px] font-medium text-[#52525B]">{s.name}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F1F3]">
                      <span className="block h-full rounded-full" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
                    </span>
                    <span className="w-10 text-right text-[12px] font-medium text-[#A1A1AA]">{s.count}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-[#FEF7E8] px-3 py-2.5">
                <span className="text-[13px] text-[#B45309]">⚠</span>
                <span className="text-[11.5px] leading-[15px] text-[#946200]">
                  Instagram is below the reliable-volume threshold and is left out.
                </span>
              </div>
              <span className="text-[11.5px] text-[#A1A1AA]">Tied to the June snapshot · refreshes monthly.</span>
            </div>

            {/* Ask box */}
            <div className="flex flex-col gap-2.5 rounded-xl border border-[#E4E4E7] bg-white p-3 shadow-[0_1px_2px_#18181B0A]">
              <span className="text-[13px] text-[#A1A1AA]">Ask Aspirational Arjun anything…</span>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="rounded-md border border-[#E4E4E7] px-2.5 py-1 text-[12px] font-medium text-[#52525B]">+ Create</span>
                  <span className="rounded-md border border-[#E4E4E7] px-2.5 py-1 text-[12px] font-medium text-[#52525B]">≡ Sources</span>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAEAEA]">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M9 14.5v-11M4.5 8L9 3.5 13.5 8" stroke="#71717A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import Topbar, { WorkspacePill } from "@/components/Topbar";

type Evidence = { strength: "Strong" | "Mixed"; sources: string };
type Message = { role: "user" | "persona"; text: string[]; evidence?: Evidence };

const STARTERS = [
  {
    title: "City hybrid vs. Creta",
    prompt: "How does Arjun feel about the City hybrid vs. the Creta, and what would actually push him to choose Honda?",
  },
  {
    title: "Top objections to a Honda hybrid",
    prompt: "What are Arjun's biggest objections to choosing a Honda hybrid?",
  },
  {
    title: "Emotional messaging angles",
    prompt: "Which emotional messaging angles would resonate most with Arjun?",
  },
];

const RESPONSES: Record<string, Message> = {
  "How does Arjun feel about the City hybrid vs. the Creta, and what would actually push him to choose Honda?": {
    role: "persona",
    text: [
      "Honestly, the City hybrid feels like the “sensible adult” choice — I trust the engine and the resale holds up better than most. But the Creta just looks like more car for the money, and that matters when friends see it parked outside.",
      "What would tip me toward Honda? A clearer story on running cost over 5 years, and a cabin that feels as modern inside as the Creta does. Right now I assume Honda is reliable but a little plain.",
    ],
    evidence: { strength: "Strong", sources: "5 sources · Reddit, YouTube, TeamBHP" },
  },
  "What are Arjun's biggest objections to choosing a Honda hybrid?": {
    role: "persona",
    text: [
      "My biggest hesitation is styling — the City looks understated next to the Creta, and at this price I want the car to feel like an occasion.",
      "After that it's features-for-money: I keep comparing screen size, sunroof and connected tech. If Honda can prove the five-year ownership-cost gap, most of my doubts go quiet.",
    ],
    evidence: { strength: "Strong", sources: "4 sources · Reddit, TeamBHP" },
  },
  "Which emotional messaging angles would resonate most with Arjun?": {
    role: "persona",
    text: [
      "Pride without flash works on me — “the smart choice that still feels premium.” I don't want to look like I overspent, but I don't want to look like I settled either.",
      "Peace of mind is the other one: reliability, resale, and a service network I never have to think about. Frame Honda as the car that quietly makes me look sensible.",
    ],
    evidence: { strength: "Mixed", sources: "3 sources · YouTube, Reddit" },
  },
};

const DEFAULT_RESPONSE: Message = {
  role: "persona",
  text: [
    "Good question — for me it keeps coming back to running cost, resale, and whether the cabin feels modern enough to justify the badge.",
    "Give me a credible five-year cost story and a cabin that doesn't feel plain next to the Creta, and I'm listening.",
  ],
  evidence: { strength: "Strong", sources: "5 sources · Reddit, YouTube, TeamBHP" },
};

const CHIPS = ["Emotional messaging angles", "Top objections to address", "Build a campaign brief"];

const StarIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.6z" fill="#CC0000" />
  </svg>
);

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const started = messages.length > 0;

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const response = RESPONSES[q] ?? DEFAULT_RESPONSE;
    setMessages((prev) => [...prev, { role: "user", text: [q] }, response]);
    setDraft("");
  }

  return (
    <AppShell variant="workspace" active="home">
      <Topbar
        title="Home"
        sub={started ? "Aspirational Arjun" : "New conversation"}
        right={
          <>
            <WorkspacePill label="Marketing" />
            <button className="flex items-center gap-[7px] rounded-[9px] border border-[#E4E4E7] bg-white px-3 py-[7px] text-[12.5px] font-semibold text-[#52525B]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10l5 5 5-5M12 15V3" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export
            </button>
          </>
        }
      />

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto bg-white px-[138px] pb-2 pt-[26px]">
        <div className="mx-auto flex w-full max-w-[880px] flex-col">
          {/* Persona header */}
          <div className="flex items-start gap-4 rounded-[14px] border border-[#E4E4E7] bg-white px-5 py-[18px] shadow-[0_1px_2px_#18181B0A]">
            <svg width="76" height="76" viewBox="0 0 76 76" className="shrink-0">
              <rect x="6" y="8" width="62" height="62" rx="22" fill="#E4E4E7" />
              <path d="M24 37 Q29 31 34 37" fill="none" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M42 37 Q47 31 52 37" fill="none" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M29 47 Q38 56 47 47" fill="none" stroke="#18181B" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M61 6 L63.4 12.6 L70 15 L63.4 17.4 L61 24 L58.6 17.4 L52 15 L58.6 12.6 Z" fill="#CC0000" />
            </svg>
            <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <div className="flex items-center gap-[9px]">
                <span className="text-[17px] font-bold leading-[22px] tracking-[-0.01em] text-[#18181B]">Aspirational Arjun</span>
                <span className="text-[12px] font-medium text-[#A1A1AA]">· Metro first-car buyer</span>
              </div>
              <span className="text-[12.5px] font-medium text-[#71717A]">
                28 · Bengaluru · Software professional · Considering first car (₹10–14L)
              </span>
              <span className="text-[12.5px] leading-[18px] text-[#A1A1AA]">
                Researches obsessively on YouTube and TeamBHP, weighs resale value heavily, and is quietly drawn to
                EVs but anxious about charging.
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end justify-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-[11px] py-[5px] text-[11.5px] font-semibold text-[#16A34A]">
                <span className="h-1.5 w-1.5 rounded-sm bg-[#16A34A]" />
                Confidence 87%
              </span>
              <span className="rounded-full bg-[#F4F4F5] px-[11px] py-[5px] text-[11.5px] font-semibold text-[#71717A]">1.24M records</span>
              <button className="rounded-[9px] border border-[#E4E4E7] px-3 py-[7px] text-[12.5px] font-semibold text-[#52525B]">Switch persona</button>
            </div>
          </div>

          {started ? (
            <>
              {/* Day divider */}
              <div className="mb-0.5 mt-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#ECECEC]" />
                <span className="text-[11.5px] font-medium text-[#A1A1AA]">Today</span>
                <span className="h-px flex-1 bg-[#ECECEC]" />
              </div>

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="mt-[18px] flex flex-row-reverse items-start gap-3">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[15px] bg-[#3F3F46] text-[11px] font-bold text-white">AL</span>
                    <div className="max-w-[600px] rounded-[14px] bg-[#EBEBEB] px-4 py-3">
                      <p className="text-[13.5px] leading-5 text-[#525252]">{m.text[0]}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="mt-[18px] flex items-start gap-3">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[15px] bg-[#27272A] text-[11px] font-bold text-white">AA</span>
                    <div className="flex max-w-[640px] flex-col gap-[9px] rounded-[14px] border border-[#E4E4E7] bg-white px-4 py-[13px] shadow-[0_1px_2px_#18181B0A]">
                      {m.text.map((p, j) => (
                        <p key={j} className="text-[13.5px] leading-5 text-[#27272A]">{p}</p>
                      ))}
                      {m.evidence && (
                        <div className="mt-0.5 flex items-center gap-2.5 border-t border-dashed border-[#E4E4E7] pt-2.5">
                          <span
                            className="rounded-full px-[9px] py-[3px] text-[11px] font-bold"
                            style={m.evidence.strength === "Strong"
                              ? { backgroundColor: "#ECFDF3", color: "#16A34A" }
                              : { backgroundColor: "#FEF3C7", color: "#B45309" }}
                          >
                            ✓ {m.evidence.strength} evidence
                          </span>
                          <span className="text-[11.5px] font-medium text-[#A1A1AA]">{m.evidence.sources}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            /* Empty state — starter prompts */
            <div className="mt-10 flex flex-col items-center gap-5 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF1F1]">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2.2l1.7 4.4 4.6.3-3.6 2.9 1.2 4.5L9 12.2 5.1 14.8l1.2-4.5L2.7 7.4l4.6-.3L9 2.2z" stroke="#CC0000" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[19px] font-bold tracking-[-0.01em] text-[#18181B]">Start a conversation with Arjun</h2>
                <p className="max-w-[420px] text-[13px] leading-[19px] text-[#71717A]">
                  Pick a prompt to begin, or ask your own below. Every answer is grounded in public consumer data.
                </p>
              </div>
              <div className="mt-1 flex w-full max-w-[560px] flex-col gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => send(s.prompt)}
                    className="flex items-center gap-3 rounded-[12px] border border-[#E4E4E7] bg-white px-4 py-3 text-left transition-colors hover:border-[#CC0000] hover:bg-[#FFF8F8]"
                  >
                    <span className="shrink-0">{StarIcon}</span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[13.5px] font-semibold text-[#18181B]">{s.title}</span>
                      <span className="truncate text-[12px] text-[#A1A1AA]">{s.prompt}</span>
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                      <path d="M5 3l4 4-4 4" stroke="#C4C4CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="flex flex-col items-center border-t border-[#ECECEC] bg-white px-[138px] pb-4 pt-3.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="flex w-full max-w-[880px] flex-col gap-[11px]"
        >
          <div className="flex justify-center gap-2">
            {CHIPS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => send(c)}
                className="flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] font-medium text-[#52525B] transition-colors hover:border-[#CC0000] hover:text-[#CC0000]"
              >
                {StarIcon}
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border border-[#E4E4E7] bg-white px-[11px] py-[9px] shadow-[0_1px_2px_#18181B0D] focus-within:border-[#CC0000]">
            <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 11l-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" stroke="#71717A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask Aspirational Arjun anything…"
              className="flex-1 bg-transparent text-[14px] text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] transition-colors ${
                draft.trim() ? "bg-[#CC0000]" : "bg-[#EAEAEA]"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 14.5v-11M4.5 8L9 3.5 13.5 8" stroke={draft.trim() ? "#FFFFFF" : "#71717A"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[11px] text-[#A1A1AA]">
            Responses are grounded in public consumer data · Marketing framing · English
          </p>
        </form>
      </div>
    </AppShell>
  );
}

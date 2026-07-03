// Static content for the Orchestration Agent flow (Arjun-flow example).

export type SavedBrief = {
  title: string;
  meta: string;
  lastRun: string;
  status: { label: string; tone: "green" | "neutral" | "draft" };
};

export const SAVED_BRIEFS: SavedBrief[] = [
  {
    title: "Metro vs Tier-2 — City hybrid vs the Creta",
    meta: "5 personas · 5 topics · saved 28 Jun by Alex Mehta",
    lastRun: "Last run 12 Jun · 25 interviews",
    status: { label: "New data since last run", tone: "green" },
  },
  {
    title: "EV hesitation & charging anxiety",
    meta: "4 personas · 4 topics · saved 21 Jun by Alex Mehta",
    lastRun: "Last run 20 Jun · 16 interviews · shared with Marketing",
    status: { label: "Shared with Marketing", tone: "neutral" },
  },
  {
    title: "Tier-2 service reach & upkeep",
    meta: "3 personas · 5 topics · saved 30 Jun by Alex Mehta",
    lastRun: "Never run",
    status: { label: "Draft", tone: "draft" },
  },
];

export const BRIEF =
  "Compare how Metro and Tier-2 buyers react to a City hybrid priced around ₹14L, and what would make each switch from a Creta. Surface the running-cost vs styling trade-off and any EV hesitation.";

export const EXAMPLES = [
  "Compare Metro vs Tier-2 on the City hybrid",
  "Find the top objections to switching from a Creta",
  "Test an EV messaging angle",
];

export const PLAN_MATRIX = [
  { name: "Aspirational Arjun", tag: "Metro", slug: "aspirational-arjun" },
  { name: "Practical Meera", tag: "Tier-2", slug: "practical-meera" },
  { name: "EV-curious Rohan", tag: "EV intent", slug: "ev-curious-rohan" },
  { name: "Safety-Led Sneha", tag: "Safety", slug: "" },
  { name: "Skeptical Imran", tag: "Switcher", slug: "" },
];

export const PLAN_STATS = [
  { value: "5", label: "personas" },
  { value: "5", label: "topics" },
  { value: "~2 min", label: "≈25 interviews" },
];

export const TOPICS = [
  "Running & ownership cost over 5 years",
  "Styling vs. the Creta",
  "Resale value confidence",
  "EV & charging hesitation",
  "Service reach & upkeep",
];

export const ADVANCED = [
  { label: "Constraints", value: "Metro vs Tier-2 · ≥1 EV-interested · ≥2 female" },
  { label: "Interview depth", value: "Balanced · 5 questions each" },
  { label: "Data window", value: "Tied to the June snapshot" },
];

export const RECEIVE = [
  { title: "Executive takeaway", sub: "The one thing to act on" },
  { title: "Consensus & divergences", sub: "Where personas agree and split" },
  { title: "Persona quotes with evidence", sub: "Grounded in public posts" },
  { title: "Strategic implications", sub: "Prioritised, with confidence" },
];

export const RUN_STEPS = [
  { label: "Designing interview plan", state: "done" as const },
  { label: "Interviewing personas", state: "active" as const, note: "12 of 25 interviews · about 1 min left" },
  { label: "Reviewing evidence & grounding", state: "pending" as const },
  { label: "Writing the report", state: "pending" as const },
];

// ── Results / chart-driven report ──
export const REPORT = {
  title: "City hybrid vs. Creta — Metro vs Tier-2",
  meta: "5 personas · 5 topics · Run 23 Jun 2026 · Marketing",
  metrics: [
    { value: "92%", label: "grounded in evidence", tone: "green" as const },
    { value: "4 / 5", label: "themes strong", tone: "green" as const },
    { value: "1", label: "theme mixed", tone: "amber" as const },
  ],
  takeaway:
    "Lead with a five-year cost story for Metro and service reach for Tier-2. Styling narrows the gap with the Creta but rarely closes the sale on its own.",
  drivers: [
    { label: "Running cost", pct: 88 },
    { label: "Resale value", pct: 81 },
    { label: "Service reach", pct: 74 },
    { label: "Styling", pct: 52 },
    { label: "EV / charging", pct: 43 },
  ],
  quotes: [
    { name: "Aspirational Arjun", tag: "Metro first-car", slug: "aspirational-arjun", quote: "Convince me on five-year cost and a cabin that feels modern, and I'll pick the hybrid." },
    { name: "Practical Meera", tag: "Tier-2 family", slug: "practical-meera", quote: "If the nearest service centre is reliable and cheap to run, that matters more than how it looks." },
    { name: "EV-curious Rohan", tag: "EV upgrader", slug: "ev-curious-rohan", quote: "I'd go full EV tomorrow if highway charging wasn't a gamble." },
  ],
  implications: [
    { text: "Lead Metro messaging with a five-year total-cost story, not styling.", level: "High" as const },
    { text: "For Tier-2, foreground service reach and upkeep predictability.", level: "High" as const },
    { text: "Address charging anxiety head-on to keep EV-curious buyers in the funnel.", level: "Medium" as const },
  ],
  summary: [
    { k: "Personas", v: "5 interviewed" },
    { k: "Topics", v: "5 covered" },
    { k: "Evidence", v: "1.42M records" },
    { k: "Run time", v: "1 min 54 s" },
  ],
  next: [
    "Turn takeaways into a campaign brief",
    "Share the report with After-Sales",
    "Re-run for Tier-3 buyers",
  ],
};

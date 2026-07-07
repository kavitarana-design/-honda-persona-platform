export type Evidence = { strength: "Strong" | "Mixed"; sources: string };
export type PMessage = { role: "user" | "persona"; text: string[]; evidence?: Evidence };
export type Starter = { title: string; prompt: string };

export type PersonaProfile = {
  goals: string[];
  objections: string[];
  quote: string;
  scenario: string;
  keyNeeds: string;
  whatMoves: string;
  sources: string;
};

export type EvidenceSource = {
  platform: string;
  meta: string;
  quote: string;
  match: string;
  tone: "green" | "amber";
};

export type EvidenceDetail = {
  sourceCount: number;
  agree: string;
  summary: string;
  sources: EvidenceSource[];
  moreCount: number;
  counter: { label: string; quote: string };
  groundingPct: number;
};

export type Persona = {
  slug: string;
  name: string; // clean name for the chat header
  sidebarLabel: string; // label shown in the sidebar list
  initials: string;
  color: string; // sidebar avatar bg
  face: { bg: string; fg: string }; // tinted smiley in the chat header
  tagline: string;
  meta: string;
  description: string;
  confidence: number;
  records: string;
  starters: Starter[];
  responses: Record<string, PMessage>;
  fallback: PMessage;
  profile: PersonaProfile;
  evidence: EvidenceDetail;
};

function ev(strength: Evidence["strength"], sources: string): Evidence {
  return { strength, sources };
}

export const PERSONAS: Record<string, Persona> = {
  "aspirational-arjun": {
    slug: "aspirational-arjun",
    name: "Aspirational Arjun",
    sidebarLabel: "Aspirational Arjun · Metro",
    initials: "AA",
    color: "#2563EB",
    face: { bg: "#DBEAFE", fg: "#2563EB" },
    tagline: "Metro first-car buyer",
    meta: "28 · Bengaluru · Software professional · Considering first car (₹10–14L)",
    description:
      "Researches obsessively on YouTube and TeamBHP, weighs resale value heavily, and is quietly drawn to EVs but anxious about charging.",
    confidence: 87,
    records: "1.24M records",
    starters: [
      { title: "City hybrid vs. Creta", prompt: "How does Arjun feel about the City hybrid vs. the Creta, and what would actually push him to choose Honda?" },
      { title: "Top objections to a Honda hybrid", prompt: "What are Arjun's biggest objections to choosing a Honda hybrid?" },
      { title: "Emotional messaging angles", prompt: "Which emotional messaging angles would resonate most with Arjun?" },
      { title: "Charging & EV hesitation", prompt: "How does charging anxiety shape Arjun's view of EVs?" },
    ],
    responses: {
      "How does charging anxiety shape Arjun's view of EVs?": {
        role: "persona",
        text: [
          "I'm genuinely curious about EVs, but the charging question stops me. In an apartment, I can't guarantee a home charger, and public ones feel hit-or-miss.",
          "A hybrid feels like the safe middle ground for now. Show me charging is sorted and I'd reconsider a full EV in a heartbeat.",
        ],
        evidence: ev("Strong", "4 sources · YouTube, Reddit, TeamBHP"),
      },
      "How does Arjun feel about the City hybrid vs. the Creta, and what would actually push him to choose Honda?": {
        role: "persona",
        text: [
          "Honestly, the City hybrid feels like the “sensible adult” choice — I trust the engine and the resale holds up better than most. But the Creta just looks like more car for the money, and that matters when friends see it parked outside.",
          "What would tip me toward Honda? A clearer story on running cost over 5 years, and a cabin that feels as modern inside as the Creta does. Right now I assume Honda is reliable but a little plain.",
        ],
        evidence: ev("Strong", "5 sources · Reddit, YouTube, TeamBHP"),
      },
      "What are Arjun's biggest objections to choosing a Honda hybrid?": {
        role: "persona",
        text: [
          "My biggest hesitation is styling — the City looks understated next to the Creta, and at this price I want the car to feel like an occasion.",
          "After that it's features-for-money: I keep comparing screen size, sunroof and connected tech. If Honda can prove the five-year ownership-cost gap, most of my doubts go quiet.",
        ],
        evidence: ev("Strong", "4 sources · Reddit, TeamBHP"),
      },
      "Which emotional messaging angles would resonate most with Arjun?": {
        role: "persona",
        text: [
          "Pride without flash works on me — “the smart choice that still feels premium.” I don't want to look like I overspent, but I don't want to look like I settled either.",
          "Peace of mind is the other one: reliability, resale, and a service network I never have to think about. Frame Honda as the car that quietly makes me look sensible.",
        ],
        evidence: ev("Mixed", "3 sources · YouTube, Reddit"),
      },
    },
    fallback: {
      role: "persona",
      text: [
        "Good question — for me it keeps coming back to running cost, resale, and whether the cabin feels modern enough to justify the badge.",
        "Give me a credible five-year cost story and a cabin that doesn't feel plain next to the Creta, and I'm listening.",
      ],
      evidence: ev("Strong", "5 sources · Reddit, YouTube, TeamBHP"),
    },
    profile: {
      goals: [
        "Buy his first “proper” car within the next 3 months",
        "Keep 5-year running and ownership cost predictable",
        "A cabin that feels modern, not plain, next to peers",
      ],
      objections: [
        "Honda feels reliable but a little plain inside",
        "Hard to justify paying the hybrid premium up front",
        "Creta looks like more car for the money to peers",
      ],
      quote:
        "The City just feels like the sensible adult choice — I trust the engine and the resale holds up better than most.",
      scenario:
        "Upgrading from a hatchback to his first “proper” car for city drives and the occasional weekend trip.",
      keyNeeds: "Resale value · low running cost · modern cabin · 3 more",
      whatMoves: "Proof over promises · peer validation · 2 more",
      sources: "Reddit, YouTube, TeamBHP, CarDekho · refreshed Jun 2026",
    },
    evidence: {
      sourceCount: 5,
      agree: "4 of 5 sources agree",
      summary:
        "Owners independently echo the resale and running-cost view. One source pushes back on paying the hybrid premium.",
      sources: [
        { platform: "Reddit", meta: "r/IndianCars · Apr 2026", quote: "Honestly the resale on the City just holds up better than the Creta after five years.", match: "resale value", tone: "green" },
        { platform: "YouTube", meta: "Ownership review · Mar 2026", quote: "Did the maths over five years and the hybrid running cost actually works out cheaper.", match: "running cost", tone: "green" },
        { platform: "TeamBHP", meta: "Forum thread · Feb 2026", quote: "Creta feels more premium inside — the City cabin is starting to look plain next to it.", match: "cabin feel", tone: "amber" },
      ],
      moreCount: 2,
      counter: { label: "1 in 5 saw it differently", quote: "Skip the hybrid premium — a well-kept petrol City makes more sense if you drive under 1,000 km a month." },
      groundingPct: 92,
    },
  },

  "practical-meera": {
    slug: "practical-meera",
    name: "Practical Meera",
    sidebarLabel: "Practical Meera · Tier-2",
    initials: "PM",
    color: "#7C3AED",
    face: { bg: "#EDE9FE", fg: "#7C3AED" },
    tagline: "Tier-2 family buyer",
    meta: "35 · Nagpur · Schoolteacher · Upgrading the family hatchback (₹8–12L)",
    description:
      "Prioritises running cost, service reach, and space for two kids; sceptical of features she won't use and wary of anything unproven.",
    confidence: 82,
    records: "0.94M records",
    starters: [
      { title: "What decides her upgrade", prompt: "What matters most to Meera when upgrading the family car?" },
      { title: "Cost vs. features", prompt: "How does Meera weigh price against features?" },
      { title: "What breaks her trust", prompt: "What would make Meera distrust Honda?" },
      { title: "Safety for the family", prompt: "How much does safety weigh in Meera's decision?" },
    ],
    responses: {
      "How much does safety weigh in Meera's decision?": {
        role: "persona",
        text: [
          "It matters a lot once running cost is settled — I'm carrying the kids every day. Airbags, a solid crash rating and good brakes reassure me.",
          "But I won't pay a big premium for safety features I can't see working. Make the essentials standard and I trust the brand more.",
        ],
        evidence: ev("Strong", "3 sources · CarDekho, TeamBHP"),
      },
      "What matters most to Meera when upgrading the family car?": {
        role: "persona",
        text: [
          "It's simple maths for me — running cost first, then whether the nearest service centre is quick and honest. A car that's cheap to keep for ten years beats a flashy one.",
          "Space for the kids and easy parking come next. I won't pay extra for features I'll never touch.",
        ],
        evidence: ev("Strong", "4 sources · TeamBHP, CarDekho"),
      },
      "How does Meera weigh price against features?": {
        role: "persona",
        text: [
          "Features are nice, but I won't stretch the budget for a big screen or a sunroof. Show me lower fuel and service bills and I'm sold.",
          "If two cars cost the same to run, then I start caring about comfort and safety for the family.",
        ],
        evidence: ev("Strong", "3 sources · CarDekho, Reddit"),
      },
      "What would make Meera distrust Honda?": {
        role: "persona",
        text: [
          "A service centre that's far or slow, or hidden maintenance costs I only discover later. That turns me off a brand fast.",
          "I also talk to other owners — if the resale story is weak, I'll quietly move on.",
        ],
        evidence: ev("Mixed", "3 sources · TeamBHP, Reddit"),
      },
    },
    fallback: {
      role: "persona",
      text: [
        "Honestly it comes back to total cost of ownership and a service network I can rely on. Keep those solid and I'll consider Honda seriously.",
      ],
      evidence: ev("Strong", "4 sources · CarDekho, TeamBHP"),
    },
    profile: {
      goals: [
        "Replace the ageing hatchback with a safe family car this year",
        "Keep running and service costs low over the long haul",
        "Enough space and comfort for two growing kids",
      ],
      objections: [
        "Unsure the nearest service centre is quick and honest",
        "Won't pay extra for features she'll never use",
        "Wary of anything unproven on reliability",
      ],
      quote:
        "If it's cheap to run and the service centre is close and honest, that matters more than how it looks.",
      scenario:
        "Upgrading the family hatchback for daily school runs and weekend trips across Tier-2 roads.",
      keyNeeds: "Running cost · service reach · space · safety · 2 more",
      whatMoves: "Owner word-of-mouth · predictable upkeep · 2 more",
      sources: "TeamBHP, CarDekho, Reddit · refreshed Jun 2026",
    },
    evidence: {
      sourceCount: 4,
      agree: "3 of 4 sources agree",
      summary:
        "Tier-2 owners consistently prize service reach and low upkeep. One flags limited weekend service hours.",
      sources: [
        { platform: "TeamBHP", meta: "Ownership thread · Mar 2026", quote: "The nearest Honda service is quick and fairly priced — that's why I stuck with the brand.", match: "service reach", tone: "green" },
        { platform: "CarDekho", meta: "Owner review · Feb 2026", quote: "Running cost has been the lowest of any car we've owned; spares are cheap.", match: "running cost", tone: "green" },
        { platform: "Reddit", meta: "r/IndianCars · Jan 2026", quote: "Wish the weekend service slots weren't so hard to book in smaller towns.", match: "service hours", tone: "amber" },
      ],
      moreCount: 1,
      counter: { label: "1 in 4 saw it differently", quote: "A local independent garage works out cheaper than the brand centre once the car is out of warranty." },
      groundingPct: 88,
    },
  },

  "ev-curious-rohan": {
    slug: "ev-curious-rohan",
    name: "EV-curious Rohan",
    sidebarLabel: "EV-curious Rohan",
    initials: "RV",
    color: "#0F766E",
    face: { bg: "#CCFBF1", fg: "#0F766E" },
    tagline: "EV-curious upgrader",
    meta: "31 · Pune · Product manager · Second car, open to EV (₹15–20L)",
    description:
      "Excited by EVs and in-car tech, tracks charging-network news closely, but won't gamble on long-drive range or uncertain resale.",
    confidence: 79,
    records: "1.10M records",
    starters: [
      { title: "EV vs. hybrid", prompt: "How does Rohan weigh a full EV against a hybrid?" },
      { title: "Charging anxiety", prompt: "How big a deal is charging anxiety for Rohan?" },
      { title: "What closes the sale", prompt: "What would finally get Rohan to buy?" },
      { title: "In-car tech expectations", prompt: "What in-car tech does Rohan expect at this price?" },
    ],
    responses: {
      "What in-car tech does Rohan expect at this price?": {
        role: "persona",
        text: [
          "At ₹15–20L I expect a crisp screen, wireless CarPlay, a proper connected app, and OTA updates. Laggy software is an instant turn-off.",
          "Honda feels dependable but a step behind on tech. Close that gap and it moves up my list fast.",
        ],
        evidence: ev("Mixed", "3 sources · YouTube, Reddit"),
      },
      "How does Rohan weigh a full EV against a hybrid?": {
        role: "persona",
        text: [
          "A hybrid feels like a safe half-step, but honestly I want the EV — instant torque, lower running cost, the tech. The only thing holding me back is highway charging.",
          "Give me confidence on a long drive and I'll pick the EV over a hybrid without much hesitation.",
        ],
        evidence: ev("Strong", "5 sources · YouTube, Reddit, TeamBHP"),
      },
      "How big a deal is charging anxiety for Rohan?": {
        role: "persona",
        text: [
          "It's basically the whole decision. City charging is fine — it's the Pune-to-Goa run that scares me.",
          "If Honda bundled reliable fast-charging access or a strong route planner, my biggest objection would disappear.",
        ],
        evidence: ev("Strong", "4 sources · YouTube, Reddit"),
      },
      "What would finally get Rohan to buy?": {
        role: "persona",
        text: [
          "Proof on real-world range and resale value in three years. I follow this stuff closely, so vague claims won't cut it.",
          "Nail the charging story and back it with data, and I'm an easy yes.",
        ],
        evidence: ev("Mixed", "3 sources · YouTube, TeamBHP"),
      },
    },
    fallback: {
      role: "persona",
      text: [
        "For me it's range confidence and resale — solve charging anxiety with something concrete and the EV wins over the hybrid.",
      ],
      evidence: ev("Strong", "5 sources · YouTube, Reddit, TeamBHP"),
    },
    profile: {
      goals: [
        "Move to a full EV or strong hybrid as a second car",
        "Avoid range and charging anxiety on highway drives",
        "Modern in-car tech that stays up to date",
      ],
      objections: [
        "Highway charging still feels like a gamble",
        "Uncertain three-year resale value on EVs",
        "Honda feels a step behind rivals on tech",
      ],
      quote:
        "I'd go full EV tomorrow if highway charging wasn't a gamble and the resale actually held up.",
      scenario:
        "Adding a second car, weighing a full EV against a hybrid for city commutes and long weekend drives.",
      keyNeeds: "Real-world range · charging access · resale · tech · 1 more",
      whatMoves: "Hard data over claims · early-adopter proof · 1 more",
      sources: "YouTube, Reddit, TeamBHP, CarDekho · refreshed Jun 2026",
    },
    evidence: {
      sourceCount: 5,
      agree: "3 of 5 sources agree",
      summary:
        "EV-curious owners rate the tech and torque highly, but highway charging and resale split opinion.",
      sources: [
        { platform: "YouTube", meta: "EV road-trip · Apr 2026", quote: "City charging is a non-issue — it's the highway fast-chargers that make me nervous.", match: "charging access", tone: "amber" },
        { platform: "Reddit", meta: "r/IndianEVs · Mar 2026", quote: "Instant torque and running cost make the EV worth it if you mostly drive in the city.", match: "running cost", tone: "green" },
        { platform: "TeamBHP", meta: "Forum thread · Feb 2026", quote: "Three-year resale on EVs is still a big unknown compared with a hybrid.", match: "resale", tone: "amber" },
      ],
      moreCount: 2,
      counter: { label: "2 in 5 saw it differently", quote: "A strong hybrid removes all the range anxiety and still cuts the fuel bill." },
      groundingPct: 79,
    },
  },

  "value-seeker-sunita": {
    slug: "value-seeker-sunita",
    name: "Value Seeker Sunita",
    sidebarLabel: "Value Seeker Sunita",
    initials: "SD",
    color: "#B45309",
    face: { bg: "#FEF3C7", fg: "#B45309" },
    tagline: "Budget-first buyer",
    meta: "42 · Jaipur · Small-business owner · Replacing an old sedan (₹7–10L)",
    description:
      "Scrutinises every rupee — upfront price, mileage, and maintenance decide it; brand image barely registers next to total cost.",
    confidence: 74,
    records: "0.82M records",
    starters: [
      { title: "Best value pick", prompt: "Which car gives Sunita the best value?" },
      { title: "Mileage vs. price", prompt: "How does Sunita trade off mileage against upfront price?" },
      { title: "Deal-breakers", prompt: "What are Sunita's deal-breakers?" },
      { title: "Resale confidence", prompt: "How much does resale value influence Sunita?" },
    ],
    responses: {
      "How much does resale value influence Sunita?": {
        role: "persona",
        text: [
          "A lot — I keep a car for years, but I still want it to hold value if I ever sell. A brand known for strong resale earns my trust.",
          "If two cars cost the same to run, the one that resells better wins. That's often where Honda quietly scores.",
        ],
        evidence: ev("Strong", "3 sources · CarDekho, Reddit"),
      },
      "Which car gives Sunita the best value?": {
        role: "persona",
        text: [
          "Value means the lowest total cost I can trust — cheap to buy, cheap to run, cheap to fix. The badge on the bonnet doesn't earn a single rupee.",
          "Show me the five-year cost on paper and I'll pick the winner, Honda or not.",
        ],
        evidence: ev("Strong", "4 sources · CarDekho, Reddit"),
      },
      "How does Sunita trade off mileage against upfront price?": {
        role: "persona",
        text: [
          "A lower sticker price grabs me first, but poor mileage eats that saving within a couple of years, so I do the sums.",
          "If a slightly costlier car clearly saves fuel and service money, I'll take it.",
        ],
        evidence: ev("Strong", "3 sources · CarDekho"),
      },
      "What are Sunita's deal-breakers?": {
        role: "persona",
        text: [
          "Expensive spares, a far service centre, or weak resale — any one of those and I walk.",
          "I'd rather buy a plain, dependable car than an impressive one that drains my wallet later.",
        ],
        evidence: ev("Mixed", "3 sources · Reddit, CarDekho"),
      },
    },
    fallback: {
      role: "persona",
      text: [
        "It's all total cost for me — price, mileage, upkeep, resale. Keep those low and honest and Honda's on my list.",
      ],
      evidence: ev("Strong", "4 sources · CarDekho, Reddit"),
    },
    profile: {
      goals: [
        "Replace the old sedan at the lowest sensible total cost",
        "Best possible mileage and cheap maintenance",
        "A car that holds its resale value for years",
      ],
      objections: [
        "Expensive spares or a far service centre are deal-breakers",
        "Won't pay for brand image she can't use",
        "Needs the five-year cost on paper before deciding",
      ],
      quote:
        "Cheap to buy, cheap to run, cheap to fix — the badge on the bonnet doesn't earn a single rupee.",
      scenario:
        "Replacing an ageing sedan for business errands and family use, scrutinising every rupee of total cost.",
      keyNeeds: "Upfront price · mileage · maintenance · resale · 1 more",
      whatMoves: "Total-cost proof · dependable track record · 1 more",
      sources: "CarDekho, Reddit, TeamBHP · refreshed Jun 2026",
    },
    evidence: {
      sourceCount: 4,
      agree: "3 of 4 sources agree",
      summary:
        "Budget owners agree total cost decides it; opinions differ on paying more upfront for better mileage.",
      sources: [
        { platform: "CarDekho", meta: "Owner review · Mar 2026", quote: "Cheapest car I've run — mileage and service costs are exactly what sold me.", match: "running cost", tone: "green" },
        { platform: "Reddit", meta: "r/IndianCars · Feb 2026", quote: "Resale held up far better than I expected when I sold after six years.", match: "resale value", tone: "green" },
        { platform: "TeamBHP", meta: "Forum thread · Jan 2026", quote: "Paying extra upfront for a hybrid rarely pays back if your yearly running is low.", match: "upfront price", tone: "amber" },
      ],
      moreCount: 1,
      counter: { label: "1 in 4 saw it differently", quote: "Spend a little more upfront on a proven model — it's cheaper to keep over ten years." },
      groundingPct: 74,
    },
  },
};

export const PERSONA_LIST = Object.values(PERSONAS);
export const DEFAULT_PERSONA_SLUG = "aspirational-arjun";

// Home cards show a Strong/Mixed evidence dot derived from confidence.
export function evidenceLevel(confidence: number): "Strong" | "Mixed" {
  return confidence >= 80 ? "Strong" : "Mixed";
}

// Keyword hints so a plain-language prompt can be matched to the right persona.
const MATCH_KEYWORDS: Record<string, string[]> = {
  "ev-curious-rohan": ["ev", "electric", "charging", "charge", "battery", "range", "sustainab"],
  "value-seeker-sunita": ["budget", "value", "price", "cost", "cheap", "affordable", "resale", "mileage", "emi", "running cost", "money"],
  "practical-meera": ["family", "tier-2", "tier 2", "practical", "safety", "space", "kids", "service", "reliab", "hatchback"],
  "aspirational-arjun": ["first car", "aspiration", "metro", "style", "styling", "brand", "status", "hybrid", "city", "modern", "look"],
};

// Rank personas against a plain-language prompt. Best match first; falls back to
// confidence order when nothing matches (e.g. an empty prompt).
export function recommendPersonas(query: string): Persona[] {
  const q = (query || "").toLowerCase();
  return PERSONA_LIST.map((p) => {
    const score = (MATCH_KEYWORDS[p.slug] ?? []).reduce((n, k) => n + (q.includes(k) ? 1 : 0), 0);
    return { p, score };
  })
    .sort((a, b) => b.score - a.score || b.p.confidence - a.p.confidence)
    .map((s) => s.p);
}

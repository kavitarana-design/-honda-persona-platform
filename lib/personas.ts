export type Evidence = { strength: "Strong" | "Mixed"; sources: string };
export type PMessage = { role: "user" | "persona"; text: string[]; evidence?: Evidence };
export type Starter = { title: string; prompt: string };

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
};

function ev(strength: Evidence["strength"], sources: string): Evidence {
  return { strength, sources };
}

export const PERSONAS: Record<string, Persona> = {
  "aspirational-arjun": {
    slug: "aspirational-arjun",
    name: "Aspirational Arjun",
    sidebarLabel: "Aspirational Arjun · Metro",
    initials: "AK",
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
    ],
    responses: {
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
    ],
    responses: {
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
    ],
    responses: {
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
    ],
    responses: {
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
  },
};

export const PERSONA_LIST = Object.values(PERSONAS);
export const DEFAULT_PERSONA_SLUG = "aspirational-arjun";

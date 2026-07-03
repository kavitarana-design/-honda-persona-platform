export type LibraryPersona = {
  name: string;
  role: string;
  meta: string;
  description: string;
  confidence: "Strong" | "Mixed";
  records: string;
  recordsK: number;
  department: string;
  face: { bg: string; fg: string };
  owner: { name: string; initials: string; color: string } | null;
  group: "mine" | "shared" | "template";
};

const ALEX = { name: "Alex Mehta", initials: "AL", color: "#27272A" };
const PRIYA = { name: "Priya Nair", initials: "PN", color: "#2563EB" };
const RAKESH = { name: "Rakesh Yadav", initials: "RY", color: "#0F766E" };
const SAM = { name: "Sam Lee", initials: "SL", color: "#B45309" };

export const LIBRARY_PERSONAS: LibraryPersona[] = [
  // Mine (5)
  { name: "Aspirational Arjun", role: "Metro first-car buyer", meta: "28 · Bengaluru · First-car buyer", description: "Researches obsessively, weighs resale heavily, quietly drawn to EVs but anxious about charging.", confidence: "Strong", records: "1.24M", recordsK: 1240, department: "Marketing", face: { bg: "#DBEAFE", fg: "#2563EB" }, owner: ALEX, group: "mine" },
  { name: "Practical Meera", role: "Tier-2 family buyer", meta: "35 · Nagpur · Family buyer", description: "Prioritises cabin space, mileage and nearby service reach over features or styling.", confidence: "Strong", records: "0.94M", recordsK: 940, department: "Marketing", face: { bg: "#EDE9FE", fg: "#7C3AED" }, owner: ALEX, group: "mine" },
  { name: "EV-curious Rohan", role: "EV-curious upgrader", meta: "31 · Pune · Second car", description: "Excited by EVs and tech, tracks charging news, won't gamble on range or resale.", confidence: "Mixed", records: "1.10M", recordsK: 1100, department: "EV Strategy", face: { bg: "#CCFBF1", fg: "#0F766E" }, owner: ALEX, group: "mine" },
  { name: "Value Seeker Sunita", role: "Budget-first buyer", meta: "42 · Jaipur · Replacing sedan", description: "Scrutinises every rupee — price, mileage and upkeep decide it; brand barely registers.", confidence: "Mixed", records: "0.82M", recordsK: 820, department: "Marketing", face: { bg: "#FEF3C7", fg: "#B45309" }, owner: ALEX, group: "mine" },
  { name: "Skeptical Imran", role: "Brand switcher", meta: "38 · Lucknow · Considering switch", description: "Loyal to his current brand; needs hard proof on cost and reliability to move.", confidence: "Mixed", records: "0.61M", recordsK: 610, department: "Product Planning", face: { bg: "#FFE4E6", fg: "#BE123C" }, owner: ALEX, group: "mine" },

  // Shared (4)
  { name: "Safety-Led Sneha", role: "Safety-first researcher", meta: "33 · Chennai · Family SUV", description: "Puts crash ratings and driver-assist tech first; reads every safety review before shortlisting.", confidence: "Strong", records: "0.88M", recordsK: 880, department: "Product Planning", face: { bg: "#D7DDF6", fg: "#3A4D9F" }, owner: PRIYA, group: "shared" },
  { name: "Commuter Kavya", role: "Value-first commuter", meta: "29 · Hyderabad · Daily commute", description: "Optimises for fuel cost and easy city parking; low tolerance for maintenance surprises.", confidence: "Strong", records: "0.73M", recordsK: 730, department: "Marketing", face: { bg: "#CDEBEA", fg: "#2C7A7B" }, owner: PRIYA, group: "shared" },
  { name: "Upgrader Rakesh", role: "Tier-2 family upgrader", meta: "40 · Indore · Upgrading hatchback", description: "Moving to a bigger car for a growing family; service network is the deciding factor.", confidence: "Strong", records: "0.79M", recordsK: 790, department: "After-Sales", face: { bg: "#CDE7D2", fg: "#2F7A43" }, owner: RAKESH, group: "shared" },
  { name: "Premium Aditi", role: "Premium-leaning buyer", meta: "36 · Delhi · Second car", description: "Wants a cabin and badge that feel premium; willing to pay for design and features.", confidence: "Mixed", records: "0.57M", recordsK: 570, department: "Dealer Network", face: { bg: "#F7E2B0", fg: "#9A5B12" }, owner: SAM, group: "shared" },

  // Templates (3)
  { name: "First-time buyer", role: "Template · Entry segment", meta: "Starter template · edit to fit", description: "A blank first-car buyer profile — set age, city and priorities to ground it in data.", confidence: "Strong", records: "—", recordsK: 0, department: "", face: { bg: "#F4F4F5", fg: "#71717A" }, owner: null, group: "template" },
  { name: "EV intender", role: "Template · EV segment", meta: "Starter template · edit to fit", description: "A ready EV-curious base — tune charging access, range and price sensitivity.", confidence: "Strong", records: "—", recordsK: 0, department: "", face: { bg: "#F4F4F5", fg: "#71717A" }, owner: null, group: "template" },
  { name: "Fleet / commercial", role: "Template · Commercial", meta: "Starter template · edit to fit", description: "A commercial-buyer base focused on running cost, uptime and total cost of ownership.", confidence: "Strong", records: "—", recordsK: 0, department: "", face: { bg: "#F4F4F5", fg: "#71717A" }, owner: null, group: "template" },
];

export const LIBRARY_TABS = [
  { key: "all", label: "All" },
  { key: "mine", label: "Mine" },
  { key: "shared", label: "Shared" },
  { key: "templates", label: "Templates" },
] as const;

export const TAB_SUBTITLE: Record<string, string> = {
  all: "Every persona in your workspace",
  mine: "Personas you created",
  shared: "Personas shared with you",
  templates: "Starter templates you can build from",
};

export const DEPARTMENTS = [
  "All departments",
  "Marketing",
  "Product Planning",
  "After-Sales",
  "Dealer Network",
  "EV Strategy",
  "Executive Leadership",
];

export const SORTS = [
  "Recently updated",
  "Recently created",
  "Confidence: high to low",
  "Data volume: high to low",
  "Name: A to Z",
  "Most used",
];

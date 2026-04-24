export type PhysicianListencyStatusLabel =
  | "Fastest"
  | "Fast"
  | "Moderate"
  | "Slow"
  | "Slowest";

export type PhysicianListencyRow = {
  id: string;
  physicianId: string;
  physicianName: string;
  ordersAssigned: number;
  /** Display string e.g. "1.2 Days" */
  avgSigningDisplay: string;
  specialty: string;
  statusLabel: PhysicianListencyStatusLabel;
  rowHighlight?: boolean;
};

const STATUSES: PhysicianListencyStatusLabel[] = [
  "Fastest",
  "Fast",
  "Moderate",
  "Slow",
  "Slowest",
];

const NAMES: readonly [string, string][] = [
  ["Dr. Emily Carter", "General Physician"],
  ["Dr. James Miller", "Cardiologist"],
  ["Dr. Sarah Nguyen", "Neurologist"],
  ["Dr. Michael Park", "Internal Medicine"],
  ["Dr. Priya Shah", "Pulmonologist"],
  ["Dr. David Lopez", "Family Medicine"],
  ["Dr. Anna Volkov", "Oncologist"],
  ["Dr. Robert Chen", "Endocrinologist"],
];

function formatAvgDays(n: number): string {
  const rounded = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return `${rounded} Days`;
}

export const PHYSICIAN_LISTENCY_SPECIALTIES = [
  ...new Set(NAMES.map(([, s]) => s)),
].sort() as string[];

export function buildPhysicianListencyRows(count = 24): PhysicianListencyRow[] {
  return Array.from({ length: count }, (_, i) => {
    const [name, specialty] = NAMES[i % NAMES.length]!;
    const base = 1001 + i;
    const orders = 15 + ((i * 7) % 45);
    const avgDays = 1 + (i % 10) * 0.4;
    return {
      id: String(i + 1),
      physicianId: `PHY-${base}`,
      physicianName: name,
      ordersAssigned: orders,
      avgSigningDisplay: formatAvgDays(Math.round(avgDays * 10) / 10),
      specialty,
      statusLabel: STATUSES[i % STATUSES.length]!,
      rowHighlight: i === 2,
    };
  });
}

export const PHYSICIAN_LISTENCY_ROWS = buildPhysicianListencyRows(24);

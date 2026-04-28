export type HospiceStatusLabel =
  | "Fastest"
  | "Fast"
  | "Moderate"
  | "Slow"
  | "Slowest";

export type HospiceReportRow = {
  id: string;
  agencyId: string;
  agencyName: string;
  ordersAssigned: number;
  /** Display string e.g. "1.2 Days" */
  avgSigningDisplay: string;
  location: string;
  statusLabel: HospiceStatusLabel;
  orderType: string;
  rowHighlight?: boolean;
};

const STATUSES: HospiceStatusLabel[] = [
  "Fastest",
  "Fast",
  "Moderate",
  "Slow",
  "Slowest",
];

const HOSPICE_AGENCIES: readonly [string, string][] = [
  ["CarePlus Hospice", "San Jose"],
  ["PureWell Palliative Care", "Stackton"],
  ["MedSync Hospice Solutions", "Walnut Creek"],
  ["AlphaCure Hospice", "San Jose"],
  ["CurePoint Hospice Center", "Stackton"],
  ["NovaHealth Palliative", "Walnut Creek"],
  ["MedHealth Hospice", "San Jose"],
  ["VitalCare Hospice", "Stackton"],
];

function formatAvgDays(n: number): string {
  const rounded = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return `${rounded} Days`;
}

export function buildHospiceReportRows(count = 24): HospiceReportRow[] {
  return Array.from({ length: count }, (_, i) => {
    const [name, location] = HOSPICE_AGENCIES[i % HOSPICE_AGENCIES.length]!;
    const base = 2001 + i;
    const orders = 20 + ((i * 9) % 60);
    const avgDays = 0.5 + (i % 8) * 0.6;
    const ORDER_TYPES = [
      "DME Order",
      "Plan of Care",
      "Recertification",
      "Evaluation",
      "Lab / Diagnostic",
    ];
    return {
      id: String(i + 1),
      agencyId: `AGE-${base}`,
      agencyName: name,
      ordersAssigned: orders,
      avgSigningDisplay: formatAvgDays(Math.round(avgDays * 10) / 10),
      location,
      statusLabel: STATUSES[i % STATUSES.length]!,
      orderType: ORDER_TYPES[i % ORDER_TYPES.length]!,
      rowHighlight: i === 1,
    };
  });
}

export const HOSPICE_REPORT_ROWS = buildHospiceReportRows(40);

import type { DateTag, LabelBadgeVariant, OrderTableRow } from "./ordersStaticData";
import type { PatientReportDaysDot, PatientReportStatusDot } from "./patientReportStaticData";

export type AgencyReportRow = {
  id: string;
  patientName?: string;
  date: string;
  dateTags?: DateTag[];
  orderType: string;
  agency: string;
  status: { text: string; dot: PatientReportStatusDot };
  labels: { text: string; variant: LabelBadgeVariant }[];
  daysPending: { text: string; dot: PatientReportDaysDot };
  episode: { code: string; range: string };
  bellUrgent?: boolean;
  rowHighlight?: boolean;
};

type Proto = Omit<AgencyReportRow, "id" | "patientName" | "agency" | "rowHighlight">;

const AGENCY_REPORT_PROTOTYPES: Proto[] = [
  {
    date: "11/20/2025",
    dateTags: [{ text: "Modified", className: "bg-orange-100 text-orange-800" }],
    orderType: "DME Order",
    status: { text: "Delivered", dot: "green" },
    labels: [{ text: "LD", variant: "red" }],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "01", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "11/01/2025",
    dateTags: [{ text: "Rejected", className: "bg-red-100 text-red-700" }],
    orderType: "Plan of Care",
    status: { text: "Signed", dot: "blue" },
    labels: [
      { text: "UR", variant: "blue" },
      { text: "PS", variant: "green" },
      { text: "CR", variant: "brown" },
    ],
    daysPending: { text: "2 Days", dot: "orange" },
    episode: { code: "03", range: "(02-19-26 to 03-01-26)" },
    bellUrgent: true,
  },
  {
    date: "10/15/2025",
    dateTags: [{ text: "Outbound", className: "bg-sky-100 text-sky-700" }],
    orderType: "Recertification",
    status: { text: "Unsigned", dot: "purple" },
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "02", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "10/15/2025",
    orderType: "Evaluation",
    status: { text: "Pending", dot: "orange" },
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "04", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "10/15/2025",
    orderType: "DME Order",
    status: { text: "Delivered", dot: "green" },
    labels: [{ text: "LD", variant: "red" }],
    daysPending: { text: "7 Days", dot: "red" },
    episode: { code: "01", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "09/27/2025",
    dateTags: [{ text: "Signed", className: "bg-emerald-100 text-emerald-800" }],
    orderType: "Plan of Care",
    status: { text: "Pending", dot: "orange" },
    labels: [
      { text: "UR", variant: "blue" },
      { text: "PS", variant: "green" },
      { text: "CR", variant: "brown" },
    ],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "02", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "09/27/2025",
    orderType: "Evaluation",
    status: { text: "Failed", dot: "red" },
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "03", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "09/27/2025",
    orderType: "Recertification",
    status: { text: "Delivered", dot: "green" },
    labels: [{ text: "DME", variant: "orange" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "04", range: "(02-19-26 to 03-01-26)" },
  },
];

const DEMO_PATIENTS = [
  "Ava Martinez",
  "Jordan Kim",
  "Morgan Lee",
  "Riley Chen",
  "Taylor Sutton",
  "Oliver Bennett",
  "Amelia Carter",
  "Finley Ross",
  "Morgan Freeman",
  "Riley Reid",
];

const DEMO_AGENCIES = [
  "CarePlus Health Plans",
  "ABC Pvt-Ltd",
  "MedSync",
  ".AlphaCure",
  "PureWell Health",
  "NovaHealth Insurance",
  "CurePoint",
  "MedHealth",
];

export function buildAgencyReportRows(total = 150): AgencyReportRow[] {
  return Array.from({ length: total }, (_, i) => {
    const proto = AGENCY_REPORT_PROTOTYPES[i % AGENCY_REPORT_PROTOTYPES.length]!;
    return {
      ...proto,
      id: String(i + 1),
      patientName: DEMO_PATIENTS[i % DEMO_PATIENTS.length]!,
      agency: DEMO_AGENCIES[i % DEMO_AGENCIES.length]!,
      rowHighlight: i === 1,
    };
  });
}

export const AGENCY_REPORT_ROWS = buildAgencyReportRows(150);

export const DEMO_AGENCY_ORDER_CONTEXT = "CarePlus Health Plans";

export function agencyRowToOrderRow(row: AgencyReportRow): OrderTableRow {
  const pendingDot =
    row.daysPending.dot === "green" ? "green" : "orange";
  return {
    id: row.id,
    mailbox: row.bellUrgent ? "alert" : "outbox",
    date: row.date,
    dateTags: row.dateTags,
    patientName: row?.patientName,
    orderType: row.orderType,
    serviceType: { text: "Hospice", variant: "hospice" },
    physicianName: "Dr. Emily Carter", // Default physician for order display
    labels: row.labels,
    pending: { text: row.daysPending.text, dot: pendingDot },
    bellUrgent: row.bellUrgent,
  };
}

export const AGENCY_UNSIGNED_BUCKETS: { label: string; value: number }[] = [
  { label: "0-7 days", value: 124 },
  { label: "8-15 days", value: 82 },
  { label: "16-23 days", value: 35 },
  { label: "24-30 days", value: 21 },
  { label: "30+ days", value: 12 },
];

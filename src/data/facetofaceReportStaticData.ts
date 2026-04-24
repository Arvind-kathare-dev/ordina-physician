import type { DateTag, LabelBadgeVariant, OrderTableRow } from "./ordersStaticData";
import type { PatientReportDaysDot, PatientReportStatusDot } from "./patientReportStaticData";

export type Face2FaceReportRow = {
  id: string;
  patientName: string;
  date: string;
  dateTags?: DateTag[];
  orderType: string;
  status: { text: string; dot: PatientReportStatusDot };
  labels: { text: string; variant: LabelBadgeVariant }[];
  daysPending: { text: string; dot: PatientReportDaysDot };
  insurance: string;
  episode: { code: string; range: string };
  bellUrgent?: boolean;
  rowHighlight?: boolean;
  location: string;
};

type Proto = Omit<Face2FaceReportRow, "id" | "patientName" | "insurance" | "rowHighlight">;

const FACE_2_FACE_REPORT_PROTOTYPES: Proto[] = [
  {
    date: "11/20/2025",
    dateTags: [{ text: "Modified", className: "bg-orange-100 text-orange-800" }],
    orderType: "Medication Orders",
    status: { text: "Delivered", dot: "green" },
    labels: [{ text: "LD", variant: "red" }],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "01", range: "(02-19-26 to 03-01-26)" },
    location: "San Jose",
  },
  {
    date: "11/01/2025",
    dateTags: [{ text: "Rejected", className: "bg-red-100 text-red-700" }],
    orderType: "Therapy Orders",
    status: { text: "Signed", dot: "blue" },
    labels: [
      { text: "UR", variant: "blue" },
      { text: "PS", variant: "green" },
      { text: "CR", variant: "brown" },
    ],
    daysPending: { text: "2 Days", dot: "orange" },
    episode: { code: "03", range: "(02-19-26 to 03-01-26)" },
    bellUrgent: true,
    location: "Walnut Creek",
  },
  {
    date: "10/15/2025",
    dateTags: [{ text: "Outbound", className: "bg-sky-100 text-sky-700" }],
    orderType: "Skilled Nursing Orders",
    status: { text: "Unsigned", dot: "purple" },
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "02", range: "(02-19-26 to 03-01-26)" },
    location: "Fremont",
  },
  {
    date: "10/15/2025",
    orderType: "Equipment and Supplies Orders",
    status: { text: "Pending", dot: "orange" },
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "04", range: "(02-19-26 to 03-01-26)" },
    location: "San Francisco",
  },
  {
    date: "10/15/2025",
    orderType: "Medication Orders",
    status: { text: "Delivered", dot: "green" },
    labels: [{ text: "LD", variant: "red" }],
    daysPending: { text: "7 Days", dot: "red" },
    episode: { code: "01", range: "(02-19-26 to 03-01-26)" },
    location: "San Francisco",
  },
  {
    date: "09/27/2025",
    dateTags: [{ text: "Signed", className: "bg-emerald-100 text-emerald-800" }],
    orderType: "Therapy Orders",
    status: { text: "Pending", dot: "orange" },
    labels: [
      { text: "UR", variant: "blue" },
      { text: "PS", variant: "green" },
      { text: "CR", variant: "brown" },
    ],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "02", range: "(02-19-26 to 03-01-26)" },
    location: "San Francisco",
  },
  {
    date: "09/27/2025",
    orderType: "Equipment and Supplies Orders",
    status: { text: "Failed", dot: "red" },
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "03", range: "(02-19-26 to 03-01-26)" },
    location: "San Francisco",
  },
  {
    date: "09/27/2025",
    orderType: "Skilled Nursing Orders",
    status: { text: "Delivered", dot: "green" },
    labels: [{ text: "DME", variant: "orange" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "04", range: "(02-19-26 to 03-01-26)" },
    location: "San Francisco",
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
];

const DEMO_INSURANCE = [
  "Medicare",
  "Medicaid",
  "BCBS PPO",
  "Aetna HMO",
  "UnitedHealthcare",
  "Humana Gold",
  "Cigna Open Access",
  "Tricare",
];

export function buildFace2FaceReportRows(total = 150): Face2FaceReportRow[] {
  return Array.from({ length: total }, (_, i) => {
    const proto = FACE_2_FACE_REPORT_PROTOTYPES[i % FACE_2_FACE_REPORT_PROTOTYPES.length]!;
    return {
      ...proto,
      id: String(i + 1),
      patientName: DEMO_PATIENTS[i % DEMO_PATIENTS.length]!,
      insurance: DEMO_INSURANCE[i % DEMO_INSURANCE.length]!,
      rowHighlight: i === 1,
    };
  });
}

export const FACE_2_FACE_REPORT_ROWS = buildFace2FaceReportRows(150);

export const DEMO_FACE_2_FACE_ORDER_CONTEXT = "Dr. Emily Carter";

export function face2FaceRowToOrderRow(row: Face2FaceReportRow): OrderTableRow {
  const pendingDot =
    row.daysPending.dot === "green" ? "green" : "orange";
  return {
    id: row.id,
    mailbox: row.bellUrgent ? "alert" : "outbox",
    date: row.date,
    dateTags: row.dateTags,
    patientName: row.patientName,
    orderType: row.orderType,
    serviceType: { text: "Hospice", variant: "hospice" },
    physicianName: DEMO_FACE_2_FACE_ORDER_CONTEXT,
    labels: row.labels,
    pending: { text: row.daysPending.text, dot: pendingDot },
    bellUrgent: row.bellUrgent,
  };
}

export const FACE_2_FACE_UNSIGNED_BUCKETS: { label: string; value: number }[] = [
  { label: "0-7 days", value: 165 },
  { label: "8-15 days", value: 93 },
  { label: "16-23 days", value: 42 },
  { label: "24-30 days", value: 18 },
  { label: "30+ days", value: 7 },
];

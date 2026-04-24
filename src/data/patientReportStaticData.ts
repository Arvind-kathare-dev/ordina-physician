import type { DateTag, LabelBadgeVariant, OrderTableRow } from "./ordersStaticData";

export type PatientReportStatusDot =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red";

export type PatientReportDaysDot = "green" | "orange" | "red";

export type PatientReportRow = {
  id: string;
  patientName: string;
  date: string;
  dateTags?: DateTag[];
  orderType: string;
  status: { text: string; dot: PatientReportStatusDot };
  physicianName: string;
  labels: { text: string; variant: LabelBadgeVariant }[];
  daysPending: { text: string; dot: PatientReportDaysDot };
  episode: { code: string; range: string };
  bellUrgent?: boolean;
  rowHighlight?: boolean;
};

type PatientReportPrototype = Omit<PatientReportRow, "id" | "patientName">;

const PATIENT_REPORT_PROTOTYPES: PatientReportPrototype[] = [
  {
    date: "11/20/2025",
    dateTags: [{ text: "Modified", className: "bg-orange-100 text-orange-800" }],
    orderType: "Medication Orders",
    status: { text: "Delivered", dot: "green" },
    physicianName: "Dr. Emily Carter",
    labels: [{ text: "LD", variant: "red" }],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "01", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "11/01/2025",
    dateTags: [{ text: "Rejected", className: "bg-red-100 text-red-700" }],
    orderType: "Therapy Orders",
    status: { text: "Signed", dot: "blue" },
    physicianName: "Dr. Emily Carter",
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
    orderType: "Skilled Nursing Orders",
    status: { text: "Unsigned", dot: "purple" },
    physicianName: "Dr. James Miller",
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "02", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "10/15/2025",
    orderType: "Equipment and Supplies Orders",
    status: { text: "Pending", dot: "orange" },
    physicianName: "Dr. James Miller",
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "04", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "10/15/2025",
    orderType: "Medication Orders",
    status: { text: "Delivered", dot: "green" },
    physicianName: "Dr. Olivia Johnson",
    labels: [{ text: "LD", variant: "red" }],
    daysPending: { text: "7 Days", dot: "red" },
    episode: { code: "01", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "09/27/2025",
    dateTags: [{ text: "Signed", className: "bg-emerald-100 text-emerald-800" }],
    orderType: "Therapy Orders",
    status: { text: "Pending", dot: "orange" },
    physicianName: "Dr. Olivia Johnson",
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
    orderType: "Equipment and Supplies Orders",
    status: { text: "Failed", dot: "red" },
    physicianName: "Dr. Sophia Martinez",
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "03", range: "(02-19-26 to 03-01-26)" },
  },
  {
    date: "09/27/2025",
    orderType: "Skilled Nursing Orders",
    status: { text: "Delivered", dot: "green" },
    physicianName: "Dr. Emily Carter",
    labels: [{ text: "DME", variant: "orange" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "04", range: "(02-19-26 to 03-01-26)" },
  },
];

export function buildPatientReportRows(total = 150): PatientReportRow[] {
  return Array.from({ length: total }, (_, i) => {
    const proto = PATIENT_REPORT_PROTOTYPES[i % PATIENT_REPORT_PROTOTYPES.length]!;
    return {
      ...proto,
      id: String(i + 1),
      patientName: "Ava Martinez",
      rowHighlight: i === 1,
    };
  });
}

export const PATIENT_REPORT_ROWS = buildPatientReportRows(150);

export function patientRowToOrderRow(row: PatientReportRow): OrderTableRow {
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
    physicianName: row.physicianName,
    labels: row.labels,
    pending: { text: row.daysPending.text, dot: pendingDot },
    bellUrgent: row.bellUrgent,
  };
}

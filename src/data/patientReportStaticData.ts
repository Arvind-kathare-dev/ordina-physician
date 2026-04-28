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
  location?: string;
  agency: string;
};

type PatientReportPrototype = Omit<PatientReportRow, "id" | "patientName">;

const PATIENT_REPORT_PROTOTYPES: PatientReportPrototype[] = [
  {
    date: "11/20/2025",
    dateTags: [{ text: "Modified", className: "bg-[#FEF7E6] text-[#F9A825]" }],
    orderType: "DME Order",
    status: { text: "Delivered", dot: "green" },
    physicianName: "Dr. Emily Carter",
    labels: [{ text: "LD", variant: "red" }],
    daysPending: { text: "Today", dot: "green" },
    episode: { code: "01", range: "(02-19-26 to 03-01-26)" },
    location: "san-jose",
    agency: "CarePlus Health Plans",
  },
  {
    date: "11/01/2025",
    dateTags: [{ text: "Rejected", className: "bg-[#FCE8E9] text-[#EA4335]" }],
    orderType: "Plan of Care",
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
    location: "walnut-creek",
    agency: "ABC Pvt-Ltd",
  },
  {
    date: "10/15/2025",
    dateTags: [{ text: "Outbound", className: "bg-[#EAF1FB] text-[#1A73E8]" }],
    orderType: "Recertification",
    status: { text: "Unsigned", dot: "purple" },
    physicianName: "Dr. James Miller",
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "02", range: "(02-19-26 to 03-01-26)" },
    location: "stockton",
    agency: "MedSync",
  },
  {
    date: "10/15/2025",
    orderType: "Evaluation",
    status: { text: "Pending", dot: "orange" },
    physicianName: "Dr. James Miller",
    labels: [{ text: "PS", variant: "green" }],
    daysPending: { text: "3 Days", dot: "orange" },
    episode: { code: "04", range: "(02-19-26 to 03-01-26)" },
    location: "sacramento",
    agency: ".AlphaCure",
  },

];

import { REPORT_PHYSICIAN_PAGE_PATIENT_MULTI_OPTIONS } from "./reportFilterPatientOptions";
import { REPORT_AGENCY_MULTI_OPTIONS } from "./reportFilterAgencyOptions";

export function buildPatientReportRows(total = 150): PatientReportRow[] {
  return Array.from({ length: total }, (_, i) => {
    const proto = PATIENT_REPORT_PROTOTYPES[i % PATIENT_REPORT_PROTOTYPES.length]!;
    const patientNames = REPORT_PHYSICIAN_PAGE_PATIENT_MULTI_OPTIONS.map((o) => o.value);
    const agencies = REPORT_AGENCY_MULTI_OPTIONS.map((o) => o.value);
    return {
      ...proto,
      id: String(i + 1),
      patientName: patientNames[i % patientNames.length]!,
      agency: agencies[i % agencies.length]!,
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

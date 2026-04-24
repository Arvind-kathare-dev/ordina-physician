export type PhysicianNotificationDocument = {
  title: string;
  hospitalName: string;
  hospitalAddress: string;
  hospitalPhone: string;
  patientName: string;
  dateOfBirth: string;
  gender: string;
  mrn: string;
  admissionDate: string;
  dischargeDate: string;
  admittingPhysician: string;
  department: string;
  primaryDiagnosis: string;
  hospitalCourse: string;
  dischargeMedications: string[];
  dischargeInstructions: string[];
  signatureDate: string;
};

export type PhysicianNotificationRow = {
  id: string;
  dateCreated: string;
  dateSent: string;
  patientName: string;
  physicianName: string;
  /** When true, physician icon uses Ordina highlight color and shows the Ordina tooltip on hover. */
  physicianOnOrdina: boolean;
  documentType: string;
  document: PhysicianNotificationDocument;
};

const BASE_DOC: Omit<
  PhysicianNotificationDocument,
  | "patientName"
  | "admittingPhysician"
  | "admissionDate"
  | "dischargeDate"
  | "signatureDate"
  | "mrn"
> = {
  title: "Medical Discharge Summary",
  hospitalName: "Riverside Medical Center",
  hospitalAddress: "1234 Westlake Blvd, Los Angeles, CA 90001",
  hospitalPhone: "(213) 555-0198",
  dateOfBirth: "March 12, 1978",
  gender: "Male",
  department: "Internal Medicine",
  primaryDiagnosis: "Acute bronchitis with productive cough; afebrile on discharge.",
  hospitalCourse:
    "Patient was admitted for worsening respiratory symptoms and dehydration. Received IV fluids, bronchodilator therapy, and supportive care. Symptoms improved steadily; ambulating without distress prior to discharge.",
  dischargeMedications: [
    "Albuterol inhaler 90 mcg, 2 puffs every 4–6 hours as needed for wheeze or shortness of breath.",
    "Guaifenesin 400 mg by mouth twice daily as needed for cough.",
    "Acetaminophen 650 mg by mouth every 6 hours as needed for pain or fever (max 3,000 mg/day).",
  ],
  dischargeInstructions: [
    "Follow up with your primary care physician within 7 days of discharge.",
    "Return to the emergency department for fever over 101.5°F, worsening shortness of breath, chest pain, or inability to keep fluids down.",
  ],
};

function docForRow(
  patientName: string,
  physicianName: string,
  mrn: string,
  admissionDate: string,
  dischargeDate: string
): PhysicianNotificationDocument {
  const baseName = physicianName.includes("Dr.") ? physicianName : `Dr. ${physicianName}`;
  return {
    ...BASE_DOC,
    patientName,
    admittingPhysician: `${baseName}, MD`,
    mrn,
    admissionDate,
    dischargeDate,
    signatureDate: dischargeDate,
  };
}

const SEED_ROWS: Array<{
  dateCreated: string;
  dateSent: string;
  patientName: string;
  physicianName: string;
  physicianOnOrdina: boolean;
  documentType: string;
  mrn: string;
  admissionDate: string;
  dischargeDate: string;
}> = [
  {
    dateCreated: "11/20/2025",
    dateSent: "11/21/2025",
    patientName: "John A. Miller",
    physicianName: "Dr. Emily Carter",
    physicianOnOrdina: false,
    documentType: "Care coordination",
    mrn: "RN-458921",
    admissionDate: "February 18, 2025",
    dischargeDate: "February 22, 2025",
  },
  {
    dateCreated: "11/01/2025",
    dateSent: "11/02/2025",
    patientName: "Oliver Bennett",
    physicianName: "Dr. Sophia Martinez",
    physicianOnOrdina: false,
    documentType: "Abnormal labs",
    mrn: "RN-772104",
    admissionDate: "January 5, 2025",
    dischargeDate: "January 8, 2025",
  },
  {
    dateCreated: "10/15/2025",
    dateSent: "10/16/2025",
    patientName: "Amelia Carter",
    physicianName: "Dr. James Miller",
    physicianOnOrdina: true,
    documentType: "Skilled visit Notifications",
    mrn: "RN-339018",
    admissionDate: "March 2, 2025",
    dischargeDate: "March 6, 2025",
  },
  {
    dateCreated: "09/27/2025",
    dateSent: "09/28/2025",
    patientName: "Taylor Sutton",
    physicianName: "Dr. Olivia Johnson",
    physicianOnOrdina: false,
    documentType: "Missed visit Notifications",
    mrn: "RN-901244",
    admissionDate: "April 10, 2025",
    dischargeDate: "April 14, 2025",
  },
  {
    dateCreated: "09/10/2025",
    dateSent: "09/11/2025",
    patientName: "Morgan Lee",
    physicianName: "Dr. Noah Patel",
    physicianOnOrdina: false,
    documentType: "Discharge summaries",
    mrn: "RN-112903",
    admissionDate: "May 1, 2025",
    dischargeDate: "May 5, 2025",
  },
  {
    dateCreated: "08/22/2025",
    dateSent: "08/23/2025",
    patientName: "Riley Chen",
    physicianName: "Dr. Ava Thompson",
    physicianOnOrdina: false,
    documentType: "Care coordination",
    mrn: "RN-554812",
    admissionDate: "June 12, 2025",
    dischargeDate: "June 15, 2025",
  },
];

function buildRow(
  index: number,
  template: (typeof SEED_ROWS)[number]
): PhysicianNotificationRow {
  const id = String(index + 1);
  return {
    id,
    dateCreated: template.dateCreated,
    dateSent: template.dateSent,
    patientName: template.patientName,
    physicianName: template.physicianName,
    physicianOnOrdina: template.physicianOnOrdina,
    documentType: template.documentType,
    document: docForRow(
      template.patientName,
      template.physicianName,
      template.mrn,
      template.admissionDate,
      template.dischargeDate
    ),
  };
}

/** Demo list length for pagination (6 per page → 25 pages at 150 total). */
export const PHYSICIAN_NOTIFICATIONS_TOTAL = 150;

export const PHYSICIAN_NOTIFICATION_ROWS: PhysicianNotificationRow[] =
  Array.from({ length: PHYSICIAN_NOTIFICATIONS_TOTAL }, (_, i) =>
    buildRow(i, SEED_ROWS[i % SEED_ROWS.length])
  );

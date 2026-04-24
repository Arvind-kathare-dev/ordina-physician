export type DateTag = { text: string; className: string };

export type ServiceBadgeVariant =
  | "hospice"
  | "pharmacy"
  | "dme"
  | "homeHealth";

export type LabelBadgeVariant =
  | "red"
  | "blue"
  | "green"
  | "brown"
  | "orange";

export type PendingDotVariant = "green" | "orange";

/** Matches filter tab ids on outbox-style order pages (pending + received). */
export type OrderMailboxFilter =
  | "outbox"
  | "alert"
  | "undelivered"
  | "inbox"
  | "rejected"
  | "emr";

export type OrderTableRow = {
  id: string;
  mailbox: OrderMailboxFilter;
  date: string;
  dateTags?: DateTag[];
  patientName: string;
  orderType: string;
  serviceType: { text: string; variant: ServiceBadgeVariant };
  physicianName: string;
  labels: { text: string; variant: LabelBadgeVariant }[];
  pending: { text: string; dot: PendingDotVariant };
  bellUrgent?: boolean;
};

export const ORDERS_TABLE_ROWS: OrderTableRow[] = [
  {
    id: "1",
    mailbox: "outbox",
    date: "11/20/2025",
    dateTags: [
      { text: "Outbound", className: "bg-blue-100 text-blue-700" },
      { text: "IPD", className: "bg-purple-100 text-purple-700" },
    ],
    patientName: "John Doe",
    orderType: "Medication Orders",
    serviceType: { text: "Hospice", variant: "hospice" },
    physicianName: "Dr. Emily Carter",
    labels: [{ text: "LD", variant: "red" }],
    pending: { text: "Today", dot: "green" },
  },
  {
    id: "2",
    mailbox: "outbox",
    date: "11/01/2025",
    dateTags: [{ text: "Outbound", className: "bg-blue-100 text-blue-700" }],
    patientName: "Oliver Bennett",
    orderType: "Therapy Orders",
    serviceType: { text: "Pharmacy", variant: "pharmacy" },
    physicianName: "Dr. Sophia Martinez",
    labels: [
      { text: "UR", variant: "blue" },
      { text: "PS", variant: "green" },
      { text: "CR", variant: "brown" },
    ],
    pending: { text: "2 Days", dot: "orange" },
  },
  {
    id: "3",
    mailbox: "outbox",
    date: "10/15/2025",
    dateTags: [{ text: "Outbound", className: "bg-blue-100 text-blue-700" }],
    patientName: "Amelia Carter",
    orderType: "Skilled Nursing Orders",
    serviceType: { text: "DME", variant: "dme" },
    physicianName: "Dr. James Miller",
    labels: [{ text: "PS", variant: "green" }],
    pending: { text: "3 Days", dot: "orange" },
    bellUrgent: true,
  },
  {
    id: "4",
    mailbox: "alert",
    date: "09/27/2025",
    dateTags: [{ text: "IPD", className: "bg-purple-100 text-purple-700" }],
    patientName: "Taylor Sutton",
    orderType: "Equipment and Supplies Orders",
    serviceType: { text: "Home Health", variant: "homeHealth" },
    physicianName: "Dr. Olivia Johnson",
    labels: [{ text: "DME", variant: "orange" }],
    pending: { text: "Today", dot: "green" },
  },
  {
    id: "5",
    mailbox: "undelivered",
    date: "09/27/2025",
    dateTags: [
      { text: "Outbound", className: "bg-blue-100 text-blue-700" },
      { text: "IPD", className: "bg-purple-100 text-purple-700" },
    ],
    patientName: "Taylor Sutton",
    orderType: "Skilled Nursing Orders",
    serviceType: { text: "DME", variant: "dme" },
    physicianName: "Dr. Sophia Martinez",
    labels: [{ text: "PS", variant: "green" }],
    pending: { text: "15 Days", dot: "orange" },
  },
  {
    id: "6",
    mailbox: "outbox",
    date: "09/10/2025",
    dateTags: [{ text: "Outbound", className: "bg-blue-100 text-blue-700" }],
    patientName: "Morgan Lee",
    orderType: "Medication Orders",
    serviceType: { text: "Pharmacy", variant: "pharmacy" },
    physicianName: "Dr. Noah Patel",
    labels: [{ text: "UR", variant: "blue" }],
    pending: { text: "5 Days", dot: "orange" },
  },
  {
    id: "7",
    mailbox: "alert",
    date: "09/05/2025",
    dateTags: [{ text: "Outbound", className: "bg-blue-100 text-blue-700" }],
    patientName: "Riley Chen",
    orderType: "Therapy Orders",
    serviceType: { text: "Hospice", variant: "hospice" },
    physicianName: "Dr. Ava Thompson",
    labels: [{ text: "LD", variant: "red" }],
    pending: { text: "8 Days", dot: "orange" },
    bellUrgent: true,
  },
  {
    id: "8",
    mailbox: "alert",
    date: "08/28/2025",
    patientName: "Jordan Kim",
    orderType: "Skilled Nursing Orders",
    serviceType: { text: "DME", variant: "dme" },
    physicianName: "Dr. Ethan Brooks",
    labels: [{ text: "CR", variant: "brown" }],
    pending: { text: "12 Days", dot: "orange" },
  },
  {
    id: "9",
    mailbox: "undelivered",
    date: "08/20/2025",
    dateTags: [{ text: "IPD", className: "bg-purple-100 text-purple-700" }],
    patientName: "Casey Rivera",
    orderType: "Equipment and Supplies Orders",
    serviceType: { text: "Home Health", variant: "homeHealth" },
    physicianName: "Dr. Mia Foster",
    labels: [{ text: "DME", variant: "orange" }],
    pending: { text: "18 Days", dot: "orange" },
  },
  {
    id: "10",
    mailbox: "undelivered",
    date: "08/12/2025",
    patientName: "Alex Morgan",
    orderType: "Medication Orders",
    serviceType: { text: "Pharmacy", variant: "pharmacy" },
    physicianName: "Dr. Liam Carter",
    labels: [{ text: "PS", variant: "green" }],
    pending: { text: "22 Days", dot: "orange" },
  },
  {
    id: "11",
    mailbox: "inbox",
    date: "08/01/2025",
    dateTags: [{ text: "Outbound", className: "bg-blue-100 text-blue-700" }],
    patientName: "Samira Hassan",
    orderType: "Therapy Orders",
    serviceType: { text: "Hospice", variant: "hospice" },
    physicianName: "Dr. Zoe Williams",
    labels: [{ text: "UR", variant: "blue" }],
    pending: { text: "Today", dot: "green" },
  },
  {
    id: "12",
    mailbox: "inbox",
    date: "07/25/2025",
    patientName: "Chris Park",
    orderType: "Skilled Nursing Orders",
    serviceType: { text: "DME", variant: "dme" },
    physicianName: "Dr. Nina Alvarez",
    labels: [
      { text: "UR", variant: "blue" },
      { text: "PS", variant: "green" },
    ],
    pending: { text: "1 Day", dot: "green" },
  },
  {
    id: "13",
    mailbox: "inbox",
    date: "07/18/2025",
    patientName: "Jamie Ortiz",
    orderType: "Medication Orders",
    serviceType: { text: "Pharmacy", variant: "pharmacy" },
    physicianName: "Dr. Henry Scott",
    labels: [{ text: "LD", variant: "red" }],
    pending: { text: "2 Days", dot: "orange" },
  },
  {
    id: "14",
    mailbox: "inbox",
    date: "07/10/2025",
    patientName: "Drew Collins",
    orderType: "Equipment and Supplies Orders",
    serviceType: { text: "Home Health", variant: "homeHealth" },
    physicianName: "Dr. Priya Singh",
    labels: [{ text: "CR", variant: "brown" }],
    pending: { text: "4 Days", dot: "orange" },
  },
  {
    id: "15",
    mailbox: "rejected",
    date: "07/02/2025",
    dateTags: [{ text: "Outbound", className: "bg-blue-100 text-blue-700" }],
    patientName: "Quinn Foster",
    orderType: "Therapy Orders",
    serviceType: { text: "Hospice", variant: "hospice" },
    physicianName: "Dr. Marcus Webb",
    labels: [{ text: "UR", variant: "blue" }],
    pending: { text: "6 Days", dot: "orange" },
  },
  {
    id: "16",
    mailbox: "rejected",
    date: "06/28/2025",
    patientName: "Blake Turner",
    orderType: "Skilled Nursing Orders",
    serviceType: { text: "DME", variant: "dme" },
    physicianName: "Dr. Elena Ruiz",
    labels: [{ text: "PS", variant: "green" }],
    pending: { text: "9 Days", dot: "orange" },
  },
  {
    id: "17",
    mailbox: "emr",
    date: "06/20/2025",
    patientName: "Skyler Adams",
    orderType: "Medication Orders",
    serviceType: { text: "Pharmacy", variant: "pharmacy" },
    physicianName: "Dr. Victor Ng",
    labels: [{ text: "LD", variant: "red" }],
    pending: { text: "Today", dot: "green" },
  },
  {
    id: "18",
    mailbox: "emr",
    date: "06/15/2025",
    dateTags: [{ text: "IPD", className: "bg-purple-100 text-purple-700" }],
    patientName: "Reese Murphy",
    orderType: "Therapy Orders",
    serviceType: { text: "Home Health", variant: "homeHealth" },
    physicianName: "Dr. Dana Clark",
    labels: [{ text: "DME", variant: "orange" }],
    pending: { text: "1 Day", dot: "green" },
  },
  {
    id: "19",
    mailbox: "emr",
    date: "06/08/2025",
    patientName: "Parker Bell",
    orderType: "Equipment and Supplies Orders",
    serviceType: { text: "Hospice", variant: "hospice" },
    physicianName: "Dr. Iris Khan",
    labels: [{ text: "CR", variant: "brown" }],
    pending: { text: "3 Days", dot: "orange" },
  },
  {
    id: "20",
    mailbox: "emr",
    date: "06/01/2025",
    patientName: "Finley Ross",
    orderType: "Skilled Nursing Orders",
    serviceType: { text: "DME", variant: "dme" },
    physicianName: "Dr. Omar Diaz",
    labels: [
      { text: "UR", variant: "blue" },
      { text: "PS", variant: "green" },
    ],
    pending: { text: "Today", dot: "green" },
  },
];

export const SERVICE_BADGE_STYLES: Record<
  ServiceBadgeVariant,
  string
> = {
  hospice: "bg-[#FFF2DA] text-[#FFA90A]",
  pharmacy: "bg-[#E1F0FF] text-[#3872C3]",
  dme: "bg-[#F8E6FF] text-[#B50AFF]",
  homeHealth: "bg-[#EEFCEF] text-[#38C360]",
};

export const LABEL_BADGE_STYLES: Record<LabelBadgeVariant, string> = {
  red: "fill-red-500",
  blue: "fill-cyan-500",
  green: "fill-green-500",
  brown: "fill-amber-700",
  orange: "fill-orange-500",
};

export const LABEL_TRIANGLE_STYLES: Record<LabelBadgeVariant, string> = {
  red: "border-t-red-500",
  blue: "border-t-cyan-500",
  green: "border-t-green-500",
  brown: "border-t-amber-700",
  orange: "border-t-orange-500",
};
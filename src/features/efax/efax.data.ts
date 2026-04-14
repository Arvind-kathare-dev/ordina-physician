import { Fax, Stat } from "./types";

export const faxData:Fax[] = [
  {
    id: 1,
    faxNo: "OR25PHY01",
    from: "CarePlus Agency",
    to: "orders@prohealth.us",
    subject: "Order Completed..",
    status: "Delivered",
    label: "Report",
    time: "Today | 07:30 AM",
  },
  {
    id: 2,
    faxNo: "OR25PHY02",
    from: "Health Harmony",
    to: "hr@prohealth.us",
    subject: "Physician Signatu..",
    status: "Pending",
    label: "Pending Sign",
    time: "Today | 07:30 AM",
  },
  {
    id: 3,
    faxNo: "OR25PHY03",
    from: "Wellness Pathways",
    to: "john@prohealth.us",
    subject: "Reminder: order a..",
    status: "Failed",
    label: "Error",
    time: "Today | 09:00 AM",
  },
];


export const statsData: Stat[] = [
  { label: "Today", value: "101" },
  { label: "Sent", value: "668" },
  { label: "Pending", value: "13,562" },
  { label: "Failed", value: "27" },
];

export const tabs = [
  { label: "Inbox", count: 1, alert: true },
  { label: "Outbox", count: null },
  { label: "Drafts", count: null },
  { label: "Scheduled", count: null },
  { label: "Archived", count: null },
];



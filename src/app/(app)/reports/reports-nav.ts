export const REPORTS_BASE = "/reports";

export const RECENT_REPORT_LINKS = [
  { id: "patient" as const, href: "/reports/patient", label: "Patient Report" },
  {
    id: "physician" as const,
    href: "/reports/physician",
    label: "Physician Report",
  },
];

export const ONE_CLICK_REPORT_LINKS = [
  { id: "f2f" as const, href: "/reports/face-2-face", label: "Face-2-Face (F2F)" },
  {
    id: "poc" as const,
    href: "/reports/plan-of-care",
    label: "Plan of Care (485)",
  },
  { id: "addon" as const, href: "/reports/add-on", label: "Add-on Reports" },
  { id: "custom" as const, href: "/reports/custom", label: "Custom Report" },
  {
    id: "listency" as const,
    href: "/reports/physician-listency",
    label: "Physician Latency",
  },
];

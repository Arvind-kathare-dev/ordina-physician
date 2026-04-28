export const REPORTS_BASE = "/reports";

export const RECENT_REPORT_LINKS = [
  { id: "patient" as const, href: "/reports/patient", label: "Patient Report" },
  {
    id: "agency" as const,
    href: "/reports/agency",
    label: "Agency Report",
  },
];

export const ONE_CLICK_REPORT_LINKS = [
  {
    id: "billable" as const,
    href: "/reports/billable-orders",
    label: "Billable Orders",
  },
  { id: "f2f" as const, href: "/reports/face-2-face", label: "Face-2-Face (F2F)" },
  {
    id: "poc" as const,
    href: "/reports/plan-of-care",
    label: "Plan of Care (485)",
  },
  { id: "addon" as const, href: "/reports/dme", label: "DME Report" },
  { id: "custom" as const, href: "/reports/custom", label: "Custom Report" },
  {
    id: "hospice" as const,
    href: "/reports/hospice",
    label: "Hospice Report",
  },
];

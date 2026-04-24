export const RICH_RECENT = [
  {
    id: "patient" as const,
    href: "/reports/patient",
    label: "Patient Report",
    tag: "Ops",
    description:
      "Break patient by aging buckets and surface the backlog risk (30+ days) immediately.",
  },
  {
    id: "physician" as const,
    href: "/reports/physician",
    label: "Agency Report",
    tag: "Agencies",
    description:
      "Break pending by aging buckets and surface the backlog risk (30+ days) immediately.",
  },
] as const;

export const RICH_ONE_CLICK = [
  {
    id: "billable" as const,
    href: "/reports/billable-orders",
    label: "Billable Orders",
    tag: "Finance",
    description: "Financial overview of billable orders, Lab, 485, and MD Verification.",
  },
  {
    id: "f2f" as const,
    href: "/reports/face-2-face",
    label: "Face-2-Face (F2F)",
    tag: "QA",
    description:
      "Canceled orders, unusual swings, and exception indicators that need attention.",
  },
  {
    id: "poc" as const,
    href: "/reports/plan-of-care",
    label: "Plan of Care (485)",
    tag: "Care",
    description: "485 plan metrics and compliance snapshots for your locations.",
  },
  {
    id: "addon" as const,
    href: "/reports/add-on",
    label: "DME Report",
    tag: "Finance",
    description: "Supplemental report packs and optional analytics modules.",
  },
  {
    id: "custom" as const,
    href: "/reports/custom",
    label: "Custom Report",
    tag: "Finance",
    description: "Build and save ad-hoc report definitions for your team.",
  },
  {
    id: "listency" as const,
    href: "/reports/physician-listency",
    label: "Hospice Report",
    tag: "Finance",
    description: "Latency and turnaround trends by physician and site.",
  },
] as const;

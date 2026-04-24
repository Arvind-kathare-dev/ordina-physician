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
    label: "Physician Report",
    tag: "Physicians",
    description:
      "Who is slowing the workflow? Workload + signed rate + trend for quick follow-ups.",
  },
] as const;

export const RICH_ONE_CLICK = [
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
    label: "Add-on Reports",
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
    label: "Physician Latency",
    tag: "Finance",
    description: "Latency and turnaround trends by physician and site.",
  },
] as const;

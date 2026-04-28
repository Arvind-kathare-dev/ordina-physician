/** Values match `orderType` strings on patient / F2F–style report rows. */
export const REPORT_ORDER_TYPE_MULTI_OPTIONS = [
  {
    value: "DME Order",
    label: "DME Order",
    description: "Equipment / Supplies",
    tag: "Common",
  },
  {
    value: "Plan of Care",
    label: "Plan of Care",
    description: "Home health POC",
    tag: "HH",
  },
  {
    value: "Recertification",
    label: "Recertification",
    description: "OASIS / renewal",
    tag: "HH",
  },
  {
    value: "Evaluation",
    label: "Evaluation",
    description: "PT/OT/ST eval",
    tag: "Therapy",
  },
  {
    value: "Lab / Diagnostic",
    label: "Lab / Diagnostic",
    description: "Reports & tests",
    tag: "Clinical",
  },
] as const;

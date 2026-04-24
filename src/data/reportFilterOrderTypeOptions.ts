/** Values match `orderType` strings on patient / F2F–style report rows. */
export const REPORT_ORDER_TYPE_MULTI_OPTIONS = [
  {
    value: "Medication Orders",
    label: "Medication Orders",
    description: "Pharmacy, MAR, and med admin",
    tag: "Common",
  },
  {
    value: "Therapy Orders",
    label: "Therapy Orders",
    description: "PT / OT / ST plans",
    tag: "Therapy",
  },
  {
    value: "Skilled Nursing Orders",
    label: "Skilled Nursing Orders",
    description: "SN visits & skilled notes",
    tag: "Clinical",
  },
  {
    value: "Equipment and Supplies Orders",
    label: "Equipment and Supplies Orders",
    description: "DME / supplies fulfillment",
    tag: "DME",
  },
] as const;

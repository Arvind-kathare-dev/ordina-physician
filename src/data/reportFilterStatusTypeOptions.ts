/**
 * Status Type filter — values match `row.status.text` on patient / physician / F2F-style report rows.
 */
export const REPORT_STATUS_TYPE_SELECT_OPTIONS = [
  { value: "", label: "Select" },
  { value: "Signed", label: "Signed" },
  { value: "Unsigned", label: "Unsigned" },
  { value: "Delivered", label: "Delivered" },
  { value: "Failed", label: "Failed" },
  { value: "Pending", label: "Pending" },
] as const;

/**
 * Location filter — same select/radio pattern as Status Type (Figma).
 */
export const REPORT_LOCATION_SELECT_OPTIONS = [
  { value: "", label: "Select" },
  { value: "san-jose", label: "San Jose" },
  { value: "walnut-creek", label: "Walnut Creek" },
  { value: "stockton", label: "Stockton" },
  { value: "sacramento", label: "Sacramento" },
] as const;


export const REPORT_INSURANCE_MULTI_OPTIONS = [
  { value: "", label: "Select" },
  { value: "cigna", label: "Cigna" },
  { value: "united-healthcare", label: "United Healthcare" },
  { value: "aetna", label: "Aetna" },
  { value: "humana", label: "Humana" },
  { value: "medicare", label: "Medicare" },
  { value: "medicaid", label: "Medicaid" },
] as const;
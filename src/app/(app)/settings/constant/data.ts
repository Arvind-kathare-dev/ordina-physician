import { SettingsSection } from "../hooks/useSettings";

export const profileItems: { key: SettingsSection; label: string; sub?: string }[] = [
  { key: "pecos", label: "PECOS", sub: "NPI / PECOS" },
  { key: "information", label: "Information", sub: "Details" },
  { key: "order-delivery", label: "Order delivery prefer..", sub: "Details" },
  { key: "integration", label: "Integration", sub: "Details" },

];

// 🔹 Main Sections
export const mainItems: { key: SettingsSection; label: string }[] = [
  { key: "returned-days", label: "Returned-in Days Thresholds" },
  { key: "manage-users", label: "Manage Users" },
  { key: "subscriptions", label: "Subscriptions" },
  { key: "vendor-settings", label: "Vendor Settings" },
];
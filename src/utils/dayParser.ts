// utils/dayParser.ts

export const parseDays = (value?: string): number => {
  if (!value) return 0;

  const lower = value.toLowerCase().trim();

  // Handle "Today"
  if (lower === "today") return 0;

  // Extract number from "2 Days", "7 days", etc.
  const match = lower.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};
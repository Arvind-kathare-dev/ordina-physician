
export const getDayColor = (days: number): string => {
  if (days === 0) return "text-green-600";     // Today
  if (days >= 2 && days <= 6) return "text-yellow-500"; // 2–6
  if (days >= 7) return "text-red-500";        // 7+

  return "text-gray-400"; // fallback (e.g., 1 day)
};
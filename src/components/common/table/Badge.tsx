
export function Badge({ type }: { type: string }) {
  const styles =
    type === "Hospice"
      ? "bg-orange-100 text-orange-600"
      : "bg-green-100 text-green-600";

  return (
    <span className={`text-xs px-2 py-1 rounded ${styles}`}>
      {type}
    </span>
  );
}
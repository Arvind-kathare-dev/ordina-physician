import { ArrowUpDown, SlidersHorizontal } from "lucide-react";

export function TabsActionsMinimal() {
  return (
    <>
      <button className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <ArrowUpDown size={19} />
      </button>

      <button className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <SlidersHorizontal size={19} />
      </button>
    </>
  );
}
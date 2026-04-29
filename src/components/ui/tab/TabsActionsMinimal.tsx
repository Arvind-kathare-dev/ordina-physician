import { ArrowUpDown, SlidersHorizontal } from "lucide-react";

interface TabsActionsProps {
  onClick: () => void;
}

export function TabsActionsMinimal({ onClick }: TabsActionsProps) {
  return (
    <>
      <button className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <ArrowUpDown size={19} />
      </button>

      <button onClick={onClick} className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <SlidersHorizontal size={19} />
      </button>
    </>
  );
}
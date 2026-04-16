import { Bell, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import Button from "../button/Button";

interface TabsActionsProps {
  activeTab: number;
  onMyOrdersClick: () => void;
}

export function TabsActions({ activeTab, onMyOrdersClick }: TabsActionsProps) {
  const isActive = activeTab === 6;
  return (
    <>
      <Button
        variant={isActive ? "primary" : "outlinePrimary"}
        size="md"
        onClick={onMyOrdersClick}>
        My Orders
      </Button>

      <button className="relative p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <Bell size={19} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      <button className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <ArrowUpDown size={19} />
      </button>

      <button className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <SlidersHorizontal size={19} />
      </button>
    </>
  );
}
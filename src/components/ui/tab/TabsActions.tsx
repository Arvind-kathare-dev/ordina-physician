import { Bell, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import Button from "../button/Button";

export function TabsActions() {
  return (
    <>
      <Button variant="secondary" size="md">
            My Orders
          </Button>

      <button className="relative p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <Bell size={15} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      <button className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <ArrowUpDown size={15} />
      </button>

      <button className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500">
        <SlidersHorizontal size={15} />
      </button>
    </>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import { ordersTableData } from "../constants/data";
import { DropdownOption } from "@/types/dropdowm.types";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import { ChevronDown } from "lucide-react";

const options: DropdownOption[] = [
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

const SERVICE_OPTIONS = [
  { label: "All", value: "all" },
  { label: "DME Order", value: "dme" },
  { label: "LAB / Diagnostic", value: "lab" },
  { label: "485", value: "485" },
  { label: "Plan of Care", value: "poc" },
  { label: "Evaluation", value: "eval" },
];

function ServiceTypeDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["all"]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = (val: string) => {
    if (val === "all") {
      setSelected(["all"]);
      return;
    }

    setSelected((prev) => {
      let next = prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val];
      next = next.filter(x => x !== "all");
      if (next.length === 0) return ["all"];
      if (next.length === SERVICE_OPTIONS.length - 1) return ["all"];
      return next;
    });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex text-grayCustom-600 items-center justify-between gap-1 px-2 py-1 w-fit bg-white border border-boxBorder rounded-[5px] shadow-sm text-xs font-normal hover:bg-gray-100 focus:outline-none"
      >
        <span className="text-gray-700">Service Type</span>
        <ChevronDown size={14} className="text-grayCustom-600" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[180px] bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E5E7EB] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="py-2">
            {SERVICE_OPTIONS.map((opt) => {
              const isSelected = selected.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  onClick={() => toggle(opt.value)}
                  className="flex items-center gap-3 px-3 py-[7px] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-[14px] h-[14px] rounded-[3px] flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-[#0EA5E9] border-[#528DB5]" : "bg-white border border-[#528DB5]"}`}>
                    {isSelected && (
                      <svg width="8" height="6" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] text-[#606060]">{opt.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const OrdersTable = () => {
  const [value, setValue] = useState("month");

  return (
    <div className="col-span-4 h-full bg-white rounded-xl2 p-4 flex flex-col shadow-card-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="font-semibold text-base text-grayCustom-600 shrink-0">
          Orders
        </span>

        <div className="flex items-center gap-2">
          <Dropdown options={options} value={value} onChange={setValue} />
          <ServiceTypeDropdown />
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-10 overflow-hidden bg-white">
        {/* Table Header */}
        <div className="bg-gradient-primary shadow-custom-bottom mb-2 rounded-10 border border-border text-white text-sm font-medium px-4 py-3 grid grid-cols-3">
          <span className="text-left">Agency Name</span>
          <span className="text-center">No. of Patient</span>
          <span className="text-right">No. of Orders</span>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[260px] overflow-y-auto">
          <table className="w-full text-sm">
            <tbody>
              {ordersTableData.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-3 max-w-[80px] text-start text-grayCustom-600">
                    {row.agency}
                  </td>

                  <td className="px-4 py-3 text-left text-grayCustom-600">
                    {row.patients}
                  </td>

                  <td className="px-4 py-3 text-center text-grayCustom-600">
                    {row.orders}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;

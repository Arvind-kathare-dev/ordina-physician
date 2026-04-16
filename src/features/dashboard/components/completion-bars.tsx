"use client";

import Dropdown from "@/components/ui/dropdown/Dropdown";
import { DropdownOption } from "@/types/dropdowm.types";
import { useState } from "react";

const options: DropdownOption[] = [
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

const CompletionBars = () => {
  const [value, setValue] = useState("month");

  return (
    <div className="flex flex-col gap-4 w-full bg-white shadow-card-shadow rounded-xl  p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-semibold text-base text-grayCustom-600">
          Average Orders Completion Time
        </span>

        <Dropdown options={options} value={value} onChange={setValue} />
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Row 1 */}
        <div className="flex items-center gap-4">
          {/* Label Box */}
          <div className="w-28 text-xs text-grayCustom-300 bg-white border border-boxBorder rounded-[6px] px-3 py-2 text-center">
            MD 
          </div>

          {/* Bars */}
          <div className="flex-1">
            {/* Selected MD */}
            <div className="relative h-4 bg-white rounded-sm overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-500"
                style={{ width: "100%" }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] text-white font-medium">
                4 days
              </span>
            </div>

            {/* Ordina Avg */}
            <div className="relative h-4 bg-white rounded-sm overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-100"
                style={{ width: "75%" }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] text-[#8B6B3E] font-medium">
                3 days
              </span>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-4">
          {/* Label Box */}
          <div className="w-28 text-xs  text-grayCustom-300 bg-white border border-boxBorder rounded-[6px] px-3 py-2 text-center">
           POC/485
          </div>

          {/* Bars */}
          <div className="flex-1">
            {/* Selected MD */}
            <div className="relative h-4 bg-white rounded-sm overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-500"
                style={{ width: "80%" }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] text-white font-medium">
                3.2 days
              </span>
            </div>

            {/* Ordina Avg */}
            <div className="relative h-4 bg-white rounded-sm overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-100"
                style={{ width: "95%" }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] text-[#8B6B3E] font-medium">
                3.8 days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-2 font-normal">
        <div className="flex  items-center gap-1 border-[0.2px] border-ordinaBorder-150 rounded-3xl px-2 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          <span className="text-[10px]   text-gray-450">Selected MD</span>
        </div>

        <div className="flex items-center gap-1 border-[0.2px] border-ordinaBorder-150 rounded-3xl px-2 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-100" />
          <span className="text-[10px] text-gray-450">Ordina Avgs</span>
        </div>
      </div>
    </div>
  );
};

export default CompletionBars;

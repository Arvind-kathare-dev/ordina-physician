"use client";

import Dropdown from "@/components/ui/dropdown/Dropdown";
import { DropdownOption } from "@/types/dropdowm.types";
import { useState } from "react";

const options: DropdownOption[] = [
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Yesterday", value: "yesterday" },
];

const EfaxSection = () => {
  const [value, setValue] = useState("today");
  return (
    <div className="bg-white p-4 flex flex-col gap-3 rounded-xl shadow-card-shadow">
      <div className="flex items-center justify-between ">
        <div>
          <span className="font-semibold text-[20px] text-gray-400">eFax</span>

          <p className="text-[10px] font-normal text-grayCustom-400">
            Orders vs Others
          </p>
        </div>
        <Dropdown options={options} value={value} onChange={setValue} />
      </div>

      {/* Total eFax Volume */}
      <div className="bg-gradient-light-ordina rounded-md2 p-3">
        <p className="text-white text-xs font-semibold">Total eFax Volume</p>
        <div className="flex items-end justify-between text-white">
          <span className="text-lg font-extrabold">13,562</span>
          <span className="text-[10px] font-semibold">94.7% orders</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white border border-gray-220 rounded-md2 p-3">
          <p className="text-[10px] text-gray-400 mb-1">Orders</p>
          <p className="text-lg font-semibold text-grayCustom-300">12,840</p>
          <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
            <div
              className="h-1.5 bg-ordina-500 rounded-full"
              style={{ width: "94.7%" }}
            />
          </div>
          <p className="text-[8px] font-normal text-gray-350 mt-1">
            Clinical workflow · 94.7%
          </p>
        </div>
        <div className="bg-white border border-gray-220 rounded-md2 p-3">
          <p className="text-[10px] text-gray-400 mb-1">Others</p>
          <p className="text-lg font-semibold text-grayCustom-300">722</p>
          <div className="w-full h-1.5 bg-gray-120 rounded-full mt-1">
            <div
              className="h-1.5 bg-gray-520 rounded-full"
              style={{ width: "5.3%" }}
            />
          </div>
          <p className="text-[8px] font-normal text-gray-350 mt-1">
            Non-order traffic · 5.3%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="border border-gray-220 rounded-md2 p-3">
          <p className="text-[8px] font-normal text-gray-350">Success Rate</p>
          <p className="text-sm font-semibold text-green-420">1158</p>
        </div>
        <div className="border border-gray-220 rounded-md2 p-3">
          <p className="text-[8px] font-normal text-gray-350">Failed Rate</p>
          <p className="text-sm font-semibold text-red-400">241</p>
        </div>
      </div>
    </div>
  );
};

export default EfaxSection;

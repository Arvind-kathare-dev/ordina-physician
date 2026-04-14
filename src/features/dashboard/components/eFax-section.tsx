import Dropdown from "@/components/ui/dropdown/Dropdown";
import { DropdownOption } from "@/types/dropdowm.types";
import { useState } from "react";

const options: DropdownOption[] = [
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

const EfaxSection = () => {
  const [value, setValue] = useState("month");
  return (
    <div className="bg-white p-4 flex flex-col gap-3 rounded-xl shadow-card-shadow">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="font-semibold text-base text-grayCustom-600">
            eFax
          </span>

          <p className="text-[10px] font-normal text-grayCustom-400">
            Orders vs Others
          </p>
        </div>
        <Dropdown options={options} value={value} onChange={setValue} />
      </div>

      {/* Total eFax Volume */}
      <div className="bg-gradient-light-ordina rounded-lg p-3">
        <p className="text-white text-xs font-semibold">Total eFax Volume</p>
        <div className="flex items-end justify-between text-white">
          <span className="text-lg font-bold">13,562</span>
          <span className="text-[10px] font-medium">94.7% orders</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-[10px] text-gray-400 mb-1">Orders received</p>
          <p className="text-sm font-bold text-gray-800">12,840</p>
          <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
            <div
              className="h-1.5 bg-ordina-500 rounded-full"
              style={{ width: "94.7%" }}
            />
          </div>
          <p className="text-[9px] text-gray-400 mt-1">
            Clinical workflow · 94.7%
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-[10px] text-gray-400 mb-1">Others received</p>
          <p className="text-sm font-bold text-gray-800">722</p>
          <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
            <div
              className="h-1.5 bg-gray-400 rounded-full"
              style={{ width: "5.3%" }}
            />
          </div>
          <p className="text-[9px] text-gray-400 mt-1">
            Non-order traffic · 5.3%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-[10px] text-gray-400">Sent Orders</p>
          <p className="text-sm font-bold text-green-500">1158</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-[10px] text-gray-400">Failed Orders</p>
          <p className="text-sm font-bold text-red-500">241</p>
        </div>
      </div>
    </div>
  );
};

export default EfaxSection;

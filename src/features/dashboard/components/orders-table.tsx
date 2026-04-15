"use client";

import { useState } from "react";
import { ordersTableData } from "../constants/data";
import { DropdownOption } from "@/types/dropdowm.types";
import Dropdown from "@/components/ui/dropdown/Dropdown";

const options: DropdownOption[] = [
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

const OrdersTable = () => {
  const [value, setValue] = useState("month");

  return (
    <div className="col-span-4 bg-white rounded-xl  p-5 flex flex-col shadow-card-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-base text-grayCustom-600">
          Orders
        </span>

        <div className="flex gap-2">
          <Dropdown options={options} value={value} onChange={setValue} />
          <Dropdown options={options} value={value} onChange={setValue} />
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl overflow-hidden bg-white">
        {/* Table Header */}
        <div className="bg-gradient-primary shadow-custom-bottom mb-2  rounded-[10px] border border-border text-white text-sm font-medium px-4 py-3 grid grid-cols-3">
          <span className="text-left">Agency Name</span>
          <span className="text-center">No. of Patient</span>
          <span className="text-right">No. of Orders</span>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[220px] overflow-y-auto">
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

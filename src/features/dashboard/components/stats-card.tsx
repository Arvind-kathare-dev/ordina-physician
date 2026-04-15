"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface BreakdownItem {
  label: string;
  count: number;
  color: "blue" | "green" | "yellow";
}

interface AgingItem {
  label: string;
  count: number;
}

interface StatCardProps {
  title: string;
  value: number | string;
  desc: string;
  total: number;
  breakdown: BreakdownItem[];
  aging?: AgingItem[];
}

export const StatCard = ({
  title,
  value,
  desc,
  total,
  breakdown,
  aging,
}: StatCardProps) => {
  const [open, setOpen] = useState(false);

  const getBg = (color: string) => {
    if (color === "blue") return "bg-blue-100";
    if (color === "green") return "bg-green-100";
    return "bg-yellow-100";
  };

  const getDot = (color: string) => {
    if (color === "blue") return "bg-blue-500";
    if (color === "green") return "bg-green-500";
    return "bg-yellow-500";
  };

  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="bg-white rounded-2xl border border-gray-100 p-4 w-full transition-all duration-300 cursor-pointer"
    >
      {/* DEFAULT VIEW */}
      {!open && (
        <div className="flex flex-col justify-between h-[140px]">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-gray-700">
              {title}
            </span>
            <Info size={16} className="text-gray-400" />
          </div>

          <h2 className="text-3xl font-semibold text-gray-800">
            {value}
          </h2>

          <p className="text-xs text-gray-400">{desc}</p>
        </div>
      )}

      {/* EXPANDED VIEW */}
      {open && (
        <div className=" flex flex-col gap-4">

          {/* Header */}
          <div className="flex justify-between w-full gap-2 ">
             {/* Title */}
          <h3 className="text-[13px] font-semibold text-gray-700 w-1/2">
            {title}
          </h3>
          <div className=" h-fit bg-gray-100 px-2 py-1 rounded-md flex items-center">
             <p className=" text-[8px]  text-gray-400">
              Total: {total} Orders
            </p>
          </div>
           
          </div>

         

          {/* Layout */}
          <div
            className={`grid gap-4 ${
              aging ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {/* Order Type */}
            <div>
              <p className="text-xs text-gray-500 mb-2">
                By Order Type
              </p>

              <div className="space-y-2">
                {breakdown.map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center rounded-[4px] px-2 py-1 ${getBg(
                      item.color
                    )}`}
                  >
                    <div className="flex items-center gap-2 text-[7px] text-gray-400">
                      <span
                        className={`w-1 h-1 rounded-full ${getDot(
                          item.color
                        )}`}
                      />
                      {item.label}
                    </div>

                    <span className="text-[7px] font-medium text-gray-400">
                      {item.count} orders
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aging */}
            {aging && (
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  By Aging
                </p>

                <div className="space-y-2">
                  {aging.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-gray-100 rounded-[4px] px-2 py-1"
                    >
                      <span className="text-[7px] text-gray-700">
                        {item.label}
                      </span>
                      <span className="text-[7px] font-medium text-gray-800">
                        {item.count} orders
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { StatsDetailModal } from "./stats-detail-modal";

interface BreakdownItem {
  label: string;
  count: number;
  color: "blue" | "green" | "yellow";
}

interface StatCardProps {
  title: string;
  subTitle: string;
  value: number | string;
  desc: string;
  total: number;
  breakdown?: BreakdownItem[];
  aging?: BreakdownItem[];
}

export const StatCard = ({
  title,
  subTitle,
  value,
  desc,
  total,
  breakdown,
  aging,
}: StatCardProps) => {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getBg = (color: string) => {
    if (color === "blue") return "bg-purple-150";
    if (color === "green") return "bg-green-150";
    return "bg-yellow-150";
  };

  const getDot = (color: string) => {
    if (color === "blue") return "bg-blue-500";
    if (color === "green") return "bg-green-500";
    return "bg-yellow-500";
  };

  const isExpandable =
    (breakdown && breakdown.length > 0) || (aging && aging.length > 0);

  return (
    <>
    <div
      onClick={() => {
        if (!isExpandable) return;
        setOpen((prev) => !prev);
      }}
      className="bg-white rounded-2xl border border-gray-100 p-3 w-full transition-all duration-300 cursor-pointer"
    >
      {/* DEFAULT VIEW */}
      {!open && (
        <div className="flex flex-col justify-between h-[140px]">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-gray-450">{title}</span>
            <Info 
              size={16} 
              className="text-gray-400 hover:text-blue-500 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(true);
              }}
            />
          </div>

          <h2 className="text-[32px] font-semibold text-gray-400">{value}</h2>

          <p className="text-xs text-gray-400">{desc}</p>
        </div>
      )}

      {/* EXPANDED VIEW */}
      {open && isExpandable && (
        <div className=" h-full flex flex-col justify-between gap-3">
          {/* Header */}
          <div className="flex justify-between w-full gap-2 ">
            {/* Title */}
            <h3 className="text-[13px] font-semibold text-gray-450 w-1/2">
              {title !== "New Orders for the Day"
                ? title + " " + "Breakdown"
                : title}
            </h3>
            <div className=" h-fit bg-gray-100 px-2 py-1 rounded-md flex items-center">
              <p className=" text-[8px]  text-gray-400">
                Total: {total} Orders
              </p>
            </div>
          </div>

          {/* Layout */}
          <div
            className={`grid gap-2 ${aging ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {/* Order Type */}
            <div>
              <p className="text-[10px] font-medium text-gray-300 mb-1">
                {subTitle}
              </p>

              <div className="space-y-1">
                {breakdown?.map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center rounded-[4px] px-2 py-1 ${getBg(
                      item.color,
                    )}`}
                  >
                    <div className="flex items-center gap-1 text-[7px] text-gray-350">
                      <span
                        className={`w-1 h-1 rounded-full ${getDot(item.color)}`}
                      />
                      {item.label}
                    </div>

                    <span className="text-[8px] font-medium text-gray-450">
                      {item.count} orders
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aging */}
            {aging && (
              <div>
                <p className="text-[10px] font-medium text-gray-300 mb-1">
                  By Aging
                </p>

                <div className="space-y-1">
                  {aging.map((item, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center rounded-[4px] px-2 py-1 ${getBg(
                        item.color,
                      )}`}
                    >
                      <div className="flex items-center gap-1 text-[7px] text-gray-400">
                        <span
                          className={`w-1 h-1 rounded-full ${getDot(
                            item.color,
                          )}`}
                        />
                        {item.label}
                      </div>

                      <span className="text-[8px] font-medium text-gray-300">
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
    <StatsDetailModal 
      isOpen={showDetails} 
      onClose={() => setShowDetails(false)} 
      title={title}
    />
    </>
  );
};

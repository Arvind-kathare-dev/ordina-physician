"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Info } from "lucide-react";
import { useState } from "react";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import { DropdownOption } from "@/types/dropdowm.types";

const options: DropdownOption[] = [
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

// 🎯 Exact Data (match UI)
const data = [
  { name: "MD\nVerification", value: 9200 },
  { name: "DME", value: 7600 },
  { name: "485", value: 2100 },
  { name: "Lab", value: 6900 },
  { name: "Hospice", value: 5100 },
  { name: "Home\nHealth", value: 3200 },
  { name: "Order", value: 8121 },
  { name: "Other", value: 4250 },
];

// 🎯 Exact Label Style
const CustomBarLabel = ({ x, y, width, value }: any) => (
  <text
    x={x + width / 2}
    y={y - 6}
    fill="#6b7280"
    textAnchor="middle"
    fontSize={10}
    fontWeight={500}
  >
    ${value.toLocaleString()}
  </text>
);

// 🎯 Exact Color Mapping (Not Threshold Based)
const getBarColor = (name: string) => {
  if (name === "Order") return "#1d9a7c"; // highlighted bar
  if (name === "Lab" || name === "Hospice") return "#8fc3b6";
  if (name === "DME") return "#a8c8c0";
  return "#cfe5df";
};

export const BillableBarChart = () => {
  const [value, setValue] = useState("month");

  return (
    <div className="col-span-5 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-grayCustom-600">
          Billable Orders
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 text-gray-400">
            <Info size={14} />
          </div>

          <Dropdown options={options} value={value} onChange={setValue} />
        </div>
      </div>

      {/* Subtext */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="text-sm text-grayCustom-400 font-medium">
          Over 1500 Submissions
        </span>
      </div>

      {/* Chart Wrapper */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] h-[235px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 25, right: 10, left: -10, bottom: 0 }}
              barSize={26}
            >
              <CartesianGrid vertical={false} stroke="#f3f4f6" />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />

              <YAxis hide />

              <Tooltip
                cursor={{ fill: "transparent" }}
                formatter={(v: any) => [`₹${v.toLocaleString()}`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                label={<CustomBarLabel />}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

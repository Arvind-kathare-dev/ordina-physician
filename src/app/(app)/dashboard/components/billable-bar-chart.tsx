"use client";

import {
  Bar,
  BarChart,
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
  if (name === "Order") return "#209F7F"; // highlighted bar
  if (name === "MD\nVerification" || name === "DME")
    return "rgba(32, 159, 127, 0.2)";
  if (name === "Lab") return "rgba(32, 159, 127, 0.4)";
  if (name === "485") return "rgba(32, 159, 127, 0.3)";
  if (name === "Hospice") return "rgba(32, 159, 127, 0.6)";

  return "#209F7F";
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 min-w-[80px]">
        <p className="text-gray-700 font-medium text-[14px] whitespace-pre-line mb-1">
          {label}
        </p>
        <p className="text-[#A2C7A8] font-medium text-[13px]">
          count : {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const BillableBarChart = () => {
  const [value, setValue] = useState("month");

  return (
    <div className="col-span-5 bg-white rounded-xl2   p-4 shadow-card-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[20px] font-semibold text-gray-400">
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
        <div className="w-3 h-3 rounded-full bg-gray-550" />
        <span className="text-[15px] text-gray-300 font-medium">
          Over 1500 Submissions
        </span>
      </div>

      {/* Chart Wrapper */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[490px] h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              barSize={37}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />

              <YAxis hide />

              <Tooltip
                cursor={{ fill: "#e5e7eb" }}
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="value"
                radius={[2, 2, 0, 0]}
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

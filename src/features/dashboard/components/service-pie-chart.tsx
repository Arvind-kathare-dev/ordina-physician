"use client";

import { Cell, Pie, PieChart } from "recharts";
import { useState } from "react";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import { DropdownOption } from "@/types/dropdowm.types";

const options: DropdownOption[] = [
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

// 🎨 Exact soft purple palette (from your image)
const COLORS = [
  "#8D73AD", // MD (dark)
  "#A994C6", // Hospice
  "#CBBCDF", // Home Health
  "#E5DEEF", // Imaging (lightest)
];

// 📊 Exact data
const serviceTypeData = [
  { name: "MD", value: 40 },
  { name: "Hospice", value: 25 },
  { name: "Home Health", value: 15 },
  { name: "Imaging", value: 20 },
];

// 🧠 label inside slice (centered like image)
const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export const ServicePieChart = () => {
  const [value, setValue] = useState("month");

  return (
    <div className="w-full bg-white shadow-card-shadow rounded-xl  p-4">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <span className="font-semibold text-base text-grayCustom-600">
          Service Type
        </span>

        <Dropdown options={options} value={value} onChange={setValue} />
      </div>

      {/* Chart + Legend */}
      <div className="flex items-center gap-4">
        {/* Pie */}
        <div className="shrink-0">
          <PieChart width={154} height={154} style={{ pointerEvents: "none" }}>
            <Pie
              data={serviceTypeData}
              cx={77}
              cy={77}
              outerRadius={67}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
              label={renderLabel}
              labelLine={false}
            >
              {serviceTypeData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {serviceTypeData.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[i] }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

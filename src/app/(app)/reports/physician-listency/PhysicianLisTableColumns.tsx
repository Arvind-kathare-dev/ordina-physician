"use client";

import { DataTableColumn } from "@/components/common/DataTable";
import { PhysicianListencyRow, PhysicianListencyStatusLabel } from "@/data/physicianListencyStaticData";
import { useMemo } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";


function latencyStatusSquareClass(label: PhysicianListencyStatusLabel) {
  switch (label) {
    case "Fastest":
      return "bg-[#22c55e]";
    case "Fast":
      return "bg-cyan-400";
    case "Moderate":
      return "bg-orange-400";
    case "Slow":
      return "bg-purple-500";
    case "Slowest":
      return "bg-red-500";
    default:
      return "bg-slate-400";
  }
}

const sortHeaderTrailing = (
  <span
    className="inline-flex flex-col items-center justify-center leading-none opacity-95"
    aria-hidden
  >
    <HiChevronUp className="-mb-0.5 h-2.5 w-2.5" />
    <HiChevronDown className="h-2.5 w-2.5" />
  </span>
);

export function usePhysicianListencyTableColumns(): DataTableColumn<PhysicianListencyRow>[] {
  return useMemo(
    () => [
      {
        key: "physicianId",
        header: "Physician ID",
        className: "min-w-0",
        cell: (row) => (
          <span className="whitespace-nowrap font-medium text-[#1f2937]">
            {row.physicianId}
          </span>
        ),
      },
      {
        key: "physicianName",
        header: "Physician Name",
        className: "min-w-0",
        cell: (row) => (
          <span className="whitespace-nowrap text-[#374151]">
            {row.physicianName}
          </span>
        ),
      },
      {
        key: "ordersAssigned",
        header: "Orders Assigned",
        className: "min-w-0",
        cell: (row) => (
          <span className="whitespace-nowrap tabular-nums text-[#374151]">
            {row.ordersAssigned}
          </span>
        ),
      },
      {
        key: "avgSigning",
        header: "Avg. Signing Time",
        className: "min-w-0",
        cell: (row) => (
          <span className="whitespace-nowrap tabular-nums text-[#374151]">
            {row.avgSigningDisplay}
          </span>
        ),
      },
      {
        key: "specialty",
        header: "Specialty",
        className: "min-w-0",
        cell: (row) => (
          <span className="min-w-0 truncate text-[#4b5563] sm:whitespace-normal">
            {row.specialty}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        suppressHeaderChevron: true,
        headerTrailing: sortHeaderTrailing,
        className: "min-w-0",
        cell: (row) => (
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-slate-700 sm:text-sm">
            <span
              className={`inline-block size-2.5 shrink-0 rounded-[2px] ${latencyStatusSquareClass(row.statusLabel)}`}
              aria-hidden
            />
            {row.statusLabel}
          </span>
        ),
      },
    ],
    []
  );
}

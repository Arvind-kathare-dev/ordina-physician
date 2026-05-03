"use client";

import { useMemo } from "react";
import { DataTableColumn } from "@/components/common/DataTable";

export type BillableOrderRow = {
  id: string;
  date: string;
  type: {
    text: string;
    bgColor: string;
    color: string;
  };
  patientName: string;
  agencyName: string;
  insurance: string;
  location: string;
  days: {
    text: string;
    dot: "green" | "orange" | "red";
  };
  amount: number;
};

export function useBillableOrdersTableColumns(
  selectedIds: string[],
  onToggle: (id: string) => void,
  onToggleAll: () => void,
  allSelected: boolean
): DataTableColumn<BillableOrderRow>[] {
  return useMemo(() => {
    return [
      {
        key: "selection",
        header: (
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            className="h-4 w-4 rounded border-slate-300 text-[#528DB5] focus:ring-[#528DB5]"
          />
        ),
        gridWidth: "minmax(3rem, 0.2fr)",
        cell: (row) => (
          <input
            type="checkbox"
            checked={selectedIds.includes(row.id)}
            onChange={() => onToggle(row.id)}
            className="h-4 w-4 rounded border-slate-300 text-[#528DB5] focus:ring-[#528DB5]"
          />
        ),
      },
      {
        key: "date",
        header: "Date",
        gridWidth: "minmax(7rem, 0.6fr)",
        cell: (row) => <span className="text-xs text-[#606060]">{row.date}</span>,
      },
      {
        key: "type",
        header: "Type",
        gridWidth: "minmax(8rem, 0.7fr)",
        cell: (row) => (
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${row.type.bgColor} ${row.type.color}`}
          >
            {row.type.text}
          </span>
        ),
      },
      {
        key: "patientName",
        header: "Patient Name",
        gridWidth: "minmax(10rem, 1fr)",
        cell: (row) => (
          <span className="text-xs font-medium text-[#606060]">{row.patientName}</span>
        ),
      },
      {
        key: "agencyName",
        header: "Agency Name",
        gridWidth: "minmax(10rem, 1fr)",
        cell: (row) => (
          <span className="text-xs font-medium text-[#606060]">{row.agencyName}</span>
        ),
      },
      {
        key: "insurance",
        header: "Insurance",
        gridWidth: "minmax(10rem, 1fr)",
        cell: (row) => (
          <span className="text-xs font-medium text-[#606060]">{row.insurance}</span>
        ),
      },
      {
        key: "location",
        header: "Location",
        gridWidth: "minmax(8rem, 0.8fr)",
        cell: (row) => (
          <span className="text-xs font-medium text-[#606060]">{row.location}</span>
        ),
      },
      {
        key: "days",
        header: "#Days",
        gridWidth: "minmax(6rem, 0.5fr)",
        cell: (row) => (
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${row.days.dot === "green"
                ? "bg-green-500"
                : row.days.dot === "orange"
                  ? "bg-orange-500"
                  : "bg-red-500"
                }`}
            />
            <span className="text-xs font-medium text-[#606060]">{row.days.text}</span>
          </div>
        ),
      },
      {
        key: "amount",
        header: "Amount",
        gridWidth: "minmax(6rem, 0.5fr)",
        cell: (row) => (
          <span className="text-xs font-medium text-[#606060]">${row.amount}</span>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        gridWidth: "minmax(5rem, 0.4fr)",
        cell: () => (
          <button className="text-xs font-semibold text-[#528DB5] hover:underline">
            Open
          </button>
        ),
      },
    ];
  }, [selectedIds, onToggle, onToggleAll, allSelected]);
}

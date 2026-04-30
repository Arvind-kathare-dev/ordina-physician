
import { Column } from "@/types/table";
import { Fax } from "../types";
import FaxActionsCell from "./FaxActionsCell";
import { ChevronDown } from "lucide-react";

/* ---------------------------------- */
/* Status Config                      */
/* ---------------------------------- */

const STATUS_COLOR: Record<string, string> = {
  Delivered: "bg-green-600 text-green-600",
  Pending: "bg-yellow-600 text-yellow-500",
  Failed: "bg-red-600 text-red-500",
};

const LABEL_STYLES: Record<string, string> = {
  Delivered: "bg-green-200 text-green-400",
  Pending: "bg-yellow-200 text-yellow-400",
  Failed: "bg-red-200 text-red-400",
};

/* ---------------------------------- */
/* Column Factory                     */
/* ---------------------------------- */

export const getFaxColumns = (activeTab: number): Column<Fax>[] => {
  const faxColumn: Column<Fax> = {
    key: "fax",
    header: <div className="flex items-center gap-1 cursor-pointer">Fax No. <ChevronDown size={14} /></div> as any,
    gridWidth: "100px",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.faxNo ?? "-"}
      </span>
    ),
  };

  const fromColumn: Column<Fax> = {
    key: "from",
    header: <div className="flex items-center gap-1 cursor-pointer">From <ChevronDown size={14} /></div> as any,
    gridWidth: "minmax(100px, 1fr)",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.from ?? "-"}
      </span>
    ),
  };

  const toColumn: Column<Fax> = {
    key: "to",
    header: <div className="flex items-center gap-1 cursor-pointer">To <ChevronDown size={14} /></div> as any,
    gridWidth: "minmax(100px, 1fr)",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.to ?? "-"}
      </span>
    ),
  };

  const subjectColumn: Column<Fax> = {
    key: "subject",
    header: <div className="flex items-center gap-1 cursor-pointer">Subject <ChevronDown size={14} /></div> as any,
    gridWidth: "minmax(100px, 1fr)",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.subject ?? "-"}
      </span>
    ),
  };

  const statusColumn: Column<Fax> = {
    key: "status",
    header: "Status",
    gridWidth: "90px",
    render: (row) => (
      <span className="flex items-center gap-2 text-sm">
        <span
          className={`
            inline-block w-2 h-2 rounded-full
            ${STATUS_COLOR[row.status] ?? "bg-gray-400"}
            shadow-[0_0_5px_1px_currentColor]
          `}
        />
        <span className="text-sm font-normal text-gray-400">
          {row.status}
        </span>
      </span>
    ),
  };

  const labelColumn: Column<Fax> = {
    key: "label",
    header: <div className="flex items-center gap-1 cursor-pointer">Label <ChevronDown size={14} /></div> as any,
    gridWidth: "80px",
    render: (row) => (
      <span
        className={`
          px-2 py-1 rounded text-sm
          ${LABEL_STYLES[row.status] ?? "bg-gray-200 text-gray-500"}
        `}
      >
        {row.label ?? "-"}
      </span>
    ),
  };

  const timeColumn: Column<Fax> = {
    key: "time",
    header: <div className="flex items-center gap-1 cursor-pointer">Time <ChevronDown size={14} /></div> as any,
    gridWidth: "110px",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.time ?? "-"}
      </span>
    ),
  };

  const actionsColumn: Column<Fax> = {
    key: "actions",
    header: <div className="flex items-center gap-1 cursor-pointer">Actions <ChevronDown size={14} /></div> as any,
    gridWidth: "150px",
    render: (row) => <FaxActionsCell row={row} />,
  };

  /* ---------- Final Columns ---------- */

  return [
    faxColumn,
    fromColumn,
    toColumn,
    subjectColumn,
    statusColumn,
    labelColumn,
    timeColumn,
    actionsColumn,
  ];
};
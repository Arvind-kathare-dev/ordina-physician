// features/fax/components/getFaxColumns.tsx

import { Column } from "@/types/table";
import { Fax } from "../types";
import FaxActionsCell from "./FaxActionsCell";

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

export const getFaxColumns = (activeTab:number): Column<Fax>[] => {
  const faxColumn: Column<Fax> = {
    key: "fax",
    header: "Fax No.",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.faxNo ?? "-"}
      </span>
    ),
  };

  const fromColumn: Column<Fax> = {
    key: "from",
    header: "From",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.from ?? "-"}
      </span>
    ),
  };

  const toColumn: Column<Fax> = {
    key: "to",
    header: "To",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.to ?? "-"}
      </span>
    ),
  };

  const subjectColumn: Column<Fax> = {
    key: "subject",
    header: "Subject",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.subject ?? "-"}
      </span>
    ),
  };

  const statusColumn: Column<Fax> = {
    key: "status",
    header: "Status",
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
    header: "Label",
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
    header: "Time",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.time ?? "-"}
      </span>
    ),
  };

  const actionsColumn: Column<Fax> = {
    key: "actions",
    header: "Actions",
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

import { Mail } from "lucide-react";
import { Order } from "../orders.types";
import { Column } from "@/types/table";
import OrderActionsCell from "./OrderActionsCell";
import { getDayColor } from "@/utils/getDayColor";
import { parseDays } from "@/utils/dayParser";



/* ---------------------------------- */
/* Constants                          */
/* ---------------------------------- */

const TAG_STYLES: Record<string, string> = {
  Modified: "bg-yellow-200 text-yellow-500",
  Default: "bg-ordina-200 text-ordina-500",
};

const SERVICE_TYPE_STYLES: Record<string, string> = {
  Hospice: "bg-yellow-200 text-yellow-500",
  Default: "bg-green-200 text-green-500",
};

/* ---------------------------------- */
/* Column Factory                     */
/* ---------------------------------- */

export const getOrderColumns = (activeTab: number): Column<Order>[] => {
  /* ---------- Shared Columns ---------- */

  const patientColumn: Column<Order> = {
    key: "patientName",
    header: "Patient Name",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.patientName ?? "-"}
      </span>
    ),
  };

  const orderTypeColumn: Column<Order> = {
    key: "orderType",
    header: "Order Type",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.orderType ?? "-"}
      </span>
    ),
  };

  const serviceTypeColumn: Column<Order> = {
    key: "serviceType",
    header: "Service Type",
    render: (row) => (
      <span
        className={`text-sm px-2 py-1 rounded ${SERVICE_TYPE_STYLES[row.serviceType] ??
          SERVICE_TYPE_STYLES.Default
          }`}
      >
        {row.serviceType ?? "-"}
      </span>
    ),
  };

  const agencyColumn: Column<Order> = {
    key: "agency",
    header: "Agency",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.agency ?? "-"}
      </span>
    ),
  };

  const receivedColumn: Column<Order> = {
    key: "receivedVia",
    header: "Received",
    render: (row) => (
      <span className="flex items-center gap-1 text-sm text-grayCustom-600">
        <Mail size={14} />
        {row.receivedVia ?? "-"}
      </span>
    ),
  };

  const timeColumn: Column<Order> = {
    key: "orderReceived",
    header: "Time",
    render: (row) => (
      <span className="text-sm text-grayCustom-600">
        {row.orderReceived ?? "-"}
      </span>
    ),
  };

  const actionsColumn: Column<Order> = {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <OrderActionsCell row={row} activeTab={activeTab} />
    ),
  };

  /* ---------- Conditional Columns ---------- */

  const dateColumn: Column<Order> = {
    key: "date",
    header: "Date",
    render: (row) => (
      <div className="text-sm text-gray-400">
        {row.date ?? "-"}
        {/* Tags */}
        {row.tags && row.tags.length > 0 && (
          <div className="flex gap-1 absolute bottom-0 left-0">
            {row.tags.map((tag) => (
              <span
                key={tag}
                className={` ${tag == "Modified" ? "bg-yellow-200 text-yellow-400" : "bg-ordina-200 text-ordina-400"} text-[8px] font-normal px-2   rounded-tr-lg rounded-bl-lg`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    ),
  };

  const dayColumn: Column<Order> = {
    key: "day",
    header: "#Days",
    render: (row) => {
      const days = parseDays(row.day);

      return (
        <p className="flex items-center gap-2 text-sm font-normal text-gray-400">
          <span className={`text-lg font-semibold ${getDayColor(days)}`}>
            ●
          </span>
          {row.day ?? "-"}
        </p>

      );
    },
  };

  const labelColumn: Column<Order> = {
    key: "labels",
    header: "Label",
    render: (row) => (
      <div className="flex gap-2 flex-wrap">
        {row.labels?.map((l, index) => (
          <span
            key={`${l.text}-${index}`}
            className={`${l.color} text-white text-[11px] font-normal flex items-center justify-center px-1 py-1.5   flag-shape`}
          >
            {l.text}
          </span>
        ))}
      </div>
    ),
  };

  /* ---------- Switch by Tab ---------- */

  switch (activeTab) {
    case 0: // Today
      return [
        dateColumn,
        patientColumn,
        orderTypeColumn,
        serviceTypeColumn,
        agencyColumn,
        labelColumn,
        receivedColumn,
        timeColumn,
        actionsColumn,
      ];

    case 1: // Unopened
      return [
        dateColumn,
        patientColumn,
        orderTypeColumn,
        serviceTypeColumn,
        agencyColumn,
        labelColumn,
        dayColumn,
        timeColumn,
        actionsColumn,
      ];

    case 2: // Unsigned
      return [
        dateColumn,
        patientColumn,
        orderTypeColumn,
        serviceTypeColumn,
        agencyColumn,
        labelColumn,
        dayColumn,
        timeColumn,
        actionsColumn,
      ];
    case 3: // Undelivered
      return [
        dateColumn,
        patientColumn,
        orderTypeColumn,
        serviceTypeColumn,
        agencyColumn,
        labelColumn,
        dayColumn,
        timeColumn,
        actionsColumn,
      ];
    case 4: // Rejected
      return [
        dateColumn,
        patientColumn,
        orderTypeColumn,
        serviceTypeColumn,
        agencyColumn,
        labelColumn,
        timeColumn,
        actionsColumn,
      ];

    case 6: // Rejected
      return [
        dateColumn,
        orderTypeColumn,
        serviceTypeColumn,
        agencyColumn,
        labelColumn,
        timeColumn,
        actionsColumn,
      ];

    default:
      return [
        dateColumn,
        patientColumn,
        orderTypeColumn,
        serviceTypeColumn,
        agencyColumn,
        labelColumn,
        timeColumn,
        actionsColumn,
      ];
  }
};
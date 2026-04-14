
import { Column } from "@/types/table";
import { Pencil, Bell, Info, Copy, Tag, Mail } from "lucide-react";
import { Order } from "../orders.types.";

export const orderColumns: Column<Order>[] = [
  {
    key: "date",
    header: "Date",
    render: (row) => (
      <div className="text-xs text-gray-500">
        {row.date}

        {row.tags.length > 0 && (
          <div className="flex gap-1 absolute bottom-0 left-0">
            {row.tags.map((tag) => (
              <span
                key={tag}
                className={` ${tag == "Modified" ? "bg-yellow-200 text-yellow-400" : "bg-ordina-200 text-ordina-400"} text-[8px] font-normal px-2 py-0.5  rounded-tr-lg rounded-bl-lg`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    ),
  },

  {
    key: "patientName",
    header: "Patient Name",
    render: (row) => (
      <span className="text-sm font-normal text-grayCustom-600">
        {row.patientName}
      </span>
    ),
  },

  {
    key: "orderType",
    header: "Order Type",
    render: (row) => (
      <span className="text-sm font-normal text-grayCustom-600 ">
        {row.orderType}
      </span>
    ),
  },

  {
    key: "serviceType",
    header: "Service Type",
    render: (row) => (
      <span
        className={`text-sm font-normal px-2 py-1 rounded-[5px] ${
          row.serviceType === "Hospice"
            ? "bg-yellow-200 text-yellow-400"
            : "bg-green-200 text-green-400"
        }`}
      >
        {row.serviceType}
      </span>
    ),
  },

  {
    key: "agency",
    header: "Agency",
    render: (row) => (
      <span className="text-sm font-normal text-grayCustom-600">
        {row.agency}
      </span>
    ),
  },

  {
    key: "labels",
    header: "Label",
    render: (row) => (
      <div className="flex gap-1 flex-wrap">
        {row.labels.map((l) => (
          <span
            key={l.text}
            className={`${l.color} text-white text-[10px] px-2 py-1 rounded`}
          >
            {l.text}
          </span>
        ))}
      </div>
    ),
  },

  {
    key: "receivedVia",
    header: "Received",
    render: (row) => (
      <span className="flex items-center gap-1 text-sm font-normal text-grayCustom-600">
        <Mail size={14} className="text-ordinadark" />
        {row.receivedVia}
      </span>
    ),
  },

  {
    key: "orderReceived",
    header: "Time",
    render: (row) => (
      <span className="text-sm font-normal text-grayCustom-600">
        {row.orderReceived}
      </span>
    ),
  },

  {
    key: "actions",
    header: "Actions",
    render: () => (
      <div className="flex items-center gap-2 text-ordinadark">
        <button className="text-sm font-normal underline cursor-pointer">
          Open
        </button>
        <Pencil size={14} className="cursor-pointer" />
        <Bell size={14} className="cursor-pointer" />
        <Info size={14} className="cursor-pointer" />
        <Copy size={14} className="cursor-pointer" />
        <Tag size={14} className="cursor-pointer" />
      </div>
    ),
  },
];

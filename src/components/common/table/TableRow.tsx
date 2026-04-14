
import { Order } from "@/types/table";
import { Badge } from "./Badge";
import { LabelTag } from "./LabelTag";
import { Pencil, Bell, Info, Copy } from "lucide-react";

export default function TableRow({ order }: { order: Order }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 gap-3 md:gap-0 items-center bg-white rounded-xl shadow-sm border p-4 md:p-3">

      {/* DATE */}
      <div className="text-xs text-gray-500">{order.date}</div>

      {/* NAME */}
      <div className="font-medium">{order.patientName}</div>

      {/* TYPE */}
      <div className="text-sm text-gray-600">{order.orderType}</div>

      {/* SERVICE */}
      <div>
        <Badge type={order.serviceType} />
      </div>

      {/* AGENCY */}
      <div className="text-sm text-gray-500">{order.agency}</div>

      {/* LABELS */}
      <div className="flex gap-1 flex-wrap">
        {order.labels.map((l) => (
          <LabelTag key={l.text} label={l} />
        ))}
      </div>

      {/* RECEIVED VIA */}
      <div className="text-sm text-gray-500">
        {order.receivedVia}
      </div>

      {/* TIME */}
      <div className="text-sm text-gray-500">
        {order.orderReceived}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2 text-ordinadark text-sm">
        <button>Open</button>
        <Pencil size={14} />
        <Bell size={14} />
        <Info size={14} />
        <Copy size={14} />
      </div>
    </div>
  );
}
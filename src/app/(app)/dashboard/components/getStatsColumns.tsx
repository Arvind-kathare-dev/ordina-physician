import { Column, Order } from "@/types/table";
import { ChevronDown, User } from "lucide-react";

/* ---------------------------------- */
/* Constants                          */
/* ---------------------------------- */

const labelColors: Record<string, string> = {
  LD: "bg-red-500 text-white",
  UR: "bg-cyan-500 text-white",
  PS: "bg-green-500 text-white",
  CR: "bg-orange-600 text-white",
  DME: "bg-orange-500 text-white",
};

/* ---------------------------------- */
/* Column Factory                     */
/* ---------------------------------- */

export const getStatsColumns = (): Column<any>[] => {
  const dateColumn: Column<any> = {
    key: "date",
    header: <div className="flex items-center gap-1 cursor-pointer">Date <ChevronDown size={14} /></div> as any,
    render: (row: any) => (
      <div className="text-sm text-gray-400">
        {row.date ?? "-"}
        {/* Tags */}
        {row.tags && row.tags.length > 0 && (
          <div className="flex gap-1 absolute bottom-0 left-0">
            {row.tags.map((tag: any) => (
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

  const patientColumn: Column<any> = {
    key: "patientName",
    header: <div className="flex items-center gap-1 cursor-pointer">Patient Name <ChevronDown size={14} /></div> as any,
    render: (row: any) => <div className="text-sm text-gray-400">{row.patientName}</div>,
  };

  const orderTypeColumn: Column<any> = {
    key: "orderType",
    header: <div className="flex items-center gap-1 cursor-pointer">Order Type <ChevronDown size={14} /></div> as any,
    render: (row: any) => <div className="text-sm text-gray-400">{row.orderType}</div>,
  };

  const serviceTypeColumn: Column<any> = {
    key: "serviceType",
    header: <div className="flex items-center gap-1 cursor-pointer">Service Type <ChevronDown size={14} /></div> as any,
    render: (row: any) => (
      <div>
        <span className={`px-3 py-1 rounded-md text-xs font-medium border ${row.serviceType.color}`}>
          {row.serviceType.label}
        </span>
      </div>
    ),
  };

  const physicianColumn: Column<any> = {
    key: "physicianName",
    header: <div className="flex items-center gap-1 cursor-pointer">Physician Name <ChevronDown size={14} /></div> as any,
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <User size={14} className="text-gray-400" />
        <span className="text-sm text-gray-400">{row.physicianName}</span>
      </div>
    ),
  };

  const labelColumn: Column<any> = {
    key: "labels",
    header: <div className="flex items-center gap-1 cursor-pointer">Label <ChevronDown size={14} /></div> as any,
    render: (row: any) => (
      <div className="flex gap-1 flex-wrap">
        {row.labels.map((label: string) => (
          <span
            key={label}
            className={`text-white text-[11px] font-normal flex items-center justify-center px-1 py-1.5   flag-shape ${labelColors[label] || "bg-gray-200"}`}
          >
            {label}
          </span>
        ))}
      </div>
    ),
  };

  const pendingDaysColumn: Column<any> = {
    key: "pendingDays",
    header: <div className="flex items-center gap-1 cursor-pointer">Pending Days <ChevronDown size={14} /></div> as any,
    render: (row: any) => (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${row.pendingDays.status === 'success' ? 'bg-green-500' : 'bg-orange-400'}`} />
        <span className="text-sm text-gray-400">{row.pendingDays.text}</span>
      </div>
    ),
  };

  return [
    dateColumn,
    patientColumn,
    orderTypeColumn,
    serviceTypeColumn,
    physicianColumn,
    labelColumn,
    pendingDaysColumn,
  ];
};

"use client";

import { ArrowLeft, ChevronDown, User, MoreVertical } from "lucide-react";
import Modal from "@/components/ui/modal/Modal";

interface StatsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const mockData = [
  {
    date: "11/20/2025",
    tag: "Outbound",
    patientName: "John Doe",
    orderType: "Medication Orders",
    serviceType: { label: "Hospice", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
    physicianName: "Dr. Emily Carter",
    labels: ["LD"],
    pendingDays: { text: "Today", status: "success" },
  },
  {
    date: "11/01/2025",
    tag: "",
    patientName: "Oliver Bennett",
    orderType: "Therapy Orders",
    serviceType: { label: "Pharmacy", color: "bg-blue-100 text-blue-600 border-blue-200" },
    physicianName: "Dr. Sophia Martinez",
    labels: ["UR", "PS", "CR"],
    pendingDays: { text: "2 Days", status: "warning" },
  },
  {
    date: "10/15/2025",
    tag: "Outbound",
    patientName: "Amelia Carter",
    orderType: "Skilled Nursing Orders",
    serviceType: { label: "Pharmacy", color: "bg-blue-100 text-blue-600 border-blue-200" },
    physicianName: "Dr. James Miller",
    labels: ["PS"],
    pendingDays: { text: "3 Days", status: "warning" },
  },
  {
    date: "09/27/2025",
    tag: "",
    patientName: "Taylor Sutton",
    orderType: "Equipment and Supplies Orders",
    serviceType: { label: "DME", color: "bg-purple-100 text-purple-600 border-purple-200" },
    physicianName: "Dr. Emily Carter",
    labels: ["DME"],
    pendingDays: { text: "Today", status: "success" },
  },
  {
    date: "09/27/2025",
    tag: "",
    patientName: "Taylor Sutton",
    orderType: "Skilled Nursing Orders",
    serviceType: { label: "Home Health", color: "bg-green-100 text-green-600 border-green-200" },
    physicianName: "Dr. Olivia Johnson",
    labels: ["UR", "PS", "CR"],
    pendingDays: { text: "3 Days", status: "warning" },
  },
  {
    date: "09/27/2025",
    tag: "",
    patientName: "Taylor Sutton",
    orderType: "Therapy Orders",
    serviceType: { label: "DME", color: "bg-purple-100 text-purple-600 border-purple-200" },
    physicianName: "Dr. Sophia Martinez",
    labels: ["PS"],
    pendingDays: { text: "15 Days", status: "warning" },
  },
];

const labelColors: Record<string, string> = {
  LD: "bg-red-500 text-white",
  UR: "bg-cyan-500 text-white",
  PS: "bg-green-500 text-white",
  CR: "bg-orange-600 text-white",
  DME: "bg-orange-500 text-white",
};

export const StatsDetailModal = ({ isOpen, onClose, title }: StatsDetailModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      className="max-w-6xl !p-0 overflow-hidden"
      hideHeader={true}
      contentClassName="p-0"
    >
      <div className="flex flex-col h-full bg-[#F8FAFC]">
        {/* Custom Header */}
        <div className="flex items-center gap-4 px-6 py-4 bg-white">
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{title} details</h2>
        </div>

        {/* Table Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.5fr_1fr_1fr] gap-4 px-6 py-3 bg-[#5B99C2] rounded-t-xl text-white text-sm font-medium mb-4 sticky top-0 z-10">
            <div className="flex items-center gap-1 cursor-pointer">Date <ChevronDown size={14} /></div>
            <div className="flex items-center gap-1 cursor-pointer">Patient Name <ChevronDown size={14} /></div>
            <div className="flex items-center gap-1 cursor-pointer">Order Type <ChevronDown size={14} /></div>
            <div className="flex items-center gap-1 cursor-pointer">Service Type <ChevronDown size={14} /></div>
            <div className="flex items-center gap-1 cursor-pointer">Physician Name <ChevronDown size={14} /></div>
            <div className="flex items-center gap-1 cursor-pointer">Label <ChevronDown size={14} /></div>
            <div className="flex items-center gap-1 cursor-pointer">Pending Days <ChevronDown size={14} /></div>
          </div>

          {/* Table Body */}
          <div className="space-y-3">
            {mockData.map((row, index) => (
              <div 
                key={index} 
                className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.5fr_1fr_1fr] gap-4 px-6 py-4 bg-white rounded-xl border border-gray-100 shadow-sm items-center text-sm text-gray-600"
              >
                <div>
                  <div className="font-medium text-gray-800">{row.date}</div>
                  {row.tag && (
                    <span className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                      {row.tag}
                    </span>
                  )}
                </div>
                
                <div className="font-medium text-gray-800">{row.patientName}</div>
                
                <div>{row.orderType}</div>
                
                <div>
                  <span className={`px-3 py-1 rounded-md text-xs font-medium border ${row.serviceType.color}`}>
                    {row.serviceType.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-400" />
                  <span className="text-gray-700">{row.physicianName}</span>
                </div>
                
                <div className="flex gap-1 flex-wrap">
                  {row.labels.map((label) => (
                    <span 
                      key={label}
                      className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded ${labelColors[label] || "bg-gray-200"}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${row.pendingDays.status === 'success' ? 'bg-green-500' : 'bg-orange-400'}`} />
                  <span className="font-medium text-gray-800">{row.pendingDays.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

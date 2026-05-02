"use client";

import { ArrowLeft } from "lucide-react";
import Modal from "@/components/ui/modal/Modal";
import Table from "@/components/common/table/Table";
import { getStatsColumns } from "./getStatsColumns";
import { orders } from "../../orders/orders.data";

interface StatsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const mockData = [
  {
    date: "11/20/2025",
    tags: ["Outbound"],
    patientName: "John Doe",
    orderType: "Medication Orders",
    serviceType: { label: "Hospice", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
    physicianName: "Dr. Emily Carter",
    labels: ["LD"],
    pendingDays: { text: "Today", status: "success" },
  },
  {
    date: "11/01/2025",
    tags: [],
    patientName: "Oliver Bennett",
    orderType: "Therapy Orders",
    serviceType: { label: "Pharmacy", color: "bg-blue-100 text-blue-600 border-blue-200" },
    physicianName: "Dr. Sophia Martinez",
    labels: ["UR", "PS", "CR"],
    pendingDays: { text: "2 Days", status: "warning" },
  },
  {
    date: "10/15/2025",
    tags: ["Outbound"],
    patientName: "Amelia Carter",
    orderType: "Skilled Nursing Orders",
    serviceType: { label: "Pharmacy", color: "bg-blue-100 text-blue-600 border-blue-200" },
    physicianName: "Dr. James Miller",
    labels: ["PS"],
    pendingDays: { text: "3 Days", status: "warning" },
  },
  {
    date: "09/27/2025",
    tags: [],
    patientName: "Taylor Sutton",
    orderType: "Equipment and Supplies Orders",
    serviceType: { label: "DME", color: "bg-purple-100 text-purple-600 border-purple-200" },
    physicianName: "Dr. Emily Carter",
    labels: ["DME"],
    pendingDays: { text: "Today", status: "success" },
  },
  {
    date: "09/27/2025",
    tags: [],
    patientName: "Taylor Sutton",
    orderType: "Skilled Nursing Orders",
    serviceType: { label: "Home Health", color: "bg-green-100 text-green-600 border-green-200" },
    physicianName: "Dr. Olivia Johnson",
    labels: ["UR", "PS", "CR"],
    pendingDays: { text: "3 Days", status: "warning" },
  },
  {
    date: "09/27/2025",
    tags: [],
    patientName: "Taylor Sutton",
    orderType: "Therapy Orders",
    serviceType: { label: "DME", color: "bg-purple-100 text-purple-600 border-purple-200" },
    physicianName: "Dr. Sophia Martinez",
    labels: ["PS"],
    pendingDays: { text: "15 Days", status: "warning" },
  },
];



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
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-white border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
            {title} details
          </h2>
        </div>

        {/* Table Content */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
          <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="min-w-[1000px] xl:min-w-full">
              <Table 
                data={mockData} 
                columns={getStatsColumns()} 
                colNum={getStatsColumns().length} 
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

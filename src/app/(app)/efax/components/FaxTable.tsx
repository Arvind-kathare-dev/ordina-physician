import { Trash, Tag, Mail, Archive } from "lucide-react";
import { Fax } from "../types";
import Table from "@/components/common/table/Table";

const statusColor = {
  Delivered: "text-green-600",
  Pending: "text-yellow-500",
  Failed: "text-red-500",
};

export default function FaxTable({ data }: { data: Fax[] }) {
  const columns = [
    {
      key: "fax",
      header: "Fax No.",
      render: (row: Fax) => (
        <span className="text-sm font-normal text-grayCustom-600">
          {row.faxNo}
        </span>
      ),
    },
    {
      key: "from",
      header: "From",
      render: (row: Fax) => (
        <span className="text-sm font-normal text-grayCustom-600">
          {row.from}
        </span>
      ),
    },
    {
      key: "to",
      header: "To",
      render: (row: Fax) => (
        <span className="text-sm font-normal text-grayCustom-600">
          {row.to}
        </span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row: Fax) => (
        <span className="text-sm font-normal text-grayCustom-600">
          {row.subject}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Fax) => (
        <span className={`text-sm font-normal ${statusColor[row.status]}`}>
          ● {row.status}
        </span>
      ),
    },
    {
      key: "label",
      header: "Label",
      render: (row: Fax) => (
        <span
          className={` ${row.status == "Pending" ? "bg-yellow-200 text-yellow-400" : row.status == "Delivered" ? "bg-green-200 text-green-400" : "bg-red-200 text-red-400"} px-2 py-1 rounded text-sm font-normal`}
        >
          {row.label}
        </span>
      ),
    },
    {
      key: "time",
      header: "Time",
      render: (row: Fax) => (
        <span className="text-sm font-normal text-grayCustom-600">
          {row.time}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2 text-ordinadark">
          <button className="text-sm font-normal cursor-pointer">Open</button>
          <Mail size={14} className="cursor-pointer" />
          <Archive size={14} className="cursor-pointer" />
          <Trash size={14} className="cursor-pointer" />
          <Tag size={14} className="cursor-pointer" />
        </div>
      ),
    },
  ];

  return <Table data={data} columns={columns} />;
}

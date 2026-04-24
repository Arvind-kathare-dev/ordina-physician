"use client";

import { useState, useMemo, useId, Fragment } from "react";
import { HiChevronLeft, HiChevronRight, HiOutlinePlus, HiOutlineTrash, HiOutlineSearch, HiX } from "react-icons/hi";
import { useBillableOrdersTableColumns, BillableOrderRow } from "./BillableOrdersTableColumns";
import DataTable from "@/components/common/DataTable";
import ReportArchiveDialogs from "@/components/common/ReportArchiveDialogs";
import Dialog from "@/components/common/Dialog";

const SUMMARY_CARDS = [
  {
    id: "total",
    label: "TOTAL",
    subLabel: "Billable",
    value: "$1093",
    count: "21 orders",
    avg: "$58/ order",
    color: "text-[#528DB5]",
    bgColor: "bg-[#E8F4FC]",
  },
  {
    id: "485",
    label: "485",
    subLabel: "Billable",
    value: "$425",
    count: "7 orders",
    avg: "$123/ order",
    color: "text-[#E67E22]",
    bgColor: "bg-[#FDEDEC]",
  },
  {
    id: "lab",
    label: "LAB",
    subLabel: "Billable",
    value: "$368",
    count: "9 orders",
    avg: "$67/ order",
    color: "text-[#2E7AAF]",
    bgColor: "bg-[#E8F4FC]",
  },
  {
    id: "other",
    label: "OTHER",
    subLabel: "Billable",
    value: "$300",
    count: "5 orders",
    avg: "$60/ order",
    color: "text-[#686464]",
    bgColor: "bg-[#F3F4F6]",
  },
];

const MOCK_ROWS: BillableOrderRow[] = [
  {
    id: "1",
    date: "11/20/2025",
    type: { text: "Order", bgColor: "bg-emerald-100", color: "text-emerald-600" },
    patientName: "John Doe",
    agencyName: "ABC Pvt-Ltd",
    insurance: "MediSure Health",
    location: "San Jose",
    days: { text: "Today", dot: "green" },
    amount: 68,
  },
  {
    id: "2",
    date: "11/01/2025",
    type: { text: "Lab", bgColor: "bg-sky-100", color: "text-sky-600" },
    patientName: "Oliver Bennett",
    agencyName: "MedSync",
    insurance: "VitalCare Coverage",
    location: "Stackton",
    days: { text: "2 Days", dot: "orange" },
    amount: 50,
  },
  {
    id: "3",
    date: "10/15/2025",
    type: { text: "Lab", bgColor: "bg-sky-100", color: "text-sky-600" },
    patientName: "Amelia Carter",
    agencyName: "AlphaCure",
    insurance: "HealthBridge Insurance",
    location: "Walnut Creek",
    days: { text: "3 Days", dot: "orange" },
    amount: 37,
  },
  {
    id: "4",
    date: "10/15/2025",
    type: { text: "485", bgColor: "bg-orange-100", color: "text-orange-600" },
    patientName: "Taylor Sutton",
    agencyName: "PureWell Health",
    insurance: "ProHealth Insurance",
    location: "Walnut Creek",
    days: { text: "3 Days", dot: "orange" },
    amount: 55,
  },
  {
    id: "5",
    date: "10/15/2025",
    type: { text: "Order", bgColor: "bg-emerald-100", color: "text-emerald-600" },
    patientName: "Sophie Harrington",
    agencyName: "CurePoint",
    insurance: "CarePlus Health",
    location: "San Jose",
    days: { text: "7 Days", dot: "red" },
    amount: 155,
  },
  {
    id: "6",
    date: "09/27/2025",
    type: { text: "MD Verification", bgColor: "bg-purple-100", color: "text-purple-600" },
    patientName: "Taylor Sutton",
    agencyName: "AlphaCure",
    insurance: "NovaHealth Insurance",
    location: "Walnut Creek",
    days: { text: "Today", dot: "green" },
    amount: 84,
  },
];

const MONTHS = ["Mar-26", "Feb-26", "Jan-26", "Dec-25", "Nov-25", "Oct-25", "Sep-25", "Aug-25", "Jul-25", "Jun-25"];

export default function BillableOrdersPage() {
  const [selectedMonth, setSelectedMonth] = useState("Mar-26");
  const [viewMode, setViewMode] = useState<"Month" | "Year">("Month");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [archiveSuccessOpen, setArchiveSuccessOpen] = useState(false);

  const archiveTitleId = useId();
  const archiveDescId = useId();

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === MOCK_ROWS.length ? [] : MOCK_ROWS.map((r) => r.id)
    );
  };

  const filteredRows = useMemo(() => {
    return MOCK_ROWS.filter((row) => {
      const matchesSearch =
        row.patientName.toLowerCase().includes(search.toLowerCase()) ||
        row.agencyName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || row.type.text === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const selectedAmount = useMemo(() => {
    return MOCK_ROWS.filter((r) => selectedRows.includes(r.id)).reduce(
      (sum, r) => sum + r.amount,
      0
    );
  }, [selectedRows]);

  const columns = useBillableOrdersTableColumns(
    selectedRows,
    toggleRow,
    toggleAll,
    selectedRows.length === MOCK_ROWS.length
  );

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_4px_-6px_rgba(0,0,0,0.06)] sm:p-5 md:rounded-2xl md:p-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">Billable Orders</h2>
          <p className="max-w-2xl text-sm text-[#858585]">
            Select a month (or year) to view billable orders (Lab, 485, MD Verification) and send them to billers.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => setArchiveModalOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#2E7AAF] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#25638f]"
          >
            <HiOutlinePlus className="h-4 w-4" />
            Add to Archive
          </button>
          <button
            onClick={() => {
              setSearch("");
              setFilter("All");
              setSelectedRows([]);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-[#FF383C] transition hover:bg-red-50"
          >
            <HiOutlineTrash className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Month Selector */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex items-center gap-2 overflow-hidden text-slate-400">
          {/* Carousel Simulation */}
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 hover:text-slate-600">
            <HiChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {MONTHS.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedMonth === month
                    ? "bg-[#E8F4FC] text-[#2E7AAF] ring-1 ring-[#2E7AAF]"
                    : "bg-[#F3F4F6] text-[#6B7280] hover:bg-slate-200"
                  }`}
              >
                {month}
              </button>
            ))}
          </div>
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 hover:text-slate-600">
            <HiChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex rounded-xl bg-[#F3F4F6] p-1 self-start">
          {["Month", "Year"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${viewMode === mode
                  ? "bg-white text-[#2E7AAF] shadow-sm"
                  : "text-[#6B7280] hover:text-[#4B5563]"
                }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUMMARY_CARDS.map((card) => (
          <div key={card.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400">{card.label}</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">{card.subLabel}</span>
            </div>
            <div className="mb-1 text-3xl font-bold text-slate-800">{card.value}</div>
            <div className="mb-4 text-sm font-medium text-slate-400">{card.count}</div>
            <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${card.bgColor} ${card.color}`}>
              Avg:{card.avg}
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-800">Orders • {selectedMonth.includes("Mar") ? "Mar 2026" : selectedMonth}</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">
              {selectedRows.length} selected • ${selectedAmount}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search billable orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm focus:border-[#2E7AAF] focus:outline-none sm:w-64"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <HiX className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1">
              {["All", "Lab", "485", "Others"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${filter === f ? "bg-white text-[#2E7AAF] shadow-sm" : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSendModalOpen(true)}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[#2E7AAF] px-4 text-sm font-bold text-[#2E7AAF] hover:bg-[#E8F4FC] transition-colors"
            >
              Send to Billers
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <DataTable
            columns={columns}
            rows={filteredRows}
            getRowKey={(r) => r.id}
            isBorderlessTable={true}
            headerClassName="bg-[#528DB5] text-white"
            pagination={{
              page: 1,
              onPageChange: () => { },
              pageSize: 8,
              totalCount: 150,
              summaryLabel: "Orders"
            }}
          />
        </div>
      </div>

      <ReportArchiveDialogs
        confirmOpen={archiveModalOpen}
        onConfirmClose={() => setArchiveModalOpen(false)}
        successOpen={archiveSuccessOpen}
        onSuccessClose={() => setArchiveSuccessOpen(false)}
        onCloseAll={() => {
          setArchiveSuccessOpen(false);
          setArchiveModalOpen(false);
        }}
        reportNoun="Billable Orders"
        labelledBy={archiveTitleId}
        describedBy={archiveDescId}
        onConfirmArchive={() => setArchiveSuccessOpen(true)}
      />

      {/* Footer Summary Card */}
      <div className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F4FC] text-[#2E7AAF]">
              <span className="text-xl font-bold">Σ</span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800 sm:text-base">Total Billable • {selectedMonth.includes("Mar") ? "Mar 2026" : selectedMonth} (Month)</div>
              <div className="text-xs font-medium text-slate-400 sm:text-sm">Based on current filters • Selected: {selectedRows.length} orders</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <span className="text-2xl font-bold text-slate-800 sm:text-3xl">${selectedAmount.toLocaleString()}</span>
            <div className="flex items-center gap-3">
              <button className="h-11 rounded-xl border border-slate-200 px-6 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                Export CSV
              </button>
              <button
                onClick={() => setSendModalOpen(true)}
                className="h-11 rounded-xl bg-[#528DB5] px-6 text-sm font-bold text-white shadow-lg shadow-[#528DB5]/20 hover:bg-[#45799c] transition-all"
              >
                Send Selected to Billers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Send to Billers Modal */}
      <Dialog
        open={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        panelClassName="max-w-xl p-8"
        ariaLabel="Send to Billers"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-800">
            Send to Billers
          </h3>
          <button onClick={() => setSendModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <p className="mb-6 text-slate-500 font-medium">
          You're about to send {selectedRows.length} billable orders to billers for Feb 2026. Review selection below.
        </p>

        <div className="mb-6 rounded-[16px] border border-slate-100 bg-[#F9FAFB] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={true} readOnly className="h-5 w-5 rounded border-slate-300 text-[#528DB5] focus:ring-[#528DB5]" />
            <span className="font-bold text-slate-700">Select all in selection</span>
          </div>
          <span className="text-sm font-medium text-slate-500">Selected Amount: <span className="font-bold text-slate-800">${selectedAmount}</span></span>
        </div>

        <div className="mb-8 max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {MOCK_ROWS.filter(r => selectedRows.includes(r.id)).map(row => (
            <div key={row.id} className="rounded-xl border border-slate-100 bg-white p-4 flex items-center justify-between hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-4">
                <input type="checkbox" checked={true} readOnly className="h-5 w-5 rounded border-slate-300 text-[#528DB5] focus:ring-[#528DB5]" />
                <div>
                  <div className="font-bold text-slate-800">{row.type.text} • {row.patientName}</div>
                  <div className="text-xs font-medium text-slate-400">Dr. Noah Patel • {row.date} • {row.location}</div>
                </div>
              </div>
              <span className="font-bold text-slate-700">${row.amount}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <span className="text-lg font-bold text-slate-800">Total to send: ${selectedAmount}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSendModalOpen(false)}
              className="h-11 rounded-xl px-6 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setSendModalOpen(false);
                // Handle send logic
              }}
              className="h-11 rounded-xl bg-[#528DB5] px-8 text-sm font-bold text-white shadow-lg shadow-[#528DB5]/20 hover:bg-[#45799c] transition-all"
            >
              Confirm Send
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

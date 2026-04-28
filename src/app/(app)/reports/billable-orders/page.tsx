"use client";

import { useState, useMemo, useId, Fragment, useEffect } from "react";
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
    color: "text-primary-color",
    bgColor: "bg-primary-background",
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
    color: "text-primary-color",
    bgColor: "bg-primary-background",
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
  {
    id: "7",
    date: "09/20/2025",
    type: { text: "Order", bgColor: "bg-emerald-100", color: "text-emerald-600" },
    patientName: "Ava Martinez",
    agencyName: "CarePlus Health Plans",
    insurance: "MediSure Health",
    location: "San Jose",
    days: { text: "5 Days", dot: "orange" },
    amount: 120,
  },
  {
    id: "8",
    date: "09/15/2025",
    type: { text: "Lab", bgColor: "bg-sky-100", color: "text-sky-600" },
    patientName: "Jordan Kim",
    agencyName: "ABC Pvt-Ltd",
    insurance: "VitalCare Coverage",
    location: "Stackton",
    days: { text: "10 Days", dot: "red" },
    amount: 45,
  },
  {
    id: "9",
    date: "09/10/2025",
    type: { text: "485", bgColor: "bg-orange-100", color: "text-orange-600" },
    patientName: "Morgan Lee",
    agencyName: "MedSync",
    insurance: "HealthBridge Insurance",
    location: "Walnut Creek",
    days: { text: "15 Days", dot: "red" },
    amount: 210,
  },
  {
    id: "10",
    date: "09/05/2025",
    type: { text: "Order", bgColor: "bg-emerald-100", color: "text-emerald-600" },
    patientName: "Riley Chen",
    agencyName: ".AlphaCure",
    insurance: "ProHealth Insurance",
    location: "San Jose",
    days: { text: "Today", dot: "green" },
    amount: 75,
  },
  {
    id: "11",
    date: "08/30/2025",
    type: { text: "Lab", bgColor: "bg-sky-100", color: "text-sky-600" },
    patientName: "Taylor Sutton",
    agencyName: "PureWell Health",
    insurance: "NovaHealth Insurance",
    location: "Walnut Creek",
    days: { text: "1 Day", dot: "green" },
    amount: 32,
  },
  {
    id: "12",
    date: "08/25/2025",
    type: { text: "MD Verification", bgColor: "bg-purple-100", color: "text-purple-600" },
    patientName: "Amelia Carter",
    agencyName: "CurePoint",
    insurance: "CarePlus Health",
    location: "San Jose",
    days: { text: "3 Days", dot: "orange" },
    amount: 98,
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
  const [tablePage, setTablePage] = useState(1);

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

  useEffect(() => {
    setTablePage(1);
  }, [search, filter, selectedMonth]);

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
          <h2 className="text-[22px] font-medium text-[#606060] ">Billable Orders</h2>
          <p className="max-w-2xl text-sm text-[#858585]">
            Select a month (or year) to view billable orders (Lab, 485, MD Verification) and send them to billers.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => setArchiveModalOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary-color px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#25638f]"
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
      <div className="mb-8  border border-gray-200 p-4 rounded-2xl flex  flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex items-center gap-2 overflow-hidden text-primary-description">
          {/* Carousel Simulation */}

          <div className="flex items-center gap-2 max-w-[700px] overflow-x-auto p-1 scrollbar-hide">
            {MONTHS.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedMonth === month
                  ? "bg-primary-background text-primary-color ring-1 ring-primary-color"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-slate-200"
                  }`}
              >
                {month}
              </button>
            ))}
          </div>

        </div>
        <div className="flex rounded-xl bg-[#F3F4F6] p-1 self-start">
          {["View", "Month", "Year"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${viewMode === mode
                ? "bg-white text-primary-color shadow-sm"
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
              <span className="text-xs font-medium text-primary-subtitle">{card.label}</span>
              <span className="rounded-2xl border border-gray-100 px-1.5 py-0.5 text-[10px] font-normal text-primary-subtitle">{card.subLabel}</span>
            </div>
            <div className="mb-1 text-3xl font-bold text-primary-title">{card.value}</div>
            <div className="mb-4 text-sm font-normal text-primary-subtitle">{card.count}</div>
            <div className={`inline-flex items-center rounded-[60px] px-[17px] py-[10px] text-xs font-normal text-ordina-400 bg-grayCustom-150 `}>
              Avg:{card.avg}
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-slate-100 bg-white px-6 shadow-sm overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate- py-4  sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-primary-title">Orders • {selectedMonth.includes("Mar") ? "Mar 2026" : selectedMonth}</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-primary-subtitle">
              {selectedRows.length} selected • ${selectedAmount}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-description" />
              <input
                type="text"
                placeholder="Search billable orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm focus:border-primary-color focus:outline-none sm:w-64"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary-description hover:text-slate-600">
                  <HiX className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1">
              {["All", "Lab", "485", "Others"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${filter === f ? "bg-white text-primary-color shadow-sm" : "text-primary-subtitle hover:text-slate-700"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSendModalOpen(true)}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-primary-color px-4 text-sm font-bold text-primary-color hover:bg-primary-background transition-colors"
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
            headerClassName="bg-primary-color text-white"
            pagination={{
              page: tablePage,
              onPageChange: setTablePage,
              pageSize: 6,
              totalCount: filteredRows.length,
              summaryLabel: "Billable Orders",
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
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-background text-primary-color">
              <span className="text-xl font-bold">Σ</span>
            </div>
            <div>
              <div className="text-sm font-medium text-primary-title ">Total Billable • {selectedMonth.includes("Mar") ? "Mar 2026" : selectedMonth} (Month)</div>
              <div className="text-xs font-medium text-primary-subtitle">Based on current filters • Selected: {selectedRows.length} orders</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <span className="text-2xl font-medium text-primary-title">${selectedAmount.toLocaleString()}</span>
            <div className="flex items-center gap-3">
              <button className="h-11 rounded-xl border border-slate-200 px-6 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                Export CSV
              </button>
              <button
                onClick={() => setSendModalOpen(true)}
                className="h-11 rounded-xl bg-primary-color px-6 text-sm font-medium text-white shadow-lg shadow-[#528DB5]/20 hover:bg-[#45799c] transition-all"
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
        panelClassName="max-w-lg p-0 overflow-hidden rounded-2xl"
        ariaLabel="Send to Billers"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="text-lg font-medium text-primary-title">
            Send to Billers
          </h3>
          <button
            onClick={() => setSendModalOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#9B9B9B] transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <p className="px-6 pb-4 text-sm text-primary-subtitle">
          You're about to send {selectedRows.length} billable orders to billers for Feb 2026. Review selection below.
        </p>

        {/* Select All Row */}
        <div className="mx-6 mb-3 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="select-all-billers"
              checked={true}
              readOnly
              className="h-4 w-4 rounded border-slate-300 accent-primary-color"
            />
            <label htmlFor="select-all-billers" className="text-sm font-medium text-primary-title cursor-pointer">
              Select all in selection
            </label>
          </div>
          <span className="text-sm text-primary-subtitle">
            Selected Amount: <span className="font-medium text-primary-title">${selectedAmount}</span>
          </span>
        </div>

        {/* Scrollable Items List */}
        <div className="mx-6 mb-4 max-h-[280px] overflow-y-auto rounded-xl border border-slate-200 bg-white">
          {MOCK_ROWS.filter(r => selectedRows.includes(r.id)).map((row, idx, arr) => (
            <div
              key={row.id}
              className={`flex items-center justify-between px-4 py-3 ${idx < arr.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="h-4 w-4 rounded border-slate-300 accent-primary-color"
                />
                <div>
                  <div className="text-sm font-medium text-primary-title">
                    {row.type.text} • {row.patientName}
                  </div>
                  <div className="text-xs text-primary-subtitle">
                    Dr. Noah Patel • {row.date} • {row.location}
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-primary-title">${row.amount}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <span className="text-sm font-medium text-primary-title">Total to send: ${selectedAmount}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSendModalOpen(false)}
              className="h-10 rounded-xl px-5 text-sm font-medium text-primary-subtitle transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setSendModalOpen(false);
              }}
              className="h-10 rounded-xl bg-primary-color px-6 text-sm font-medium text-white transition-all hover:bg-[#45799c]"
            >
              Confirm Send
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

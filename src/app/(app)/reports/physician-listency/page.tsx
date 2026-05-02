"use client";

import ReportFiltersRow, { ReportFilterConfig } from "@/components/common/ReportFiltersRow";
import { PHYSICIAN_LISTENCY_ROWS, PhysicianListencyRow, PhysicianListencyStatusLabel } from "@/data/physicianListencyStaticData";
import { REPORT_LOCATION_SELECT_OPTIONS } from "@/data/reportFilterLocationOptions";
import { REPORT_ORDER_TYPE_MULTI_OPTIONS } from "@/data/reportFilterOrderTypeOptions";
import { REPORT_PHYSICIAN_MULTI_OPTIONS } from "@/data/reportFilterPhysicianOptions";
import { REPORT_STATUS_TYPE_SELECT_OPTIONS } from "@/data/reportFilterStatusTypeOptions";
import { useEffect, useId, useMemo, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { usePhysicianListencyTableColumns } from "./PhysicianLisTableColumns";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import ReportArchiveDialogs from "@/components/common/ReportArchiveDialogs";


const PHYSICIAN_LISTENCY_TABLE_GRID_COLUMNS =
  "minmax(6.25rem,0.7fr) minmax(9.5rem,1.1fr) minmax(5.5rem,0.48fr) minmax(6.75rem,0.62fr) minmax(7.25rem,0.85fr) minmax(6.5rem,0.65fr)";

const LATENCY_STATUS_OPTIONS: { value: "" | PhysicianListencyStatusLabel; label: string }[] =
  [
    { value: "", label: "All latency tiers" },
    { value: "Fastest", label: "Fastest" },
    { value: "Fast", label: "Fast" },
    { value: "Moderate", label: "Moderate" },
    { value: "Slow", label: "Slow" },
    { value: "Slowest", label: "Slowest" },
  ];

export default function PhysicianListencyReportPage() {
  const [search, setSearch] = useState("");
  const [latencyTier, setLatencyTier] = useState<
    (typeof LATENCY_STATUS_OPTIONS)[number]["value"]
  >("");
  const [specialty, setSpecialty] = useState<string>("all");
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [archiveSuccessOpen, setArchiveSuccessOpen] = useState(false);
  const [tablePage, setTablePage] = useState(1);

  const [physicianSelection, setPhysicianSelection] = useState<string[]>([]);
  const [orderTypeSelection, setOrderTypeSelection] = useState<string[]>([]);
  const [statusType, setStatusType] = useState("");
  const [location, setLocation] = useState("");
  const archiveTitleId = useId();
  const archiveDescId = useId();

  const filterStatusText = useMemo(() => {
    const noDropdownFilters =
      physicianSelection.length === 0 &&
      orderTypeSelection.length === 0 &&
      statusType === "" &&
      location === "";
    if (noDropdownFilters) {
      return "No filters applied (showing all).";
    }
    const parts: string[] = [];
    if (physicianSelection.length > 0) {
      parts.push(`Agency: ${physicianSelection.join(", ")}`);
    }
    if (orderTypeSelection.length > 0) {
      parts.push(`Order type: ${orderTypeSelection.join(", ")}`);
    }
    if (statusType) {
      parts.push(`Status: ${statusType}`);
    }
    if (location) {
      const locLabel =
        REPORT_LOCATION_SELECT_OPTIONS.find((o) => o.value === location)
          ?.label ?? location;
      parts.push(`Location: ${locLabel}`);
    }
    return `${parts.join(" · ")}.`;
  }, [physicianSelection, orderTypeSelection, statusType, location]);

  const reportFilters = useMemo((): ReportFilterConfig[] => {
    return [
      {
        kind: "multiSelect",
        id: "physician",
        label: "Agency",
        values: physicianSelection,
        onValuesChange: setPhysicianSelection,
        options: [...REPORT_PHYSICIAN_MULTI_OPTIONS],
        searchPlaceholder: "Search agency…",
        emptySummaryLabel: "All Agency",
      },
      {
        kind: "multiSelect",
        id: "orderType",
        label: "Order Type",
        values: orderTypeSelection,
        onValuesChange: setOrderTypeSelection,
        options: [...REPORT_ORDER_TYPE_MULTI_OPTIONS],
        searchPlaceholder: "Search order types…",
        emptySummaryLabel: "All types",
      },
      {
        id: "statusType",
        label: "Status Type",
        value: statusType,
        onChange: setStatusType,
        options: [...REPORT_STATUS_TYPE_SELECT_OPTIONS],
        optionLayout: "radio",
      },
      {
        id: "location",
        label: "Location",
        value: location,
        onChange: setLocation,
        options: [...REPORT_LOCATION_SELECT_OPTIONS],
        optionLayout: "radio",
      },
    ];
  }, [physicianSelection, orderTypeSelection, statusType, location]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PHYSICIAN_LISTENCY_ROWS.filter((row: PhysicianListencyRow) => {
      if (latencyTier && row.statusLabel !== latencyTier) return false;
      if (specialty !== "all" && row.specialty !== specialty) return false;
      if (!q) return true;
      const hay = [
        row.physicianId,
        row.physicianName,
        row.specialty,
        row.statusLabel,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [search, latencyTier, specialty, physicianSelection, orderTypeSelection, statusType, location]);

  useEffect(() => {
    setTablePage(1);
  }, [search, latencyTier, specialty, physicianSelection, orderTypeSelection, statusType, location]);

  const columns = usePhysicianListencyTableColumns();

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_4px_-6px_rgba(0,0,0,0.06)] sm:p-5 md:rounded-2xl md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 space-y-1">
          <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">
            Hospice Report
          </h2>
          <p className="max-w-2xl text-xs leading-relaxed text-[#858585] sm:text-sm">
            Signing-time tiers, order load, and specialty at a glance—spot who
            needs follow-up before SLAs slip.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] bg-[#528DB5] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1485b3] sm:h-10 sm:px-4 sm:text-sm"
            aria-haspopup="dialog"
            aria-expanded={archiveModalOpen}
            onClick={() => setArchiveModalOpen(true)}
          >
            <HiOutlinePlus className="h-4 w-4" aria-hidden />
            Add to Archive
          </button>
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] border border-red-400/90 bg-white px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:h-10 sm:px-4 sm:text-sm"
            onClick={() => {
              setSearch("");
              setLatencyTier("");
              setSpecialty("all");
              setTablePage(1);
            }}
          >
            <HiOutlineTrash className="h-4 w-4" aria-hidden />
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <SearchInput
          id="reports-physician-listency-search"
          name="physicianListencySearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ID, name, specialty, or tier"
          aria-label="Search physician latency list"
          wrapperClassName="w-full"
          className="h-11 rounded-[10px] py-2.5 focus:border-[#528DB5] focus:ring-[0.5px] focus:ring-[#528DB5]"
          isNoShadow={true}
          isGoButton={true}
        />

        <ReportFiltersRow
          filters={reportFilters}
          moreFiltersIcon="menu"
          filterStatusText={filterStatusText}
        />
      </div>

      <div className="mt-6 min-w-0 sm:mt-8">
        <DataTable
          tableMinWidth="min-w-[1200px]"
          columns={columns}
          rows={filteredRows}
          getRowKey={(r) => r.id}
          gridTemplateColumns={PHYSICIAN_LISTENCY_TABLE_GRID_COLUMNS}
          headerClassName="bg-[#5B86AD] text-white shadow-[0px_2px_0px_rgba(0,0,0,0.12)] rounded-[10px]"
          getRowSurfaceClassName={(r) =>
            r.rowHighlight ? "bg-rose-50/90" : undefined
          }
          pagination={{
            page: tablePage,
            onPageChange: setTablePage,
            summaryLabel: "Physicians",
            pageSize: 6,
          }}
        />
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
        reportNoun="Physician Latency"
        labelledBy={archiveTitleId}
        describedBy={archiveDescId}
        onConfirmArchive={() => {
          setArchiveSuccessOpen(true);
        }}
      />
    </div>
  );
}

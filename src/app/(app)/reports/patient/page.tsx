"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { LuMaximize2 } from "react-icons/lu";

import { usePatientReportTableColumns } from "./PatientReportTableColumns";
import { TbBoxAlignBottomLeft } from "react-icons/tb";
import { REPORT_LOCATION_SELECT_OPTIONS } from "@/data/reportFilterLocationOptions";
import ReportFiltersRow, { ReportFilterConfig } from "@/components/common/ReportFiltersRow";
import { REPORT_PHYSICIAN_MULTI_OPTIONS } from "@/data/reportFilterPhysicianOptions";
import { REPORT_ORDER_TYPE_MULTI_OPTIONS } from "@/data/reportFilterOrderTypeOptions";
import { REPORT_STATUS_TYPE_SELECT_OPTIONS } from "@/data/reportFilterStatusTypeOptions";
import { PATIENT_REPORT_ROWS } from "@/data/patientReportStaticData";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import ReportArchiveDialogs from "@/components/common/ReportArchiveDialogs";

const PATIENT_REPORT_TABLE_GRID_COLUMNS =
  "minmax(6.75rem,0.88fr) minmax(14.5rem,1.02fr) minmax(6.5rem,0.78fr) minmax(11rem,1.08fr) minmax(10rem,0.62fr) minmax(8rem,0.52fr) minmax(10.75rem,0.58fr) minmax(10rem,1fr)";

export default function PatientReportPage() {
  const [search, setSearch] = useState("");
  const [physicianSelection, setPhysicianSelection] = useState<string[]>([]);
  const [orderTypeSelection, setOrderTypeSelection] = useState<string[]>([]);
  const [statusType, setStatusType] = useState("");
  const [location, setLocation] = useState("");
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [archiveSuccessOpen, setArchiveSuccessOpen] = useState(false);
  const [tablePage, setTablePage] = useState(1);

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
      parts.push(`Physician: ${physicianSelection.join(", ")}`);
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
        label: "Physician",
        values: physicianSelection,
        onValuesChange: setPhysicianSelection,
        options: [...REPORT_PHYSICIAN_MULTI_OPTIONS],
        searchPlaceholder: "Search physician…",
        emptySummaryLabel: "All Physicians",
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
    return PATIENT_REPORT_ROWS.filter((row) => {
      if (q && !row.patientName.toLowerCase().includes(q)) return false;
      if (
        physicianSelection.length > 0 &&
        !physicianSelection.includes(row.physicianName)
      ) {
        return false;
      }
      if (
        orderTypeSelection.length > 0 &&
        !orderTypeSelection.includes(row.orderType)
      ) {
        return false;
      }
      if (statusType && row.status.text !== statusType) {
        return false;
      }
      return true;
    });
  }, [search, physicianSelection, orderTypeSelection, statusType]);

  useEffect(() => {
    setTablePage(1);
  }, [search, physicianSelection, orderTypeSelection, statusType, location]);

  const columns = usePatientReportTableColumns();

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_4px_-6px_rgba(0,0,0,0.06)] sm:p-5 md:rounded-2xl md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 space-y-1">
          <h2 className="text-lg font-semibold text-[#606060] sm:text-xl">
            Patient Report
          </h2>
          <p className="max-w-2xl text-xs leading-relaxed text-[#858585] sm:text-sm">
            Break pending by aging buckets and surface the backlog risk (30+
            days) immediately.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] bg-[#1696C8] px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1485b3] sm:h-10 sm:px-4 sm:text-sm"
            aria-haspopup="dialog"
            aria-expanded={archiveModalOpen}
            onClick={() => setArchiveModalOpen(true)}
          >
            <HiOutlinePlus className="h-4 w-4" aria-hidden />
            Add to Archive
          </button>
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] border-[0.5px] border-[#FF383C80] bg-white px-3 text-xs font-semibold text-[#FF383C] transition hover:bg-red-50 sm:h-10 sm:px-4 sm:text-sm"
            onClick={() => {
              setSearch("");
              setPhysicianSelection([]);
              setOrderTypeSelection([]);
              setStatusType("");
              setLocation("");
              setTablePage(1);
            }}
          >
            <HiOutlineTrash className="h-4 w-4 text-[#FF383C]" aria-hidden />
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <SearchInput
          id="reports-patient-search"
          name="patientSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Patient"
          aria-label="Search patient"
          wrapperClassName="w-full"
          className="h-11 rounded-[10px] py-2.5 focus:border-[#1696C8] focus:ring-[0.5px] focus:ring-[#1696C8]"
          isNoShadow={true}
          isGoButton={true}
        />

        <ReportFiltersRow
          filters={reportFilters}
          moreFiltersIcon="menu"
          filterStatusText={filterStatusText}
        />
      </div>

      {/* <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        <article className="flex flex-col rounded-xl border-[0.5px] border-[#E0E0E0] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[#3d3d3d] sm:text-[15px]">
              Today&apos;s signed <br /> orders received
            </h3>
            <div className="flex shrink-0 gap-1.5">
              <button
                type="button"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                aria-label="Expand widget"
              >
                <TbBoxAlignBottomLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                aria-label="Remove widget"
              >
                <HiOutlineTrash className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-[#555] sm:text-[1.75rem]">
            24
          </p>
          <p className="mt-1 text-sm font-normal text-[#9B9B9B]">
            New orders received
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <span className="inline-flex w-fit rounded-md bg-[#579EBA12] px-2.5 py-1.5 text-xs font-medium text-[#738AA5]">
              Active physicians: 157
            </span>
            <span className="inline-flex w-fit rounded-md bg-[#579EBA12] px-2.5 py-1.5 text-xs font-medium text-[#738AA5]">
              Cancelled this month: 40
            </span>
          </div>
        </article>

        <article className="flex flex-col rounded-xl border-[0.5px] border-[#E0E0E0] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[#3d3d3d] sm:text-[15px]">
              Order sent out <br /> for the day
            </h3>
            <div className="flex shrink-0 gap-1.5">
              <button
                type="button"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                aria-label="Expand widget"
              >
                <LuMaximize2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                aria-label="Remove widget"
              >
                <HiOutlineTrash className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-[#555] sm:text-[1.75rem]">
            18
          </p>
          <p className="mt-1 text-sm font-normal text-[#9B9B9B]">
            Signed / completed today
          </p>
            <div className="mt-3 flex flex-col gap-2">
            <span className="inline-flex w-fit rounded-md bg-[#579EBA12] px-2.5 py-1.5 text-xs font-medium text-[#738AA5]">
              Pending total: 343
            </span>
            <span className="inline-flex w-fit rounded-md bg-[#f1f7fb] px-2.5 py-1.5 text-xs font-medium text-[#6b8ba4]">
              30+ days pending: 72
            </span>
          </div>
        </article>

        <article className="flex flex-col rounded-xl border-[0.5px] border-[#E0E0E0] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[#3d3d3d] sm:text-[15px]">
              Total pending <br /> orders
            </h3>
            <div className="flex shrink-0 gap-1.5">
              <button
                type="button"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                aria-label="Expand widget"
              >
                <LuMaximize2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
                aria-label="Remove widget"
              >
                <HiOutlineTrash className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-[#555] sm:text-[1.75rem]">
            343
          </p>
          <p className="mt-1 text-sm font-normal text-[#9B9B9B]">
            Backlog to clear
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <span className="inline-flex rounded-md bg-[#579EBA12] px-2.5 py-1.5 text-xs font-medium text-[#738AA5]">
              0–7 days: 168
            </span>
            <span className="inline-flex rounded-md bg-[#579EBA12] px-2.5 py-1.5 text-xs font-medium text-[#738AA5]">
              8–15 days: 92
            </span>
            <span className="inline-flex rounded-md bg-[#579EBA12] px-2.5 py-1.5 text-xs font-medium text-[#738AA5]">
              16–30 days: 64
            </span>
            <span className="inline-flex rounded-md bg-[#579EBA12] px-2.5 py-1.5 text-xs font-medium text-[#738AA5]">
              30+ days: 67
            </span>
          </div>
        </article>
      </div> */}

      <div className="mt-6 min-w-0 sm:mt-8">
        <DataTable
          columns={columns}
          isBorderlessTable={true}
          rows={filteredRows}
          getRowKey={(r) => r.id}
          gridTemplateColumns={PATIENT_REPORT_TABLE_GRID_COLUMNS}
          getRowSurfaceClassName={(r) =>
            r.dateTags?.some((t) =>
              t.text.toLowerCase().includes("rejected")
            )
              ? "bg-red-500/10"
              : undefined
          }
          pagination={{
            page: tablePage,
            onPageChange: setTablePage,
            summaryLabel: "Orders",
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
        reportNoun="Patient"
        labelledBy={archiveTitleId}
        describedBy={archiveDescId}
        onConfirmArchive={() => {
          setArchiveSuccessOpen(true);
        }}
      />
    </div>
  );
}

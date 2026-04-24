"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";



import { usePhysicianReportTableColumns } from "./PhysicianReportTableColumns";
import { LuArrowDownToLine, LuDot } from "react-icons/lu";
import ReportStatSummaryGrid, { ReportStatSummaryCard } from "@/components/common/ReportStatSummaryGrid";
import { PHYSICIAN_REPORT_ROWS, PHYSICIAN_UNSIGNED_BUCKETS } from "@/data/physicianReportStaticData";
import ReportFiltersRow, { ReportFilterConfig } from "@/components/common/ReportFiltersRow";
import { REPORT_PHYSICIAN_PAGE_PATIENT_MULTI_OPTIONS } from "@/data/reportFilterPatientOptions";
import { REPORT_ORDER_TYPE_MULTI_OPTIONS } from "@/data/reportFilterOrderTypeOptions";
import { REPORT_STATUS_TYPE_SELECT_OPTIONS } from "@/data/reportFilterStatusTypeOptions";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import ReportArchiveDialogs from "@/components/common/ReportArchiveDialogs";


const PHYSICIAN_REPORT_TABLE_GRID_COLUMNS =
  "minmax(6.75rem,0.88fr) minmax(10rem,1.02fr) minmax(14rem,0.78fr) minmax(11rem,1.08fr) minmax(10rem,0.62fr) minmax(8rem,0.52fr) minmax(10.75rem,0.58fr) minmax(10rem,1fr) minmax(10rem,0.62fr)";

const PROFILE = {
  initials: "DE",
  displayName: "Dr. Emily Carter",
  specialty: "Internal Medicine",
  location: "Northside Medical Center",
  npi: "1457891234",
  avgSigning: "1.4 days",
  lastSigned: "02/15/2025",
  alerts: 2,
} as const;

const STAT_CARDS: ReportStatSummaryCard[] = [
  {
    id: "unsigned",
    label: "Unsigned",
    value: 24,
    buckets: PHYSICIAN_UNSIGNED_BUCKETS,
  },
  { id: "modified", label: "Modified", value: 10 },
  { id: "rejected", label: "Rejected", value: 28 },
  { id: "signed", label: "Signed", value: 4 },
];

export default function PhysicianReportPage() {
  const [physicianSearch, setPhysicianSearch] = useState("Dr. Emily Carter");
  const [patientSelection, setPatientSelection] = useState<string[]>([]);
  const [orderTypeSelection, setOrderTypeSelection] = useState<string[]>([]);
  const [statusType, setStatusType] = useState("");
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [archiveSuccessOpen, setArchiveSuccessOpen] = useState(false);
  const [tablePage, setTablePage] = useState(1);

  const archiveTitleId = useId();
  const archiveDescId = useId();

  const filterStatusText = useMemo(() => {
    const noDropdownFilters =
      patientSelection.length === 0 &&
      orderTypeSelection.length === 0 &&
      statusType === "";
    if (noDropdownFilters) {
      return "No filters applied (showing all).";
    }
    const parts: string[] = [];
    if (patientSelection.length > 0) {
      parts.push(`Patient: ${patientSelection.join(", ")}`);
    }
    if (orderTypeSelection.length > 0) {
      parts.push(`Order type: ${orderTypeSelection.join(", ")}`);
    }
    if (statusType) {
      parts.push(`Status: ${statusType}`);
    }
    return `${parts.join(" · ")}.`;
  }, [patientSelection, orderTypeSelection, statusType]);

  const reportFilters = useMemo((): ReportFilterConfig[] => {
    return [
      {
        kind: "multiSelect",
        id: "patient",
        label: "Patient",
        values: patientSelection,
        onValuesChange: setPatientSelection,
        options: [...REPORT_PHYSICIAN_PAGE_PATIENT_MULTI_OPTIONS],
        searchPlaceholder: "Search patient…",
        emptySummaryLabel: "All Patients",
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
    ];
  }, [patientSelection, orderTypeSelection, statusType]);

  const filteredRows = useMemo(() => {
    return PHYSICIAN_REPORT_ROWS.filter((row) => {
      if (
        patientSelection.length > 0 &&
        !patientSelection.includes(row.patientName)
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
  }, [patientSelection, orderTypeSelection, statusType]);

  useEffect(() => {
    setTablePage(1);
  }, [patientSelection, orderTypeSelection, statusType]);

  const columns = usePhysicianReportTableColumns();

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_4px_-6px_rgba(0,0,0,0.06)] sm:p-5 md:rounded-2xl md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 space-y-1">
          <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">
            Agency Report
          </h2>
          <p className="max-w-2xl text-xs leading-relaxed text-[#858585] sm:text-sm">
            Break pending by aging buckets and surface the backlog risk (30+ days) immediately.
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
              setPhysicianSearch("Dr. Emily Carter");
              setPatientSelection([]);
              setOrderTypeSelection([]);
              setStatusType("");
              setTablePage(1);
            }}
          >
            <HiOutlineTrash className="h-4 w-4 text-[#FF383C]" aria-hidden />
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <SearchInput
          id="reports-physician-search"
          name="physicianSearch"
          value={physicianSearch}
          onChange={(e) => setPhysicianSearch(e.target.value)}
          placeholder="Search physician"
          aria-label="Search physician"
          wrapperClassName="w-full"
          className="h-11 rounded-[10px] py-2.5 focus:border-[#1696C8] focus:ring-[0.5px] focus:ring-[#1696C8]"
          isNoShadow={true}
          isGoButton={true}
        />

        <section
          className="rounded-xl border-[0.5px] border-[#E0E0E0] bg-[#FFFFFF] p-4"
          aria-label="Physician profile"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 gap-3 sm:gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D4EAF5] text-sm font-bold text-[#1696C8] sm:h-14 sm:w-14 sm:text-base"
                aria-hidden
              >
                {PROFILE.initials}
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-semibold text-[#606060] sm:text-base">
                  {PROFILE.displayName}
                </p>
                <p className="text-[11px] leading-relaxed text-[#9B9B9B] flex items-center flex-row gap-1 sm:text-xs">
                  <span className="block">
                    Specialty: {PROFILE.specialty}
                  </span>
                  <LuDot />
                  <span className="block">Location: {PROFILE.location}</span>
                  <LuDot />
                  <span className="block">NPI: {PROFILE.npi}</span>
                </p>
                <div className="flex flex-wrap  flex-row items-center gap-2 pt-2">
                  <span className="inline-flex items-center rounded-full border-[0.5px] border-[#579EBA29] bg-[#EFF5F8] px-2.5 py-1 text-[10px] font-semibold text-[#528DB5] sm:text-[11px]">
                    Avg Signing: {PROFILE.avgSigning}
                  </span>
                  <span className="inline-flex items-center rounded-full border-[0.5px] border-[#579EBA29] bg-[#EFF5F8] px-2.5 py-1 text-[10px] font-semibold text-[#528DB5] sm:text-[11px]">
                    Last Signed: {PROFILE.lastSigned}
                  </span>
                  <span className="inline-flex items-center rounded-full border-[0.5px] border-[#579EBA29] bg-[#EFF5F8] px-2.5 py-1 text-[10px] font-semibold text-[#528DB5] sm:text-[11px]">
                    Alerts: {PROFILE.alerts}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 sm:pt-0">
              <button
                type="button"
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white px-3 text-xs font-semibold text-[#686464] shadow-sm transition hover:bg-slate-50 sm:h-10 sm:px-4 sm:text-sm"
              >
                <HiOutlinePhone className="h-4 w-4 text-[#528DB5]" aria-hidden />
                Call
              </button>
              <button
                type="button"
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white px-3 text-xs font-semibold text-[#686464] shadow-sm transition hover:bg-slate-50 sm:h-10 sm:px-4 sm:text-sm"
              >
                <HiOutlineMail className="h-4 w-4 text-[#528DB5]" aria-hidden />
                Message
              </button>
            </div>
          </div>
        </section>

        <ReportStatSummaryGrid cards={STAT_CARDS} />

        <ReportFiltersRow
          filters={reportFilters}
          moreFiltersIcon="filter"
          filterStatusText={filterStatusText}
          className="pt-1"
        />
      </div>

      <div className="mt-6  min-w-0 sm:mt-8">
        <DataTable
          columns={columns}
          isBorderlessTable={true}
          rows={filteredRows}
          getRowKey={(r) => r.id}
          gridTemplateColumns={PHYSICIAN_REPORT_TABLE_GRID_COLUMNS}
          getRowSurfaceClassName={(r) => {
            const isRejectedRow = r.dateTags?.some((t) => t.text === "Rejected");
            if (isRejectedRow) {
              return "bg-red-500/10";
            }
            if (r.rowHighlight) {
              return "bg-rose-50/90";
            }
            return undefined;
          }}
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
        reportNoun="Agency"
        labelledBy={archiveTitleId}
        describedBy={archiveDescId}
        onConfirmArchive={() => {
          setArchiveSuccessOpen(true);
        }}
      />
    </div>
  );
}

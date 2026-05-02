"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";

import { useFacetoFaceReportTableColumns } from "../face-2-face/FacetoFaceReportTableColumns";
import ReportStatSummaryGrid, { ReportStatSummaryCard } from "@/components/common/ReportStatSummaryGrid";
import { FACE_2_FACE_REPORT_ROWS, FACE_2_FACE_UNSIGNED_BUCKETS } from "@/data/facetofaceReportStaticData";
import ReportFiltersRow, { ReportFilterConfig } from "@/components/common/ReportFiltersRow";
import { REPORT_PHYSICIAN_MULTI_OPTIONS } from "@/data/reportFilterPhysicianOptions";
import { REPORT_PHYSICIAN_PAGE_PATIENT_MULTI_OPTIONS } from "@/data/reportFilterPatientOptions";
import { REPORT_ORDER_TYPE_MULTI_OPTIONS } from "@/data/reportFilterOrderTypeOptions";
import { REPORT_STATUS_TYPE_SELECT_OPTIONS } from "@/data/reportFilterStatusTypeOptions";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import ReportArchiveDialogs from "@/components/common/ReportArchiveDialogs";
import { REPORT_AGENCY_MULTI_OPTIONS } from "@/data/reportFilterAgencyOptions";

const FACE_2_FACE_REPORT_TABLE_GRID_COLUMNS =
  "minmax(6.75rem,0.88fr) minmax(14rem,1.02fr) minmax(10rem,0.78fr) minmax(10rem,1.08fr) minmax(10rem,0.62fr) minmax(8rem,0.52fr) minmax(8.75rem,0.58fr) minmax(11rem,1fr) minmax(10rem,0.62fr)";


const STAT_CARDS: ReportStatSummaryCard[] = [
  { id: "pendingPOC", label: "Pending POC", value: 6 },
  {
    id: "nonCompliantPOC",
    label: "Non Compliant POC",
    value: 4,
    buckets: FACE_2_FACE_UNSIGNED_BUCKETS,
  },
  { id: "slaRisk", label: "SLA RISK", value: 2 },
  { id: "readyToBill", label: "Ready to Bill", value: 8 },
];

export default function PlanOfCareReportPage() {
  const [agencySelection, setAgencySelection] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [orderTypeSelection, setOrderTypeSelection] = useState<string[]>([]);
  const [statusType, setStatusType] = useState("");
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [patientSelection, setPatientSelection] = useState<string[]>([]);
  const [archiveSuccessOpen, setArchiveSuccessOpen] = useState(false);
  const [tablePage, setTablePage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const archiveTitleId = useId();
  const archiveDescId = useId();

  const filterStatusText = useMemo(() => {
    const noDropdownFilters =
      agencySelection.length === 0 &&
      patientSelection.length === 0 &&
      orderTypeSelection.length === 0 &&
      statusType === "";
    if (noDropdownFilters) {
      return "No filters applied (showing all).";
    }
    const parts: string[] = [];
    if (agencySelection.length > 0) {
      parts.push(`Agency: ${agencySelection.join(", ")}`);
    }
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
  }, [agencySelection, patientSelection, orderTypeSelection, statusType]);

  const reportFilters = useMemo((): ReportFilterConfig[] => {
    return [
      {
        kind: "multiSelect",
        id: "agency",
        label: "Agency",
        values: agencySelection,
        onValuesChange: setAgencySelection,
        options: [...REPORT_AGENCY_MULTI_OPTIONS],
        searchPlaceholder: "Search agency",
        emptySummaryLabel: "Any",
      },
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
  }, [agencySelection, patientSelection, orderTypeSelection, statusType]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FACE_2_FACE_REPORT_ROWS.filter((row) => {
      if (q && !row.patientName.toLowerCase().includes(q)) return false;
      if (
        agencySelection.length > 0 &&
        !agencySelection.includes(row.agency)
      ) {
        return false;
      }
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
  }, [search, agencySelection, patientSelection, orderTypeSelection, statusType]);

  useEffect(() => {
    setTablePage(1);
  }, [agencySelection, patientSelection, search, orderTypeSelection, statusType]);

  const columns = useFacetoFaceReportTableColumns();

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/50 sm:p-5 md:rounded-2xl md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 space-y-1">
          <h2 className="text-[22px] font-medium text-[#606060] sm:text-xl">
            Plan of Care (485)
          </h2>
          <p className="max-w-2xl text-xs leading-relaxed text-[#858585] sm:text-sm">
            Monthly revenue, pending payments trend, and outstanding client dues in one view.s
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
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] border-[0.5px] border-[#FF383C80] bg-white px-3 text-xs font-semibold text-[#FF383C] transition hover:bg-red-50 sm:h-10 sm:px-4 sm:text-sm"
            onClick={() => {
              setSearch("");
              setAgencySelection([]);
              setPatientSelection([]);
              setOrderTypeSelection([]);
              setStatusType("");
              setTablePage(1);
              setHasSearched(false);
            }}
          >
            <HiOutlineTrash className="h-4 w-4 text-[#FF383C]" aria-hidden />
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <SearchInput
          id="reports-patient-search"
          name="patientSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setHasSearched(true);
            }
          }}
          placeholder="Search by patient, agency, order id, payer..."
          aria-label="Search by patient, agency, order id, payer..."
          wrapperClassName="w-full"
          className="h-11 rounded-[10px] py-2.5 focus:border-[#528DB5] focus:ring-[0.5px] focus:ring-[#528DB5]"
          isNoShadow={true}
          isGoButton={true}
        />

        <ReportStatSummaryGrid cards={STAT_CARDS} />

        <ReportFiltersRow
          filters={reportFilters}
          moreFiltersIcon="filter"
          filterStatusText={filterStatusText}
          className="pt-1"
        />
      </div>

      <div className="mt-6  min-w-0 sm:mt-8">
        {(hasSearched ||
          search.trim() ||
          agencySelection.length > 0 ||
          patientSelection.length > 0 ||
          orderTypeSelection.length > 0 ||
          statusType !== "") &&
          filteredRows.length > 0 ? (
          <DataTable
            tableMinWidth="min-w-[1200px]"
            title="Plan of Care (485)"
            columns={columns}
            isBorderlessTable={true}
            rows={filteredRows}
            getRowKey={(r) => r.id}
            gridTemplateColumns={FACE_2_FACE_REPORT_TABLE_GRID_COLUMNS}
            getRowSurfaceClassName={(r) =>
              r.rowHighlight ? "bg-rose-50/90" : undefined
            }
            pagination={{
              page: tablePage,
              onPageChange: setTablePage,
              summaryLabel: "POC",
              pageSize: 6,
            }}
          />
        ) : (
          <POCEmptyState />
        )}
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
        reportNoun="Plan of Care"
        labelledBy={archiveTitleId}
        describedBy={archiveDescId}
        onConfirmArchive={() => {
          setArchiveSuccessOpen(true);
        }}
      />
    </div>
  );
}
function POCEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="relative mb-8">
        <div className="relative h-40 w-40 flex items-center justify-center">
          {/* Document Base */}
          <svg width="112" height="136" viewBox="0 0 112 136" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F1F3F5]">
            <path d="M0 8C0 3.58172 3.58172 0 8 0H76L112 36V128C112 132.418 108.418 136 104 136H8C3.58172 136 0 132.418 0 128V8Z" fill="currentColor" />
            <path d="M76 0V28C76 32.4183 79.5817 36 84 36H112" fill="#E9ECEF" />
            <rect x="24" y="60" width="64" height="4" rx="2" fill="#DEE2E6" />
            <rect x="24" y="76" width="64" height="4" rx="2" fill="#DEE2E6" />
            <rect x="24" y="92" width="40" height="4" rx="2" fill="#DEE2E6" />
          </svg>

          {/* Magnifying Glass Overlay */}
          <div className="absolute -bottom-4 -right-4 drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]">
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="44" cy="44" r="38" fill="white" stroke="#E9ECEF" strokeWidth="1" />
              <circle cx="44" cy="44" r="30" fill="#F8F9FA" />
              {/* Handle */}
              <rect x="74" y="68" width="8" height="32" rx="4" transform="rotate(-45 74 68)" fill="#E9ECEF" />
              <rect x="78" y="72" width="4" height="24" rx="2" transform="rotate(-45 78 72)" fill="#DEE2E6" />

              {/* X Icon */}
              <path d="M36 36L52 52M52 36L36 52" stroke="#ADB5BD" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-[#4A4A4A] mb-3">No report selected yet</h3>
      <p className="max-w-md text-[#858585] leading-relaxed text-sm sm:text-base">
        Start typing in the search box above &rarr; choose from dropdown <br />
        (or press Enter) &rarr; POC report appears here.
      </p>
    </div>
  );
}

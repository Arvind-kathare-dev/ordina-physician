"use client";

import ReportFiltersRow, { ReportFilterConfig } from "@/components/common/ReportFiltersRow";
import ReportStatSummaryGrid, { ReportStatSummaryCard } from "@/components/common/ReportStatSummaryGrid";
import { FACE_2_FACE_REPORT_ROWS, FACE_2_FACE_UNSIGNED_BUCKETS } from "@/data/facetofaceReportStaticData";
import { REPORT_ORDER_TYPE_MULTI_OPTIONS } from "@/data/reportFilterOrderTypeOptions";
import { REPORT_PHYSICIAN_PAGE_PATIENT_MULTI_OPTIONS } from "@/data/reportFilterPatientOptions";
import { REPORT_PHYSICIAN_MULTI_OPTIONS } from "@/data/reportFilterPhysicianOptions";
import { useEffect, useId, useMemo, useState } from "react";
import {
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";
import { useFacetoFaceReportTableColumns } from "./FacetoFaceReportTableColumns";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import ReportArchiveDialogs from "@/components/common/ReportArchiveDialogs";


const FACE_2_FACE_REPORT_TABLE_GRID_COLUMNS =
  "minmax(6.75rem,0.88fr) minmax(14rem,1.02fr) minmax(10rem,0.78fr) minmax(10rem,1.08fr) minmax(8rem,0.62fr) minmax(8rem,0.52fr) minmax(8.75rem,0.58fr) minmax(11rem,1fr) minmax(10rem,0.62fr)";


const STAT_CARDS: ReportStatSummaryCard[] = [
  { id: "pendingF2F", label: "Pending F2F", value: 6 },
  {
    id: "nonCompliantF2F",
    label: "Non Compliant F2F",
    value: 4,
    buckets: FACE_2_FACE_UNSIGNED_BUCKETS,
  },
  { id: "slaRisk", label: "SLA RISK", value: 2 },
  { id: "readyToBill", label: "Ready to Bill", value: 8 },
];

const FACE_2_FACE_FILTER_OPTIONS = [
  "All Patients",
  "Ava Martinez",
  "Jordan Kim",
  "Morgan Lee",
  "Riley Chen",
  "Taylor Sutton",
] as const;

export default function Face2FaceReportPage() {
  const [physicianSelection, setPhysicianSelection] = useState<string[]>([]);
  const [patientSearch, setPatientSearch] = useState("Dr. Emily Carter");
  const [patient, setPatient] = useState<(typeof FACE_2_FACE_FILTER_OPTIONS)[number]>(
    "All Patients"
  );
  const [orderTypeSelection, setOrderTypeSelection] = useState<string[]>([]);
  const [statusType, setStatusType] = useState("");
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [patientSelection, setPatientSelection] = useState<string[]>([]);
  const [archiveSuccessOpen, setArchiveSuccessOpen] = useState(false);
  const [tablePage, setTablePage] = useState(1);

  const archiveTitleId = useId();
  const archiveDescId = useId();

  const filterStatusText = useMemo(() => {
    const noDropdownFilters =
      physicianSelection.length === 0 &&
      patient === "All Patients" &&
      orderTypeSelection.length === 0 &&
      statusType === "";
    if (noDropdownFilters) {
      return "No filters applied (showing all).";
    }
    const parts: string[] = [];
    if (physicianSelection.length > 0) {
      parts.push(`Physician: ${physicianSelection.join(", ")}`);
    }
    if (patient !== "All Patients") parts.push(`Patient: ${patient}`);
    if (orderTypeSelection.length > 0) {
      parts.push(`Order type: ${orderTypeSelection.join(", ")}`);
    }
    if (statusType) {
      parts.push(`Status: ${statusType}`);
    }
    return `${parts.join(" · ")}.`;
  }, [patient, orderTypeSelection, statusType, physicianSelection]);

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
        options: [
          { value: "", label: "Select" },
          { value: "pending", label: "Pending" },
          { value: "completed", label: "Completed" },
          { value: "cancelled", label: "Cancelled" },
        ],
      },
    ];
  }, [physicianSelection, patientSelection, orderTypeSelection, statusType]);

  const filteredRows = useMemo(() => {
    return FACE_2_FACE_REPORT_ROWS.filter((row) => {
      if (patient !== "All Patients" && row.patientName !== patient) {
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
  }, [patient, orderTypeSelection, statusType]);

  useEffect(() => {
    setTablePage(1);
  }, [physicianSelection, patient, orderTypeSelection, statusType]);

  const columns = useFacetoFaceReportTableColumns();

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_4px_-6px_rgba(0,0,0,0.06)] sm:p-5 md:rounded-2xl md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 space-y-1">
          <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">
          Face-to-Face (F2F) Report
          </h2>
          <p className="max-w-2xl text-xs leading-relaxed text-[#858585] sm:text-sm">
          Enterprise-grade compliance report for F2F encounters: who is missing docs, what’s aging, what is SLA-risk, and what is ready to bill. (Sample data + UI only)
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
              setPatientSearch("Dr. Emily Carter");
              setPhysicianSelection([]);
              setPatient("All Patients");
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
          id="reports-patient-search"
          name="patientSearch"
          value={patientSearch}
          onChange={(e) => setPatientSearch(e.target.value)}
          placeholder="SeSearch by patient, physician, order id, payer..."
          aria-label="Search by patient, physician, order id, payer..."
          wrapperClassName="w-full"
          className="h-11 rounded-[10px] py-2.5 focus:border-[#1696C8] focus:ring-[0.5px] focus:ring-[#1696C8]"
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
        <DataTable
        title="F2F Worklist"
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
            summaryLabel: "Showing item(s)",
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
        reportNoun="Face-to-Face (F2F)"
        labelledBy={archiveTitleId}
        describedBy={archiveDescId}
        onConfirmArchive={() => {
          setArchiveSuccessOpen(true);
        }}
      />
    </div>
  );
}

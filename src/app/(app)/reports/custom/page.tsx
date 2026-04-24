"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {  HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

import CustomReportBuilderStep from "../components/CustomReportBuilderStep";
import { usePatientReportTableColumns } from "../patient/PatientReportTableColumns";
import { IoDuplicateOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { REPORT_LOCATION_SELECT_OPTIONS } from "@/data/reportFilterLocationOptions";
import ReportFiltersRow, { ReportFilterConfig } from "@/components/common/ReportFiltersRow";
import { REPORT_PHYSICIAN_MULTI_OPTIONS } from "@/data/reportFilterPhysicianOptions";
import { REPORT_ORDER_TYPE_MULTI_OPTIONS } from "@/data/reportFilterOrderTypeOptions";
import { REPORT_STATUS_TYPE_SELECT_OPTIONS } from "@/data/reportFilterStatusTypeOptions";
import { PATIENT_REPORT_ROWS } from "@/data/patientReportStaticData";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import DuplicateReportDialogs from "@/components/common/DuplicateReportDialogs";
import ReportArchiveDialogs from "@/components/common/ReportArchiveDialogs";
import Dialog from "@/components/common/Dialog";

const CUSTOM_REPORT_TABLE_GRID_COLUMNS =
  "minmax(6.75rem,0.88fr) minmax(14.5rem,1.02fr) minmax(6.5rem,0.78fr) minmax(11rem,1.08fr) minmax(10rem,0.62fr) minmax(8rem,0.52fr) minmax(10.75rem,0.58fr) minmax(10rem,1fr)";

export default function CustomReportPage() {
  const [search, setSearch] = useState("");
  const [physicianSelection, setPhysicianSelection] = useState<string[]>([]);
  const [orderTypeSelection, setOrderTypeSelection] = useState<string[]>([]);
  const [statusType, setStatusType] = useState("");
  const [location, setLocation] = useState("");
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [archiveSuccessOpen, setArchiveSuccessOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [customBuilderOpen, setCustomBuilderOpen] = useState(false);
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
    <div className="rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-5 md:rounded-2xl md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 space-y-1">
          <h2 className="text-lg font-semibold text-neutral-900 sm:text-xl">
            Custom Report
          </h2>
          <p className="max-w-2xl text-xs leading-relaxed text-[#858585] sm:text-sm">
            Monthly revenue, pending payments trend, and outstanding client dues
            in one view.
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
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] border-[0.5px] border-[#528DB5] px-3 text-xs font-semibold text-[#528DB5] shadow-sm transition sm:h-10 sm:px-4 sm:text-sm"
            aria-haspopup="dialog"
            aria-expanded={duplicateDialogOpen}
            onClick={() => setDuplicateDialogOpen(true)}
          >
            <IoDuplicateOutline className="h-4 w-4 text-[#528DB5]" aria-hidden />
            Duplicates
          </button>
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer text-[#528DB5] items-center gap-1.5 rounded-[10px] border-[0.5px] border-[#528DB5] px-3 text-xs font-semibold  shadow-sm transition sm:h-10 sm:px-4 sm:text-sm"
            aria-haspopup="dialog"
            aria-expanded={customBuilderOpen}
            onClick={() => setCustomBuilderOpen(true)}
          >
            <MdOutlineEdit className="h-4 w-4 text-[#528DB5]" aria-hidden />
            Edit
          </button>
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[10px] border border-red-400/90 bg-white px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:h-10 sm:px-4 sm:text-sm"
            onClick={() => {
              setSearch("");
              setPhysicianSelection([]);
              setOrderTypeSelection([]);
              setStatusType("");
              setLocation("");
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
          id="reports-custom-search"
          name="customReportSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient, physician, order id, payer..."
          aria-label="Search custom report"
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

      <div className="mt-6 min-w-0 sm:mt-8">
        <DataTable
          columns={columns}
          isBorderlessTable={true}
          rows={filteredRows}
          getRowKey={(r) => r.id}
          gridTemplateColumns={CUSTOM_REPORT_TABLE_GRID_COLUMNS}
          getRowSurfaceClassName={(r) =>
            r.rowHighlight ? "bg-rose-50/90" : undefined
          }
          pagination={{
            page: tablePage,
            onPageChange: setTablePage,
            summaryLabel: "Orders",
            pageSize: 6,
          }}
        />
      </div>

      <DuplicateReportDialogs
        open={duplicateDialogOpen}
        onClose={() => setDuplicateDialogOpen(false)}
        sourceReportTitle="custom report"
      />

      <ReportArchiveDialogs
        confirmOpen={archiveModalOpen}
        onConfirmClose={() => setArchiveModalOpen(false)}
        successOpen={archiveSuccessOpen}
        onSuccessClose={() => setArchiveSuccessOpen(false)}
        onCloseAll={() => {
          setArchiveSuccessOpen(false);
          setArchiveModalOpen(false);
        }}
        reportNoun="Custom Report"
        labelledBy={archiveTitleId}
        describedBy={archiveDescId}
        onConfirmArchive={() => {
          setArchiveSuccessOpen(true);
          setArchiveModalOpen(false);
        }}
      />

      <Dialog
        open={customBuilderOpen}
        onClose={() => setCustomBuilderOpen(false)}
        panelClassName="w-full max-w-[min(100%,1500px)] max-h-[min(95vh,900px)] rounded-[14px] p-0 shadow-[0_8px_40px_rgba(15,23,42,0.12)] sm:rounded-[16px]"
        ariaLabel="Custom Report Builder"
      >
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-none bg-[#F8F9FA] sm:rounded-b-[12px]">
          <CustomReportBuilderStep
            onBack={() => setCustomBuilderOpen(false)}
            onNext={() => setCustomBuilderOpen(false)}
            onClose={() => setCustomBuilderOpen(false)}
          />
        </div>
      </Dialog>
    </div>
  );
}

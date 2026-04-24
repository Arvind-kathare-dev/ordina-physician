"use client";

import { useMemo } from "react";
import Image from "next/image";

import doctorimage from "../../../../assets/images/physician.png";
import { PatientReportRow, patientRowToOrderRow } from "@/data/patientReportStaticData";
import { LABEL_BADGE_STYLES, LabelBadgeVariant } from "@/data/ordersStaticData";
import { DataTableColumn } from "@/components/common/DataTable";
import OutboxNotifyBellWithDialog from "@/components/common/OutboxNotifyBellWithDialog";
import OrderDetailsInfoDialog from "@/components/common/OrderDetailsInfoDialog";


function statusDotClass(dot: PatientReportRow["status"]["dot"]) {
  switch (dot) {
    case "green":
      return "bg-emerald-500";
    case "blue":
      return "bg-sky-500";
    case "purple":
      return "bg-purple-500";
    case "orange":
      return "bg-orange-400";
    case "red":
      return "bg-red-500";
    default:
      return "bg-slate-400";
  }
}

function daysDotClass(dot: PatientReportRow["daysPending"]["dot"]) {
  if (dot === "green") return "bg-emerald-500";
  if (dot === "red") return "bg-red-500";
  return "bg-orange-400";
}

const LabelBadge = ({
  text,
  variant,
}: {
  text: string;
  variant: LabelBadgeVariant;
}) => (
  <div className="relative inline-block h-[40px] w-[32px]">
    <svg
      width="23"
      height="28"
      viewBox="0 0 23 28"
      className={`h-full w-full ${LABEL_BADGE_STYLES[variant]}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M22.5625 0H0V28L11.2812 22.4256L22.5625 28V0Z" />
    </svg>
    <span className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xs font-bold text-white">
      {text}
    </span>
  </div>
);

export function usePatientReportTableColumns(): DataTableColumn<PatientReportRow>[] {
  return useMemo(
    () => [
      {
        key: "date",
        header: "Date",
        allowWrap: true,
        className: "min-w-0",
        cell: (row) => (
          <div className="flex w-full flex-col items-start gap-0.5 text-left">
            <span className="whitespace-nowrap text-[#000000]">
              {row.date}
            </span>
            {row.dateTags && row.dateTags.length > 0 ? (
              <div className="flex absolute bottom-0 left-0 w-full items-stretch gap-0.5">
                {row.dateTags.map((t) => (
                  <span
                    key={t.text}
                    className={`w-fit rounded-tr-[9px] rounded-bl-[9px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] bg-[#528DB5]/[0.09] px-1.5 py-px text-left text-[9px] leading-tight sm:text-[10px] ${t.className}`}
                  >
                    {t.text}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ),
      },
      {
        key: "orderType",
        header: "Order Type",
        className: "min-w-0",
        cell: (row) => (
          <span className="whitespace-nowrap text-[#686464]">{row.orderType}</span>
        ),
      },
      {
        key: "status",
        header: "Status",
        className: "min-w-0",
        cell: (row) => (
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-slate-700 sm:text-sm">
            <span
              className={`h-2 w-2 rounded-full ${statusDotClass(row.status.dot)}`}
              aria-hidden
            />
            {row.status.text}
          </span>
        ),
      },
      {
        key: "physician",
        header: "Physician Name",
        className: "min-w-0",
        cell: (row) => (
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Image
              src={doctorimage}
              className="h-4 w-4"
              alt="Physician"
              width={16}
              height={16}
            />
            <span>{row.physicianName}</span>
          </span>
        ),
      },
      {
        key: "labels",
        header: "Label",
        className: "min-w-0",
        cell: (row) => (
          <div className="flex flex-wrap gap-2">
            {row.labels.map((lb) => (
              <LabelBadge key={lb.text} text={lb.text} variant={lb.variant} />
            ))}
          </div>
        ),
      },
      {
        key: "days",
        header: "#Days",
        className: "min-w-0",
        cell: (row) => (
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-slate-700 sm:text-sm">
            <span
              className={`h-2 w-2 rounded-full ${daysDotClass(row.daysPending.dot)}`}
              aria-hidden
            />
            {row.daysPending.text}
          </span>
        ),
      },
      {
        key: "episode",
        header: "Ep",
        allowWrap: true,
        className: "min-w-0",
        cell: (row) => (
          <div className="flex flex-col items-start gap-0.5 leading-tight">
            <span className="whitespace-nowrap text-[#000000]">
              {row.episode.code}
            </span>
            <span className="whitespace-nowrap text-[10px] text-[#9B9B9B] sm:text-xs">
              {row.episode.range}
            </span>
          </div>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        headerAlign: "center",
        className: "min-w-0",
        cell: (row) => {
          const orderRow = patientRowToOrderRow(row);
          return (
            <div className="flex flex-nowrap items-center gap-1 sm:gap-2">
              <button
                type="button"
                className="cursor-pointer text-[14px] font-medium text-[#528DB5] underline"
              >
                Open
              </button>
              <button
                type="button"
                className="cursor-pointer text-[14px] font-medium text-[#528DB5] underline"
              >
                Resend
              </button>
              <div className="flex flex-nowrap items-center gap-1 text-slate-500 sm:gap-2">
                <OutboxNotifyBellWithDialog row={orderRow} />
                <OrderDetailsInfoDialog row={orderRow} />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
}

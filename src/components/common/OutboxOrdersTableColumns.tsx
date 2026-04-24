"use client";

import { useMemo } from "react";
import Image from "next/image";
import { HiOutlineEye, HiOutlinePhone } from "react-icons/hi";
import LabelAssignDialog from "./LabelAssignDialog";
import OrderDetailsInfoDialog from "./OrderDetailsInfoDialog";
import OutboxNotifyBellWithDialog from "./OutboxNotifyBellWithDialog";
import type { DataTableColumn } from "./DataTable";
import {
  LABEL_BADGE_STYLES,
  LabelBadgeVariant,
  SERVICE_BADGE_STYLES,
  type OrderTableRow,
} from "../../data/ordersStaticData";
import doctorimage from "../../assets/images/physician.png";

function dotClass(dot: OrderTableRow["pending"]["dot"]) {
  return dot === "green" ? "bg-emerald-500" : "bg-orange-400";
}

const LabelBadge = ({ text, variant }: { text: string; variant: LabelBadgeVariant }) => {
  return (
    <div className="relative inline-block w-[32px] h-[40px]">
      <svg width="23" height="28" viewBox="0 0 23 28" className={`${LABEL_BADGE_STYLES[variant]} w-full h-full`} xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5625 0H0V28L11.2812 22.4256L22.5625 28V0Z" />
      </svg>
      <span className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold text-xs">{text}</span>
    </div>
  );
}; 

export function useOutboxOrdersTableColumns(): DataTableColumn<OrderTableRow>[] {
  return useMemo<DataTableColumn<OrderTableRow>[]>(
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
        key: "patient",
        header: "Patient Name",
        className: "min-w-0",
        cell: (row) => (
          <span className="block whitespace-nowrap text-left text-[#686464]">
            {row.patientName}
          </span>
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
        key: "service",
        header: "Service Type",
        className: "min-w-0",
        cell: (row) => (
          <span
            className={`inline-flex shrink-0 whitespace-nowrap rounded-[5px] px-4 flex items-center justify-center sm:h-[26px] h-[20px] text-[10px] font-semibold sm:text-xs ${SERVICE_BADGE_STYLES[row.serviceType.variant]}`}
          >
            {row.serviceType.text}
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
              className="h-[16px] w-[16px]"
              alt="Doctor"
              width={16}
              height={16}
            />
            <span>{row.physicianName}</span>
          </span>
        ),
      },
      {
        key: "labels",
        header: "Labels",
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
        key: "pending",
        header: "Pending Days",
        className: "min-w-0",
        cell: (row) => (
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-slate-700 sm:text-sm">
            <span
              className={`h-2 w-2 rounded-full ${dotClass(row.pending.dot)}`}
              aria-hidden
            />
            {row.pending.text}
          </span>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        headerAlign: "center",
        className: "min-w-0",
        cell: (row) => (
          <div className="flex flex-nowrap items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="underline cursor-pointer text-[#528DB5] text-[14px] font-medium"
            >
              Open
            </button>
            <button
              type="button"
              className="underline cursor-pointer text-[#528DB5] text-[14px] font-medium"
            >
              Resend
            </button>
            <div className="flex flex-nowrap items-center gap-1 text-slate-500 sm:gap-2">
            <OutboxNotifyBellWithDialog row={row} />
              <OrderDetailsInfoDialog row={row} />
              <button
                type="button"
                className="rounded-md cursor-pointer text-[#528DB5]"
                aria-label="View"
              >
                <HiOutlineEye className="h-5 w-5 text-[#528DB5]" />
              </button>
              <LabelAssignDialog row={row} />
              <button
                type="button"
                className="rounded-md cursor-pointer text-[#528DB5]"
                aria-label="Phone"
              >
                <HiOutlinePhone
                  className={`h-5 w-5 ${row.bellUrgent ? "text-[#9B9B9B]" : "text-[#528DB5]"}`}
                />
              </button>
            </div>
          </div>
        ),
      },
    ],
    []
  );
}

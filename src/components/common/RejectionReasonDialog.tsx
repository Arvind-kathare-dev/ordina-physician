"use client";

import { useId, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlineClipboardList } from "react-icons/hi";
import Dialog from "./Dialog";
import type { OrderTableRow } from "../../data/ordersStaticData";
import Image from "next/image";
import reasonIcon from "../../assets/images/action-icons/reason.svg";

interface RejectionReasonDialogProps {
  row: OrderTableRow;
}

export default function RejectionReasonDialog({ row }: RejectionReasonDialogProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        className="rounded-md cursor-pointer p-0.5 shrink-0"
        aria-label="Rejection Reason"
        onClick={() => setOpen(true)}
      >
        <Image src={reasonIcon} alt="Rejection Reason" width={18} height={18} />
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        panelClassName="max-w-[min(100%,680px)] h-[450px] w-full rounded-2xl"
        labelledBy={titleId}
      >
        <div className="flex flex-col bg-white">
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 bg-[#EEF4FA] px-3 h-[58px] sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                className="shrink-0 cursor-pointer rounded-full p-1.5 text-[#333]"
                aria-label="Back"
                onClick={() => setOpen(false)}
              >
                <HiOutlineArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <h2
                id={titleId}
                className="truncate text-sm font-bold text-[#686464] sm:text-base"
              >
                Rejection Reason
              </h2>
            </div>
          </header>

          {/* Content */}
          <div className="px-5 py-8 sm:px-8">
            {/* Info Card */}
            <div className="flex flex-col sm:flex-row gap-4 border border-[#EBEBEB] rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3 flex-1 border-b sm:border-b-0 sm:border-r border-[#EBEBEB] pb-4 sm:pb-0 sm:pr-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E1F0FF] text-[#528DB5]">
                  <HiOutlineClock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B]">
                    Order Date
                  </p>
                  <p className="font-semibold text-[#606060] text-sm sm:text-base">
                    {row.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E1F0FF] text-[#528DB5]">
                  <HiOutlineClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B]">
                    Order Type
                  </p>
                  <p className="font-semibold text-[#606060] text-sm sm:text-base truncate">
                    {row.orderType}
                  </p>
                </div>
              </div>
            </div>

            {/* Rejection Details */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9B9B9B] mb-3">
                Reason of Rejection
              </p>
              <p className="text-xs sm:text-sm text-[#606060] leading-relaxed">
                The order could not be processed due to incomplete or incorrect details provided at the time of submission. Please review all information and ensure accuracy before placing the order again. If the issue persists, contact support for further assistance.
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

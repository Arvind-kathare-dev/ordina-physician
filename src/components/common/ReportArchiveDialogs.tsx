"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiCheck } from "react-icons/hi";
import Dialog from "./Dialog";
import archiveModalImage from "../../assets/images/report/archive-image.png";
import { useRouter } from "next/navigation";

type ReportArchiveDialogsProps = {
  confirmOpen: boolean;
  onConfirmClose: () => void;
  successOpen: boolean;
  onSuccessClose: () => void;
  onCloseAll: () => void;
  reportNoun: string;
  labelledBy: string;
  describedBy: string;
  onConfirmArchive: () => void;
  archiveHref?: string;
};

export default function ReportArchiveDialogs({
  confirmOpen,
  onConfirmClose,
  successOpen,
  onSuccessClose,
  onCloseAll,
  reportNoun,
  labelledBy,
  describedBy,
  onConfirmArchive,
  archiveHref = "/reports/archive",
}: ReportArchiveDialogsProps) {
  const router = useRouter();
  return (
    <>
      <Dialog
        open={confirmOpen}
        onClose={onConfirmClose}
        panelClassName="max-w-[min(100%,420px)] rounded-[28px] p-0 shadow-[0_8px_40px_rgba(15,23,42,0.12)] sm:rounded-[32px]"
        labelledBy={labelledBy}
        describedBy={describedBy}
        ariaLabel="Confirm archive"
      >
        <div className="relative bg-white px-5 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
          <button
            type="button"
            className="mb-2 inline-flex cursor-pointer rounded-lg p-1.5 text-neutral-900 transition hover:bg-slate-100"
            aria-label="Go back"
            onClick={onConfirmClose}
          >
            <HiArrowLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex flex-col items-center text-center">
            <Image
              src={archiveModalImage}
              alt=""
              width={100}
              height={100}
              className="mb-5 h-[80px] w-[80px] object-contain"
            />

            <h2
              id={labelledBy}
              className="text-xl font-semibold text-[#000000] sm:text-2xl"
            >
              Are you sure?
            </h2>
            <p
              id={describedBy}
              className="mt-2 max-w-sm text-sm leading-relaxed text-[#9B9B9B] sm:text-[15px]"
            >
              Are you sure you want to archive this {reportNoun} report?
            </p>

            <div className="mt-8 flex w-full gap-3 sm:mt-9 sm:gap-4">
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-slate-50"
                onClick={onConfirmClose}
              >
                No, Go back
              </button>
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-xl bg-gradient-to-b from-[#579EBA] to-[#4F81B2] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-[0.97]"
                onClick={onConfirmArchive}
              >
                Yes, Archive
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {successOpen ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-black/45 transition-opacity"
            aria-label="Dismiss overlay"
            onClick={onSuccessClose}
          />
          <div
            className="relative z-10 flex w-full max-w-5xl flex-col gap-3s border-[0.5px] border-slate-200/90 bg-white py-3 pl-3 pr-3 shadow-[0_12px_40px_rgba(15,23,42,0.18)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3.5 sm:pl-4 sm:pr-4"
            role="status"
          >
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                <HiCheck className="h-5 w-5" aria-hidden strokeWidth={2.5} />
              </span>
              <p className="min-w-0 pt-0.5 text-left text-sm leading-snug text-[#686464] sm:pt-0 sm:text-[15px]">
                {reportNoun} report archived successfully. You can view this in
                the Archive Reports section.
              </p>
            </div>
            <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
              <button
                className="inline-flex cursor-pointer items-center justify-center rounded-lg border-[0.5px] border-[#BFBFBF] bg-white px-3 py-2 text-xs font-semibold text-[#686464] transition hover:bg-slate-50 sm:px-4 sm:text-sm"
                onClick={() => {
                  router.push("/reports/archive");
                  onCloseAll();
                }}
              >
                View Archive Reports
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-gradient-to-b from-[#6BA9D6] to-[#2E7AAF] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4f92b4] sm:text-sm"
                onClick={onCloseAll}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

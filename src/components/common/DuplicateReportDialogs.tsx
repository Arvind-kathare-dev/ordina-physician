"use client";

import { useEffect, useId, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import Dialog from "./Dialog";
import Image from "next/image";
import duplicateReportDialogIcon from "../../assets/images/report/archive-image.png";

type DuplicateReportDialogsProps = {
  open: boolean;
  onClose: () => void;
  sourceReportTitle?: string;
  onDuplicateConfirm?: (duplicateName: string) => void;
};

export default function DuplicateReportDialogs({
  open,
  onClose,
  sourceReportTitle = "custom report",
  onDuplicateConfirm,
}: DuplicateReportDialogsProps) {
  const [step, setStep] = useState<"name" | "confirm">("name");
  const [duplicateName, setDuplicateName] = useState("");

  const nameDialogTitleId = useId();
  const nameFieldId = useId();
  const confirmTitleId = useId();
  const confirmDescId = useId();

  useEffect(() => {
    if (open) {
      setStep("name");
      setDuplicateName("");
    }
  }, [open]);

  const trimmedName = duplicateName.trim();
  const canSubmitName = trimmedName.length > 0;

  const handleBackFromName = () => {
    onClose();
  };

  const handleBackFromConfirm = () => {
    setStep("name");
  };

  const handleCreateDuplicate = () => {
    if (!canSubmitName) return;
    setStep("confirm");
  };

  const handleYes = () => {
    onDuplicateConfirm?.(trimmedName);
    onClose();
  };

  const primaryBtnClass =
    "inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-b from-[#579EBA] to-[#4F81B2] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-[0.97]";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      panelClassName="max-w-[min(100%,420px)] !rounded-[12px] p-0 shadow-[0_8px_40px_rgba(15,23,42,0.12)] sm:!rounded-[14px]"
      labelledBy={step === "name" ? nameDialogTitleId : confirmTitleId}
      describedBy={step === "confirm" ? confirmDescId : undefined}
      ariaLabel={step === "name" ? "Duplicate report" : "Confirm duplicate report"}
    >
      {step === "name" ? (
        <div className="relative bg-white px-5 pb-6 pt-4 sm:px-7 sm:pb-8 sm:pt-5">
          <div className="mb-1 flex items-center gap-2">
            <button
              type="button"
              className="-ml-1 inline-flex cursor-pointer rounded-lg p-1.5 text-neutral-800 transition hover:bg-slate-100"
              aria-label="Go back"
              onClick={handleBackFromName}
            >
              <HiArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <h2
              id={nameDialogTitleId}
              className="text-base font-semibold text-neutral-800 sm:text-lg"
            >
              Duplicate Report
            </h2>
          </div>

          <div className="mt-5">
            <label
              htmlFor={nameFieldId}
              className="mb-2 block text-sm text-[#686464]"
            >
              Name for Duplicate Report{" "}
              <span className="text-red-500" aria-hidden>
                *
              </span>
            </label>
            <input
              id={nameFieldId}
              type="text"
              value={duplicateName}
              onChange={(e) => setDuplicateName(e.target.value)}
              placeholder="Write name here"
              autoComplete="off"
              className="h-11 w-full rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white px-3 text-sm text-neutral-900 placeholder:text-[#C4C4C4] outline-none ring-0 transition focus:border-[#579EBA] focus:ring-[1px] focus:ring-[#579EBA]"
            />
          </div>

          <div className="mt-8 flex justify-end sm:mt-9">
            <button
              type="button"
              disabled={!canSubmitName}
              className={`${primaryBtnClass} disabled:pointer-events-none disabled:opacity-40`}
              onClick={handleCreateDuplicate}
            >
              Create Duplicate
            </button>
          </div>
        </div>
      ) : (
        <div className="relative bg-white px-5 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
          <button
            type="button"
            className="mb-2 inline-flex cursor-pointer rounded-lg p-1.5 text-neutral-900 transition hover:bg-slate-100"
            aria-label="Go back"
            onClick={handleBackFromConfirm}
          >
            <HiArrowLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex flex-col items-center text-center">
           <Image src={duplicateReportDialogIcon} alt="Duplicate report" width={88} height={88} />

            <h2
              id={confirmTitleId}
              className="text-xl mt-8 font-semibold text-[#000000] sm:text-2xl"
            >
              Are you sure?
            </h2>
            <p
              id={confirmDescId}
              className="mt-2 max-w-xs text-sm leading-relaxed text-[#9B9B9B] sm:text-[15px]"
            >
              Are you sure you want to duplicate this {sourceReportTitle} to{" "}
              <span className="font-medium text-[#686464]">{trimmedName}</span>?
            </p>

            <div className="mt-5 flex w-full gap-3 sm:mt-6 sm:gap-4">
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-xl border-[0.5px] border-slate-200 bg-white py-3 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-slate-50"
                onClick={handleBackFromConfirm}
              >
                No, Go back
              </button>
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-xl bg-gradient-to-b from-[#579EBA] to-[#4F81B2] py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-[0.97]"
                onClick={handleYes}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}

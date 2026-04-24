"use client";

import Dialog from "@/components/common/Dialog";
import { useId, useState } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiChevronDown,
  HiOutlineInformationCircle,
  HiX,
} from "react-icons/hi";
import CustomReportBuilderStep from "./CustomReportBuilderStep";

const PRESET_OPTIONS = [
  {
    id: "total-active",
    title: "Total Active Orders",
    description:
      "The total number of orders currently open in the system, including all pending, in-progress, and under-review cases.",
  },
  {
    id: "in-progress",
    title: "Orders In Progress",
    description:
      "Orders that are actively being processed by staff and are moving toward completion.",
  },
  {
    id: "physician-sig",
    title: "Pending Physician Signature",
    description:
      "Orders awaiting review and official signature from the physician before they can proceed.",
  },
  {
    id: "patient-confirm",
    title: "Awaiting Patient Confirmation",
    description:
      "Orders that require confirmation, approval, or additional information from the patient.",
  },
  {
    id: "under-review",
    title: "Orders Under Review",
    description:
      "The total number of orders currently open in the system, including all pending, in-progress, and under-review cases.",
  },
] as const;

type Phase = "select" | "wizard";
type WizardStep = 1 | 2 | 3;

const PRIMARY = "#5B92B9";

function Stepper({ step }: { step: WizardStep }) {
  const items: { n: WizardStep; label: string }[] = [
    { n: 1, label: "Details" },
    { n: 2, label: "Widgets" },
    { n: 3, label: "Preview" },
  ];
  return (
    <div
      className="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2"
      role="navigation"
      aria-label="Report builder steps"
    >
      {items.map((item) => {
        const active = step === item.n;
        return (
          <div
            key={item.n}
            className={`inline-flex items-center border-[0.5px] gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold sm:text-[11px] ${active
                ? "bg-[#528DB517]  border-[#579EBA7D] text-[#2b78b8]"
                : "bg-white border-[#D1D5DB] text-[#858585]"
              }`}
          >
            <span
              className={`flex h-5 w-5 items-center border-[0.5px] justify-center rounded-full text-[10px] font-semibold sm:text-[11px] ${active ? "bg-[#528DB5] border-[#528DB5] text-white" : "bg-white border-[#D1D5DB] text-[#858585]"
                }`}
            >
              <span>{item.n}</span>
            </span>
            <span className="whitespace-nowrap">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export type QuickReportBuilderModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function QuickReportBuilderModal({
  open,
  onClose,
}: QuickReportBuilderModalProps) {
  const titleId = useId();
  const descId = useId();
  const [phase, setPhase] = useState<Phase>("select");
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [reportName, setReportName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("Team");
  const [pinToTop, setPinToTop] = useState("No");
  const [detailsError, setDetailsError] = useState<string | null>(null);

  function togglePreset(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleCreateCustom() {
    setPhase("wizard");
    setWizardStep(1);
    setDetailsError(null);
  }

  function handleNextFromDetails() {
    const d = description.trim();
    if (d.length < 8) {
      setDetailsError(
        "Description should be at least 8 characters (1 short line)."
      );
      return;
    }
    setDetailsError(null);
    setWizardStep(2);
  }

  const panelClass =
    phase === "wizard" && wizardStep === 2
      ? "w-full max-w-[min(100%,1500px)] max-h-[min(95vh,900px)] rounded-[14px] p-0 shadow-[0_8px_40px_rgba(15,23,42,0.12)] sm:rounded-[16px]"
      : "w-full max-w-[min(100%,640px)] max-h-[min(90vh,720px)] rounded-[14px] p-0 shadow-[0_8px_40px_rgba(15,23,42,0.12)] sm:max-w-[680px] sm:rounded-[16px]";

  const labelClass =
    "mb-1 block text-[10px] font-sembold uppercase tracking-wide text-[#9B9B9B] sm:text-[13px]";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      panelClassName={panelClass}
      labelledBy={titleId}
      describedBy={descId}
      ariaLabel="Quick Report Builder"
    >
      {wizardStep === 2 ? (
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-none bg-[#F8F9FA] sm:rounded-b-[12px]">
          <CustomReportBuilderStep
            onBack={() => setWizardStep(1)}
            onNext={() => setWizardStep(3)}
            onClose={onClose}
          />
        </div>
      ) : null}

      {wizardStep === 1 ? (
        <div
          className="flex min-h-0 flex-col max-h-[min(90vh,720px)]"
        >
          <div className="shrink-0 border-b border-[#E0E0E0] bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2
                    id={titleId}
                    className="text-[17px] font-semibold leading-tight text-[#606060] sm:text-lg"
                  >
                    Quick Report Builder
                  </h2>
                  {phase === "select" ? (
                    <button
                      type="button"
                      className="shrink-0 rounded-lg p-1.5 text-[#555] transition hover:bg-slate-100"
                      aria-label="Close"
                      onClick={onClose}
                    >
                      <HiX className="h-5 w-5" aria-hidden />
                    </button>
                  ) : null}
                </div>
                <p
                  id={descId}
                  className="mt-1.5 text-[12px] leading-snug text-[#858585] sm:text-[13px]"
                >
                  Define what shows when someone clicks the report: tiles,
                  charts, tables, and the metric logic behind them.
                </p>
              </div>
              {phase === "wizard" ? (
                <div className="sm:pt-0.5">
                  <Stepper step={wizardStep} />
                </div>
              ) : null}
            </div>
          </div>

          {phase === "select" ? (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto bg-[#F8F9FA] p-5">
                <p className="mb-4 text-[14px] font-semibold text-[#303030]">
                  Select from below or create custom
                </p>
                <ul className="flex flex-col gap-3">
                  {PRESET_OPTIONS.map((opt) => {
                    const checked = !!selected[opt.id];
                    return (
                      <li key={opt.id}>
                        <button
                          type="button"
                          onClick={() => togglePreset(opt.id)}
                          className={`flex w-full cursor-pointer items-start gap-3 rounded-[10px] border-[0.5px] bg-white p-3.5 text-left shadow-sm transition border-[#D1D5DB]`}
                        >
                          <span
                            className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border-[0.5px] border-[#D1D5DB] ${checked ? "border-[#528DB5] bg-[#528DB5]" : ""}`}
                            aria-hidden
                          >
                            {checked ? (
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden
                              >
                                <path
                                  d="M2 6l3 3 5-6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : null}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[14px] font-semibold text-[#606060]">
                              {opt.title}
                            </span>
                            <span className="mt-1 block text-[12px] leading-relaxed text-[#858585]">
                              {opt.description}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="shrink-0 border-t border-[#E0E0E0] bg-white px-5 py-4 sm:px-7">
                <div className="flex flex-col-reverse items-stretch justify-end gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center cursor-pointer justify-center rounded-lg border-[0.5px] border-[#528DB5] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#528DB5] transition"
                    onClick={handleCreateCustom}
                  >
                    Create Custom Report
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center cursor-pointer bg-[#528DB5] border-[0.5px] border-[#528DB5] justify-center rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition"
                    onClick={onClose}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto bg-[#F8F9FA] p-5">
                {wizardStep === 1 ? (
                  <div className="rounded-[12px] border-[0.5px] border-[#DDDDDD] bg-white p-5 shadow-sm">
                    <h3 className="mb-5 text-[15px] font-semibold text-[#303030] sm:text-base">
                      Report details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="qrb-report-name" className={labelClass}>
                          Report name
                        </label>
                        <input
                          id="qrb-report-name"
                          type="text"
                          placeholder="My Quick Report"
                          value={reportName}
                          onChange={(e) => setReportName(e.target.value)}
                          className="w-full rounded-lg border-[0.5px] border-[#D1D5DB] bg-white px-3 py-2.5 text-[14px] text-[#333] placeholder:text-[#9ca3af] focus:border-[#5B92B9] focus:outline-none focus:ring-2 focus:ring-[#5B92B9]/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="qrb-desc" className={labelClass}>
                          Short description
                        </label>
                        <textarea
                          id="qrb-desc"
                          rows={3}
                          placeholder="1-2 lines: what this report is for"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                            if (detailsError) setDetailsError(null);
                          }}
                          className="w-full resize-y rounded-lg border-[0.5px] border-[#D1D5DB] bg-white px-3 py-2.5 text-[14px] text-[#333] placeholder:text-[#9ca3af] focus:border-[#5B92B9] focus:outline-none focus:ring-2 focus:ring-[#5B92B9]/20"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="qrb-vis" className={labelClass}>
                            Visibility
                          </label>
                          <div className="relative">
                            <select
                              id="qrb-vis"
                              value={visibility}
                              onChange={(e) => setVisibility(e.target.value)}
                              className="w-full appearance-none rounded-lg border-[0.5px] border-[#D1D5DB] bg-white px-3 py-2.5 pr-9 text-[14px] text-[#333] focus:border-[#5B92B9] focus:outline-none focus:ring-2 focus:ring-[#5B92B9]/20"
                            >
                              <option>Team</option>
                              <option>Private</option>
                              <option>Organization</option>
                            </select>
                            <HiChevronDown
                              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]"
                              aria-hidden
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="qrb-pin" className={labelClass}>
                            Pin to top
                          </label>
                          <div className="relative">
                            <select
                              id="qrb-pin"
                              value={pinToTop}
                              onChange={(e) => setPinToTop(e.target.value)}
                              className="w-full appearance-none rounded-lg border-[0.5px] border-[#D1D5DB] bg-white px-3 py-2.5 pr-9 text-[14px] text-[#333] focus:border-[#5B92B9] focus:outline-none focus:ring-2 focus:ring-[#5B92B9]/20"
                            >
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                            <HiChevronDown
                              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]"
                              aria-hidden
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-[12px] leading-relaxed text-[#858585]">
                      This builder saves a report template. When clicked later, it
                      runs with your saved filter payload. (In production: store
                      in DB as JSON.)
                    </p>

                    {detailsError ? (
                      <div
                        className="mt-4 rounded-lg border-[0.5px] border-[#FF383C4D] bg-[#FF383C0D] px-3 py-2.5 text-[13px] text-[#FF383C]"
                        role="alert"
                      >
                        <span className="font-medium">Fix these:</span>
                        <ul className="mt-1 list-disc pl-5">
                          <li>{detailsError}</li>
                        </ul>
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-row items-stretch gap-2.5">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center cursor-pointer gap-1.5 rounded-lg border-[0.5px] border-[#E0E0E0] bg-white px-4 py-2.5 text-[13px] font-medium text-[#4b5563] transition hover:bg-slate-50"
                        onClick={() => {
                          setPhase("select");
                          setDetailsError(null);
                        }}
                      >
                        <HiArrowLeft className="h-4 w-4" aria-hidden />
                        Back
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center cursor-pointer gap-1.5 rounded-lg border-[0.5px] border-[#528DB5] bg-[#528DB5] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition"
                        style={{ backgroundColor: PRIMARY }}
                        onClick={handleNextFromDetails}
                      >
                        Next
                        <HiArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="shrink-0 border-t border-[#E0E0E0] bg-white px-5 py-4 sm:px-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-start gap-2 text-[12px] leading-snug text-[#6b7280] sm:max-w-[75%]">
                    <HiOutlineInformationCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#5B92B9]"
                      aria-hidden
                    />
                    <span>
                      The mistake to avoid: saving only filters. A quick report
                      must also save what to show (widgets) and how to calculate
                      them (metric settings).
                    </span>
                  </p>
                  <button
                    type="button"
                    className="inline-flex shrink-0 items-center justify-center self-end rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-[13px] font-medium text-[#4b5563] transition hover:bg-slate-50 sm:self-auto"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </Dialog>
  );
}

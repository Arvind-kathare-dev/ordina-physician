"use client";

import { useEffect, useState } from "react";
import Dialog from "../../components/common/Dialog";
import CustomReportBuilderStep from "../components/CustomReportBuilderStep";

const ARCHIVE_PAGE = {
  title: "Archive Reports",
  subtitle:
    "Break pending by aging buckets and surface the backlog risk (30+ days) immediately.",
} as const;

const CARD_BODY =
  "Break patient by aging buckets and surface the backlog risk (30+ days) immediately.";

const ARCHIVED_REPORT_CARDS = Array.from({ length: 6 }, (_, i) => ({
  id: `archive-${i + 1}`,
  title: "Patient Report" as const,
  description: CARD_BODY,
}));

export default function ArchiveReportsPage() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [blockOuterClose, setBlockOuterClose] = useState(false);

  const openCard =
    ARCHIVED_REPORT_CARDS.find((c) => c.id === openCardId) ?? null;
  const builderOpen = openCard !== null;

  useEffect(() => {
    if (!builderOpen) setBlockOuterClose(false);
  }, [builderOpen]);

  return (
    <div className="min-w-0 rounded-xl bg-[white] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-5 md:rounded-2xl md:p-6">
      <header className="pb-6">
        <h1 className="text-lg font-semibold tracking-tight text-[#606060] sm:text-xl">
          {ARCHIVE_PAGE.title}
        </h1>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-[#858585] sm:mt-1.5 sm:text-sm">
          {ARCHIVE_PAGE.subtitle}
        </p>
      </header>

      <div className="min-w-0 " aria-label="Archived reports list">
        <ul className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHIVED_REPORT_CARDS.map((card) => (
            <li key={card.id} className="min-w-0">
              <button
                type="button"
                onClick={() => setOpenCardId(card.id)}
                className="flex min-h-33 w-full min-w-0 flex-col rounded-xl border-[0.5px] border-[#BFBFBF] bg-[#F8F8F8] p-5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none ring-[#1696C8]/30 transition focus-visible:ring-2 sm:min-h-35 cursor-pointer hover:bg-[#F0F0F0]"
              >
                <span className="text-base font-semibold text-neutral-900 sm:text-[17px]">
                  {card.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-[#858585]">
                  {card.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog
        open={builderOpen}
        onClose={() => {
          if (blockOuterClose) return;
          setOpenCardId(null);
        }}
        panelClassName="w-full max-w-[min(100%,1500px)] max-h-[min(95vh,900px)] rounded-[14px] p-0 shadow-[0_8px_40px_rgba(15,23,42,0.12)] sm:rounded-[16px]"
        ariaLabel="Archived custom report builder"
      >
        <div className="flex h-full min-h-0 max-h-[min(95vh,900px)] flex-1 flex-col overflow-hidden rounded-none bg-[#F8F9FA] sm:rounded-b-[12px]">
          {openCard ? (
            <CustomReportBuilderStep
              isArchived
              reportHeading={openCard.title}
              reportDescription={openCard.description}
              onSaveConfirmOpenChange={setBlockOuterClose}
              onBack={() => setOpenCardId(null)}
              onNext={() => setOpenCardId(null)}
              onClose={() => setOpenCardId(null)}
            />
          ) : null}
        </div>
      </Dialog>
    </div>
  );
}

"use client";

export type ReportStatSummaryBucket = { label: string; value: number };

export type ReportStatSummaryCard = {
  id: string;
  label: string;
  value: number;
  buckets?: readonly ReportStatSummaryBucket[] | null;
};

type ReportStatSummaryGridProps = {
  cards: readonly ReportStatSummaryCard[];
  className?: string;
};

export default function ReportStatSummaryGrid({
  cards,
  className = "",
}: ReportStatSummaryGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`.trim()}
      role="list"
    >
      {cards.map((card) => (
        <div
          key={card.id}
          role="listitem"
          className="rounded-xl border-[0.5px] border-[#E0E0E0] bg-white p-4 shadow-sm"
        >
          {card.buckets && card.buckets.length > 0 ? (
            <div className="flex min-w-0 gap-3">
              <div className="min-w-0 max-w-27.5 w-fit shrink-0 wrap-break-word">
                <p className="text-[11px]  font-semibold max-w-[120px] uppercase tracking-wide text-[#9B9B9B] sm:text-[13px]">
                  {card.label}
                </p>
                <p className="mt-1 text-2xl font-semibold tabular-nums text-[#686464] sm:text-[26px]">
                  {card.value}
                </p>
              </div>
              <div className="ml-auto w-fit min-w-0 shrink-0">
                <ul className="flex w-fit shrink-0 flex-col items-end gap-1 text-[9px] leading-tight text-[#9B9B9B] sm:text-[10px]">
                  {card.buckets.map((b) => (
                    <li
                      key={b.label}
                      className="flex justify-end w-fit shrink-0 text-center bg-[#579EBA12] p-2 py-1 rounded-lg text-[#738AA5] gap-2 tabular-nums"
                    >
                      <span className="text-[#738AA5]">{b.label}:</span>
                      <span className="font-medium text-[#738AA5]">
                        {b.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9B9B9B] sm:text-[13px]">
                {card.label}
              </p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-[#686464] sm:text-[26px]">
                {card.value}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

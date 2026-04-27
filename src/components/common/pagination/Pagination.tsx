"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  label?: string; // e.g. "eFax"
  onPageChange: (page: number) => void;
};

export default function MinimalPagination({
  currentPage,
  totalPages,
  totalItems,
  label = "Items",
  onPageChange,
}: PaginationProps) {
  const navBtnClass =
    "inline-flex size-7 cursor-pointer shrink-0 items-center justify-center rounded-full bg-[#E8E8E8] text-[#686464] transition hover:bg-[#DCDCDC] disabled:pointer-events-none disabled:opacity-35 sm:size-8";

  // Calculate shown count based on a hardcoded PAGE_SIZE of 4 since it's used in orders/efax pages
  // (In a real app, pageSize should be passed as a prop, but we'll approximate it here to match the UI)
  const pageSize = 4;
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, totalItems);
  const shownCount = totalItems === 0 ? 0 : end - start;

  return (
    <div
      className="grid w-full min-w-0 grid-cols-1 items-center gap-3 px-0 py-3 text-[12px] text-[#686464] sm:grid-cols-[1fr_auto_1fr] sm:gap-y-0 sm:py-3.5 sm:text-xs"
      role="navigation"
      aria-label="Table pagination"
    >
      <p className="text-center sm:justify-self-start sm:text-left">
        <span className="font-medium text-[#4a4a4a]">
          {label} ({shownCount}/{totalItems})
        </span>
      </p>

      <div className="flex items-center justify-center gap-3 sm:justify-self-center sm:gap-4">
        <button
          type="button"
          className={navBtnClass}
          disabled={currentPage === 1}
          aria-label="Previous page"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          <ChevronLeft className="size-4 sm:size-[18px]" aria-hidden />
        </button>
        <span className="text-center font-medium tabular-nums text-[#4a4a4a] sm:text-sm">
          {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className={navBtnClass}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Next page"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          <ChevronRight className="size-4 sm:size-[18px]" aria-hidden />
        </button>
      </div>

      <div className="hidden sm:block sm:min-w-0" aria-hidden />
    </div>
  );
}

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
  return (
    <div className="flex items-center justify-between text-xs text-gray-500 px-2 py-1 mt-3">
      {/* LEFT TEXT */}
      <span>
        {label} ({currentPage}/{totalItems})
      </span>

      {/* CENTER CONTROLS */}
      <div className="flex items-center gap-3">
        {/* PREV */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
        >
          <ChevronLeft size={14} />
        </button>

        {/* PAGE INFO */}
        <span className="text-gray-600 font-medium">
          {currentPage} of {totalPages}
        </span>

        {/* NEXT */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

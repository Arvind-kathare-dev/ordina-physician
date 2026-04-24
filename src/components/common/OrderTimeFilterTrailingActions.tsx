"use client";

import { HiOutlineAdjustments, HiOutlineSortAscending } from "react-icons/hi";

const iconButtonClassName =
  "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 sm:h-8 sm:w-8 sm:rounded-lg";

const iconClassName = "h-3.5 w-3.5 sm:h-4 sm:w-4";

type OrderTimeFilterTrailingActionsProps = {
  filterDialogOpen: boolean;
  onOpenFilters: () => void;
};

export function OrderTimeFilterTrailingActions({
  filterDialogOpen,
  onOpenFilters,
}: OrderTimeFilterTrailingActionsProps) {
  return (
    <>
      <button
        type="button"
        className={iconButtonClassName}
        aria-label="Sort"
      >
        <HiOutlineSortAscending className={iconClassName} />
      </button>
      <button
        type="button"
        className={iconButtonClassName}
        aria-label="Filters"
        aria-expanded={filterDialogOpen}
        aria-haspopup="dialog"
        onClick={onOpenFilters}
      >
        <HiOutlineAdjustments className={iconClassName} />
      </button>
    </>
  );
}

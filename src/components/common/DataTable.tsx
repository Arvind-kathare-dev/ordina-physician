"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  gridWidth?: string;
  className?: string;
  headerAlign?: "left" | "center" | "right";
  allowWrap?: boolean;
  /** Hides the default column chevron when `showHeaderChevron` is true. */
  suppressHeaderChevron?: boolean;
  /** Renders after the header label (e.g. sort affordance). */
  headerTrailing?: ReactNode;
  cell: (row: T) => ReactNode;
};

export type DataTablePagination = {
  page: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  summaryLabel?: string;
  totalCount?: number;
};

type DataTableProps<T> = {
  title?: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  gridTemplateColumns?: string;
  colNumber?: number;
  headerClassName?: string;
  rowCellClassName?: string;
  rowCardSurfaceClassName?: string;
  getRowSurfaceClassName?: (row: T) => string | undefined;
  isBorderlessTable?: boolean;
  showHeaderChevron?: boolean;
  pagination?: DataTablePagination;
  tableMinWidth?: string;
};

function defaultGridTemplate(colCount: number) {
  return `repeat(${colCount}, minmax(0, 1fr))`;
}

function columnsGridTemplate<T>(columns: DataTableColumn<T>[]) {
  const widths = columns.map((c) => c.gridWidth);
  if (widths.every(Boolean)) {
    return widths.join(" ");
  }
  return defaultGridTemplate(columns.length);
}

function DataTablePaginationBar({
  summaryLabel,
  shownCount,
  totalItems,
  activePage,
  totalPages,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  summaryLabel: string;
  shownCount: number;
  totalItems: number;
  activePage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  const navBtnClass =
    "inline-flex size-7 cursor-pointer shrink-0 items-center justify-center rounded-full bg-[#E8E8E8] text-[#686464] transition hover:bg-[#DCDCDC] disabled:pointer-events-none disabled:opacity-35 sm:size-8";

  return (
    <div
      className="grid w-full min-w-0 grid-cols-1 items-center gap-3 px-0 py-3 text-[12px] text-[#686464] sm:grid-cols-[1fr_auto_1fr] sm:gap-y-0 sm:py-3.5 sm:text-xs"
      role="navigation"
      aria-label="Table pagination"
    >
      <p className="text-center sm:justify-self-start sm:text-left">
        <span className="font-medium text-[#4a4a4a]">
          {summaryLabel} ({shownCount}/{totalItems})
        </span>
      </p>

      <div className="flex items-center justify-center gap-3 sm:justify-self-center sm:gap-4">
        <button
          type="button"
          className={navBtnClass}
          disabled={!canPrev}
          aria-label="Previous page"
          onClick={onPrev}
        >
          <HiChevronLeft className="size-4 sm:size-[18px]" aria-hidden />
        </button>
        <span className="text-center font-medium tabular-nums text-[#4a4a4a] sm:text-sm">
          {activePage} of {totalPages}
        </span>
        <button
          type="button"
          className={navBtnClass}
          disabled={!canNext}
          aria-label="Next page"
          onClick={onNext}
        >
          <HiChevronRight className="size-4 sm:size-[18px]" aria-hidden />
        </button>
      </div>

      <div className="hidden sm:block sm:min-w-0" aria-hidden />
    </div>
  );
}

export default function DataTable<T>({
  title,
  columns,
  isBorderlessTable = false,
  rows,
  getRowKey,
  gridTemplateColumns,
  headerClassName = "bg-[linear-gradient(180deg,#579EBA_0%,#4F81B2_100%)] shadow-[0px_3px_0px_rgba(0,0,0,0.25)] text-white rounded-[10px]",
  rowCellClassName = "text-left text-[12px] text-[#686464] sm:text-sm",
  rowCardSurfaceClassName = "bg-white",
  getRowSurfaceClassName,
  showHeaderChevron = true,
  pagination,
  tableMinWidth,
}: DataTableProps<T>) {
  const colCount = columns.length;
  const cols =
    gridTemplateColumns?.trim() || columnsGridTemplate(columns);
  const thBase =
    "text-[10px] font-semibold  tracking-wide sm:text-xs md:text-sm ";
  const gridPad = "px-3 sm:px-3.5";
  const gapX = "gap-x-0";

  const pageSize = pagination?.pageSize ?? 6;
  const totalItems = pagination?.totalCount ?? rows.length;

  const { displayRows, activePage, totalPages, shownCount } = useMemo(() => {
    if (!pagination) {
      return {
        displayRows: rows,
        activePage: 1,
        totalPages: 1,
        shownCount: rows.length,
      };
    }
    const tp = Math.max(1, Math.ceil(totalItems / pageSize));
    const ap = Math.min(Math.max(1, pagination.page), tp);
    const start = (ap - 1) * pageSize;
    const slice = rows.slice(start, start + pageSize);
    return {
      displayRows: slice,
      activePage: ap,
      totalPages: tp,
      shownCount: slice.length,
    };
  }, [pagination, rows, totalItems, pageSize]);

  const canPrev = Boolean(pagination) && activePage > 1;
  const canNext = Boolean(pagination) && activePage < totalPages;

  const onPrev = () => {
    if (pagination && canPrev) pagination.onPageChange(activePage - 1);
  };
  const onNext = () => {
    if (pagination && canNext) pagination.onPageChange(activePage + 1);
  };

  const b = isBorderlessTable;

  return (
    <div className="w-full min-w-0">
      {title ? (
        <h3 className="text-sm font-semibold text-[#606060] tracking-wide sm:text-[16px]">
          {title}
        </h3>
      ) : null}
      <div className={`-mx-3 min-w-0 sm:mx-0 ${title ? "mt-3" : ""}`}>
        <div className="min-w-0 overflow-x-auto overscroll-x-contain px-3 [-webkit-overflow-scrolling:touch] sm:px-0">
          <div
            className={
              b
                ? "block w-max min-w-full max-w-full align-top"
                : "block w-full min-w-0 align-top"
            }
          >
            <table className={`w-full border-collapse text-left ${tableMinWidth ? tableMinWidth : "min-w-0"}`}>
              <thead>
                <tr>
                  <th
                    colSpan={colCount}
                    scope="colgroup"
                    className={`overflow-hidden p-0 ${headerClassName} ${b ? "rounded-t-[10px] rounded-b-none !shadow-none border-0 border-b-[3px] border-[#BFBFBF]" : "rounded-[10px]"
                      }`}
                  >
                    <div
                      className={`grid h-[32px] w-full items-center  justify-items-stretch sm:h-[40px] ${gapX} ${gridPad} ${b
                        ? "rounded-none border-0 border-b border-white/25 shadow-none"
                        : "rounded-[10px] border border-[#BFBFBF] shadow-[0px_3px_0px_rgba(0,0,0,0.10)]"
                        }`}
                      style={{ gridTemplateColumns: cols }}
                    >
                      {columns.map((col) => {
                        const thAlign =
                          col.headerAlign === "center"
                            ? "flex justify-center text-center"
                            : col.headerAlign === "right"
                              ? "flex justify-end text-right"
                              : "text-left";
                        return (
                          <div
                            key={col.key}
                            id={`dt-col-${col.key}`}
                            role="columnheader"
                            className={`min-w-0  ${thAlign} ${thBase} ${col.className ?? ""}`}
                          >
                            <span className="inline-flex min-w-0 items-center gap-0.5 whitespace-nowrap sm:gap-1">
                              <span>{col.header}</span>
                              {showHeaderChevron &&
                                !col.suppressHeaderChevron &&
                                col.header !== "Status" ? (
                                <HiChevronDown
                                  className="h-3 w-3 shrink-0 opacity-90 sm:h-3.5 sm:w-3.5"
                                  aria-hidden
                                />
                              ) : null}
                              {col.headerTrailing ?? null}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayRows.map((row, rowIndex) => {
                  const customSurface = getRowSurfaceClassName?.(row)?.trim();
                  const mergedSurface =
                    customSurface && customSurface.length > 0
                      ? customSurface
                      : rowCardSurfaceClassName;
                  const borderlessHover =
                    b && !customSurface ? "hover:bg-slate-50/70" : "";

                  return (
                    <tr key={getRowKey(row)}>
                      <td
                        colSpan={colCount}
                        className={
                          b
                            ? "border-0 border-b border-[#E5E7EB] bg-transparent p-0"
                            : "border-0 bg-transparent p-0"
                        }
                      >
                        <div
                          className={`relative box-border flex h-[57px] w-full items-center sm:h-[67px] ${gridPad} pb-1 ${b
                            ? `rounded-none  border-0 shadow-none ${mergedSurface} transition-colors ${borderlessHover}`
                            : `rounded-xl border border-[#BFBFBF] shadow-[0px_3px_0px_rgba(0,0,0,0.10)] transition-shadow hover:shadow-md mb-3 sm:mb-4 ${mergedSurface} ${rowIndex === 0 ? "mt-3 sm:mt-4" : ""
                            }`
                            }`}
                        >
                          <div
                            className={`grid w-full items-center justify-items-stretch ${gapX} ${rowCellClassName}`}
                            style={{ gridTemplateColumns: cols }}
                          >
                            {columns.map((col) => (
                              <div
                                key={col.key}
                                className={`min-w-0 ${col.allowWrap ? "" : "whitespace-nowrap"
                                  } ${col.className ?? ""}`}
                              >
                                {col.cell(row)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {pagination ? (
          <div className="px-3 sm:px-0">
            <DataTablePaginationBar
              summaryLabel={pagination.summaryLabel ?? "Orders"}
              shownCount={shownCount}
              totalItems={totalItems}
              activePage={activePage}
              totalPages={totalPages}
              onPrev={onPrev}
              onNext={onNext}
              canPrev={canPrev}
              canNext={canNext}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

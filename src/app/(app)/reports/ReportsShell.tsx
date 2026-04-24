"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";  
import {
  SidebarDefaultBody,
  SidebarRichBody,
} from "./SidebarVariants";
import { IoFilter, IoReloadOutline } from "react-icons/io5";
import { AiOutlineFileExcel, AiOutlineFilePdf, AiOutlinePrinter } from "react-icons/ai";
import { PiFileCsv } from "react-icons/pi";
import OrdersFilterDialog from "@/components/common/OrdersFilterDialog";


export type SidebarMode = "default" | "rich" | "collapsed";

type DownloadFormat = "pdf" | "excel" | "csv" | "print";

const DOWNLOAD_FORMAT_OPTIONS: {
  id: DownloadFormat;
  label: string;
  icon: ReactNode;
  labelHighlight?: boolean;
}[] = [
  {
    id: "pdf",
    label: "PDF",
    icon: <AiOutlineFilePdf className="h-5 w-5 shrink-0 text-[#2E7AAF]" aria-hidden />,
  },
  {
    id: "excel",
    label: "Excel",
    icon: (
      <AiOutlineFileExcel className="h-5 w-5 shrink-0 text-[#2E7AAF]" aria-hidden />
    ),
  },
  {
    id: "csv",
    label: "CSV",
    icon: <PiFileCsv className="h-5 w-5 shrink-0 text-[#2E7AAF]" aria-hidden />,
  },
  {
    id: "print",
    label: "Print",
    icon: (
      <AiOutlinePrinter className="h-5 w-5 shrink-0 text-[#2E7AAF]" aria-hidden />
    ),
  },
];

function edgeToggleBtn(
  onClick: () => void,
  label: string,
  children: ReactNode
) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#1696C8] bg-white text-[#1696C8] shadow-[3px_1px_9px_rgba(87, 158, 186, 0.2)] transition"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export default function ReportsShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat | null>(
    null
  );
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("default");
  const downloadRef = useRef<HTMLDivElement>(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const expanded = sidebarMode !== "collapsed";
  const isDefault = sidebarMode === "default";
  const isRich = sidebarMode === "rich";

  const onTopEdgeClick = () => {
    setSidebarMode((m) => (m === "default" ? "rich" : "default"));
  };

  const onBottomEdgeClick = () => {
    setSidebarMode("collapsed");
  };

  const onExpandClick = () => {
    setSidebarMode("default");
  };

  useEffect(() => {
    if (!downloadOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (
        downloadRef.current &&
        !downloadRef.current.contains(e.target as Node)
      ) {
        setDownloadOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDownloadOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [downloadOpen]);

  return (
    <main className="mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
          Operational Reports
        </h1>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-[#E0E0E0] bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
            aria-label="Filter"
            onClick={() => setFilterDialogOpen(true)}
          >
            <IoFilter className="h-4 w-4 text-[#7F7F7F]" aria-hidden />
          </button>
          <div
            className="relative inline-flex min-w-[11.5rem] flex-col items-stretch sm:min-w-[13.5rem]"
            ref={downloadRef}
          >
            <button
              type="button"
              onClick={() => setDownloadOpen((v) => !v)}
              className="inline-flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-[#E0E0E0] bg-white px-3.5 text-sm font-medium text-[#686464] shadow-sm transition hover:bg-slate-50 sm:px-4"
              aria-expanded={downloadOpen}
              aria-haspopup="menu"
              aria-controls="reports-download-menu"
            >
              <span className="flex min-w-0 items-center gap-2">
                <IoReloadOutline
                  className="h-[18px] w-[18px] shrink-0 text-[#7F7F7F]"
                  aria-hidden
                />
                <span className="hidden truncate sm:inline">
                  Download Report
                </span>
                <span className="truncate sm:hidden">Download</span>
              </span>
              <HiChevronDown
                className={`h-4 w-4 shrink-0 text-[#7F7F7F] transition-transform duration-200 ${downloadOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {downloadOpen ? (
              <div
                id="reports-download-menu"
                role="menu"
                aria-orientation="vertical"
                className="absolute left-0 right-0 top-full z-20 mt-1.5 rounded-xl border border-slate-200/95 bg-white py-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] ring-1 ring-slate-100/80"
              >
                {DOWNLOAD_FORMAT_OPTIONS.map((opt) => {
                  const checked = downloadFormat === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={checked}
                      className="flex w-full  items-center gap-3 px-3.5 py-2 cursor-pointer text-left text-xs text-[#4a4a4a] transition hover:bg-slate-50 sm:px-4"
                      onClick={() => {
                        setDownloadFormat(opt.id);
                        setDownloadOpen(false);
                      }}
                    >
                      {opt.icon}
                      <span
                        className={`min-w-0 flex-1 font-medium text-xs`}
                      >
                        {opt.label}
                      </span>
                      <span
                        className="relative flex size-[18px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-slate-300 bg-white"
                        aria-hidden
                      >
                        {checked ? (
                          <span className="size-2.5 rounded-full bg-[#2E7AAF]" />
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-x-5 lg:flex-row lg:items-stretch">
        {sidebarMode === "collapsed" && (
          <div className="order-1 flex justify-center lg:order-1 lg:justify-start lg:pt-2">
            <button
              type="button"
              onClick={onExpandClick}
              className="inline-flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#1696C8] bg-white text-[#1696C8] shadow-[3px_1px_9px_rgba(87, 158, 186, 0.2)] transition"
              aria-label="Show reports sidebar"
              title="Show reports sidebar"
            >
              <HiChevronRight className="h-[18px] w-[18px] text-[#1696C8]" aria-hidden />
            </button>
          </div>
        )}

        {expanded && (
          <div className="order-1 flex items-center justify-center gap-3 lg:hidden">
            {edgeToggleBtn(
              onTopEdgeClick,
              isRich ? "Standard sidebar layout" : "Detailed sidebar layout",
              isRich ? (
                <HiChevronLeft className="h-4 w-4" />
              ) : (
                <HiChevronRight className="h-4 w-4" />
              )
            )}
            {edgeToggleBtn(
              onBottomEdgeClick,
              "Hide sidebar",
              <HiChevronLeft className="h-4 w-4" />
            )}
          </div>
        )}

        {expanded && (
          <aside
            id="reports-sidebar"
            className={`relative bg-white rounded-xl order-3 w-full shrink-0 overflow-visible transition-[max-height,opacity,width] duration-300 ease-out lg:order-1 ${!isRich ? "lg:w-[min(100%,150px)]" : "lg:w-[min(100%,310px)]"}`}
          >
            <div
              className={`rounded-t-[18px] flex flex-row items-start justify-start p-3.5 pb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-4 
                }`}
            >
              <div
                className="h-full space-y-5 overflow-y-auto overflow-x-hidden pr-1 pt-0.5 [scrollbar-width:thin] [scrollbar-color:#C5CCD6_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/90 [&::-webkit-scrollbar-track]:bg-transparent"
              >
                {isDefault && <SidebarDefaultBody pathname={pathname} />}
                {isRich && <SidebarRichBody pathname={pathname} />}
              </div>

              <div className="pointer-events-none z-30 absolute top-12 -right-3 flex flex-col gap-2.5">
                <div className="pointer-events-auto">
                  {edgeToggleBtn(
                    onTopEdgeClick,
                    isRich ? "Switch to standard sidebar" : "Switch to detailed sidebar",
                    isRich ? (
                      <HiChevronLeft className="h-4 w-4" />
                    ) : (
                      <HiChevronRight className="h-4 w-4" />
                    )
                  )}
                </div>
                {!isRich && (
                <div className="pointer-events-auto">
                  {edgeToggleBtn(
                    onBottomEdgeClick,
                    "Hide sidebar",
                    <HiChevronLeft className="h-4 w-4" />
                  )}
                </div>
                )}
              </div>
            </div>
          </aside>
        )}

        <div className="order-2 min-w-0 flex-1 lg:order-2 lg:min-w-0">
          {children}
        </div>
      </div>

      <OrdersFilterDialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} />
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  HiChevronDoubleLeft,
  HiDocumentDownload,
  HiPrinter,
  HiSortAscending,
  HiTrash,
} from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import DataTable, { type DataTableColumn } from "./common/DataTable";
import SearchInput from "./common/SearchInput";
import {
  EFAX_MOCK_ROWS,
  EFAX_TABS,
  type EfaxRow,
} from "../data/efaxStaticData";
import NewFaxDialog from "./NewFaxDialog";
import printIcon from "../assets/images/e-fex/Vector.png";
import downloadIcon from "../assets/images/e-fex/folder-download.png";
import deleteIcon from "../assets/images/e-fex/trash.png";
import arrowLeftIcon from "../assets/images/e-fex/arrow-left.png";
import filterIcon from "../assets/images/e-fex/high-low.png";
import Image from "next/image";
import viewGridIcon from "../assets/images/e-fex/Vector.png";
import { IoFilterSharp } from "react-icons/io5";


const EFAX_PAGE_SIZE = 3;

const PRIMARY = "#528DB5";
const TABLE_GRID =
  "minmax(4.5rem,0.55fr) minmax(5.5rem,0.75fr) minmax(6.5rem,0.9fr) minmax(6.5rem,1.05fr) minmax(5rem,0.65fr) minmax(4.25rem,0.5fr) minmax(5.5rem,0.65fr) minmax(5.5rem,0.75fr)";

function statusDotClass(kind: EfaxRow["status"]) {
  if (kind === "delivered") return "bg-emerald-500";
  if (kind === "pending") return "bg-amber-400";
  return "bg-red-500";
}

function statusLabel(kind: EfaxRow["status"]) {
  if (kind === "delivered") return "Delivered";
  if (kind === "pending") return "Pending";
  return "Failed";
}

function rowCellTextClass(r: EfaxRow) {
  return r.boldRow
    ? "font-bold text-[#1f2937]"
    : "font-medium text-[#4b5563]";
}

function labelPill(r: EfaxRow) {
  const weight = r.boldRow ? "font-bold" : "font-semibold";
  if (r.label === "report") {
    return (
      <span
        className={`inline-flex max-w-full truncate rounded-full bg-[#FFF4E5] px-2 py-0.5 text-[10px] text-[#C27803] sm:text-xs ${weight}`}
      >
        Report
      </span>
    );
  }
  if (r.label === "pendingSign") {
    return (
      <span
        className={`inline-flex max-w-full truncate rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] text-[#0F9D58] sm:text-xs ${weight}`}
      >
        Pending Sign
      </span>
    );
  }
  return (
    <span
      className={`inline-flex max-w-full truncate rounded-full bg-[#FEECEC] px-2 py-0.5 text-[10px] text-[#DC2626] sm:text-xs ${weight}`}
    >
      Error
    </span>
  );
}

function useEfaxColumns(): DataTableColumn<EfaxRow>[] {
  return [
    {
      key: "faxNo",
      header: "Fax no.",
      className: "!normal-case !tracking-normal",
      allowWrap: true,
      cell: (r) => (
        <span className={`tabular-nums ${rowCellTextClass(r)}`}>{r.faxNo}</span>
      ),
    },
    {
      key: "from",
      header: "From",
      className: "!normal-case !tracking-normal",
      allowWrap: true,
      cell: (r) => (
        <span className={`min-w-0 ${rowCellTextClass(r)}`}>{r.from}</span>
      ),
    },
    {
      key: "to",
      header: "To",
      className: "!normal-case !tracking-normal",
      allowWrap: true,
      cell: (r) => <span className={rowCellTextClass(r)}>{r.to}</span>,
    },
    {
      key: "subject",
      header: "Subject",
      className: "!normal-case !tracking-normal",
      allowWrap: true,
      cell: (r) => (
        <span
          className={`line-clamp-2 whitespace-normal sm:line-clamp-none ${rowCellTextClass(r)}`}
        >
          {r.subject}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "!normal-case !tracking-normal",
      cell: (r) => (
        <span className="inline-flex min-w-0 items-center gap-1.5">
          <span
            className={`size-2 shrink-0 rounded-full ${statusDotClass(r.status)}`}
            aria-hidden
          />
          <span className={rowCellTextClass(r)}>{statusLabel(r.status)}</span>
        </span>
      ),
    },
    {
      key: "label",
      header: "Label",
      className: "!normal-case !tracking-normal",
      cell: (r) => labelPill(r),
    },
    {
      key: "time",
      header: "Time",
      className: "!normal-case !tracking-normal",
      cell: (r) => (
        <span
          className={`whitespace-nowrap sm:text-inherit ${rowCellTextClass(r)}`}
        >
          {r.timeDay}{" "}
          <span className="text-slate-400">|</span> {r.timeClock}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerAlign: "right",
      className: "!normal-case !tracking-normal text-right",
      cell: () => (
        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <Link
            href="#"
            className="text-sm font-semibold"
            style={{ color: PRIMARY }}
          >
            Open
          </Link>
          <button
            type="button"
            className="inline-flex size-7 items-center justify-center rounded-lg text-[#5798B8] transition hover:bg-sky-50"
            aria-label="Print"
          >
            <Image
              src={printIcon}
              alt="Print"
              width={16}
              height={16}
              className="h-[16px] w-[16px] shrink-0"
              objectFit="cover"
              aria-hidden
            />
          </button>
          <button
            type="button"
            className="inline-flex size-7 items-center justify-center rounded-lg text-[#5798B8] transition hover:bg-sky-50"
            aria-label="Download"
          >
            <Image
              src={downloadIcon}
              alt="Download"
              width={16}
              height={16}
              className="h-[16px] w-[16px] shrink-0"
              objectFit="cover"
              aria-hidden
            />
          </button>
          <button
            type="button"
            className="inline-flex size-7 items-center justify-center rounded-lg text-rose-400/90 transition hover:bg-rose-50"
            aria-label="Delete"
          >
            <Image
              src={deleteIcon}
              alt="Delete"
              width={16}
              height={16}
              className="h-[16px] w-[16px] shrink-0"
              objectFit="cover"
              aria-hidden
            />
          </button>
        </div>
      ),
    },
  ];
}

const STAT_CARDS = [
  { label: "Today", value: "101" },
  { label: "Sent", value: "668" },
  { label: "Pending", value: "13,562" },
  { label: "Failed", value: "27" },
] as const;

function matchesSearch(r: EfaxRow, q: string) {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  return [r.faxNo, r.from, r.to, r.subject, statusLabel(r.status), r.label]
    .join(" ")
    .toLowerCase()
    .includes(s);
}

export default function EfaxView() {
  const [search, setSearch] = useState("");
  const [ordersMode, setOrdersMode] = useState<"orders" | "others">("orders");
  const [tab, setTab] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [newFaxOpen, setNewFaxOpen] = useState(false);
  const columns = useEfaxColumns();

  const filteredRows = useMemo(
    () => EFAX_MOCK_ROWS.filter((r) => matchesSearch(r, search)),
    [search]
  );
  const listTotal = filteredRows.length;

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="shrink-0 text-2xl font-bold tracking-tight text-black">
          eFax
        </h1>
        <div className="flex w-full min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end lg:max-w-[40rem] lg:gap-4">
          <div className="min-w-0 sm:flex-1">
            <SearchInput
              id="efax-search"
              name="efaxSearch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              aria-label="Search faxes"
              isNoShadow
              wrapperClassName="w-full"
              className="h-11 rounded-[8px] border-[0.5px] border-[#CDCDCD] bg-white px-3 py-2 text-sm text-[#686464] outline-none placeholder:text-[##7F7F7F] focus:border-[#528DB5] focus:ring-[0.5px] focus:ring-[#528DB5]/30"
            />
          </div>
          <button
            type="button"
            onClick={() => setNewFaxOpen(true)}
            className="inline-flex h-11 cursor-pointer shrink-0 items-center justify-center gap-2 rounded-[8px] bg-gradient-to-b from-[#579EBA] to-[#4F81B2] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4a8bab]"
          >
            <HiPlus className="size-4 text-[#FFFFFF]" aria-hidden />
            New Fax
          </button>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:gap-3">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
          {STAT_CARDS.map((s) => (
            <article
              key={s.label}
              className="rounded-[10px] bg-white p-4 shadow-[-1px_0px_5px_rgba(0,0,0,0.05)]"
            >
              <p className="text-xs font-medium text-[#9B9B9B] sm:text-sm">
                {s.label}
              </p>
              <p className="mt-1.5 text-2xl font-semibold tabular-nums text-[#686464] sm:text-3xl">
                {s.value}
              </p>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="items-center self-start flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          aria-label="Toggle side panel"
        >
          <Image
            src={arrowLeftIcon}
            alt="Arrow Left"
            width={26}
            height={28}
            className="h-[26px] w-[28px] shrink-0"
            objectFit="cover"
            aria-hidden
          />
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div
          className="inline-flex w-full shadow-[-1px_0px_5px_rgba(0,0,0,0.05)] rounded-full border border-[#E2E8EF] bg-white p-1.5 sm:w-auto"
          role="group"
          aria-label="Fax type"
        >
          <button
            type="button"
            onClick={() => setOrdersMode("orders")}
            className={
              ordersMode === "orders"
                ? "flex-1 rounded-full cursor-pointer w-[150px] bg-[#5798B8] py-2 text-sm font-semibold text-white sm:flex-none sm:px-6"
                : "flex-1 rounded-full cursor-pointer w-[150px] py-2 text-sm font-medium text-[#6b7280] transition hover:text-[#374151] sm:flex-none sm:px-6"
            }
          >
            Orders
          </button>
          <button
            type="button"
            onClick={() => setOrdersMode("others")}
            className={
              ordersMode === "others"
                ? "flex-1 rounded-full cursor-pointer w-[150px] bg-[#5798B8] py-2 text-sm font-semibold text-white sm:flex-none sm:px-6"
                : "flex-1 rounded-full cursor-pointer w-[150px] py-2 text-sm font-medium text-[#6b7280] transition hover:text-[#374151] sm:flex-none sm:px-6"
            }
          >
            Others
          </button>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
        <div
          className="flex min-w-0 gap-3 overflow-x-auto"
          role="tablist"
          aria-label="Mailbox"
        >
          {EFAX_TABS.map((t) => {
            const id = t.id;
            const isActive = tab === id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(id)}
                className={
                  isActive
                    ? "shrink-0 border-b-2 border-[#528DB5] pb-2 w-[90px] cursor-pointer text-sm font-semibold text-[#528DB5]"
                    : "shrink-0 border-b-2 border-transparent pb-2 w-[90px] cursor-pointer text-sm font-medium text-[#858585] transition hover:text-[#528DB5]"
                }
              >
                <span className="flex items-center justify-center gap-1">
                  {t.label}
                  {"count" in t && typeof t.count === "number" && t.count > 0 && (
                    <span className="bg-[#FF383C] text-white text-[10px] font-semibold w-[18px] h-[18px] flex items-center justify-center rounded-full">
                      {t.count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <div className="shrink-0 self-end flex items-center gap-2 sm:self-center">
          <Image
            src={filterIcon}
            alt="Filter"
            width={40}
            height={40}
            className="h-[40px] w-[40px] cursor-pointer shrink-0"
            objectFit="cover"
            aria-hidden
          />
          {EFAX_TABS.some((t) => t.id === tab && (t.id ==="inbox" || t.id ==="outbox")) ? (
            <button
              type="button"
              className="inline-flex size-10 items-center text-[#7F7F7F] cursor-pointer justify-center rounded-lg border border-[#E5E7EB] bg-whitetransition hover:bg-slate-50"
              aria-label="Sort"
            >
              <IoFilterSharp className="size-5" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={filteredRows}
        getRowKey={(r) => r.id}
        gridTemplateColumns={TABLE_GRID}
        showHeaderChevron={false}
        headerClassName="bg-[#5798B8] text-white !shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] !rounded-t-[10px] border-0"
        rowCellClassName="text-left text-xs text-[#4b5563] sm:text-sm"
        rowCardSurfaceClassName="bg-white"
        pagination={
          listTotal
            ? {
              page,
              onPageChange: setPage,
              pageSize: EFAX_PAGE_SIZE,
              totalCount: listTotal,
              summaryLabel: "eFax",
            }
            : undefined
        }
      />
      <NewFaxDialog open={newFaxOpen} onClose={() => setNewFaxOpen(false)} />
    </div>
  );
}

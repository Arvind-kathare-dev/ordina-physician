"use client";

import {
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiOutlinePencil,
  HiOutlineStatusOnline,
} from "react-icons/hi";
import Dialog from "./Dialog";
import type { OrderMailboxFilter, OrderTableRow } from "../../data/ordersStaticData";
import Image from "next/image";
import infoIcon from "../../assets/images/action-icons/info.svg";


function daysProgress(row: OrderTableRow): { current: number; total: number } {
  const m = row.pending.text.match(/(\d+)/);
  if (m) {
    const n = Number.parseInt(m[1], 10);
    return { current: Math.min(7, Number.isFinite(n) ? n : 1), total: 7 };
  }
  if (/today/i.test(row.pending.text)) return { current: 1, total: 7 };
  return { current: 2, total: 7 };
}

function mailboxStatusLabel(mailbox: OrderMailboxFilter): string {
  const map: Record<OrderMailboxFilter, string> = {
    undelivered: "Undelivered",
    outbox: "Outbox",
    alert: "Alert",
    inbox: "Inbox",
    rejected: "Rejected",
    emr: "EMR",
  };
  return map[mailbox];
}

function iconTile(children: ReactNode) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E1F0FF] text-[#528DB5] sm:h-11 sm:w-11">
      {children}
    </div>
  );
}

type LogEntry = { time: string; body: string };

export default function OrderDetailsInfoDialog({ row }: { row: OrderTableRow }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const { current, total } = useMemo(() => daysProgress(row), [row]);

  const modifiedLogRailRef = useRef<HTMLDivElement>(null);
  const modifiedLogFirstDotRef = useRef<HTMLSpanElement>(null);
  const modifiedLogLastDotRef = useRef<HTMLSpanElement>(null);
  const [modifiedLogRailLine, setModifiedLogRailLine] = useState<{
    left: number;
    top: number;
    height: number;
  } | null>(null);

  const modifiedLog: LogEntry[] = useMemo(
    () => [
      {
        time: "08:12 PM",
        body: `Order modification for ${row.patientName}'s ${row.orderType} was submitted on ${row.date} at 08:12 PM and is awaiting physician review.`,
      },
      {
        time: "02:30 PM",
        body: `Clinical notes were updated for ${row.patientName}. Changes were synced to the order record on ${row.date} at 02:30 PM.`,
      },
      {
        time: "11:05 AM",
        body: `Service type context (${row.serviceType.text}) was refreshed from the agency dashboard for this order.`,
      },
      {
        time: "08:12 PM",
        body: `Order modification for ${row.patientName}'s ${row.orderType} was submitted on ${row.date} at 08:12 PM and is awaiting physician review.`,
      },
      {
        time: "02:30 PM",
        body: `Clinical notes were updated for ${row.patientName}. Changes were synced to the order record on ${row.date} at 02:30 PM.`,
      },
      {
        time: "11:05 AM",
        body: `Service type context (${row.serviceType.text}) was refreshed from the agency dashboard for this order.`,
      },
    ],
    [row]
  );

  const pct = Math.round((current / total) * 100);

  useLayoutEffect(() => {
    if (!open || modifiedLog.length === 0) {
      setModifiedLogRailLine(null);
      return;
    }

    const update = () => {
      const rail = modifiedLogRailRef.current;
      const first = modifiedLogFirstDotRef.current;
      const last = modifiedLogLastDotRef.current;
      if (!rail || !first || !last) {
        setModifiedLogRailLine(null);
        return;
      }
      const rb = rail.getBoundingClientRect();
      const fb = first.getBoundingClientRect();
      const lb = last.getBoundingClientRect();
      const left = fb.left + fb.width / 2 - rb.left;
      const top = fb.top + fb.height / 2 - rb.top;
      const bottom = lb.top + lb.height / 2 - rb.top;
      const height = bottom - top;
      setModifiedLogRailLine({ left, top, height: Math.max(0, height) });
    };

    update();
    const raf = requestAnimationFrame(update);

    const ro = new ResizeObserver(update);
    if (modifiedLogRailRef.current) {
      ro.observe(modifiedLogRailRef.current);
    }
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [open, modifiedLog.length, row.patientName]);

  return (
    <>
      <button
        type="button"
        className="rounded-md cursor-pointer text-[#528DB5] p-0.5"
        aria-label="Order details"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {/* <HiOutlineInformationCircle className="h-[18px] w-[18px] text-[#528DB5]" /> */}
        <Image src={infoIcon} alt="Info" width={18} height={18} />
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        panelClassName="max-w-[min(100%,989px)] w-full rounded-2xl max-h-[min(94vh,989px)]"
        labelledBy={titleId}
      >
        <div className="flex max-h-[min(94vh,820px)] min-h-0 flex-col bg-white">
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 bg-[#EEF4FA] px-3 h-[58px] sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                className="shrink-0 cursor-pointer rounded-full p-1.5 text-[#333]"
                aria-label="Back"
                onClick={() => setOpen(false)}
              >
                <HiOutlineArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <h2
                id={titleId}
                className="truncate text-sm font-bold text-[#686464] sm:text-base"
              >
                Order Details
              </h2>
            </div>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                type="button"
                className="rounded-full cursor-pointer p-2 text-[#528DB5]"
                aria-label="Edit order"
              >
                <HiOutlinePencil className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="rounded-full cursor-pointer p-2 text-[#528DB5]"
                aria-label="Notifications"
              >
                <HiOutlineBell className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="px-4 pb-6 pt-5 sm:px-6 sm:pt-6">
              <h3 className="text-xl font-semibold leading-tight text-[#686464] sm:text-xl">
                {row.patientName}
              </h3>
              <div className="-mx-4 mt-3 flex flex-wrap gap-2 border-b border-[#D1D1D6] px-4 pb-8 sm:-mx-6 sm:px-6">
                <span className="inline-flex h-[33px] items-center rounded-full bg-[#579EBA24] px-3 text-xs font-semibold text-[#528DB5] sm:text-sm">
                  {row.serviceType.text}
                </span>
                <span className="inline-flex h-[33px] items-center rounded-full bg-[#FFF6E5] px-3 text-xs font-semibold text-[#FFA90A] sm:text-sm">
                  Modified
                </span>
              </div>

              <section className="-mx-4 border-b border-[#D1D1D6] px-4 pb-8 pt-8 sm:-mx-6 sm:px-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B9B9B] sm:text-xs">
                  Order details
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-row gap-3 items-center justify-start">
                    {iconTile(
                      <HiOutlineClock className="h-5 w-5" aria-hidden />
                    )}
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B] sm:text-[11px]">
                        Order date
                      </p>
                      <p className="mt-[2px] font-semibold text-[#606060] sm:text-[15px]">
                        {row.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center justify-start">
                    {iconTile(
                      <HiOutlineCalendar className="h-5 w-5" aria-hidden />
                    )}
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B] sm:text-[11px]">
                        No. of days
                      </p>
                      <div className="flex flex-row items-center justify-start gap-2">
                        <div
                          className="h-4 w-[90px] overflow-hidden rounded-full bg-slate-200/90"
                          role="presentation"
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-lime-400 to-amber-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="mt-[2px] font-semibold text-[#606060] sm:text-[15px]">
                          {current}/{total}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center justify-start">
                    {iconTile(
                      <HiOutlineStatusOnline className="h-5 w-5" aria-hidden />
                    )}
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B] sm:text-[11px]">
                        Status
                      </p>
                      <p className="mt-[2px] font-semibold text-[#606060] sm:text-[15px]">
                        <span className="text-[#9B9B9B]" aria-hidden>
                          •{" "}
                        </span>
                        {mailboxStatusLabel(row.mailbox)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center justify-start">
                    {iconTile(
                      <HiOutlineDocumentText className="h-5 w-5" aria-hidden />
                    )}
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B] sm:text-[11px]">
                        Order type
                      </p>
                      <p className="mt-[2px] font-semibold text-[#606060] sm:text-[15px]">
                        {row.orderType}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9B9B9B] sm:text-xs">
                  Modified log
                </p>

                <div ref={modifiedLogRailRef} className="relative mt-4 sm:mt-5">
                  {modifiedLogRailLine != null && modifiedLogRailLine.height > 0.5 ? (
                    <div
                      className="pointer-events-none absolute z-0 w-px -translate-x-1/2 bg-[#D8D8D8]"
                      style={{
                        left: modifiedLogRailLine.left,
                        top: modifiedLogRailLine.top,
                        height: modifiedLogRailLine.height,
                      }}
                      aria-hidden
                    />
                  ) : null}
                  <ul className="relative z-[1] list-none space-y-4">
                    {modifiedLog.map((entry, i) => (
                      <li
                        key={`${entry.time}-${i}`}
                        className="grid min-h-0 grid-cols-[3rem_18px_minmax(0,1fr)] items-stretch gap-x-3 sm:grid-cols-[3rem_18px_minmax(0,1fr)] sm:gap-x-4"
                      >
                        <div className="flex items-center justify-end">
                          <span className="text-right text-[10px] font-medium leading-tight text-[#9B9B9B] sm:text-xs">
                            {entry.time}
                          </span>
                        </div>
                        <div className="relative flex items-center justify-center">
                          <span
                            ref={(el) => {
                              if (i === 0) modifiedLogFirstDotRef.current = el;
                              if (i === modifiedLog.length - 1) {
                                modifiedLogLastDotRef.current = el;
                              }
                            }}
                            className="relative z-[2] size-2.5 shrink-0 rounded-full border-[0.5px] border-white bg-[#B0B0B0] shadow-[0_0_0_1px_rgba(255,255,255,1)]"
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0 rounded-xl bg-[#F5F5F5] px-3 py-3 text-left text-xs leading-relaxed text-[#606060] sm:rounded-2xl sm:px-4 sm:text-sm">
                          {entry.body}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

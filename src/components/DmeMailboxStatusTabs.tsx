"use client";

import Image from "next/image";
import type { OrderMailboxFilter } from "../data/ordersStaticData";
import syncIcon from "../assets/images/sync-icon.png";

export type DmeOrdersMailbox = Extract<
  OrderMailboxFilter,
  "inbox" | "outbox" | "alert" | "undelivered"
>;

const TABS: { id: DmeOrdersMailbox; label: string }[] = [
  { id: "inbox", label: "Inbox" },
  { id: "outbox", label: "Pending" },
  { id: "alert", label: "Alert" },
  { id: "undelivered", label: "Undelivered" },
];

export function dmeMailboxHeading(mailbox: DmeOrdersMailbox): string {
  const found = TABS.find((t) => t.id === mailbox);
  return `${found?.label ?? "DME"} Orders`;
}

type DmeMailboxStatusTabsProps = {
  active: DmeOrdersMailbox;
  onChange: (id: DmeOrdersMailbox) => void;
  counts: Record<DmeOrdersMailbox, number>;
};

function formatCount(n: number) {
  return n > 99 ? "99+" : String(n);
}

export function DmeMailboxStatusTabs({
  active,
  onChange,
  counts,
}: DmeMailboxStatusTabsProps) {
  return (
    <div className="w-full min-w-0">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          const isAlert = tab.id === "alert";

          const surface = isActive
            ? isAlert
              ? "border-[#E05D5D] shadow-[0_0_0_1px_rgba(224,93,93,0.25),2px_2px_10px_rgba(0,0,0,0.08)]"
              : "border-[#528DB5BF] shadow-[0_0_0_1px_rgba(82,141,181,0.2),2px_2px_10px_rgba(0,0,0,0.10)]"
            : "border-[#CDCDCD] shadow-[2px_2px_8px_rgba(0,0,0,0.08)]";

          const labelClass = isAlert
            ? "text-[#E05D5D]"
            : isActive
              ? "text-[#528DB5BF]"
              : "text-[#888888]";

          const badgeClass = isAlert
            ? isActive
              ? "bg-[#FFE8E8] text-[#E05D5D] ring-1 ring-[#E05D5D]/30"
              : "bg-[#FFE8E8] text-[#E05D5D]"
            : isActive
              ? "bg-[#E8F2FA] text-[#528DB5BF]"
              : "bg-[#E6E6E6] text-[#858585]";

          return (
            <div key={tab.id} className="flex min-w-0 flex-col">
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                className={`flex min-h-[2.75rem] w-full cursor-pointer items-center justify-center gap-2 rounded-full border-[0.5px] bg-white px-3 py-2.5 text-center transition hover:bg-[#FAFAFA] sm:min-h-11 sm:px-4 sm:py-2.5 ${surface}`}
              >
                <span
                  className={`truncate text-[13px] font-semibold sm:text-[15px] ${labelClass}`}
                >
                  {tab.label}
                </span>
                <span
                  className={`inline-flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold leading-none ${badgeClass}`}
                >
                  {formatCount(counts[tab.id])}
                </span>
              </button>
              {tab.id === "inbox" && isActive ? (
                <p className="mt-2 flex flex-wrap items-center gap-1 text-[10px] leading-snug text-[#888888] sm:text-[11px]">
                  <span>Last synced on 11-19-2025 at 09:20 AM</span>
                  <Image
                    src={syncIcon}
                    alt=""
                    width={12}
                    height={12}
                    className="opacity-70"
                  />
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

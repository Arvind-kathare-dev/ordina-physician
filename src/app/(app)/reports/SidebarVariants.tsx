"use client";

import Link from "next/link";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight, HiOutlineArchive, HiOutlinePlus } from "react-icons/hi";
import { ReportSidebarNavIcon } from "./components/ReportSidebarNavIcons";
import {
  ONE_CLICK_REPORT_LINKS,
  RECENT_REPORT_LINKS,
} from "./reports-nav";
import { RICH_ONE_CLICK, RICH_RECENT } from "./reports-rich-content";
import Image from "next/image";
import dragHandle from "../../../assets/images/report/dot-icon.png";
import { useRouter } from "next/navigation";
import { MdOutlineArchive } from "react-icons/md";
import QuickReportBuilderModal from "./components/QuickReportBuilderModal";

export function pathMatches(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function sidebarOneClickCardClass(active: boolean, isCustom: boolean) {
  const base =
    "relative z-0 flex min-h-[110px] min-w-[132px] shrink-0 flex-col items-start justify-start gap-2.5 rounded-[12px] border px-3 pb-3 pt-5 text-center shadow-sm transition sm:min-w-[148px] lg:w-full lg:min-w-0";
  if (active && isCustom) {
    return `${base} border-[#FFA90A] bg-[#FAF6F0] shadow-[rgba(87, 158, 186, 0.2)] ring-1 ring-[#FFA90A]/35`;
  }
  if (active) {
    return `${base} border-primary-color/80 bg-primary-background shadow-[rgba(87, 158, 186, 0.2)]`;
  }
  return `${base} border border-slate-200/95 bg-white hover:border-slate-300 hover:shadow-[rgba(87, 158, 186, 0.2)]`;
}

function sidebarRecentCardClass(active: boolean) {
  const base =
    "relative z-0 flex min-h-[110px] min-w-[132px] shrink-0 flex-col items-start justify-start gap-2.5 rounded-[12px] border px-3 pb-3 pt-5 text-center shadow-sm transition sm:min-w-[148px] lg:w-full lg:min-w-0";
  if (active) {
    return `${base} border-primary-color/80 bg-primary-background shadow-[rgba(87, 158, 186, 0.2)]`;
  }
  return `${base} border border-slate-200/95 bg-white hover:border-slate-300 hover:shadow-[rgba(87, 158, 186, 0.2)]`;
}

type DefaultBodyProps = { pathname: string | null };

export function SidebarDefaultBody({ pathname }: DefaultBodyProps) {
  const router = useRouter();
  const [quickReportOpen, setQuickReportOpen] = useState(false);
  const [quickReportMountKey, setQuickReportMountKey] = useState(0);

  return (
    <>
      <QuickReportBuilderModal
        key={quickReportMountKey}
        open={quickReportOpen}
        onClose={() => setQuickReportOpen(false)}
      />
      
      <section>
        <h2 className="mb-3 text-[16px] font-semibold leading-tight text-[#858585]">
          Recently Viewed Reports
        </h2>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setQuickReportMountKey((k) => k + 1);
              setQuickReportOpen(true);
            }}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#528DB5] text-white shadow-sm transition hover:bg-[#1485b3]"
            aria-label="Add report"
          >
            <HiOutlinePlus className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => router.push("/reports/archive")}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#528DB5] text-white shadow-sm transition hover:bg-[#1485b3]"
            aria-label="Documents"
          >
            <span className="sr-only">Documents</span>
            <MdOutlineArchive className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="relative lg:static">
          <div className="flex items-stretch gap-1.5 lg:block lg:space-y-3">
            <div className="min-w-0 flex-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-0 gap-3 pb-0.5 lg:flex-col lg:gap-3 lg:pb-0">
                {RECENT_REPORT_LINKS.map((item) => {
                  const active = pathMatches(pathname, item.href);
                  return (
                    <div
                      key={item.id}
                      className="relative shrink-0 overflow-visible pl-1 lg:w-full"
                    >
                      <Link
                        href={item.href}
                        className={sidebarRecentCardClass(active)}
                      >
                        <span className="pointer-events-none absolute right-2 top-2 opacity-80">
                          <Image
                            src={dragHandle}
                            alt=""
                            width={24}
                            height={24}
                          />
                        </span>
                        <ReportSidebarNavIcon id={item.id} active={active} />
                        <span
                          className={`max-w-[11rem] text-left text-[12px] ps-1 font-semibold leading-snug sm:text-xs ${
                            active ? "text-primary-color" : "text-[#606060]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                      {active ? (
                        <span
                          className="pointer-events-none absolute left-[2px] top-4 bottom-4 z-[2] w-[5px] rounded-full bg-[#528DB5]"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2.5 text-[16px] font-semibold text-[#858585]">
          One-Click Reports
        </h2>
        <ul className="flex flex-row overflow-x-auto lg:flex-col gap-2.5 pb-2 lg:pb-0 scrollbar-hide">
          {ONE_CLICK_REPORT_LINKS.map((r) => {
            const active = pathMatches(pathname, r.href);
            const isCustom = r.id === "custom";
            return (
              <li key={r.id} className="shrink-0 w-[148px] lg:w-full">
                <div className="relative overflow-visible pl-1 w-full">
                  <Link
                    href={r.href}
                    className={sidebarOneClickCardClass(active, isCustom)}
                  >
                    <span className="pointer-events-none absolute right-2 top-2 opacity-80">
                      <Image src={dragHandle} alt="" width={24} height={24} />
                    </span>
                    <ReportSidebarNavIcon
                      id={r.id}
                      custom={isCustom}
                      active={active}
                    />
                    <span
                      className={`max-w-[13rem] text-left text-[12px] font-semibold leading-snug sm:text-xs ${
                        active && isCustom
                          ? "text-[#606060]"
                          : active
                            ? "text-[#528DB5]"
                            : "text-[#606060]"
                      }`}
                    >
                      {r.label}
                    </span>
                  </Link>
                  {active && !isCustom ? (
                    <span
                      className="pointer-events-none absolute left-[2px] top-4 bottom-4 z-[2] w-[5px] rounded-full bg-[#528DB5]"
                      aria-hidden
                    />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

function richCardClass(active: boolean, isCustom: boolean) {
  const base =
    "relative z-0 block w-full rounded-[16px] border-[0.5px] p-4 text-left shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition hover:shadow-[0_2px_8px_rgba(15,23,42,0.08)]";
  if (active && isCustom) {
    return `${base} border-[#FFA90A] bg-[#FAF6F0] shadow-[rgba(87,158,186,0.2)] ring-[0.5px] ring-[#FFA90A]/35 hover:border-[#f59e0b]`;
  }
  if (active) {
    return `${base} border-[#b8d4eb] bg-primary-background shadow-[0_4px_14px_rgba(43,119,184,0.14)]`;
  }
  return `${base} border-slate-200/90 bg-white hover:border-slate-300/95`;
}

type RichReportCardProps = {
  href: string;
  active: boolean;
  label: string;
  tag: string;
  description: string;
  isCustom?: boolean;
};

function RichReportCard({
  href,
  active,
  label,
  tag,
  description,
  isCustom = false,
}: RichReportCardProps) {
  return (
    <div className="relative overflow-visible pl-1">
      <Link href={href} className={richCardClass(active, isCustom)}>
        <div className="relative flex gap-2">
          <span className="pointer-events-none shrink-0 pt-0.5 opacity-90">
            <Image
              src={dragHandle}
              alt=""
              width={18}
              height={22}
              className="h-[22px] w-[18px] object-contain"
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <span
                className={`text-[14px] font-semibold leading-tight ${
                  active && isCustom
                    ? "text-[#606060]"
                    : active
                      ? "text-[#2b78b8]"
                      : "text-[#4a4a4a]"
                }`}
              >
                {label}
              </span>
              <span className={"shrink-0 rounded-full border-[0.5px] border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-[#606060]"}>
                {tag}
              </span>
            </div>
            <p className="mt-1.5 text-[12px] leading-snug text-[#6b7280]">
              {description}
            </p>
          </div>
        </div>
      </Link>
      {active && !isCustom ? (
        <span
          className="pointer-events-none absolute left-[2px] top-4 bottom-4 z-[2] w-[5px] rounded-full bg-[#2b78b8]"
          aria-hidden
        />
      ) : null}
    </div>
  );
}

type RichBodyProps = { pathname: string | null };

export function SidebarRichBody({ pathname }: RichBodyProps) {
  const [quickReportOpen, setQuickReportOpen] = useState(false);
  const [quickReportMountKey, setQuickReportMountKey] = useState(0);

  return (
    <>
      <QuickReportBuilderModal
        key={quickReportMountKey}
        open={quickReportOpen}
        onClose={() => setQuickReportOpen(false)}
      />
      <section>
        <h2 className="mb-2.5 text-[16px] font-semibold leading-tight text-[#6b6b6b]">
          Recently Viewed Reports
        </h2>
        <div className="mb-3.5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
            type="button"
            onClick={() => {
              setQuickReportMountKey((k) => k + 1);
              setQuickReportOpen(true);
            }}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#7eb3dc] bg-[#E2F1FF] px-3 py-2 text-[12px] font-semibold text-[#2b78b8] shadow-sm transition hover:bg-[#d4e9fc] sm:flex-initial sm:min-w-0 cursor-pointer"
          >
            <HiOutlinePlus className="h-4 w-4 shrink-0" aria-hidden />
            Create New
          </button>
          <Link
            href="/reports/archive"
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#7eb3dc] bg-[#E2F1FF] px-3 py-2 text-[12px] font-semibold text-[#2b78b8] shadow-sm transition hover:bg-[#d4e9fc] sm:flex-initial sm:min-w-0 ${pathMatches(pathname, "/reports/archive") ? "bg-gradient-to-b from-[#6BA9D6] to-[#2E7AAF] text-white" : ""}`}
          >
            <HiOutlineArchive className="h-4 w-4 shrink-0" aria-hidden />
            Archive Reports
          </Link>
        </div>

        <ul className="flex flex-row overflow-x-auto lg:flex-col gap-3 pb-2 lg:pb-0 scrollbar-hide">
          {RICH_RECENT.map((item) => {
            const active = pathMatches(pathname, item.href);
            return (
              <li key={item.id} className="shrink-0 w-[240px] lg:w-full">
                <RichReportCard
                  href={item.href}
                  active={active}
                  label={item.label}
                  tag={item.tag}
                  description={item.description}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-2.5 mt-5 text-[16px] font-semibold leading-tight text-[#6b6b6b]">
          One-Click Reports
        </h2>
        <ul className="flex flex-row overflow-x-auto lg:flex-col gap-3 pb-2 lg:pb-0 scrollbar-hide">
          {RICH_ONE_CLICK.map((item) => {
            const active = pathMatches(pathname, item.href);
            return (
              <li key={item.id} className="shrink-0 w-[240px] lg:w-full">
                <RichReportCard
                  href={item.href}
                  active={active}
                  label={item.label}
                  tag={item.tag}
                  description={item.description}
                  isCustom={item.id === "custom"}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

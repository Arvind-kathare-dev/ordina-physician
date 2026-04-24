"use client";

import { useState } from "react";
import { HiBell, HiClock, HiExclamation } from "react-icons/hi";
import DateSelect, {
  DASHBOARD_DATE_PRESETS,
  EFAX_DATE_PRESETS,
} from "./common/DateSelect";
import LocationSelect, { DEFAULT_LOCATIONS } from "./common/LocationSelect";
import SearchInput from "./common/SearchInput";
import infoIcon from "../assets/images/Info.png";
import Image from "next/image";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  descriptionClassName?: string;
};

function StatCard({
  title,
  value,
  description,
  descriptionClassName = "text-[#9B9B9B]",
}: StatCardProps) {
  return (
    <article className="relative flex min-h-[148px] flex-col rounded-[12px] border-[0.5px] shadow-[7px_-2px_0px_rgba(82, 141, 181, 0.15)] border-[#D8EFDE] bg-white p-4 sm:p-5">
      <div className="flex flex-row items-center justify-between">
        <h3 className="pr-8 text-sm font-semibold text-[#606060]">{title}</h3>
        <Image src={infoIcon} alt="Info" width={24} height={24} />
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-[#686464] sm:text-4xl">
        {value}
      </p>
      <p
        className={`mt-auto pt-3 text-[12px] leading-relaxed text-[#9B9B9B] ${descriptionClassName}`}
      >
        {description}
      </p>
    </article>
  );
}

const NOTIFICATIONS = [
  {
    id: "1",
    icon: "alert" as const,
    title: "Order #1224 delayed",
    time: "12:14 pm",
    isNew: true,
  },
  {
    id: "2",
    icon: "clock" as const,
    title: "Dr. John Doe's License expires",
    time: "11:11 am",
    isNew: false,
  },
  {
    id: "3",
    icon: "bell" as const,
    title: "Low stock alert: Antacid drug",
    time: "10:11 am",
    isNew: false,
  },
  {
    id: "4",
    icon: "alert" as const,
    title: "5 New Registrations this week",
    time: "09:27 am",
    isNew: false,
  },
  {
    id: "5",
    icon: "bell" as const,
    title: "Low stock alert: Antacid drug",
    time: "10:11 am",
    isNew: false,
  },
  {
    id: "6",
    icon: "alert" as const,
    title: "5 New Registrations this week",
    time: "09:27 am",
    isNew: false,
  },
];

function NotificationIcon({ type }: { type: "alert" | "clock" | "bell" }) {
  if (type === "clock") {
    return (
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F3E9FF] text-[#A25AFF]">
        <HiClock className="size-5" aria-hidden />
      </span>
    );
  }
  if (type === "bell") {
    return (
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FFF6E7] text-[#F2A34F]">
        <HiBell className="size-5" aria-hidden />
      </span>
    );
  }
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FFECEA] text-[#EE7066]">
      <HiExclamation className="size-5" aria-hidden />
    </span>
  );
}

export default function DashboardView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<string>(DEFAULT_LOCATIONS[0]);
  const [dashboardDatePreset, setDashboardDatePreset] = useState("today");
  const [efaxDatePreset, setEfaxDatePreset] = useState("today");

  return (
    <div className="mx-auto max-w-[1600px] space-y-4 px-3 py-4 sm:space-y-5 sm:px-4 sm:py-6 lg:px-6">
      <header className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <h1 className="shrink-0 text-xl font-bold tracking-tight text-black sm:text-2xl">
          Dashboard
        </h1>

        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:min-w-0 lg:flex-1 lg:gap-4">
          <div className="min-w-0 w-full sm:max-w-lg lg:w-[clamp(17rem,46vw,40rem)]">
            <SearchInput
              id="dashboard-search"
              name="dashboardSearch"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, widgets, clients, physicians"
              aria-label="Search reports, widgets, clients, physicians"
              wrapperClassName="w-full max-w-none"
              className="h-11 rounded-xl py-2.5"
              isNoShadow={true}
            />
          </div>
          <div className="shrink-0 self-stretch sm:self-center">
            <LocationSelect value={location} onChange={setLocation} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_min(100%,440px)] lg:items-start">
        <div className="flex min-w-0 flex-col gap-5 md:gap-4">
          <section
            className="rounded-[12px] border-[0.3px] border-[#A0D0AC] bg-gradient-to-b from-[#F9FFFB] to-[#E6F5EA] px-4 py-3 shadow-sm "
            aria-labelledby="today-heading"
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex flex-row items-center gap-2">
                <h2 id="today-heading" className="text-lg font-semibold text-[#5CA56D] sm:text-[18px]">
                  Today&apos;s
                </h2>
                <p className="mt-0.5 text-[14px] text-[#5CA56D]">
                  Signed • Outbound • Follow-ups
                </p>
              </div>
              <DateSelect
                value={dashboardDatePreset}
                onChange={setDashboardDatePreset}
                presets={DASHBOARD_DATE_PRESETS}
                leadingLabel="Date"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="Signed orders"
                value="24"
                description="Completed signatures received across today's active physician orders"
              />
              <StatCard
                title="Outbound orders"
                value="19"
                description="Orders sent out today for physician action, patient care, or delivery workflow"
              />
              <StatCard
                title="Follow-up calls"
                value="150"
                description="Care coordination and physician follow-ups logged by the operations team today"
              />
            </div>
          </section>

          <section
            className="rounded-[12px] border-[0.3px] border-[#E5B082] bg-gradient-to-b from-[#FFFCFA] to-[#F6F0EB] px-4 py-3 shadow-sm"
            aria-labelledby="backlog-heading"
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex flex-row items-center gap-2">
                <h2 id="backlog-heading" className="text-lg font-semibold text-[#E09350] sm:text-xl">
                  Total
                </h2>
                <p className="text-[14px] text-[#E09350]">Backlog snapshot</p>
              </div>
              <DateSelect
                value={dashboardDatePreset}
                onChange={setDashboardDatePreset}
                presets={DASHBOARD_DATE_PRESETS}
                leadingLabel="Date"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard
                title="Unsigned Orders"
                value="707"
                description="Orders still awaiting physician signature before they can move to next care step"
              />
              <StatCard
                title="Undelivered Orders"
                value="107"
                description="Orders not yet delivered through email, eFax, portal, or other outbound channels"
              />
              <StatCard
                title="MD Verification"
                value="46"
                description="Orders pending physician identity, credential, or routing verification before processing"
                descriptionClassName="text-[#FF383C]"
              />
              <StatCard
                title="Rejected Orders"
                value="47"
                description="Documents returned for correction due to missing details, invalid data, or workflow issues"
              />
              <StatCard
                title="Modified Orders"
                value="103"
                description="Orders updated after review to reflect corrected documentation or revised care details"
              />
              <StatCard
                title="Avg Order Signed Time"
                value="3.6 days"
                description="Cases requiring manual validation to ensure correct physician assignment and compliance readiness"
              />
            </div>
          </section>
        </div>

        <aside className="flex min-w-0 flex-col gap-4">
          <section
            className="rounded-[12px] border-[0.3px] border-[#99A9E8] bg-gradient-to-b from-[#F5F7FF] to-[#E7EBF6] px-4 py-3 shadow-sm"
            aria-labelledby="notifications-heading"
          >
            <div className="mb-2 flex flex-row items-center justify-start gap-2">
              <h2
                id="notifications-heading"
                className="text-lg font-semibold text-[#7586C7] sm:text-xl"
              >
                Notifications
              </h2>
              <span className="rounded-full bg-[#E2F2F8] px-2.5 py-0.5 text-xs font-semibold text-[#579EBA]">
                1 New
              </span>
            </div>
            <ul className="max-h-[270px] space-y-2 overflow-y-auto pr-1 custom-scrollbar">
              {NOTIFICATIONS.map((n) => (
                <li
                  key={n.id}
                  className="flex gap-2 rounded-[12px] border-[0.5px] border-[#EBEEFB] bg-white p-2"
                >
                  <NotificationIcon type={n.icon} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-row items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#606060]">{n.title}</p>
                      {n.isNew ? (
                        <span className="rounded-full bg-[#E2F2F8] px-2.5 py-0.5 text-xs font-semibold text-[#579EBA]">
                          New
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-[12px] text-[#9B9B9B]">{n.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="rounded-[12px] border border-[#C8DDF0] bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5"
            aria-labelledby="efax-heading"
          >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="flex flex-col gap-0.5" id="efax-heading">
                <h2 className="text-lg font-bold tracking-tight text-[#4A4A4A] sm:text-xl">
                  eFax
                </h2>
                <p className="text-sm text-[#7A7A7A]">Orders vs Others</p>
              </div>
              <DateSelect
                value={efaxDatePreset}
                onChange={setEfaxDatePreset}
                presets={EFAX_DATE_PRESETS}
                compact
              />
            </div>

            <div className="rounded-[12px] bg-gradient-to-br from-[#6BA8D4] to-[#7EB8D9] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <p className="text-sm font-semibold text-white">Total eFax Volume</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <p className="text-[18px] font-extrabold tracking-tight text-white">
                  13,562
                </p>
                <p className="text-sm font-medium whitespace-nowrap text-white/95 sm:pb-0.5">
                  94.7% orders
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="flex flex-col rounded-[12px] border border-[#E2E8EF] bg-white p-4">
                <p className="text-sm font-semibold text-[#858585]">Orders received</p>
                <p className="mt-2 text-[18px] font-bold tracking-tight text-[#4A4A4A]">12,840</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#E8EEF4]">
                  <div
                    className="h-full rounded-full bg-[#6BA8D4]"
                    style={{ width: "94.7%" }}
                    role="presentation"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>Clinical workflow</span>
                  <span>94.7%</span>
                </div>
              </div>
              <div className="flex flex-col rounded-[12px] border border-[#E2E8EF] bg-white p-4">
                <p className="text-sm font-semibold text-[#858585]">Others received</p>
                <p className="mt-2 text-[18px] font-bold tracking-tight text-[#4A4A4A]">722</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#E8EEF4]">
                  <div
                    className="h-full rounded-full bg-[#C5CCD6]"
                    style={{ width: "5.3%" }}
                    role="presentation"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>Non-order traffic</span>
                  <span>5.3%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-xl border border-[#E2E8EF] bg-white p-4">
                <p className="text-sm font-semibold text-[#858585]">Sent Orders</p>
                <p className="mt-2 text-[18px] font-bold tracking-tight text-[#22A06B]">1158</p>
              </div>
              <div className="rounded-xl border border-[#E2E8EF] bg-white p-4">
                <p className="text-sm font-semibold text-[#858585]">Failed Orders</p>
                <p className="mt-2 text-[18px] font-bold tracking-tight text-[#DE350B]">241</p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section
        className="rounded-[12px] w-full border-[0.3px] border-[#D07474] bg-gradient-to-b from-[#FFFBFB] to-[#F5EDED] px-4 py-3 shadow-sm  md:px-6 md:py-4"
        aria-labelledby="pending-heading"
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h2 id="pending-heading" className="text-lg font-semibold text-[#D07474] sm:text-xl">
            Pending
          </h2>
          <DateSelect
            value={dashboardDatePreset}
            onChange={setDashboardDatePreset}
            presets={DASHBOARD_DATE_PRESETS}
            leadingLabel="Date"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="F2F"
            value="40"
            description="Pending face-to-face encounter documents awaiting send-out, review, or follow-up"
          />
          <StatCard
            title="485 / POC"
            value="90"
            description="Plan of care documents still pending physician review, follow-up, or action"
          />
          <StatCard
            title="Add-ons"
            value="122"
            description="Supplemental order requests pending processing for ongoing patient care updates"
          />
          <StatCard
            title="Others"
            value="215"
            description="Other outstanding documentation waiting for routing, clarification, or workflow completion"
          />
        </div>
      </section>
    </div>
  );
}

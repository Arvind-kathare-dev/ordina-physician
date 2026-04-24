"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CgMenuLeft } from "react-icons/cg";
import {
  HiCheck,
  HiChevronDown,
  HiChevronRight,
  HiOutlineCalendar,
  HiOutlineClock,
  HiSearch,
} from "react-icons/hi";
import ReportMoreFiltersDrawer from "./ReportMoreFiltersDrawer";

export type ReportFilterOption = {
  value: string;
  label: string;
  description?: string;
  tag?: string;
};

export type ReportFilterSelectConfig = {
  kind?: "select";
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly ReportFilterOption[];
  optionLayout?: "default" | "radio";
};

export type ReportFilterMultiSelectConfig = {
  kind: "multiSelect";
  id: string;
  label: string;
  values: string[];
  onValuesChange: (values: string[]) => void;
  options: readonly ReportFilterOption[];
  searchPlaceholder?: string;
  emptySummaryLabel: string;
};

/** Preset timeline buckets (custom uses date fields). */
export type ReportTimelinePreset =
  | "today"
  | "yesterday"
  | "last_7_days"
  | "last_30_days"
  | "this_month"
  | "custom";

export type ReportFilterTimelineConfig = {
  kind: "timeline";
  id: string;
  label: string;
  preset: ReportTimelinePreset;
  customFrom: string;
  customTo: string;
  onPresetChange: (preset: Exclude<ReportTimelinePreset, "custom">) => void;
  onCustomRangeApply: (from: string, to: string) => void;
  onReset: () => void;
};

export type ReportFilterConfig =
  | ReportFilterSelectConfig
  | ReportFilterMultiSelectConfig
  | ReportFilterTimelineConfig;

function isMulti(f: ReportFilterConfig): f is ReportFilterMultiSelectConfig {
  return f.kind === "multiSelect";
}

function isTimeline(f: ReportFilterConfig): f is ReportFilterTimelineConfig {
  return f.kind === "timeline";
}

function labelForValue(
  options: readonly ReportFilterOption[],
  value: string
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function summaryForMulti(f: ReportFilterMultiSelectConfig): string {
  return f.emptySummaryLabel;
}

const TIMELINE_PRESET_ROWS: readonly {
  value: Exclude<ReportTimelinePreset, "custom">;
  label: string;
  description: string;
}[] = [
  { value: "today", label: "Today", description: "Orders for current day" },
  { value: "yesterday", label: "Yesterday", description: "Previous day" },
  { value: "last_7_days", label: "Last 7 days", description: "Rolling week" },
  { value: "last_30_days", label: "Last 30 days", description: "Rolling month" },
  { value: "this_month", label: "This month", description: "Calendar month" },
];

function formatTimelineRangeLabel(from: string, to: string): string {
  if (!from || !to) return "Custom range";
  const fmt = (iso: string) => {
    const [y, m, d] = iso.split("-");
    if (!y || !m || !d) return iso;
    return `${m}/${d}/${y}`;
  };
  return `${fmt(from)} – ${fmt(to)}`;
}

function timelineTriggerSummary(f: ReportFilterTimelineConfig): string {
  if (f.preset === "custom") {
    return formatTimelineRangeLabel(f.customFrom, f.customTo);
  }
  return (
    TIMELINE_PRESET_ROWS.find((r) => r.value === f.preset)?.label ?? "Today"
  );
}

function TimelineFilterDropdown({
  f,
  open,
  setOpenId,
}: {
  f: ReportFilterTimelineConfig;
  open: boolean;
  setOpenId: Dispatch<SetStateAction<string | null>>;
}) {
  const [agingOpen, setAgingOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(f.customFrom);
  const [draftTo, setDraftTo] = useState(f.customTo);

  useLayoutEffect(() => {
    if (open) {
      setDraftFrom(f.customFrom);
      setDraftTo(f.customTo);
    }
  }, [open, f.customFrom, f.customTo]);

  const summary = timelineTriggerSummary(f);
  const timelineSelectionLabel =
    f.preset === "custom"
      ? f.customFrom && f.customTo
        ? formatTimelineRangeLabel(f.customFrom, f.customTo)
        : "Custom"
      : TIMELINE_PRESET_ROWS.find((r) => r.value === f.preset)?.label ??
        "Today";

  return (
    <div className="relative w-[150px] shrink-0 sm:w-[158px]">
      <button
        type="button"
        id={`report-filter-trigger-${f.id}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpenId((id) => (id === f.id ? null : f.id))}
        className={`flex w-full flex-col cursor-pointer items-stretch gap-1 rounded-[10px] border-[0.5px] bg-white p-3 pb-2.5 text-left shadow-sm transition ${
          open
            ? "border-[#1696C8] ring-[1px] ring-[#1696C8]/25"
            : "border-[#E0E0E0] hover:border-slate-300"
        }`}
      >
        <span className="text-[10px] uppercase tracking-wide text-[#9B9B9B] sm:text-[11px]">
          {f.label}
        </span>
        <span className="flex min-h-[1.25rem] items-center justify-between gap-1">
          <span className="min-w-0 flex-1 truncate text-sm text-[#333333]">
            {summary}
          </span>
          <HiChevronDown
            className={`h-4 w-4 shrink-0 text-[#606060] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </span>
      </button>

      {open ? (
        <div
          className="absolute left-0 top-full z-50 mt-1.5 w-[min(100vw-1.5rem,440px)] min-w-[300px] max-w-[440px] overflow-hidden rounded-xl border-[0.5px] border-[#E0E0E0] bg-white py-0 shadow-[0_10px_28px_rgba(15,23,42,0.12)] ring-1 ring-slate-100/90"
          role="dialog"
          aria-label={`${f.label} filter`}
        >
          <div className="flex items-center justify-between border-b border-[#E0E0E0] px-3 pt-4 py-2.5">
            <span className="text-[14px] font-semibold text-[#606060]">
              Filters
            </span>
            <button
              type="button"
              className="text-[14px] font-semibold text-[#528DB5] transition hover:underline"
              onClick={() => {
                f.onReset();
                setDraftFrom("");
                setDraftTo("");
              }}
            >
              Reset
            </button>
          </div>

          <div className="space-y-2 px-3 pt-3">
            <div className="flex items-center gap-3 rounded-[10px] border border-[#E0E0E0] bg-white px-3 py-2.5">
              <HiOutlineCalendar
                className="h-5 w-5 shrink-0 text-[#528DB5]"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-[#888888]">
                  Timeline
                </div>
                <div className="text-xs text-[#888888]">Any</div>
              </div>
              <span className="shrink-0 text-sm font-semibold text-[#333333]">
                {timelineSelectionLabel}
              </span>
              <HiChevronRight
                className="h-4 w-4 shrink-0 text-[#9B9B9B]"
                aria-hidden
              />
            </div>

            <button
              type="button"
              onClick={() => setAgingOpen((v) => !v)}
              className="flex w-full items-center gap-3 rounded-[10px] border border-[#E0E0E0] bg-white px-3 py-2.5 text-left transition hover:bg-slate-50/80"
            >
              <HiOutlineClock
                className="h-5 w-5 shrink-0 text-[#528DB5]"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-[#888888]">
                  Aging
                </div>
                <div className="text-xs text-[#888888]">Any</div>
              </div>
              <HiChevronDown
                className={`h-4 w-4 shrink-0 text-[#9B9B9B] transition-transform ${agingOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {agingOpen ? (
              <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-[#888888]">
                Aging buckets can be wired when your API exposes them.
              </p>
            ) : null}
          </div>

          <div className="mt-3 flex items-center gap-2 bg-[#F6F9FB] px-3 py-2">
            <HiOutlineClock
              className="h-4 w-4 shrink-0 text-[#528DB5]"
              aria-hidden
            />
            <span className="text-sm font-medium text-[#333333]">
              Pending age
            </span>
          </div>

          <div className="max-h-[240px] overflow-y-auto px-2 pb-2 pt-1 [scrollbar-width:thin]">
            {TIMELINE_PRESET_ROWS.map((row) => {
              const checked =
                f.preset !== "custom" && f.preset === row.value;
              return (
                <button
                  key={row.value}
                  type="button"
                  className="flex w-full items-start gap-2.5 rounded-lg px-2 py-2.5 text-left transition hover:bg-slate-50/90"
                  onClick={() => {
                    f.onPresetChange(row.value);
                    setOpenId(null);
                  }}
                >
                  <span
                    className={`mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded border-[0.5px] transition ${
                      checked
                        ? "border-[#528DB5] bg-[#528DB5]"
                        : "border-[#E0E0E0] bg-white"
                    }`}
                    aria-hidden
                  >
                    {checked ? (
                      <HiCheck className="size-3.5 text-white" />
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-[#333333]">
                      {row.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-[#888888]">
                      {row.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mx-3 mb-3 mt-1 rounded-[10px] border border-[#E0E0E0] bg-white px-3 pb-3 pt-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-[#333333]">
                Custom date range
              </span>
              <span className="text-[11px] text-[#888888]">
                Applies to: Created date
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs text-[#888888]">From</span>
                <div className="relative">
                  <input
                    type="date"
                    value={draftFrom}
                    onChange={(e) => setDraftFrom(e.target.value)}
                    className="h-11 w-full rounded-lg border border-[#E0E0E0] bg-white px-3 text-sm text-[#333333] outline-none focus:border-[#528DB5] focus:ring-1 focus:ring-[#528DB5]/25"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-[#888888]">To</span>
                <div className="relative">
                  <input
                    type="date"
                    value={draftTo}
                    onChange={(e) => setDraftTo(e.target.value)}
                    className="h-11 w-full rounded-lg border border-[#E0E0E0] bg-white px-3 text-sm text-[#333333] outline-none focus:border-[#528DB5] focus:ring-1 focus:ring-[#528DB5]/25"
                  />
                </div>
              </label>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#888888]">
              Use More Filters if you need Signed/Modified date filtering.
            </p>
            <div className="mt-3 flex flex-nowrap justify-between gap-2">
              <button
                type="button"
                className="inline-flex h-11 w-[150px] cursor-pointer items-center justify-center rounded-lg border border-[#E0E0E0] bg-white px-4 text-sm font-medium text-[#606060] transition hover:bg-slate-50"
                onClick={() => {
                  setDraftFrom("");
                  setDraftTo("");
                }}
              >
                Clear
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-[250px] flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#528DB5] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4a7fa6] sm:flex-none sm:min-w-[160px]"
                onClick={() => {
                  if (!draftFrom || !draftTo) return;
                  f.onCustomRangeApply(draftFrom, draftTo);
                  setOpenId(null);
                }}
              >
                Apply Custom Range
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type ReportFiltersRowProps = {
  isMoreOptions?: boolean;
  moreFiltersIcon?: "menu" | "filter";
  filters?: readonly ReportFilterConfig[];
  filterStatusText?: string;
  className?: string;
};

export default function ReportFiltersRow({
  isMoreOptions = true,
  filters = [],
  moreFiltersIcon = "menu",
  filterStatusText = "",
  className = "",
}: ReportFiltersRowProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [panelSearch, setPanelSearch] = useState("");
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPanelSearch("");
  }, [openId]);

  useEffect(() => {
    if (openId && !filters.some((x) => x.id === openId)) {
      setOpenId(null);
    }
  }, [filters, openId]);

  useEffect(() => {
    if (!openId) return;
    const onPointerClose = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (!t || !rootRef.current) return;
      if (rootRef.current.contains(t)) return;
      setOpenId(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("pointerdown", onPointerClose, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerClose, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  const openMulti = useMemo(() => {
    if (!openId) return null;
    const f = filters.find((x) => x.id === openId);
    return f && isMulti(f) ? f : null;
  }, [openId, filters]);

  const filteredMultiOptions = useMemo(() => {
    if (!openMulti) return [];
    const q = panelSearch.trim().toLowerCase();
    if (!q) return [...openMulti.options];
    return openMulti.options.filter((o) => {
      const blob = [
        o.label,
        o.value,
        o.description ?? "",
        o.tag ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [openMulti, panelSearch]);

  const filteredSelectOptions = useMemo(() => {
    if (!openId || openMulti) return [];
    const f = filters.find((x) => x.id === openId);
    if (!f || isMulti(f) || isTimeline(f)) return [];
    const q = panelSearch.trim().toLowerCase();
    if (!q) return [...f.options];
    return f.options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [openId, openMulti, filters, panelSearch]);

  const hasStatus = Boolean(filterStatusText.trim());
  const showFilterChrome = filters.length > 0;

  if (!showFilterChrome && !hasStatus) {
    return null;
  }

  return (
    <Fragment>
    <div ref={rootRef} className={`space-y-3 ${className}`.trim()}>
      {showFilterChrome ? (
        <div className="flex flex-row flex-wrap gap-3">
        {filters.map((f) => {
          const open = openId === f.id;
          if (isTimeline(f)) {
            return (
              <TimelineFilterDropdown
                key={f.id}
                f={f}
                open={open}
                setOpenId={setOpenId}
              />
            );
          }

          const summary = isMulti(f)
            ? summaryForMulti(f)
            : labelForValue(f.options, f.value);

          return (
            <div key={f.id} className="relative w-[150px] shrink-0 sm:w-[158px]">
              <button
                type="button"
                id={`report-filter-trigger-${f.id}`}
                aria-expanded={open}
                aria-haspopup="listbox"
                onClick={() => setOpenId((id) => (id === f.id ? null : f.id))}
                className={`flex w-full flex-col cursor-pointer items-stretch gap-1 rounded-[10px] border-[0.5px] bg-white p-3 pb-2.5 text-left shadow-sm transition ${
                  open
                    ? "border-[#1696C8] ring-[1px] ring-[#1696C8]/25"
                    : "border-[#E0E0E0] hover:border-slate-300"
                }`}
              >
                <span className="text-[10px] uppercase tracking-wide text-[#9B9B9B] sm:text-[11px]">
                  {f.label}
                </span>
                <span className="flex min-h-[1.25rem] items-center justify-between gap-1">
                  <span
                    className={`min-w-0 flex-1 truncate text-sm text-[#606060]`}
                  >
                    {summary}
                  </span>
                  <HiChevronDown
                    className={`h-4 w-4 shrink-0 text-[#606060] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </span>
              </button>

              {open && isMulti(f) ? (
                <div
                  className="absolute left-0 top-full z-50 mt-1.5 w-[min(100vw-1.5rem,330px)] min-w-[280px] max-w-[330px] rounded-xl border-[0.5px] border-slate-200/95 bg-white py-2 shadow-[0_10px_28px_rgba(15,23,42,0.12)] ring-1 ring-slate-100/90"
                  role="listbox"
                  aria-multiselectable="true"
                >
                  <div className="border-b-[0.5px] border-slate-100 px-2.5 pb-2">
                    <div className="relative">
                      <HiSearch
                        className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        aria-hidden
                      />
                      <input
                        type="search"
                        value={panelSearch}
                        onChange={(e) => setPanelSearch(e.target.value)}
                        placeholder={
                          f.searchPlaceholder ?? `Search ${f.label.toLowerCase()}…`
                        }
                        className="h-9 w-full rounded-lg border-[0.5px] border-slate-200 bg-white pl-8 pr-2 text-xs text-[#374151] outline-none placeholder:text-slate-400 focus:border-[#1696C8] focus:ring-[1px] focus:ring-[#1696C8]/30"
                        aria-label={`Search ${f.label}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-1.5 text-[10px] text-[#6b7280]">
                    <span>
                      <span className="font-medium text-[#606060]">
                        {f.values.length}
                      </span>{" "}
                      Selected
                    </span>
                    <button
                      type="button"
                      className="font-medium text-[#528DB5] hover:underline"
                      onClick={() => f.onValuesChange([])}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="max-h-[260px] overflow-y-auto px-1.5 pb-1 [scrollbar-width:thin] [scrollbar-color:#c5ccd6_transparent]">
                    {filteredMultiOptions.length === 0 ? (
                      <p className="px-2 py-4 text-center text-xs text-[#9ca3af]">
                        No matches.
                      </p>
                    ) : null}
                    {filteredMultiOptions.map((opt) => {
                      const checked = f.values.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="option"
                          aria-selected={checked}
                          className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left transition`}
                          onClick={() => {
                            const next = checked
                              ? f.values.filter((v) => v !== opt.value)
                              : [...f.values, opt.value];
                            f.onValuesChange(next);
                          }}
                        >
                          <span
                            className={`mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded border-[0.5px] transition ${
                              checked
                                ? "border-[#528DB5] bg-[#528DB5]"
                                : "border-[#E0E0E0] bg-white"
                            }`}
                            aria-hidden
                          >
                            {checked ? (
                              <HiCheck className="size-3.5 text-white" />
                            ) : null}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm leading-snug text-[#606060]">
                              {opt.label}
                            </span>
                            {opt.description ? (
                              <span className="mt-0.5 block text-[12px] leading-snug text-[#9B9B9B]">
                                {opt.description}
                              </span>
                            ) : null}
                          </span>
                          {opt.tag ? (
                            <span className="shrink-0 self-center rounded-full border-[0.5px] border-[#E0E0E0] bg-white px-2.5 py-1 text-[10px] font-medium text-[#858585]">
                              {opt.tag}
                            </span>
                          ) : (
                            <span className="w-8 shrink-0" aria-hidden />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {open && !isMulti(f) && !isTimeline(f) ? (
                <div
                  className="absolute left-0 right-0 top-full z-40 mt-1.5 max-h-[280px] w-[200px] overflow-hidden rounded-xl border-[0.5px] border-slate-200/95 bg-white py-1 shadow-[0_10px_28px_rgba(15,23,42,0.12)] ring-1 ring-slate-100/90"
                  role="listbox"
                >
                  {f.optionLayout !== "radio" && f.options.length > 6 ? (
                    <div className="border-b-[0.5px] border-slate-100 px-2.5 pb-2 pt-2">
                      <div className="relative">
                        <HiSearch
                          className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                          aria-hidden
                        />
                        <input
                          type="search"
                          value={panelSearch}
                          onChange={(e) => setPanelSearch(e.target.value)}
                          placeholder={`Search ${f.label.toLowerCase()}…`}
                          className="h-9 w-full rounded-lg border-[0.5px] border-slate-200 bg-white pl-8 pr-2 text-xs text-[#374151] outline-none placeholder:text-slate-400 focus:border-[#1696C8] focus:ring-1 focus:ring-[#1696C8]/30"
                        />
                      </div>
                    </div>
                  ) : null}
                  <div
                    className={`max-h-[220px] overflow-y-auto [scrollbar-width:thin] ${
                      f.optionLayout === "radio"
                        ? "px-1.5 py-1"
                        : "px-1 py-1"
                    }`}
                  >
                    {filteredSelectOptions.length === 0 ? (
                      <p className="px-2 py-4 text-center text-xs text-[#9ca3af]">
                        No matches.
                      </p>
                    ) : null}
                    {filteredSelectOptions.map((opt) => {
                      const selected = f.value === opt.value;
                      if (f.optionLayout === "radio") {
                        return (
                          <button
                            key={opt.value === "" ? "__empty" : opt.value}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            className={`flex w-full items-center cursor-pointer gap-3 rounded-lg px-2.5 py-1.5 text-left transition`}
                            onClick={() => {
                              f.onChange(opt.value);
                              setOpenId(null);
                            }}
                          >
                            <span
                              className="relative flex size-[18px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-[#C4C4C4] bg-white"
                              aria-hidden
                            >
                              {selected ? (
                                <span className="size-2 rounded-full bg-[#528DB5]" />
                              ) : null}
                            </span>
                            <span
                              className={`text-sm leading-snug ${
                                selected
                                  ? "font-medium text-[#606060]"
                                  : "font-normal text-[#858585]"
                              }`}
                            >
                              {opt.label}
                            </span>
                          </button>
                        );
                      }
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          className={`flex w-full items-center rounded-lg px-2.5 py-1 text-left text-sm transition`}
                          onClick={() => {
                            f.onChange(opt.value);
                            setOpenId(null);
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}

        {isMoreOptions ? <button
          type="button"
          onClick={() => {
            setOpenId(null);
            setMoreDrawerOpen(true);
          }}
          className="flex w-[150px] shrink-0 cursor-pointer flex-col rounded-[10px] border border-[#E0E0E0] bg-white p-3 pb-2.5 text-left shadow-sm transition sm:w-[158px]"
          aria-haspopup="dialog"
          aria-expanded={moreDrawerOpen}
        >
            <CgMenuLeft className="mb-1 h-5 w-5 text-[#9B9B9B]" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B] sm:text-[11px]">
            More Filters
          </span>
        </button> : null}
        </div>
      ) : null}

      {hasStatus ? (
        <p className="text-xs leading-relaxed text-[#B8B8B8] sm:text-sm">
          {filterStatusText}
        </p>
      ) : null}
    </div>
    <ReportMoreFiltersDrawer
      open={moreDrawerOpen}
      onClose={() => setMoreDrawerOpen(false)}
    />
    </Fragment>
  );
}

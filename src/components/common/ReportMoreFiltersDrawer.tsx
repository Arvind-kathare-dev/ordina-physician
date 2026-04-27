"use client";

import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { HiChevronDown, HiX } from "react-icons/hi";

/** Figma option rows (DATE FIELD). */
const DATE_FIELD_OPTIONS = [
  { value: "created", label: "Created date" },
  { value: "sent", label: "Sent date" },
  { value: "signed", label: "Signed date" },
  { value: "modified", label: "Modified date" },
] as const;

/** Figma option rows (PRESET). */
const PRESET_OPTIONS = [
  { value: "timeline", label: "Use timeline (top)" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last7", label: "Last 7 days" },
  { value: "last30", label: "Last 30 days" },
  { value: "thisMonth", label: "This month" },
  { value: "custom", label: "Custom range" },
] as const;

/** Figma option rows (CHANNEL). */
const CHANNEL_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "emailPrimary", label: "Email -- Primary" },
  { value: "emailSecondary", label: "Email -- Secondary" },
  { value: "efaxPrimary", label: "efax -- primary" },
  { value: "efaxSecondary", label: "efX -- Secondary" },
  { value: "voip", label: "VoIP call" },
] as const;

type SectionDef = {
  id: string;
  title: string;
  subtitle: string;
};

const SECTIONS: SectionDef[] = [
  {
    id: "date",
    title: "Date Filtering",
    subtitle: "Filter by Created / Signed / Modified date",
  },
  {
    id: "status",
    title: "Status & Workflow",
    subtitle: "Pending, rejected, modified, escalated, delivered",
  },
  {
    id: "delivery",
    title: "Delivery channel",
    subtitle: "Email / eFax / VoIP / Failures",
  },
  {
    id: "tags",
    title: "Tags / Labels",
    subtitle: "Your operational labels (demo)",
  },
  {
    id: "episodes",
    title: "Episodes",
    subtitle: "Current episodes",
  },
];

const ORDER_STATUS_OPTIONS = [
  "Pending",
  "Sent",
  "Signed",
  "Rejected",
  "Modified",
  "Escalated",
  "Delivered",
  "Delivery Failed",
] as const;

function StaticToggle({
  title,
  sub,
  defaultOn = false,
}: {
  title: string;
  sub: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white p-3 shadow-sm">
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setOn((v) => !v)}
          className={`relative mt-0.5 h-5 w-9 cursor-pointer shrink-0 rounded-full transition-colors ${
            on ? "bg-[#528DB5]" : "bg-[#E5E7EB]"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform ${
              on ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-[#606060]">
            {title}
          </p>
          <p className="mt-0.5 text-xs leading-snug text-[#9B9B9B]">{sub}</p>
        </div>
      </div>
    </div>
  );
}

function FieldShell({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#9B9B9B]">
        {label}
      </span>
      {children}
    </div>
  );
}

type SelectOption = { readonly value: string; readonly label: string };

function FigmaStyleSelect({
  instanceId,
  value,
  onChange,
  options,
  openId,
  setOpenId,
}: {
  instanceId: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly SelectOption[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [menuBox, setMenuBox] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const open = openId === instanceId;
  const selected =
    options.find((o) => o.value === value) ?? (options[0] as SelectOption);

  const syncMenuPosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMenuBox({ top: r.bottom, left: r.left, width: r.width });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuBox(null);
      return;
    }
    syncMenuPosition();
    window.addEventListener("resize", syncMenuPosition);
    window.addEventListener("scroll", syncMenuPosition, true);
    return () => {
      window.removeEventListener("resize", syncMenuPosition);
      window.removeEventListener("scroll", syncMenuPosition, true);
    };
  }, [open, syncMenuPosition]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (rootRef.current?.contains(t) || listRef.current?.contains(t)) {
        return;
      }
      setOpenId(null);
    };
    document.addEventListener("pointerdown", onPointer, true);
    return () => document.removeEventListener("pointerdown", onPointer, true);
  }, [open, setOpenId]);

  const list =
    open && menuBox ? (
      <ul
        ref={listRef}
        className="fixed z-[220] mt-1 max-h-[min(260px,45vh)] overflow-y-auto rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white py-1 shadow-[0_6px_16px_rgba(15,23,42,0.1)] [scrollbar-width:thin]"
        style={{
          top: menuBox.top - 1,
          left: menuBox.left,
          width: menuBox.width,
        }}
        role="listbox"
      >
        {options.map((o) => {
          const isSel = o.value === value;
          return (
            <li key={o.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={isSel}
                onClick={() => {
                  onChange(o.value);
                  setOpenId(null);
                }}
                className={`w-full px-3 cursor-pointer py-1 text-left text-sm transition ${
                  isSel
                    ? "font-medium text-[#374151]"
                    : "font-normal text-[#858585]"
                }`}
              >
                {o.label}
              </button>
            </li>
          );
        })}
      </ul>
    ) : null;

  return (
    <div ref={rootRef} className="relative">
      <button 
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpenId(open ? null : instanceId)}
        className={`flex w-full items-center cursor-pointer justify-between gap-2 border-[0.5px] rounded-[10px] border-[#68646499]/60 bg-white px-3 py-2.5 text-left text-sm font-medium text-[#9B9B9B] outline-none transition focus-visible:ring-1 focus-visible:ring-[#528DB5]/30`}
      >
        <span className="min-w-0 truncate text-[#606060]">{selected.label}</span>
        <HiChevronDown
          className={`size-4 shrink-0 text-[#5c5c5c] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      {list ? createPortal(list, document.body) : null}
    </div>
  );
}

type ReportMoreFiltersDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function ReportMoreFiltersDrawer({
  open,
  onClose,
}: ReportMoreFiltersDrawerProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [dateField, setDateField] = useState("created");
  const [datePreset, setDatePreset] = useState("timeline");
  const [deliveryChannel, setDeliveryChannel] = useState("any");
  const [tagsContains, setTagsContains] = useState("");
  const [openSelectId, setOpenSelectId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSection = useCallback((id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openSelectId) setOpenSelectId(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, openSelectId]);

  useEffect(() => {
    if (!open) setOpenSelectId(null);
  }, [open, expandedId]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  const panel = (
    <div className="fixed inset-0 z-[200] flex justify-end" aria-modal="true" role="dialog" aria-labelledby={titleId}>
      <button
        type="button"
        aria-label="Close more filters"
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
      />
      <aside
        className="relative z-[201] flex h-full w-full max-w-[min(100vw,440px)] flex-col border-l-[0.5px] border-[#E8E8E8] bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.12)] sm:max-w-[450px]"
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b-[0.5px] border-[#EEEEEE] px-5 py-2">
          <h2
            id={titleId}
            className="text-lg font-semibold leading-tight text-[#606060]"
          >
            More Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 cursor-pointer text-[#858585] transition hover:bg-slate-100 hover:text-[#374151]"
            aria-label="Close"
          >
            <HiX className="size-5 cursor-pointer" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:thin]">
          <div className="flex flex-col gap-3">
            {SECTIONS.map((s) => {
              const expanded = expandedId === s.id;
              return (
                <div
                  key={s.id}
                  className="overflow-hidden rounded-[10px] border-[0.5px] border-[#D1D1D1] bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(s.id)}
                    aria-expanded={expanded}
                    className="flex w-full items-start cursor-pointer gap-2 px-4 py-3.5 text-left transition"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#606060]">
                        {s.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#9B9B9B]">
                        {s.subtitle}
                      </p>
                    </div>
                    <HiChevronDown
                      className={`mt-0.5 size-5 shrink-0 text-[#9B9B9B] transition-transform duration-200 ${
                        expanded ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>

                  {expanded ? (
                    <div className="border-t-[0.5px] border-[#EEEEEE] px-4 pb-4 pt-3">
                      {s.id === "date" ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <FieldShell label="Date field">
                              <FigmaStyleSelect
                                instanceId="more-date-field"
                                value={dateField}
                                onChange={setDateField}
                                options={DATE_FIELD_OPTIONS}
                                openId={openSelectId}
                                setOpenId={setOpenSelectId}
                              />
                            </FieldShell>
                            <FieldShell label="Preset">
                              <FigmaStyleSelect
                                instanceId="more-date-preset"
                                value={datePreset}
                                onChange={setDatePreset}
                                options={PRESET_OPTIONS}
                                openId={openSelectId}
                                setOpenId={setOpenSelectId}
                              />
                            </FieldShell>
                          </div>
                          <p className="text-[11px] leading-relaxed text-[#9B9B9B]">
                            Enterprise example: &quot;Signed last 7 days but
                            created 30+ days ago&quot; → use Date field =
                            Signed, preset = Last 7 days, and Aging = 30+.
                          </p>
                        </div>
                      ) : null}

                      {s.id === "status" ? (
                        <div className="space-y-3">
                          <FieldShell label="Order status (multi)">
                            <select
                              multiple
                              size={8}
                              className="w-full rounded-[10px] border-[0.5px] space-y-2 border-[#E0E0E0] bg-white p-2 text-sm text-[#606060] outline-none focus:border-[#528DB5] focus:ring-[1px] focus:ring-[#528DB5]/25 [scrollbar-width:thin]"
                              aria-label="Order status multi-select demo"
                            >
                              {ORDER_STATUS_OPTIONS.map((opt) => (
                                <option className="text-sm cursor-pointer text-[#606060]" key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </FieldShell>
                          <p className="text-[11px] leading-relaxed text-[#9B9B9B]">
                            Hold Ctrl/Cmd to multi-select. This is demo UI; in
                            production use the same multi-select dropdown
                            component.
                          </p>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <StaticToggle
                              title="Quick blockers only"
                              sub="Missing signature / info issues"
                            />
                            <StaticToggle
                              title="Escalation required"
                              sub="30+ days or flagged"
                            />
                          </div>
                        </div>
                      ) : null}

                      {s.id === "delivery" ? (
                        <div className="space-y-3">
                          <FieldShell label="Channel">
                            <FigmaStyleSelect
                              instanceId="more-delivery-channel"
                              value={deliveryChannel}
                              onChange={setDeliveryChannel}
                              options={CHANNEL_OPTIONS}
                              openId={openSelectId}
                              setOpenId={setOpenSelectId}
                            />
                          </FieldShell>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <StaticToggle
                              title="Failed deliveries only"
                              sub="Show undelivered or bounced"
                            />
                            <StaticToggle
                              title="Needs resend"
                              sub="Retry required"
                            />
                          </div>
                        </div>
                      ) : null}

                      {s.id === "tags" ? (
                        <div className="space-y-2">
                          <FieldShell label="Contains tag">
                            <input
                              type="text"
                              value={tagsContains}
                              onChange={(e) => setTagsContains(e.target.value)}
                              placeholder="eg. High priority, medicare, rush..."
                              className="h-10 w-full rounded-[10px] border-[0.5px] border-[#E0E0E0] bg-white px-3 text-sm text-[#374151] outline-none placeholder:text-[#B8B8B8] focus:border-[#528DB5] focus:ring-1 focus:ring-[#528DB5]/25"
                            />
                          </FieldShell>
                          <p className="text-[11px] leading-relaxed text-[#9B9B9B]">
                            In your system this maps to your dynamic label
                            picker.
                          </p>
                        </div>
                      ) : null}

                      {s.id === "episodes" ? (
                        <p className="text-sm leading-relaxed text-[#858585]">
                          Choose an episode range or SOC window (demo). Wire to
                          your episode service when ready.
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );

  return createPortal(panel, document.body);
}
